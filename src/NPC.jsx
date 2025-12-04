import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Soul particle component
function SoulParticle({ startPos }) {
  const particleRef = useRef();
  // small horizontal drift
  const drift = useRef(new THREE.Vector3((Math.random() - 0.5) * 0.2, 0, (Math.random() - 0.5) * 0.2));
  const birth = useRef(null);
  const duration = 3; // seconds
  const upwardSpeed = 0.6; // units per second (slow ascent)

  // set initial position once
  useEffect(() => {
    if (particleRef.current && Array.isArray(startPos)) {
      particleRef.current.position.set(startPos[0], startPos[1], startPos[2]);
    }
  }, [startPos]);

  useFrame((state) => {
    if (!particleRef.current) return;

    if (birth.current === null) birth.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - birth.current;

    if (elapsed >= duration) {
      // let parent (NPC) clear the soul entries — just stop updating
      return;
    }

    const delta = state.clock.getDelta();

    // Move slowly upward and apply slight drift
    particleRef.current.position.x += drift.current.x * delta;
    particleRef.current.position.y += upwardSpeed * delta;
    particleRef.current.position.z += drift.current.z * delta;

    // Fade out over duration
    const progress = Math.min(1, Math.max(0, elapsed / duration));
    if (particleRef.current.material) {
      particleRef.current.material.opacity = 1 - progress;
    }

    // Scale down slightly
    const scale = 1 - progress * 0.5;
    particleRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={particleRef}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshStandardMaterial 
        color="#ffffff"
        emissive="#ccccff"
        emissiveIntensity={0.8}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

export default function NPC({ 
  id, 
  obstacles,
  onGetNPCData // Callback to expose NPC position and collision radius
}) {
  const meshRef = useRef();
  const position = useRef([
    (Math.random() - 0.5) * 60,
    0.5,
    (Math.random() - 0.5) * 60
  ]);
  const [rotation, setRotation] = useState(Math.random() * Math.PI * 2);
  
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const targetDirection = useRef(new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize());
  const directionChangeTimer = useRef(Math.random() * 3);
  const movementSpeed = useRef(3 + Math.random() * 2); // Random speed between 3-5
  const isWalking = useRef(true);

  // Death and soul state
  const [isDead, setIsDead] = useState(false);
  const souls = useRef([]);
  const deathTime = useRef(0);

  // Animation state
  const legRotationLeft = useRef(0);
  const legRotationRight = useRef(0);
  const armRotationLeft = useRef(0);
  const armRotationRight = useRef(0);

  useEffect(() => {
    // Expose NPC data to parent for collision detection
    if (onGetNPCData) {
      onGetNPCData(id, {
        position: position.current,
        radius: 0.8,
        isDead: !!isDead,
      });
    }
  }, [position.current, id, onGetNPCData, isDead]);

  // Listen for collision events from Player to trigger death
  useEffect(() => {
    if (isDead) return;

    const handleDeath = () => {
      setIsDead(true);
      deathTime.current = Date.now();

      // spawn a few soul particles
      const count = 3;
      const newSouls = Array.from({ length: count }).map((_, i) => ({ id: `${id}-soul-${i}` }));
      souls.current = newSouls;

      // clear souls after duration
      setTimeout(() => {
        souls.current = [];
      }, 3000);
    };

    window.addEventListener(`npc-collision-${id}`, handleDeath);
    return () => window.removeEventListener(`npc-collision-${id}`, handleDeath);
  }, [id, isDead]);

  useFrame((state, delta) => {
    if (!meshRef.current || isDead) return;

    // Update direction change timer
    directionChangeTimer.current -= delta;
    
    // Change direction randomly when timer expired
    if (directionChangeTimer.current <= 0) {
      directionChangeTimer.current = 2 + Math.random() * 3;
      targetDirection.current = new THREE.Vector3(
        Math.random() - 0.5,
        0,
        Math.random() - 0.5
      ).normalize();
      isWalking.current = Math.random() > 0.2; // 80% chance to walk
    }

    // Movement
    if (isWalking.current) {
      const moveDir = targetDirection.current.clone().multiplyScalar(movementSpeed.current * delta);
      const newPos = [
        position.current[0] + moveDir.x,
        position.current[1],
        position.current[2] + moveDir.z
      ];

      // Check collision with obstacles
      const npcRadius = 0.8;
      let colliding = false;

      // Check against each obstacle
      for (const obstacle of obstacles) {
        const obstacleLeft = obstacle.x - obstacle.width / 2;
        const obstacleRight = obstacle.x + obstacle.width / 2;
        const obstacleTop = obstacle.z - obstacle.depth / 2;
        const obstacleBottom = obstacle.z + obstacle.depth / 2;

        if (
          newPos[0] + npcRadius > obstacleLeft &&
          newPos[0] - npcRadius < obstacleRight &&
          newPos[2] + npcRadius > obstacleTop &&
          newPos[2] - npcRadius < obstacleBottom
        ) {
          colliding = true;
          break;
        }
      }

      // Check map boundaries
      if (Math.abs(newPos[0]) > 45 || Math.abs(newPos[2]) > 45) {
        colliding = true;
      }

      // Update position if no collision
      if (!colliding) {
        position.current = newPos;
        
        // Update rotation to face movement direction
        const targetRotation = Math.atan2(targetDirection.current.x, targetDirection.current.z);
        setRotation(targetRotation);

        // Animate legs and arms while walking
        const walkCycle = (state.clock.elapsedTime * movementSpeed.current * 3) % Math.PI;
        legRotationLeft.current = Math.sin(walkCycle) * 0.3;
        legRotationRight.current = Math.sin(walkCycle + Math.PI) * 0.3;
        armRotationLeft.current = Math.sin(walkCycle + Math.PI) * 0.2;
        armRotationRight.current = Math.sin(walkCycle) * 0.2;
      } else {
        // Choose new direction on collision
        directionChangeTimer.current = 0;
      }
    } else {
      // Idle animation (slow breathing/swaying)
      const idleTime = state.clock.elapsedTime;
      const armIdle = Math.sin(idleTime) * 0.1;
      armRotationLeft.current = armIdle;
      armRotationRight.current = -armIdle;
      legRotationLeft.current = 0;
      legRotationRight.current = 0;
    }

    // Update mesh
    meshRef.current.position.set(position.current[0], position.current[1], position.current[2]);
    meshRef.current.rotation.y = rotation;
  });

  return (
    <>
      {/* Souls that ascend when dead */}
      {isDead && souls.current.map((s) => (
        <SoulParticle key={s.id} startPos={[position.current[0], position.current[1] + 1.2, position.current[2]]} />
      ))}

      {/* NPC body (hidden when dead) */}
      {!isDead && (
        <group ref={meshRef}>
          {/* Body */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[0.4, 0.8, 0.3]} />
            <meshStandardMaterial color="#e74c3c" />
          </mesh>

          {/* Head */}
          <mesh position={[0, 1.1, 0]} castShadow>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#f4a460" />
          </mesh>

          {/* Eyes */}
          <mesh position={[-0.1, 1.15, 0.23]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[0.1, 1.15, 0.23]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#000000" />
          </mesh>

          {/* Left Arm */}
          <mesh 
            position={[-0.25, 0.7, 0]} 
            rotation={[armRotationLeft.current, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.1, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#f4a460" />
          </mesh>

          {/* Right Arm */}
          <mesh 
            position={[0.25, 0.7, 0]} 
            rotation={[armRotationRight.current, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.1, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#f4a460" />
          </mesh>

          {/* Left Leg */}
          <mesh 
            position={[-0.15, 0.1, 0]} 
            rotation={[legRotationLeft.current, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>

          {/* Right Leg */}
          <mesh 
            position={[0.15, 0.1, 0]} 
            rotation={[legRotationRight.current, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
        </group>
      )}
    </>
  );
}
