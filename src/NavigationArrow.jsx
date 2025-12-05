import { useEffect, useState, memo, useRef } from 'react'

/**
 * NavigationArrow - A 2D compass-style arrow that points from player to target POI
 * Shows direction and distance, updates dynamically as player moves
 * OPTIMIZED: Memoized and throttled updates
 */
const NavigationArrow = memo(function NavigationArrow({ playerPosition, playerRotation, targetPosition, targetName }) {
  const [rotation, setRotation] = useState(0)
  const [distance, setDistance] = useState(0)
  const lastUpdateTime = useRef(0)

  useEffect(() => {
    if (!playerPosition || !targetPosition) return

    // Throttle updates to max 10 times per second (every 100ms)
    const now = Date.now()
    if (now - lastUpdateTime.current < 100) return
    lastUpdateTime.current = now

    // Calculate direction from player to target
    const dx = targetPosition[0] - playerPosition[0]
    const dz = targetPosition[2] - playerPosition[2]

    // Calculate absolute angle to target (in radians, then degrees)
    const targetAngleRad = Math.atan2(dx, dz)
    const targetAngleDeg = (targetAngleRad * 180) / Math.PI

    // Convert player rotation to degrees (player rotation is in radians)
    const playerAngleDeg = (playerRotation * 180) / Math.PI

    // Calculate relative angle (how much to turn from current facing direction)
    let relativeAngle = targetAngleDeg - playerAngleDeg

    // Normalize angle to -180 to 180 range
    while (relativeAngle > 180) relativeAngle -= 360
    while (relativeAngle < -180) relativeAngle += 360

    setRotation(relativeAngle)

    // Calculate distance
    const dist = Math.sqrt(dx * dx + dz * dz)
    setDistance(dist)
  }, [playerPosition, playerRotation, targetPosition])

  if (!targetPosition) return null

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30">
      {/* Container with background - SMALLER & RESPONSIVE */}
      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-yellow-400/50 shadow-lg">
        <div className="flex flex-col items-center gap-1">
          {/* Target name */}
          <div className="text-yellow-300 font-semibold text-xs uppercase tracking-wide">
            {targetName || 'Objectif'}
          </div>

          {/* Arrow that rotates - SMALLER */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Arrow SVG - SMALLER */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-md"
              >
                {/* Arrow body */}
                <path
                  d="M12 2L12 18"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Arrow head */}
                <path
                  d="M12 2L8 6L12 2L16 6"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#fbbf24"
                />
              </svg>
            </div>

            {/* Compass circle background */}
            <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30"></div>
          </div>

          {/* Distance display - SMALLER */}
          <div className="text-white font-semibold text-sm">
            {distance < 1 ? (
              <span className="text-green-400 animate-pulse">Arrivé !</span>
            ) : (
              <span>{distance.toFixed(0)}m</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default NavigationArrow
