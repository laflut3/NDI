import { useRef } from "react";

// Component to render remote players
export default function RemotePlayers({ remotePlayers }) {
  if (!remotePlayers || remotePlayers.size === 0) {
    return null;
  }

  return (
    <>
      {Array.from(remotePlayers.entries()).map(([peerId, playerData]) => (
        <RemotePlayer
          key={peerId}
          peerId={peerId}
          position={playerData.position}
          rotation={playerData.rotation}
        />
      ))}
    </>
  );
}

// Individual remote player - Ghost Car
function RemotePlayer({ peerId, position, rotation }) {
  const meshRef = useRef();

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* The Ghost Repair Truck */}
      <mesh ref={meshRef}>
        {/* Main body - elevated */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.5, 1, 2.5]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Cabin (front) - elevated */}
        <mesh position={[0, 0.8, 0.5]}>
          <boxGeometry args={[1.4, 0.8, 1]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Ghost Hammer Logo on top */}
        <group
          position={[0, 0.8, -0.6]}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
        >
          {/* Hammer Handle */}
          <mesh position={[0, 0, 0.15]}>
            <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.6}
              transparent
              opacity={0.5}
            />
          </mesh>
          {/* Hammer Head */}
          <mesh position={[0, 0.4, 0.15]}>
            <boxGeometry args={[0.5, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Wheels */}
        {/* Front Left Wheel */}
        <mesh position={[-0.9, -0.4, -0.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Front Right Wheel */}
        <mesh position={[0.9, -0.4, -0.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Rear Left Wheel */}
        <mesh position={[-0.9, -0.4, 0.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Rear Right Wheel */}
        <mesh position={[0.9, -0.4, 0.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
          />
        </mesh>
      </mesh>

      {/* Ghost glow effect */}
      <pointLight
        position={[0, 0.5, 0]}
        color="#00ffff"
        intensity={1}
        distance={5}
      />
    </group>
  );
}
