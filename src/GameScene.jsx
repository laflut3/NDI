import { useRef } from 'react'
import Player from './Player'

// POI data with positions and content
export const POIS = [
  // Quiz POIs (White circles) - 4 of them
  {
    id: 'quiz1',
    type: 'quiz',
    position: [20, 0.5, 20],
    color: '#ffffff',
    title: 'Quiz Station 1',
    icon: '📝',
    content: {
      heading: 'Quiz Challenge: Digital Independence',
      description: 'Test your knowledge about technology and sustainability!',
      message: 'Quiz functionality will be integrated soon. Get ready to answer questions about open source, e-waste, and digital rights!'
    }
  },
  {
    id: 'quiz2',
    type: 'quiz',
    position: [-20, 0.5, 20],
    color: '#ffffff',
    title: 'Quiz Station 2',
    icon: '📝',
    content: {
      heading: 'Quiz Challenge: Tech Literacy',
      description: 'How much do you know about your digital rights?',
      message: 'Quiz functionality will be integrated soon. Prepare to test your tech knowledge!'
    }
  },
  {
    id: 'quiz3',
    type: 'quiz',
    position: [20, 0.5, -20],
    color: '#ffffff',
    title: 'Quiz Station 3',
    icon: '📝',
    content: {
      heading: 'Quiz Challenge: Sustainability',
      description: 'Learn about the environmental impact of technology!',
      message: 'Quiz functionality will be integrated soon. Challenge yourself!'
    }
  },
  {
    id: 'quiz4',
    type: 'quiz',
    position: [-20, 0.5, -20],
    color: '#ffffff',
    title: 'Quiz Station 4',
    icon: '📝',
    content: {
      heading: 'Quiz Challenge: Privacy & Security',
      description: 'Protect yourself in the digital world!',
      message: 'Quiz functionality will be integrated soon. Stay tuned!'
    }
  },

  // Chatbot POI (Yellow with stick man) - 1 of them
  {
    id: 'chatbot',
    type: 'chatbot',
    position: [-35, 0.5, 5],
    color: '#fbbf24',
    title: 'Digital Assistant',
    icon: '🤖',
    hasStickMan: true,
    content: {
      heading: 'Chat with Our Digital Guide',
      description: 'Ask me anything about digital independence, open source, or tech sustainability!',
      message: 'Chatbot integration coming soon. I will help answer all your questions about technology, privacy, and sustainability.'
    }
  },

  // Fun Fact POI - 1 of them
  {
    id: 'funfact',
    type: 'funfact',
    position: [0, 0.5, -30],
    color: '#a855f7',
    title: 'Amazing Tech Fact',
    icon: '💡',
    content: {
      heading: 'Did You Know?',
      facts: [
        '🌍 E-waste is the fastest-growing waste stream globally, with 50 million tons generated annually',
        '💾 The first computer bug was an actual moth trapped in a Harvard computer in 1947',
        '🔋 Smartphones have more computing power than the computers used for the Apollo 11 moon landing',
        '♻️ Recycling 1 million laptops saves the energy equivalent to powering 3,500 homes for a year',
        '🐧 Linux powers 96.3% of the world\'s top 1 million web servers',
        '🔐 The average person has over 100 online accounts but uses only 7 different passwords'
      ]
    }
  }
]

// Simple tree component (cylinder trunk + cone top)
function Tree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[1.2, 2, 8]} />
        <meshStandardMaterial color="#228b22" />
      </mesh>
    </group>
  )
}

// Enhanced building component with windows
function Building({ position, width = 4, height = 6, depth = 4, color = "#888888" }) {
  return (
    <group position={[position[0], height / 2, position[2]]}>
      {/* Main building */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Windows */}
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={i}>
          {/* Front windows */}
          <mesh position={[0, -height / 4 + i * (height / 4), depth / 2 + 0.02]}>
            <boxGeometry args={[width * 0.3, height * 0.15, 0.05]} />
            <meshStandardMaterial color="#87ceeb" emissive="#ffd700" emissiveIntensity={0.3} />
          </mesh>
          {/* Back windows */}
          <mesh position={[0, -height / 4 + i * (height / 4), -depth / 2 - 0.02]}>
            <boxGeometry args={[width * 0.3, height * 0.15, 0.05]} />
            <meshStandardMaterial color="#87ceeb" emissive="#ffd700" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Roof */}
      <mesh position={[0, height / 2 + 0.3, 0]} castShadow>
        <boxGeometry args={[width + 0.5, 0.6, depth + 0.5]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  )
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
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[0, 4, 0]} color="#ffd700" intensity={0.5} distance={10} />
    </group>
  )
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
  )
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
  )
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
        <meshStandardMaterial color="#3498db" transparent opacity={0.7} roughness={0.1} metalness={0.5} />
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
      <pointLight position={[0, 1.5, 0]} color="#3498db" intensity={0.5} distance={8} />
    </group>
  )
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
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.3} />
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
  )
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
  )
}

// POI marker with glowing effect
function POIMarker({ data }) {
  const meshRef = useRef()

  return (
    <group position={data.position}>
      {/* Glowing sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={data.type === 'quiz' ? 0.5 : 0.8}
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
      <pointLight
        color={data.color}
        intensity={2}
        distance={10}
        decay={2}
      />
    </group>
  )
}

export default function GameScene({ onPOITrigger }) {
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
      <Building position={[-10, 0, 0]} width={8} height={8} depth={12} color="#b8860b" />
      <Building position={[10, 0, 5]} width={10} height={6} depth={8} color="#cd853f" />
      <Building position={[5, 0, -10]} width={6} height={10} depth={6} color="#daa520" />
      <Building position={[-15, 0, -25]} width={12} height={7} depth={10} color="#b8860b" />

      {/* Trees scattered around */}
      <Tree position={[8, 0, 12]} />
      <Tree position={[-12, 0, 10]} />
      <Tree position={[18, 0, -8]} />
      <Tree position={[-8, 0, -12]} />
      <Tree position={[30, 0, 15]} />
      <Tree position={[-30, 0, -20]} />
      <Tree position={[25, 0, -25]} />
      <Tree position={[-18, 0, 18]} />
      <Tree position={[12, 0, -30]} />
      <Tree position={[-25, 0, 15]} />
      <Tree position={[32, 0, -10]} />
      <Tree position={[-32, 0, 8]} />

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

      {/* Benches near trees and buildings */}
      <Bench position={[6, 0, 10]} rotation={Math.PI / 2} />
      <Bench position={[-10, 0, 8]} rotation={0} />
      <Bench position={[15, 0, -6]} rotation={-Math.PI / 4} />
      <Bench position={[-20, 0, -18]} rotation={Math.PI / 3} />
      <Bench position={[3, 0, -28]} rotation={0} />
      <Bench position={[-28, 0, 12]} rotation={Math.PI / 2} />

      {/* Directional Signs pointing to POIs */}
      <DirectionalSign position={[10, 0, 10]} text="Quiz →" pointsTo={Math.PI / 4} />
      <DirectionalSign position={[-10, 0, -10]} text="Quiz →" pointsTo={-Math.PI / 4} />
      <DirectionalSign position={[-5, 0, 5]} text="Assistant →" pointsTo={Math.PI} />
      <DirectionalSign position={[5, 0, -15]} text="Fun Facts →" pointsTo={-Math.PI / 2} />

      {/* POI Markers */}
      {POIS.map(poi => (
        <POIMarker key={poi.id} data={poi} />
      ))}

      {/* Player with physics and camera */}
      <Player pois={POIS} onPOITrigger={onPOITrigger} />
    </>
  )
}
