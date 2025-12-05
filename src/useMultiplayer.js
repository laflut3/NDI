import { useState, useEffect, useRef } from "react";
import Peer from "peerjs";

export function useMultiplayer() {
  const [myPeerId, setMyPeerId] = useState(null);
  const [remotePlayers, setRemotePlayers] = useState(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const peerRef = useRef(null);
  const connectionsRef = useRef(new Map());
  const roomPeersRef = useRef(new Set()); // Track peers in current room
  const keepAliveIntervalRef = useRef(null);

  useEffect(() => {
    // Generate a short random ID (6 characters)
    const generateShortId = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    // Initialize PeerJS with a short custom ID and public server
    const peer = new Peer(generateShortId(), {
      host: "0.peerjs.com",
      port: 443,
      path: "/",
      secure: true,
      config: {
        iceServers: [
          // STUN servers for NAT traversal
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          // TURN servers for relaying when direct connection fails
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443?transport=tcp",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
        iceTransportPolicy: "all", // Try all connection methods
        iceCandidatePoolSize: 10,
      },
      debug: 2, // Enable debug logging to see connection issues
    });

    peerRef.current = peer;

    // When we get our peer ID
    peer.on("open", (id) => {
      console.log("My peer ID is:", id);
      setMyPeerId(id);
      setIsConnected(true);
    });

    // When another peer connects to us
    peer.on("connection", (conn) => {
      console.log("Incoming connection from:", conn.peer);
      setupConnection(conn);
    });

    peer.on("error", (err) => {
      console.error("PeerJS error:", err);
    });

    // Start keepalive to prevent connection timeout
    keepAliveIntervalRef.current = setInterval(() => {
      connectionsRef.current.forEach((conn, peerId) => {
        if (conn.open) {
          try {
            conn.send({ type: "ping", timestamp: Date.now() });
          } catch (err) {
            console.error("Failed to send keepalive to", peerId);
          }
        }
      });
    }, 10000); // Send keepalive every 10 seconds

    // Cleanup on unmount
    return () => {
      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current);
      }
      connectionsRef.current.forEach((conn) => conn.close());
      peer.destroy();
    };
  }, []);

  // Setup connection event handlers
  const setupConnection = (conn) => {
    console.log("Setting up connection with:", conn.peer);

    // Store connection immediately to prevent duplicates
    connectionsRef.current.set(conn.peer, conn);

    conn.on("open", () => {
      console.log("✅ Connection opened with:", conn.peer);

      // Update remote players to add this peer
      setRemotePlayers((prev) => {
        const next = new Map(prev);
        next.set(conn.peer, { position: [0, 0, 0], rotation: 0 });
        return next;
      });
    });

    conn.on("data", (data) => {
      // Don't log ping/pong messages to reduce console spam
      if (data.type !== "ping" && data.type !== "pong") {
        console.log("Received data from", conn.peer, ":", data);
      }

      if (data.type === "ping") {
        // Respond to keepalive ping
        if (conn.open) {
          conn.send({ type: "pong", timestamp: Date.now() });
        }
      } else if (data.type === "pong") {
        // Keepalive response received, connection is alive
      } else if (data.type === "position") {
        setRemotePlayers((prev) => {
          const next = new Map(prev);
          next.set(conn.peer, {
            position: data.position,
            rotation: data.rotation,
          });
          return next;
        });
      } else if (data.type === "join-room") {
        // Someone is joining the room, send them list of all peers we know
        console.log("New peer joining room:", data.peerId);
        const allPeers = [
          myPeerId,
          ...Array.from(connectionsRef.current.keys()),
        ];

        // Send the peer list back
        if (connectionsRef.current.has(conn.peer)) {
          connectionsRef.current.get(conn.peer).send({
            type: "room-peers",
            peers: allPeers,
          });
        }

        // Also announce this new peer to everyone else in the room
        connectionsRef.current.forEach((connection, peerId) => {
          if (peerId !== conn.peer && connection.open) {
            connection.send({
              type: "new-peer",
              peerId: data.peerId,
            });
          }
        });

        roomPeersRef.current.add(data.peerId);
      } else if (data.type === "room-peers") {
        // Received list of all peers in the room
        console.log("Received room peer list:", data.peers);
        data.peers.forEach((peerId) => {
          if (peerId !== myPeerId && !connectionsRef.current.has(peerId)) {
            roomPeersRef.current.add(peerId);
            console.log("Connecting to room peer:", peerId);
            connectToPeer(peerId);
          }
        });
      } else if (data.type === "new-peer") {
        // A new peer joined the room, connect to them
        console.log("New peer announced:", data.peerId);
        if (
          data.peerId !== myPeerId &&
          !connectionsRef.current.has(data.peerId)
        ) {
          roomPeersRef.current.add(data.peerId);
          connectToPeer(data.peerId);
        }
      }
    });

    conn.on("close", () => {
      console.log("❌ Connection closed with:", conn.peer);
      connectionsRef.current.delete(conn.peer);
      roomPeersRef.current.delete(conn.peer);
      setRemotePlayers((prev) => {
        const next = new Map(prev);
        next.delete(conn.peer);
        return next;
      });
    });

    conn.on("error", (err) => {
      console.error("❌ Connection error with", conn.peer, ":", err);
      // Clean up on error
      connectionsRef.current.delete(conn.peer);
      roomPeersRef.current.delete(conn.peer);
      setRemotePlayers((prev) => {
        const next = new Map(prev);
        next.delete(conn.peer);
        return next;
      });
    });

    conn.on("iceStateChanged", (state) => {
      console.log("ICE state changed for", conn.peer, ":", state);

      if (state === "disconnected") {
        console.log(
          "⚠️ Connection disconnected, attempting to reconnect to",
          conn.peer
        );
        // Wait a bit before reconnecting
        setTimeout(() => {
          if (
            !connectionsRef.current.has(conn.peer) ||
            !connectionsRef.current.get(conn.peer).open
          ) {
            console.log("🔄 Reconnecting to", conn.peer);
            const peerId = conn.peer;
            connectionsRef.current.delete(peerId);
            connectToPeer(peerId);
          }
        }, 2000);
      } else if (state === "failed") {
        console.error("❌ Connection failed with", conn.peer);
        connectionsRef.current.delete(conn.peer);
        roomPeersRef.current.delete(conn.peer);
        setRemotePlayers((prev) => {
          const next = new Map(prev);
          next.delete(conn.peer);
          return next;
        });
      }
    });
  };

  // Connect to another peer
  const connectToPeer = (peerId) => {
    if (!peerRef.current) {
      console.error("❌ Peer not initialized");
      return;
    }

    if (peerId === myPeerId) {
      console.log("⚠️ Cannot connect to yourself");
      return;
    }

    if (connectionsRef.current.has(peerId)) {
      console.log("⚠️ Already connected to", peerId);
      return;
    }

    console.log("🔌 Connecting to peer:", peerId);
    const conn = peerRef.current.connect(peerId, {
      reliable: true,
      serialization: "json",
    });

    setupConnection(conn);
  };

  // Broadcast position to all connected peers
  const broadcastPosition = (position, rotation) => {
    const data = {
      type: "position",
      position,
      rotation,
      timestamp: Date.now(),
    };

    connectionsRef.current.forEach((conn, peerId) => {
      if (conn.open) {
        conn.send(data);
      }
    });
  };

  // Join a room using a room ID as the first peer's ID
  const joinRoom = (roomId) => {
    if (!myPeerId) {
      console.error("Not connected yet");
      return;
    }

    console.log("Joining room:", roomId);
    setCurrentRoom(roomId);
    roomPeersRef.current.add(roomId);

    // Try to connect to the room host (using room ID as peer ID)
    if (roomId !== myPeerId) {
      console.log("🔌 Connecting to room host:", roomId);
      // Connect to room host with reliable connection
      const hostConn = peerRef.current.connect(roomId, {
        reliable: true,
        serialization: "json",
      });

      // Set up connection handlers FIRST
      setupConnection(hostConn);

      // Then send join message when open
      hostConn.on("open", () => {
        console.log("✅ Connected to room host, requesting peer list");
        // Request the list of all peers in the room
        hostConn.send({
          type: "join-room",
          peerId: myPeerId,
        });
      });

      // Handle connection errors
      hostConn.on("error", (err) => {
        console.error("❌ Failed to connect to room host:", err);
        setCurrentRoom(null);
        roomPeersRef.current.delete(roomId);
      });
    } else {
      // We are the room host
      console.log("🏠 You are the room host. Share this room ID:", roomId);
    }
  };

  // Leave current room
  const leaveRoom = () => {
    console.log("Leaving room:", currentRoom);
    // Close all connections
    connectionsRef.current.forEach((conn) => conn.close());
    connectionsRef.current.clear();
    roomPeersRef.current.clear();
    setRemotePlayers(new Map());
    setCurrentRoom(null);
  };

  // Broadcast message to all peers in room
  const broadcastToRoom = (data) => {
    connectionsRef.current.forEach((conn) => {
      if (conn.open) {
        conn.send(data);
      }
    });
  };

  // Create a new room (use your peer ID as room ID)
  const createRoom = () => {
    if (!myPeerId) {
      console.error("Not connected yet");
      return null;
    }

    const roomId = myPeerId;
    setCurrentRoom(roomId);
    console.log("Created room with ID:", roomId);
    return roomId;
  };

  return {
    myPeerId,
    isConnected,
    remotePlayers,
    currentRoom,
    connectToPeer,
    broadcastPosition,
    joinRoom,
    leaveRoom,
    createRoom,
  };
}
