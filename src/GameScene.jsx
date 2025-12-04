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

// Simple building component
function Building({ position, width = 4, height = 6, depth = 4, color = "#888888" }) {
  return (
    <mesh position={[position[0], height / 2, position[2]]} castShadow receiveShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Road segment component
function Road({ position, rotation = 0, width = 8, length = 30 }) {
  return (
    <mesh
      position={position}
      rotation={[0, rotation, 0]}
      receiveShadow
    >
      <boxGeometry args={[width, 0.1, length]} />
      <meshStandardMaterial color="#444444" />
    </mesh>
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

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#5a8f3a" />
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

      {/* POI Markers */}
      {POIS.map(poi => (
        <POIMarker key={poi.id} data={poi} />
      ))}

      {/* Player with physics and camera */}
      <Player pois={POIS} onPOITrigger={onPOITrigger} />
    </>
  )
}
