import { useRef } from 'react'
import Player from './Player'

// POI data with positions and content
export const POIS = [
  {
    id: 'waste',
    position: [20, 0.5, 20],
    color: '#ef4444',
    title: 'Stop Waste',
    icon: '♻️',
    content: {
      heading: 'Stop Waste: Choose Reconditioned Computers',
      points: [
        'Buying new electronics creates massive e-waste and carbon emissions',
        'Reconditioned computers work just as well for 50-70% less money',
        'One refurbished laptop saves 190kg of CO2 emissions',
        'Extend device lifespans through repair instead of replacement',
        'Support the circular economy and reduce environmental impact'
      ]
    }
  },
  {
    id: 'opensource',
    position: [-20, 0.5, -15],
    color: '#3b82f6',
    title: 'Go Open Source',
    icon: '🐧',
    content: {
      heading: 'Go Open Source: Free Your Computer',
      points: [
        'Replace Windows with Linux - it\'s free, fast, and respects your freedom',
        'Open source means transparent code anyone can inspect and improve',
        'No forced updates, no telemetry, no vendor lock-in',
        'Revive old computers with lightweight Linux distributions',
        'Join a global community building software for users, not profits'
      ]
    }
  },
  {
    id: 'privacy',
    position: [15, 0.5, -20],
    color: '#facc15',
    title: 'Data Privacy',
    icon: '🔒',
    content: {
      heading: 'Data Privacy: Take Back Control',
      points: [
        'Big Tech tracks everything you do to sell targeted ads',
        'Your personal data is sold without your meaningful consent',
        'Use privacy-respecting tools: Firefox, DuckDuckGo, Signal',
        'Encrypt your communications and storage',
        'Privacy is a fundamental right, not a luxury'
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
          emissiveIntensity={0.8}
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
