import { useRef, useEffect, useState } from "react";
import { Matrix4 } from "three";
import Player from "./Player";
import NPC from "./NPC";
import { QUIZ_DATA } from "./quizData";

// POI data with positions and content
export const POIS = [
  // Quiz POIs (White circles) - 4 of them
  {
    id: "quiz1",
    type: "quiz",
    position: [20, 0.5, 20],
    color: "#ffffff",
    title: "Quiz Station 1",
    icon: "💾",
    quizData: QUIZ_DATA.quiz1,
    content: {
      heading: QUIZ_DATA.quiz1.title,
      description: QUIZ_DATA.quiz1.subtitle,
    },
  },
  {
    id: "quiz2",
    type: "quiz",
    position: [-20, 0.5, 20],
    color: "#ffffff",
    title: "Quiz Station 2",
    icon: "🚦",
    quizData: QUIZ_DATA.quiz2,
    content: {
      heading: QUIZ_DATA.quiz2.title,
      description: QUIZ_DATA.quiz2.subtitle,
    },
  },
  {
    id: "quiz3",
    type: "quiz",
    position: [20, 0.5, -20],
    color: "#ffffff",
    title: "Quiz Station 3",
    icon: "🎁",
    quizData: QUIZ_DATA.quiz3,
    content: {
      heading: QUIZ_DATA.quiz3.title,
      description: QUIZ_DATA.quiz3.subtitle,
    },
  },
  {
    id: "quiz4",
    type: "quiz",
    position: [-20, 0.5, -20],
    color: "#ffffff",
    title: "Quiz Station 4",
    icon: "🗺️",
    quizData: QUIZ_DATA.quiz4,
    content: {
      heading: QUIZ_DATA.quiz4.title,
      description: QUIZ_DATA.quiz4.subtitle,
    },
  },

  // Chatbot POI (Yellow with stick man) - 1 of them
  {
    id: "chatbot",
    type: "chatbot",
    position: [-35, 0.5, 5],
    color: "#fbbf24",
    title: "Digital Assistant",
    icon: "🤖",
    hasStickMan: true,
    content: {
      heading: "Chat with Our Digital Guide",
      description:
        "Ask me anything about digital independence, open source, or tech sustainability!",
      message:
        "Chatbot integration coming soon. I will help answer all your questions about technology, privacy, and sustainability.",
    },
  },

  // Fun Fact POI - 1 of them
  {
    id: "funfact",
    type: "funfact",
    position: [0, 0.5, -30],
    color: "#a855f7",
    title: "Amazing Tech Fact",
    icon: "💡",
    content: {
      heading: "Did You Know?",
      facts: [
        "🌍 E-waste is the fastest-growing waste stream globally, with 50 million tons generated annually",
        "💾 The first computer bug was an actual moth trapped in a Harvard computer in 1947",
        "🔋 Smartphones have more computing power than the computers used for the Apollo 11 moon landing",
        "♻️ Recycling 1 million laptops saves the energy equivalent to powering 3,500 homes for a year",
        "🐧 Linux powers 96.3% of the world's top 1 million web servers",
        "🔐 The average person has over 100 online accounts but uses only 7 different passwords",
      ],
    },
  },
];

// Tree positions array
const TREE_POSITIONS = [
  // Scattered trees around
  [8, 0, 12],
  [-12, 0, 10],
  [18, 0, -8],
  [-8, 0, -12],
  [30, 0, 15],
  [-30, 0, -20],
  [25, 0, -25],
  [-18, 0, 18],
  [12, 0, -30],
  [-25, 0, 15],
  [32, 0, -10],
  [-32, 0, 8],
  // Dense forest - sparse edge
  [18.2, 0, 20.5],
  [21.4, 0, 19.8],
  [16.7, 0, 24.3],
  [19.5, 0, 22.1],
  [20.8, 0, 18.6],
  [24.3, 0, 19.4],
  [26.8, 0, 20.7],
  [29.6, 0, 19.2],
  [32.4, 0, 20.5],
  [35.1, 0, 19.8],
  [37.9, 0, 21.3],
  [40.7, 0, 20.1],
  [43.2, 0, 19.6],
  [45.8, 0, 21.4],
  [15.9, 0, 27.8],
  [17.3, 0, 31.2],
  [19.8, 0, 28.9],
  [21.6, 0, 25.4],
  [18.5, 0, 35.7],
  [20.3, 0, 33.4],
  [16.8, 0, 38.9],
  [19.1, 0, 41.3],
  [21.2, 0, 39.7],
  [17.9, 0, 44.6],
  [20.7, 0, 46.2],
  // Dense forest core
  [22.3, 0, 22.7],
  [24.8, 0, 23.4],
  [27.5, 0, 24.8],
  [29.3, 0, 23.9],
  [31.2, 0, 26.3],
  [33.7, 0, 24.5],
  [35.8, 0, 25.1],
  [37.6, 0, 23.8],
  [39.4, 0, 26.9],
  [41.9, 0, 25.3],
  [43.7, 0, 24.5],
  [45.8, 0, 26.2],
  [47.4, 0, 24.9],
  [23.6, 0, 26.8],
  [26.9, 0, 28.4],
  [28.5, 0, 27.2],
  [29.8, 0, 29.7],
  [32.1, 0, 28.5],
  [33.5, 0, 27.8],
  [35.9, 0, 29.1],
  [37.9, 0, 29.2],
  [39.7, 0, 27.8],
  [41.3, 0, 28.6],
  [43.8, 0, 29.4],
  [45.8, 0, 27.4],
  [47.9, 0, 28.7],
  [22.8, 0, 30.3],
  [25.4, 0, 31.7],
  [28.7, 0, 31.5],
  [30.6, 0, 30.4],
  [32.4, 0, 32.8],
  [34.8, 0, 31.6],
  [36.1, 0, 30.9],
  [38.4, 0, 32.7],
  [40.6, 0, 32.3],
  [42.3, 0, 30.8],
  [44.2, 0, 31.7],
  [46.7, 0, 32.9],
  [48.3, 0, 31.4],
  [23.9, 0, 34.2],
  [25.8, 0, 33.6],
  [27.6, 0, 35.8],
  [30.3, 0, 35.1],
  [32.9, 0, 34.3],
  [34.7, 0, 33.9],
  [36.4, 0, 35.7],
  [38.2, 0, 35.4],
  [40.7, 0, 34.1],
  [42.8, 0, 34.2],
  [44.5, 0, 35.9],
  [46.3, 0, 35.8],
  [48.7, 0, 34.8],
  [22.4, 0, 36.9],
  [24.9, 0, 38.3],
  [27.4, 0, 37.2],
  [29.8, 0, 39.1],
  [31.8, 0, 38.6],
  [33.5, 0, 37.4],
  [35.6, 0, 36.8],
  [37.9, 0, 39.3],
  [39.8, 0, 38.1],
  [41.6, 0, 37.8],
  [43.5, 0, 37.4],
  [45.9, 0, 38.7],
  [47.8, 0, 39.2],
  [23.7, 0, 40.6],
  [26.2, 0, 39.8],
  [28.3, 0, 41.9],
  [29.6, 0, 41.3],
  [31.9, 0, 42.8],
  [33.9, 0, 40.5],
  [35.7, 0, 41.7],
  [37.4, 0, 41.9],
  [39.8, 0, 40.4],
  [41.7, 0, 39.7],
  [43.4, 0, 42.3],
  [45.4, 0, 41.2],
  [47.6, 0, 42.7],
  [22.9, 0, 43.8],
  [25.6, 0, 44.9],
  [28.3, 0, 43.4],
  [30.4, 0, 45.6],
  [32.7, 0, 44.8],
  [34.9, 0, 43.7],
  [36.4, 0, 42.9],
  [38.7, 0, 45.1],
  [40.1, 0, 44.2],
  [42.6, 0, 43.9],
  [44.8, 0, 43.6],
  [46.8, 0, 45.4],
  [48.9, 0, 44.3],
  [23.8, 0, 47.2],
  [26.5, 0, 45.7],
  [28.9, 0, 48.1],
  [30.8, 0, 47.2],
  [32.6, 0, 46.8],
  [34.2, 0, 46.3],
  [36.8, 0, 48.4],
  [38.6, 0, 47.8],
  [40.9, 0, 46.7],
  [42.4, 0, 45.9],
  [44.7, 0, 48.2],
  [46.7, 0, 47.1],
  [48.4, 0, 48.6],
];

// Instanced tree component for better performance
function InstancedTrees() {
  const trunkRef = useRef();
  const foliageRef = useRef();

  useEffect(() => {
    if (!trunkRef.current || !foliageRef.current) return;

    const trunkMatrix = new Matrix4();
    const foliageMatrix = new Matrix4();

    TREE_POSITIONS.forEach((pos, i) => {
      // Trunk position
      trunkMatrix.setPosition(pos[0], pos[1] + 0.5, pos[2]);
      trunkRef.current.setMatrixAt(i, trunkMatrix);

      // Foliage position
      foliageMatrix.setPosition(pos[0], pos[1] + 1.5, pos[2]);
      foliageRef.current.setMatrixAt(i, foliageMatrix);
    });

    trunkRef.current.instanceMatrix.needsUpdate = true;
    foliageRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <>
      {/* Instanced trunks */}
      <instancedMesh
        ref={trunkRef}
        args={[null, null, TREE_POSITIONS.length]}
        castShadow
      >
        <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </instancedMesh>

      {/* Instanced foliage */}
      <instancedMesh
        ref={foliageRef}
        args={[null, null, TREE_POSITIONS.length]}
        castShadow
      >
        <coneGeometry args={[1.2, 2, 8]} />
        <meshStandardMaterial color="#228b22" />
      </instancedMesh>
    </>
  );
}

// Enhanced building component with windows
function Building({
  position,
  rotation = 0,
  width = 4,
  height = 6,
  depth = 4,
  color = "#888888",
}) {
  return (
    <group
      position={[position[0], height / 2, position[2]]}
      rotation={[0, rotation, 0]}
    >
      {/* Main building */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Windows */}
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={i}>
          {/* Front windows */}
          <mesh
            position={[0, -height / 4 + i * (height / 4), depth / 2 + 0.02]}
          >
            <boxGeometry args={[width * 0.3, height * 0.15, 0.05]} />
            <meshStandardMaterial
              color="#87ceeb"
              emissive="#ffd700"
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Back windows */}
          <mesh
            position={[0, -height / 4 + i * (height / 4), -depth / 2 - 0.02]}
          >
            <boxGeometry args={[width * 0.3, height * 0.15, 0.05]} />
            <meshStandardMaterial
              color="#87ceeb"
              emissive="#ffd700"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Roof */}
      <mesh position={[0, height / 2 + 0.3, 0]} castShadow>
        <boxGeometry args={[width + 0.5, 0.6, depth + 0.5]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  );
}

// Lamp post component
function LampPost({ position }) {
  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} />
      </mesh>
      {/* Light */}
      <mesh position={[0, 4.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={0.8}
        />
      </mesh>
      <pointLight
        position={[0, 4, 0]}
        color="#ffd700"
        intensity={0.5}
        distance={10}
      />
    </group>
  );
}

// Bench component
function Bench({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.7, -0.2]} castShadow>
        <boxGeometry args={[1.5, 0.6, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.6, 0.2, 0]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.6, 0.2, 0]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
}

// Directional sign component
function DirectionalSign({ position, text, pointsTo }) {
  return (
    <group position={position}>
      {/* Post */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2, 8]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      {/* Sign board */}
      <mesh position={[0, 2.2, 0]} rotation={[0, pointsTo, 0]} castShadow>
        <boxGeometry args={[1.2, 0.4, 0.1]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      {/* Arrow indicator */}
      <mesh position={[0.5, 2.2, 0.06]} rotation={[0, pointsTo, 0]}>
        <coneGeometry args={[0.15, 0.3, 3]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
    </group>
  );
}

// Fountain/central plaza
function CentralFountain({ position }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2.5, 0.2, 32]} />
        <meshStandardMaterial color="#95a5a6" />
      </mesh>
      {/* Water basin */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.3, 32]} />
        <meshStandardMaterial
          color="#3498db"
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
      {/* Center pillar */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 1.5, 16]} />
        <meshStandardMaterial color="#ecf0f1" />
      </mesh>
      {/* Water spray effect */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[0.3, 0.8, 8]} />
        <meshStandardMaterial color="#3498db" transparent opacity={0.4} />
      </mesh>
      <pointLight
        position={[0, 1.5, 0]}
        color="#3498db"
        intensity={0.5}
        distance={8}
      />
    </group>
  );
}

// Road segment component with lane markings
function Road({ position, rotation = 0, width = 8, length = 30 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Main road */}
      <mesh receiveShadow>
        <boxGeometry args={[width, 0.1, length]} />
        <meshStandardMaterial color="#444444" roughness={0.9} />
      </mesh>

      {/* Yellow center line dashes */}
      {Array.from({ length: Math.floor(length / 4) }).map((_, i) => (
        <mesh key={i} position={[0, 0.11, -length / 2 + i * 4 + 2]}>
          <boxGeometry args={[0.2, 0.02, 2]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* White edge lines */}
      <mesh position={[width / 2 - 0.3, 0.11, 0]}>
        <boxGeometry args={[0.15, 0.02, length]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-width / 2 + 0.3, 0.11, 0]}>
        <boxGeometry args={[0.15, 0.02, length]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Stick man figure for chatbot POI
function StickMan({ color }) {
  return (
    <group position={[0, 1.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.4, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.4, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.2, -0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.9, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.2, -0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.9, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// Old Computer/Monitor for e-waste theme
function OldComputer({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Monitor */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.8, 0.6, 0.1]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.6, 0.06]}>
        <boxGeometry args={[0.7, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#004400"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
    </group>
  );
}

// Recycling Bin for sustainability theme
function RecyclingBin({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.35, 0.8, 8]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      {/* Recycling symbol */}
      <mesh position={[0, 0.5, 0.36]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Server Rack for tech infrastructure theme
function ServerRack({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.6, 1.6, 0.4]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.7} />
      </mesh>
      {/* Server LEDs */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0.25, 0.3 + i * 0.35, 0.21]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Information Kiosk for chatbot area
function InfoKiosk({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Post */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2, 8]} />
        <meshStandardMaterial color="#3498db" metalness={0.6} />
      </mesh>
      {/* Info Screen */}
      <mesh position={[0, 1.5, 0.1]} castShadow>
        <boxGeometry args={[0.8, 0.6, 0.1]} />
        <meshStandardMaterial color="#2980b9" />
      </mesh>
      {/* Screen Display */}
      <mesh position={[0, 1.5, 0.16]}>
        <boxGeometry args={[0.7, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#3498db"
          emissive="#3498db"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// Display Board for educational content
function DisplayBoard({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Frame */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[1.2, 0.9, 0.08]} />
        <meshStandardMaterial color="#8e44ad" />
      </mesh>
      {/* Display area */}
      <mesh position={[0, 1.2, 0.05]}>
        <boxGeometry args={[1.1, 0.8, 0.02]} />
        <meshStandardMaterial
          color="#9b59b6"
          emissive="#9b59b6"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Stand */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#7d3c98" />
      </mesh>
    </group>
  );
}

// E-waste Container
function EwasteContainer({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.8, 1, 0.6]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      {/* Warning label */}
      <mesh position={[0, 0.7, 0.31]}>
        <boxGeometry args={[0.6, 0.3, 0.02]} />
        <meshStandardMaterial color="#f39c12" />
      </mesh>
    </group>
  );
}

// POI marker with glowing effect
function POIMarker({ data }) {
  const meshRef = useRef();

  return (
    <group position={data.position}>
      {/* Glowing sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={data.type === "quiz" ? 0.5 : 0.8}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Add stick man if this is a chatbot POI */}
      {data.hasStickMan && <StickMan color="#1e293b" />}

      {/* Pulsing point light */}
      <pointLight color={data.color} intensity={2} distance={10} decay={2} />
    </group>
  );
}

// Define all collidable objects (buildings, trees)
const OBSTACLES = [
  // Buildings
  { x: -10, z: 0, width: 8, depth: 12 },
  { x: 10, z: 5, width: 10, depth: 8 },
  { x: 5, z: -10, width: 6, depth: 6 },
  { x: -15, z: -25, width: 12, depth: 10 },
  // Trees (approximate circular collision as squares)
  { x: 8, z: 12, width: 2.5, depth: 2.5 },
  { x: -12, z: 10, width: 2.5, depth: 2.5 },
  { x: 18, z: -8, width: 2.5, depth: 2.5 },
  { x: -8, z: -12, width: 2.5, depth: 2.5 },
  { x: 30, z: 15, width: 2.5, depth: 2.5 },
  { x: -30, z: -20, width: 2.5, depth: 2.5 },
  { x: 25, z: -25, width: 2.5, depth: 2.5 },
  { x: -18, z: 18, width: 2.5, depth: 2.5 },
  { x: 12, z: -30, width: 2.5, depth: 2.5 },
  { x: -25, z: 15, width: 2.5, depth: 2.5 },
  { x: 32, z: -10, width: 2.5, depth: 2.5 },
  { x: -32, z: 8, width: 2.5, depth: 2.5 },
];

export default function GameScene({ onPOITrigger }) {
  const [npcData, setNpcData] = useState(new Map());

  // Callback to collect NPC position and collision data from each NPC
  const handleGetNPCData = (npcId, data) => {
    setNpcData((prev) => {
      const updated = new Map(prev);
      updated.set(npcId, data);
      return updated;
    });
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[20, 30, 20]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Ground with grass pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[100, 100, 20, 20]} />
        <meshStandardMaterial color="#4a7c3a" roughness={0.95} />
      </mesh>

      {/* Decorative ground patterns */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#5a8f3a" transparent opacity={0.6} />
      </mesh>

      {/* Roads forming a loop */}
      {/* Horizontal roads */}
      <Road position={[0, 0.05, 20]} rotation={0} length={60} />
      <Road position={[0, 0.05, -20]} rotation={0} length={60} />
      {/* Vertical roads */}
      <Road position={[25, 0.05, 0]} rotation={Math.PI / 2} length={50} />
      <Road position={[-25, 0.05, 0]} rotation={Math.PI / 2} length={50} />

      {/* Buildings - School Campus */}
      {/* Top Left */}
      <Building
        position={[-15, 0, -30]}
        rotation={Math.PI / 6}
        width={12}
        height={7}
        depth={10}
        color="#b8860b"
      />
      {/* Bottom Left */}
      <Building
        position={[-30, 0, 30]}
        rotation={Math.PI / 8}
        width={8}
        height={8}
        depth={12}
        color="#b8860b"
      />
      {/* Top Right */}
      <Building
        position={[10, 0, -10]}
        rotation={-Math.PI / 5}
        width={6}
        height={10}
        depth={6}
        color="#daa520"
      />
      <Building
        position={[18, 0, 8]}
        width={10}
        height={6}
        depth={8}
        color="#cd853f"
      />

      {/* All trees rendered with instancing for better performance */}
      <InstancedTrees />

      {/* Central Fountain */}
      <CentralFountain position={[0, 0, 0]} />

      {/* Lamp Posts along roads */}
      <LampPost position={[8, 0, 20]} />
      <LampPost position={[-8, 0, 20]} />
      <LampPost position={[8, 0, -20]} />
      <LampPost position={[-8, 0, -20]} />
      <LampPost position={[25, 0, 10]} />
      <LampPost position={[25, 0, -10]} />
      <LampPost position={[-25, 0, 10]} />
      <LampPost position={[-25, 0, -10]} />

      {/* Benches arranged around the center fountain */}
      {/* Top Right */}
      <Bench position={[6, 0, -6]} rotation={-Math.PI / 4} />
      {/* Bottom Right */}
      <Bench position={[6, 0, 6]} rotation={(-3 * Math.PI) / 4} />
      {/* Top Left */}
      <Bench position={[-6, 0, -6]} rotation={Math.PI / 4} />
      {/* Bottom Left */}
      <Bench position={[-6, 0, 6]} rotation={(3 * Math.PI) / 4} />

      {/* Directional Signs pointing to POIs */}
      <DirectionalSign
        position={[10, 0, 10]}
        text="Quiz →"
        pointsTo={Math.PI / 4}
      />
      <DirectionalSign
        position={[-10, 0, -10]}
        text="Quiz →"
        pointsTo={-Math.PI / 4}
      />
      <DirectionalSign
        position={[-5, 0, 5]}
        text="Assistant →"
        pointsTo={Math.PI}
      />
      <DirectionalSign
        position={[5, 0, -15]}
        text="Fun Facts →"
        pointsTo={-Math.PI / 2}
      />

      {/* Thematic Decorative Objects around POIs */}

      {/* Around Quiz 1 (💾 Durability/E-waste theme) at [20, 0.5, 20] */}
      <OldComputer position={[22, 0, 18]} rotation={Math.PI / 4} />
      <RecyclingBin position={[18, 0, 22]} />
      <EwasteContainer position={[23, 0, 22]} />

      {/* Around Quiz 2 (🚦 3 Rules theme) at [-20, 0.5, 20] */}
      <OldComputer position={[-22, 0, 18]} rotation={-Math.PI / 4} />
      <RecyclingBin position={[-18, 0, 22]} />
      <ServerRack position={[-23, 0, 19]} />

      {/* Around Quiz 3 (🎁 Sharing tools theme) at [20, 0.5, -20] */}
      <OldComputer position={[22, 0, -18]} rotation={Math.PI / 3} />
      <EwasteContainer position={[18, 0, -22]} />
      <RecyclingBin position={[23, 0, -21]} />

      {/* Around Quiz 4 (🗺️ Documentation theme) at [-20, 0.5, -20] */}
      <OldComputer position={[-22, 0, -18]} rotation={-Math.PI / 3} />
      <DisplayBoard position={[-18, 0, -22]} rotation={Math.PI / 2} />
      <InfoKiosk position={[-23, 0, -21]} />

      {/* Around Chatbot (🤖 Digital Assistant) at [-35, 0.5, 5] */}
      <InfoKiosk position={[-33, 0, 7]} rotation={Math.PI / 6} />
      <DisplayBoard position={[-37, 0, 3]} rotation={-Math.PI / 4} />
      <ServerRack position={[-33, 0, 3]} />

      {/* Around Fun Fact (💡 Tech Facts) at [0, 0.5, -30] */}
      <ServerRack position={[2, 0, -28]} />
      <DisplayBoard position={[-2, 0, -32]} rotation={Math.PI / 2} />
      <InfoKiosk position={[2, 0, -32]} />

      {/* POI Markers */}
      {POIS.map((poi) => (
        <POIMarker key={poi.id} data={poi} />
      ))}

      {/* NPCs with random pathing */}
      {Array.from({ length: 4 }).map((_, i) => (
        <NPC
          key={`npc-${i}`}
          id={`npc-${i}`}
          obstacles={OBSTACLES}
          onGetNPCData={handleGetNPCData}
        />
      ))}

      {/* Player with physics and camera */}
      <Player
        pois={POIS}
        onPOITrigger={onPOITrigger}
        obstacles={OBSTACLES}
        npcData={npcData}
      />
    </>
  );
}
