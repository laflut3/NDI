import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ArrowIndicator - A 3D arrow that hovers above and points down to a target POI
 * Animates with bobbing motion to attract attention
 */
export default function ArrowIndicator({ targetPosition }) {
  const arrowRef = useRef()
  const glowRef = useRef()

  useEffect(() => {
    console.log('🎯 ArrowIndicator mounted at position:', targetPosition)
  }, [targetPosition])

  useFrame((state) => {
    if (!arrowRef.current) return

    // Set base position
    arrowRef.current.position.x = targetPosition[0]
    arrowRef.current.position.z = targetPosition[2]

    // Bobbing animation - move up and down
    const time = state.clock.elapsedTime
    const bobHeight = Math.sin(time * 2) * 0.5 // Bobs up/down by 0.5 units
    arrowRef.current.position.y = targetPosition[1] + 5 + bobHeight // Higher position

    // Gentle rotation for visibility
    arrowRef.current.rotation.y = time * 0.8

    // Pulsing glow
    if (glowRef.current) {
      const pulse = (Math.sin(time * 3) + 1) / 2 // 0 to 1
      glowRef.current.material.emissiveIntensity = 2 + pulse * 1.5
    }
  })

  return (
    <group ref={arrowRef}>
      {/* Main arrow shaft - BIGGER */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 2, 12]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={2}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Arrow head (cone pointing down) - BIGGER */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.6, 1.2, 12]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={2.5}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Arrow fins (for better visibility) - BIGGER */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Glowing halo at the base - BIGGER */}
      <mesh ref={glowRef} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light for glow effect - BRIGHTER */}
      <pointLight
        position={[0, 0, 0]}
        color="#fbbf24"
        intensity={5}
        distance={20}
        castShadow={false}
      />
    </group>
  )
}
