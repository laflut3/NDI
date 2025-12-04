import React from 'react'

export default function Badges({ badges = [], onClose, highlightId }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-3xl mx-4 bg-white rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Badges</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>
        </div>

        {badges.length === 0 ? (
          <div className="text-gray-600">No badges yet — complete missions to earn badges about ecoresponsibility.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map(b => (
              <div
                key={b.id}
                className={`p-4 rounded-xl border ${highlightId === b.id ? 'border-green-400 shadow-lg' : 'border-transparent'} bg-gray-50`}
              >
                <div className="text-4xl mb-2">{b.icon}</div>
                <div className="font-semibold">{b.name}</div>
                <div className="text-sm text-gray-600 mt-1">{b.description}</div>
                {b.earnedAt && (
                  <div className="text-xs text-gray-400 mt-2">Earned {new Date(b.earnedAt).toLocaleString()}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
