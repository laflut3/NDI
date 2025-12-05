import { useState, useEffect, useRef } from "react";
import Peer from "peerjs";

export function useMultiplayer() {
  const [myPeerId, setMyPeerId] = useState(null);
  const [remotePlayers, setRemotePlayers] = useState(new Map());
  const [isConnected, setIsConnected] = useState(false);

  const peerRef = useRef(null);
  const connectionsRef = useRef(new Map());

  useEffect(() => {
    // Initialize PeerJS with a random ID
    const peer = new Peer({
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      },
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

    // Cleanup on unmount
    return () => {
      connectionsRef.current.forEach((conn) => conn.close());
      peer.destroy();
    };
  }, []);

  // Setup connection event handlers
  const setupConnection = (conn) => {
    conn.on("open", () => {
      console.log("Connection opened with:", conn.peer);
      connectionsRef.current.set(conn.peer, conn);

      // Update remote players to add this peer
      setRemotePlayers((prev) => {
        const next = new Map(prev);
        next.set(conn.peer, { position: [0, 0, 0], rotation: 0 });
        return next;
      });
    });

    conn.on("data", (data) => {
      console.log("Received data from", conn.peer, ":", data);

      if (data.type === "position") {
        setRemotePlayers((prev) => {
          const next = new Map(prev);
          next.set(conn.peer, {
            position: data.position,
            rotation: data.rotation,
          });
          return next;
        });
      }
    });

    conn.on("close", () => {
      console.log("Connection closed with:", conn.peer);
      connectionsRef.current.delete(conn.peer);
      setRemotePlayers((prev) => {
        const next = new Map(prev);
        next.delete(conn.peer);
        return next;
      });
    });

    conn.on("error", (err) => {
      console.error("Connection error with", conn.peer, ":", err);
    });
  };

  // Connect to another peer
  const connectToPeer = (peerId) => {
    if (!peerRef.current) {
      console.error("Peer not initialized");
      return;
    }

    if (peerId === myPeerId) {
      console.log("Cannot connect to yourself");
      return;
    }

    if (connectionsRef.current.has(peerId)) {
      console.log("Already connected to", peerId);
      return;
    }

    console.log("Connecting to peer:", peerId);
    const conn = peerRef.current.connect(peerId);
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

  return {
    myPeerId,
    isConnected,
    remotePlayers,
    connectToPeer,
    broadcastPosition,
  };
}
