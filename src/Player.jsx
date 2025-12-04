import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'

export default function Player({ pois, onPOITrigger }) {
  const meshRef = useRef()
  const { camera } = useThree()

  // Physics state
  const [position, setPosition] = useState([0, 0.75, 0])
  const [rotation, setRotation] = useState(0)
  const velocity = useRef(new THREE.Vector3(0, 0, 0))

  // Track which POIs have been visited to prevent spam
  const visitedPOIs = useRef(new Set())
  const gamePaused = useRef(false)

  // Get keyboard state
  const [, getKeys] = useKeyboardControls()

  // Reset visited POI when modal closes
  useEffect(() => {
    const checkGameState = setInterval(() => {
      // If game was paused but no longer has an active modal, unpause
      if (gamePaused.current) {
        gamePaused.current = false
      }
    }, 100)

    return () => clearInterval(checkGameState)
  }, [])

  // Physics and movement
  useFrame((state, delta) => {
    if (!meshRef.current || gamePaused.current) return

    const keys = getKeys()

    // Movement parameters
    const acceleration = 15
    const turnSpeed = 2.5
    const friction = 0.92
    const maxSpeed = 8

    // Steering
    if (keys.left) {
      setRotation(r => r + turnSpeed * delta)
    }
    if (keys.right) {
      setRotation(r => r - turnSpeed * delta)
    }

    // Calculate forward direction based on rotation
    const forwardDir = new THREE.Vector3(
      Math.sin(rotation),
      0,
      Math.cos(rotation)
    )

    // Acceleration
    if (keys.forward) {
      velocity.current.add(
        forwardDir.clone().multiplyScalar(acceleration * delta)
      )
    }
    if (keys.backward) {
      velocity.current.add(
        forwardDir.clone().multiplyScalar(-acceleration * delta * 0.5)
      )
    }

    // Apply friction
    velocity.current.multiplyScalar(friction)

    // Clamp max speed
    if (velocity.current.length() > maxSpeed) {
      velocity.current.setLength(maxSpeed)
    }

    // Update position
    const newPos = [
      position[0] + velocity.current.x * delta,
      0.75,
      position[2] + velocity.current.z * delta
    ]

    // Simple boundary check (keep player in map)
    if (Math.abs(newPos[0]) < 45 && Math.abs(newPos[2]) < 45) {
      setPosition(newPos)
    } else {
      // Bounce back if hitting boundary
      velocity.current.multiplyScalar(-0.5)
    }

    // Update mesh transform
    meshRef.current.position.set(newPos[0], newPos[1], newPos[2])
    meshRef.current.rotation.y = rotation

    // Smooth camera follow (isometric view)
    const cameraOffset = new THREE.Vector3(0, 20, 20)
    const targetCameraPos = new THREE.Vector3(
      newPos[0] + cameraOffset.x,
      newPos[1] + cameraOffset.y,
      newPos[2] + cameraOffset.z
    )

    camera.position.lerp(targetCameraPos, 0.05)
    camera.lookAt(newPos[0], newPos[1], newPos[2])

    // Check distance to POIs
    pois.forEach(poi => {
      const distance = Math.sqrt(
        Math.pow(newPos[0] - poi.position[0], 2) +
        Math.pow(newPos[2] - poi.position[2], 2)
      )

      // Trigger POI if close enough and not recently visited
      if (distance < 3 && !visitedPOIs.current.has(poi.id)) {
        visitedPOIs.current.add(poi.id)
        gamePaused.current = true
        onPOITrigger(poi)

        // Allow revisiting after 3 seconds
        setTimeout(() => {
          visitedPOIs.current.delete(poi.id)
        }, 3000)
      }
    })
  })

  return (
    <group>
      {/* The Repair Truck */}
      <mesh ref={meshRef} castShadow>
        {/* Main body */}
        <boxGeometry args={[1.5, 1, 2.5]} />
        <meshStandardMaterial color="#ff6b35" />
      </mesh>

      {/* Cabin (front) */}
      <mesh
        position={[position[0], position[1] + 0.6, position[2] - 0.5]}
        rotation={[0, rotation, 0]}
        castShadow
      >
        <boxGeometry args={[1.4, 0.8, 1]} />
        <meshStandardMaterial color="#ffa500" />
      </mesh>

      {/* Repair symbol on top */}
      <mesh
        position={[position[0], position[1] + 0.8, position[2] + 0.3]}
        rotation={[0, rotation, 0]}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}
