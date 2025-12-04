import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

export default function Player({ pois, onPOITrigger, obstacles = [], npcData = new Map() }) {
  const meshRef = useRef();
  const flamesRef = useRef();
  const { camera, scene } = useThree();

  // Physics state
  const [position, setPosition] = useState([0, 0.75, 5]);
  const [rotation, setRotation] = useState(0);
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const [isBoosting, setIsBoosting] = useState(false);
  const flameOpacity = useRef(0);

  // Raycaster for collision detection
  const raycaster = useRef(new THREE.Raycaster());
  const collisionObjects = useRef([]);

  // Trail state
  const [trailPoints, setTrailPoints] = useState([]);
  const maxTrailLength = 50;
  const trailTimer = useRef(0);

  // Track which POIs have been visited to prevent spam
  const visitedPOIs = useRef(new Set());
  const gamePaused = useRef(false);
  const playerNearPOI = useRef(new Map()); // Track if player is currently near each POI

  // Get keyboard state
  const [, getKeys] = useKeyboardControls();

  // Collect collidable objects from the scene
  useEffect(() => {
    if (!scene) return;

    const collectCollidableObjects = () => {
      const objects = [];
      scene.traverse((child) => {
        // Filter out ground, POI markers, trails, and the player itself
        if (
          child.isMesh &&
          child !== meshRef.current &&
          child.parent !== meshRef.current &&
          child.parent?.parent !== meshRef.current &&
          child.parent?.parent?.parent !== meshRef.current &&
          child.geometry
        ) {
          // Get world position to properly filter objects
          const worldPos = new THREE.Vector3();
          child.getWorldPosition(worldPos);

          // Exclude ground plane (world Y close to 0)
          if (Math.abs(worldPos.y) < 0.15) {
            return;
          }

          // Check if this is part of a POI marker (by checking parent chain)
          let isPOI = false;
          let parent = child.parent;
          while (parent && parent !== scene) {
            // POI markers are typically at y=0.5 and are spheres
            if (
              parent.position?.y === 0.5 &&
              child.geometry?.type === "SphereGeometry"
            ) {
              isPOI = true;
              break;
            }
            parent = parent.parent;
          }

          // Check if it's a fountain (at position 0,0,0)
          const parentPos = child.parent?.position;
          const isFountain =
            parentPos &&
            Math.abs(parentPos.x) < 0.1 &&
            Math.abs(parentPos.z) < 0.1;

          // Check if it's a trail marker (small circles on ground)
          const isTrail =
            child.geometry?.type === "CircleGeometry" && worldPos.y < 0.15;

          if (!isPOI && !isFountain && !isTrail) {
            objects.push(child);
          }
        }
      });
      collisionObjects.current = objects;
      console.log(`Collected ${objects.length} collidable objects`);
    };

    // Initial collection
    collectCollidableObjects();

    // Re-collect periodically to catch dynamically added objects
    const interval = setInterval(collectCollidableObjects, 2000);

    return () => clearInterval(interval);
  }, [scene]);

  // Reset visited POI when modal closes
  useEffect(() => {
    const checkGameState = setInterval(() => {
      // If game was paused but no longer has an active modal, unpause
      if (gamePaused.current) {
        gamePaused.current = false;
      }
    }, 100);

    return () => clearInterval(checkGameState);
  }, []);

  // Physics and movement
  useFrame((state, delta) => {
    if (!meshRef.current || gamePaused.current) return;

    const keys = getKeys();

    // Update boost state
    setIsBoosting(keys.boost);

    // Animate flame opacity
    const fadeSpeed = 10;
    if (keys.boost) {
      flameOpacity.current = Math.min(
        1,
        flameOpacity.current + fadeSpeed * delta
      );
    } else {
      flameOpacity.current = Math.max(
        0,
        flameOpacity.current - fadeSpeed * delta
      );
    }

    // Update flame materials if they exist
    if (flamesRef.current) {
      flamesRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.opacity =
            child.material.userData.baseOpacity * flameOpacity.current;
        }
      });
    }

    // Movement parameters
    const baseAcceleration = 25;
    const boostMultiplier = keys.boost ? 2.0 : 1.0;
    const acceleration = baseAcceleration * boostMultiplier;
    const turnSpeed = 3.5;
    const friction = 0.93;
    const maxSpeed = keys.boost ? 20 : 12;

    // Steering
    if (keys.left) {
      setRotation((r) => r + turnSpeed * delta);
    }
    if (keys.right) {
      setRotation((r) => r - turnSpeed * delta);
    }

    // Calculate forward direction based on rotation
    const forwardDir = new THREE.Vector3(
      Math.sin(rotation),
      0,
      Math.cos(rotation)
    );

    // Acceleration
    if (keys.forward) {
      velocity.current.add(
        forwardDir.clone().multiplyScalar(acceleration * delta)
      );
    }
    if (keys.backward) {
      velocity.current.add(
        forwardDir.clone().multiplyScalar(-acceleration * delta * 0.5)
      );
    }

    // Apply friction
    velocity.current.multiplyScalar(friction);

    // Clamp max speed
    if (velocity.current.length() > maxSpeed) {
      velocity.current.setLength(maxSpeed);
    }

    // Calculate potential new position
    const newPos = [
      position[0] + velocity.current.x * delta,
      0.75,
      position[2] + velocity.current.z * delta,
    ];

    // Raycast-based collision detection
    let colliding = false;
    const playerRadius = 1.5;

    if (
      collisionObjects.current.length > 0 &&
      velocity.current.length() > 0.01
    ) {
      // Cast rays in multiple directions around the player
      const rayDirections = [
        new THREE.Vector3(1, 0, 0), // Right
        new THREE.Vector3(-1, 0, 0), // Left
        new THREE.Vector3(0, 0, 1), // Forward
        new THREE.Vector3(0, 0, -1), // Backward
        new THREE.Vector3(0.707, 0, 0.707), // Diagonal FR
        new THREE.Vector3(-0.707, 0, 0.707), // Diagonal FL
        new THREE.Vector3(0.707, 0, -0.707), // Diagonal BR
        new THREE.Vector3(-0.707, 0, -0.707), // Diagonal BL
      ];

      const rayOrigin = new THREE.Vector3(newPos[0], newPos[1], newPos[2]);

      for (const direction of rayDirections) {
        raycaster.current.set(rayOrigin, direction);
        raycaster.current.far = playerRadius;

        const intersections = raycaster.current.intersectObjects(
          collisionObjects.current,
          false
        );

        if (
          intersections.length > 0 &&
          intersections[0].distance < playerRadius
        ) {
          colliding = true;
          break;
        }
      }
    }

    // Check collision with NPCs using circle collision
    if (!colliding && npcData.size > 0) {
      const playerCollisionRadius = playerRadius;
      for (const [npcId, npc] of npcData) {
        if (npc.isDead) continue; // Skip dead NPCs
        
        const distance = Math.hypot(
          newPos[0] - npc.position[0],
          newPos[2] - npc.position[2]
        );
        const minDistance = playerCollisionRadius + npc.radius;
        
        if (distance < minDistance) {
          // Kill the NPC
          window.dispatchEvent(new CustomEvent(`npc-collision-${npcId}`));
          colliding = true;
          break;
        }
      }
    }

    // Simple boundary check (keep player in map)
    if (Math.abs(newPos[0]) < 45 && Math.abs(newPos[2]) < 45 && !colliding) {
      setPosition(newPos);
    } else {
      // Bounce back if hitting boundary or obstacle
      velocity.current.multiplyScalar(-0.3);
    }

    // Update mesh transform
    meshRef.current.position.set(newPos[0], newPos[1], newPos[2]);
    meshRef.current.rotation.y = rotation;

    // Update trail points
    trailTimer.current += delta;
    if (trailTimer.current > 0.05 && velocity.current.length() > 0.5) {
      trailTimer.current = 0;

      // Calculate wheel positions based on current position and rotation
      const wheelOffset = 0.9;
      const wheelFrontBack = 0.8;

      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);

      // Front left and right wheels
      const frontLeftWheel = {
        x: newPos[0] + (-wheelOffset * cos - -wheelFrontBack * sin),
        z: newPos[2] + (-wheelOffset * sin + -wheelFrontBack * cos),
      };
      const frontRightWheel = {
        x: newPos[0] + (wheelOffset * cos - -wheelFrontBack * sin),
        z: newPos[2] + (wheelOffset * sin + -wheelFrontBack * cos),
      };

      // Rear left and right wheels
      const rearLeftWheel = {
        x: newPos[0] + (-wheelOffset * cos - wheelFrontBack * sin),
        z: newPos[2] + (-wheelOffset * sin + wheelFrontBack * cos),
      };
      const rearRightWheel = {
        x: newPos[0] + (wheelOffset * cos - wheelFrontBack * sin),
        z: newPos[2] + (wheelOffset * sin + wheelFrontBack * cos),
      };

      setTrailPoints((prev) => {
        const newTrail = [
          ...prev,
          { left: frontLeftWheel, right: frontRightWheel, age: 0 },
          { left: rearLeftWheel, right: rearRightWheel, age: 0 },
        ];
        return newTrail.slice(-maxTrailLength);
      });
    }

    // Age trail points
    setTrailPoints((prev) =>
      prev.map((point) => ({ ...point, age: point.age + delta }))
    );

    // Smooth camera follow (isometric view)
    const cameraOffset = new THREE.Vector3(0, 20, 20);
    const targetCameraPos = new THREE.Vector3(
      newPos[0] + cameraOffset.x,
      newPos[1] + cameraOffset.y,
      newPos[2] + cameraOffset.z
    );

    camera.position.lerp(targetCameraPos, 0.05);
    camera.lookAt(newPos[0], newPos[1], newPos[2]);

    // Check distance to POIs
    pois.forEach((poi) => {
      const distance = Math.sqrt(
        Math.pow(newPos[0] - poi.position[0], 2) +
          Math.pow(newPos[2] - poi.position[2], 2)
      );

      const isNearPOI = distance < 3;
      const wasNearPOI = playerNearPOI.current.get(poi.id);

      // Update near status
      playerNearPOI.current.set(poi.id, isNearPOI);

      // Only trigger if:
      // 1. Player just entered the range (wasn't near before, is near now)
      // 2. POI hasn't been visited yet OR player left and came back
      if (isNearPOI && !wasNearPOI && !visitedPOIs.current.has(poi.id)) {
        visitedPOIs.current.add(poi.id);
        gamePaused.current = true;
        onPOITrigger(poi);
      }

      // Clear visited status when player leaves the POI range
      if (!isNearPOI && wasNearPOI) {
        visitedPOIs.current.delete(poi.id);
      }
    });
  });

  return (
    <>
    <group>
      {/* Wheel trails */}
      {trailPoints.map((point, index) => {
        const opacity = Math.max(0, 1 - point.age / 2);
        const size = 0.15 * (1 - point.age / 3);

        if (opacity <= 0 || size <= 0) return null;

        return (
          <group key={index}>
            {/* Left wheel trail */}
            <mesh
              position={[point.left.x, 0.05, point.left.z]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <circleGeometry args={[size, 8]} />
              <meshBasicMaterial
                color="#1a1a1a"
                transparent
                opacity={opacity * 0.6}
              />
            </mesh>
            {/* Right wheel trail */}
            <mesh
              position={[point.right.x, 0.05, point.right.z]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <circleGeometry args={[size, 8]} />
              <meshBasicMaterial
                color="#1a1a1a"
                transparent
                opacity={opacity * 0.6}
              />
            </mesh>
          </group>
        );
      })}

      {/* The Repair Truck */}
      <mesh ref={meshRef} castShadow>
        {/* Main body - elevated */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.5, 1, 2.5]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>

        {/* Cabin (front) - elevated */}
        <mesh position={[0, 0.8, 0.5]} castShadow>
          <boxGeometry args={[1.4, 0.8, 1]} />
          <meshStandardMaterial color="#ffa500" />
        </mesh>

        {/* Glowing Hammer Logo on top */}
        <group
          position={[0, 0.8, -0.6]}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
        >
          {/* Hammer Handle */}
          <mesh position={[0, 0, 0.15]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
            <meshStandardMaterial
              color="#8b4513"
              emissive="#8b4513"
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Hammer Head */}
          <mesh position={[0, 0.4, 0.15]} castShadow>
            <boxGeometry args={[0.5, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#c0c0c0"
              emissive="#ffff00"
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          {/* Glow effect */}
          <pointLight
            position={[0, 0.4, 0.15]}
            color="#ffff00"
            intensity={0.8}
            distance={1.5}
            decay={2}
          />
        </group>

        {/* Wheels */}
        {/* Front Left Wheel */}
        <mesh
          position={[-0.9, -0.4, -0.8]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Front Right Wheel */}
        <mesh
          position={[0.9, -0.4, -0.8]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Rear Left Wheel */}
        <mesh
          position={[-0.9, -0.4, 0.8]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Rear Right Wheel */}
        <mesh
          position={[0.9, -0.4, 0.8]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Boost Flames */}
        {flameOpacity.current > 0 && (
          <group ref={flamesRef} position={[0, 0.1, -1.5]}>
            {/* Left flame */}
            <mesh position={[-0.4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.3, 1.2, 8]} />
              <meshStandardMaterial
                color="#ff4500"
                emissive="#ff4500"
                emissiveIntensity={2}
                transparent
                opacity={0.8}
                userData={{ baseOpacity: 0.8 }}
              />
            </mesh>
            {/* Right flame */}
            <mesh position={[0.4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.3, 1.2, 8]} />
              <meshStandardMaterial
                color="#ff4500"
                emissive="#ff4500"
                emissiveIntensity={2}
                transparent
                opacity={0.8}
                userData={{ baseOpacity: 0.8 }}
              />
            </mesh>
            {/* Inner glow - left */}
            <mesh position={[-0.4, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.2, 0.8, 8]} />
              <meshStandardMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={3}
                transparent
                opacity={0.9}
                userData={{ baseOpacity: 0.9 }}
              />
            </mesh>
            {/* Inner glow - right */}
            <mesh position={[0.4, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.2, 0.8, 8]} />
              <meshStandardMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={3}
                transparent
                opacity={0.9}
                userData={{ baseOpacity: 0.9 }}
              />
            </mesh>
            {/* Point lights for glow effect - left */}
            <pointLight
              position={[-0.4, 0, 0]}
              color="#ff6600"
              intensity={2 * flameOpacity.current}
              distance={5}
              decay={2}
            />
            {/* Point lights for glow effect - right */}
            <pointLight
              position={[0.4, 0, 0]}
              color="#ff6600"
              intensity={2 * flameOpacity.current}
              distance={5}
              decay={2}
            />
          </group>
        )}
      </mesh>
    </group>
    </>
  );
}
