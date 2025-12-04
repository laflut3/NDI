import { useState } from 'react'

const MAIN_QUESTS = [
  {
    id: 'quest1',
    name: 'Le Réveil des Machines',
    description: 'Ressuscite les vieux PC grâce à Linux',
    icon: '💾',
    requiredPOI: 'quiz1',
    order: 1
  },
  {
    id: 'quest2',
    name: 'La Détox Numérique',
    description: 'Maîtrise la sobriété numérique',
    icon: '🚦',
    requiredPOI: 'quiz2',
    order: 2
  },
  {
    id: 'quest3',
    name: 'La Forge des Communs',
    description: 'Bâtis des outils libres et partagés',
    icon: '🎁',
    requiredPOI: 'quiz3',
    order: 3
  },
  {
    id: 'quest4',
    name: 'Le Grand Guide de la Résistance',
    description: 'Établis une stratégie de résistance',
    icon: '🛡️',
    requiredPOI: 'quiz4',
    order: 4
  }
]

const SECONDARY_QUESTS = [
  {
    id: 'side1',
    name: 'Explorateur Numérique',
    description: 'Découvre tous les points d\'intérêt',
    icon: '🗺️',
    type: 'secondary'
  },
  {
    id: 'side2',
    name: 'Maître des Badges',
    description: 'Collecte tous les badges',
    icon: '🏆',
    type: 'secondary'
  }
]

export default function QuestTracker({ completedPOIs, onQuestClick, currentQuest }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [hoveredQuest, setHoveredQuest] = useState(null)

  // Determine quest status
  const getQuestStatus = (quest) => {
    if (quest.type === 'secondary') {
      return 'locked' // Secondary quests not implemented yet
    }

    const isCompleted = completedPOIs.includes(quest.requiredPOI)
    const isActive = currentQuest === quest.id

    if (isCompleted) return 'completed'
    if (isActive) return 'active'

    // Check if previous quest is completed
    if (quest.order === 1) return 'available'
    const previousQuest = MAIN_QUESTS.find(q => q.order === quest.order - 1)
    if (previousQuest && completedPOIs.includes(previousQuest.requiredPOI)) {
      return 'available'
    }

    return 'locked'
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'from-green-500 to-emerald-600'
      case 'active': return 'from-yellow-500 to-orange-500'
      case 'available': return 'from-blue-500 to-cyan-500'
      case 'locked': return 'from-gray-600 to-gray-700'
      default: return 'from-gray-600 to-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return '✓'
      case 'active': return '▶'
      case 'available': return '!'
      case 'locked': return '🔒'
      default: return '?'
    }
  }

  return (
    <div className="fixed top-20 left-4 z-20 max-w-md">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-2 font-semibold"
      >
        <span className="text-xl">📋</span>
        <span>Quêtes</span>
        <span className="text-xs ml-auto">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20">
          {/* Main Quest Section */}
          <div className="mb-4">
            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2 border-b border-white/20 pb-2">
              <span className="text-yellow-400">⭐</span>
              <span>QUÊTE PRINCIPALE</span>
            </h3>
            <div className="space-y-2">
              {MAIN_QUESTS.map((quest) => {
                const status = getQuestStatus(quest)
                const isClickable = status === 'available' || status === 'active'

                return (
                  <button
                    key={quest.id}
                    onClick={() => isClickable && onQuestClick(quest)}
                    onMouseEnter={() => setHoveredQuest(quest.id)}
                    onMouseLeave={() => setHoveredQuest(null)}
                    disabled={status === 'locked' || status === 'completed'}
                    className={`
                      w-full text-left p-3 rounded-lg border-2 transition-all duration-200
                      ${isClickable ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : 'cursor-not-allowed opacity-60'}
                      ${status === 'active' ? 'border-yellow-400 bg-yellow-500/20' : 'border-white/20'}
                      ${hoveredQuest === quest.id && isClickable ? 'bg-white/10' : 'bg-white/5'}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      {/* Quest Icon */}
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${getStatusColor(status)}
                        flex items-center justify-center text-xl shadow-lg
                      `}>
                        {quest.icon}
                      </div>

                      {/* Quest Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-semibold text-sm truncate">
                            {quest.name}
                          </h4>
                          <span className="flex-shrink-0 text-xs">
                            {getStatusIcon(status)}
                          </span>
                        </div>
                        <p className="text-white/70 text-xs line-clamp-2">
                          {quest.description}
                        </p>
                        {status === 'completed' && (
                          <span className="inline-block mt-1 text-green-400 text-xs font-semibold">
                            ✓ Terminée
                          </span>
                        )}
                        {status === 'active' && (
                          <span className="inline-block mt-1 text-yellow-400 text-xs font-semibold animate-pulse">
                            ▶ En cours
                          </span>
                        )}
                        {status === 'locked' && (
                          <span className="inline-block mt-1 text-gray-400 text-xs">
                            🔒 Verrouillée
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hover Tooltip */}
                    {hoveredQuest === quest.id && isClickable && (
                      <div className="mt-2 pt-2 border-t border-white/20">
                        <p className="text-cyan-300 text-xs font-semibold">
                          Cliquez pour naviguer vers cette quête
                        </p>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Secondary Quests Section */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2 border-b border-white/20 pb-2">
              <span className="text-blue-400">✦</span>
              <span>QUÊTES SECONDAIRES</span>
            </h3>
            <div className="space-y-2">
              {SECONDARY_QUESTS.map((quest) => (
                <div
                  key={quest.id}
                  className="p-3 rounded-lg bg-white/5 border-2 border-white/10 opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xl shadow-lg">
                      {quest.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm mb-1">
                        {quest.name}
                      </h4>
                      <p className="text-white/70 text-xs mb-1">
                        {quest.description}
                      </p>
                      <span className="text-purple-400 text-xs italic">
                        Bientôt disponible...
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
