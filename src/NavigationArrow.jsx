import { useEffect, useState, memo, useRef } from 'react'

/**
 * NavigationArrow - A 2D compass-style arrow that points from player to target POI
 * Shows direction and distance, updates dynamically as player moves
 * OPTIMIZED: Memoized and throttled updates
 */
const NavigationArrow = memo(function NavigationArrow({ playerPosition, targetPosition, targetName }) {
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

    // Calculate angle in radians, then convert to degrees
    const angleRad = Math.atan2(dx, dz)
    const angleDeg = (angleRad * 180) / Math.PI

    setRotation(angleDeg)

    // Calculate distance
    const dist = Math.sqrt(dx * dx + dz * dz)
    setDistance(dist)
  }, [playerPosition, targetPosition])

  if (!targetPosition) return null

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-30">
      {/* Container with background */}
      <div className="bg-black/70 backdrop-blur-md rounded-2xl px-6 py-4 border-2 border-yellow-400/50 shadow-2xl">
        <div className="flex flex-col items-center gap-2">
          {/* Target name */}
          <div className="text-yellow-300 font-bold text-sm uppercase tracking-wider">
            {targetName || 'Objectif'}
          </div>

          {/* Arrow that rotates */}
          <div className="relative w-16 h-16">
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Arrow SVG */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                {/* Arrow body */}
                <path
                  d="M12 2L12 18"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Arrow head */}
                <path
                  d="M12 2L8 6L12 2L16 6"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#fbbf24"
                />
                {/* Glow effect */}
                <path
                  d="M12 2L12 18"
                  stroke="#fbbf24"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.3"
                  className="blur-sm"
                />
              </svg>
            </div>

            {/* Compass circle background */}
            <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30"></div>
          </div>

          {/* Distance display */}
          <div className="text-white font-semibold text-lg">
            {distance < 1 ? (
              <span className="text-green-400 animate-pulse">Arrivé !</span>
            ) : (
              <span>{distance.toFixed(0)}m</span>
            )}
          </div>

          {/* Direction hint */}
          <div className="text-white/60 text-xs">
            Suis la flèche
          </div>
        </div>
      </div>
    </div>
  )
})

export default NavigationArrow
