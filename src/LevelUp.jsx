import { useEffect } from 'react'

export default function LevelUp({ level, onClose, xpGained = 0, levelsGained = 0 }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onClose()
    }, 2500)
    return () => clearTimeout(t)
  }, [onClose])

  const pieces = Array.from({ length: 40 }).map((_, i) => {
    const left = Math.random() * 100
    const bg = ['#ff5a5f', '#ffb400', '#00d084', '#1fb6ff', '#a78bfa'][Math.floor(Math.random() * 5)]
    const delay = Math.random() * 0.8
    const rotate = Math.random() * 360
    const scale = 0.6 + Math.random() * 0.8
    return { left, bg, delay, rotate, scale, key: i }
  })

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl p-6 text-center shadow-2xl">
        <div className="text-4xl font-extrabold text-green-600 mb-2">🎉 Level Up!</div>
        <div className="text-lg text-gray-700 mb-2">You reached level <span className="font-semibold">{level}</span></div>
        {xpGained > 0 && (
          <div className="text-sm text-gray-600 mb-2">+{xpGained} XP earned</div>
        )}
        {levelsGained > 0 && (
          <div className="text-sm text-gray-500 mb-2">Levels gained: {levelsGained}</div>
        )}
        <div className="text-sm text-gray-500 mb-2">Great job — mission progress saved.</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Close
        </button>

        {/* Confetti layer */}
        <div className="pointer-events-none absolute inset-0">
          {pieces.map(p => (
            <span
              key={p.key}
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                top: '-10%',
                width: `${8 * p.scale}px`,
                height: `${12 * p.scale}px`,
                background: p.bg,
                transform: `rotate(${p.rotate}deg)`,
                borderRadius: '2px',
                animation: `confettiFall 1.8s ${p.delay}s both ease-out`
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1 }
            60% { opacity: 1 }
            100% { transform: translateY(360px) rotate(200deg); opacity: 0 }
          }
        `}</style>
      </div>
    </div>
  )
}
