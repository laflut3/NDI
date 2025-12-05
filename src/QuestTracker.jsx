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
    name: 'Faits Fascinants',
    description: 'Découvre les faits sur le numérique',
    icon: '💡',
    requiredPOI: 'funfact',
    type: 'secondary'
  },
  {
    id: 'side2',
    name: 'Conversation Numérique',
    description: 'Discute avec l\'assistant IA',
    icon: '💬',
    requiredPOI: 'chatbot',
    type: 'secondary'
  },
  {
    id: 'side3',
    name: 'Femme et Informatique',
    description: 'Regarde la vidéo sur la diversité',
    icon: '🎬',
    requiredPOI: 'video',
    type: 'secondary'
  }
]

export default function QuestTracker({ completedPOIs, onQuestClick, currentQuest }) {
  const [isExpanded, setIsExpanded] = useState(false) // Start collapsed
  const [hoveredQuest, setHoveredQuest] = useState(null)

  // Determine quest status
  const getQuestStatus = (quest) => {
    const isCompleted = completedPOIs.includes(quest.requiredPOI)
    const isActive = currentQuest === quest.id

    if (isCompleted) return 'completed'
    if (isActive) return 'active'

    // For secondary quests, they're always available (no prerequisites)
    if (quest.type === 'secondary') {
      return 'available'
    }

    // For main quests, check if previous quest is completed
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
    <div className="fixed top-20 left-2 sm:left-4 z-20 max-w-xs sm:max-w-sm">
      {/* Toggle Button - SMALLER */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-2 font-semibold text-sm"
      >
        <span className="text-base">📋</span>
        <span>Quêtes</span>
        <span className="text-xs ml-auto">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-xl border border-white/20">
          {/* Main Quest Section - SMALLER */}
          <div className="mb-2">
            <h3 className="text-white font-bold text-xs mb-2 flex items-center gap-1.5 border-b border-white/20 pb-1.5">
              <span className="text-yellow-400 text-sm">⭐</span>
              <span>QUÊTE PRINCIPALE</span>
            </h3>
            <div className="space-y-1.5">
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
                      w-full text-left p-2 rounded-md border transition-all duration-200
                      ${isClickable ? 'cursor-pointer hover:scale-102 hover:shadow-md' : 'cursor-not-allowed opacity-60'}
                      ${status === 'active' ? 'border-yellow-400 bg-yellow-500/20' : 'border-white/20'}
                      ${hoveredQuest === quest.id && isClickable ? 'bg-white/10' : 'bg-white/5'}
                    `}
                  >
                    <div className="flex items-start gap-2">
                      {/* Quest Icon - SMALLER */}
                      <div className={`
                        flex-shrink-0 w-7 h-7 rounded-md bg-gradient-to-br ${getStatusColor(status)}
                        flex items-center justify-center text-sm shadow-md
                      `}>
                        {quest.icon}
                      </div>

                      {/* Quest Info - SMALLER */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h4 className="text-white font-semibold text-xs truncate">
                            {quest.name}
                          </h4>
                          <span className="flex-shrink-0 text-xs">
                            {getStatusIcon(status)}
                          </span>
                        </div>
                        <p className="text-white/70 text-xs line-clamp-1">
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

                    {/* Hover Tooltip - REMOVED for space */}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Secondary Quests Section - SMALLER */}
          <div>
            <h3 className="text-white font-bold text-xs mb-2 flex items-center gap-1.5 border-b border-white/20 pb-1.5">
              <span className="text-blue-400 text-sm">✦</span>
              <span>SECONDAIRES</span>
            </h3>
            <div className="space-y-1.5">
              {SECONDARY_QUESTS.map((quest) => {
                const status = getQuestStatus(quest)
                const isClickable = status === 'available' || status === 'active'

                return (
                  <button
                    key={quest.id}
                    onClick={() => isClickable && onQuestClick(quest)}
                    onMouseEnter={() => setHoveredQuest(quest.id)}
                    onMouseLeave={() => setHoveredQuest(null)}
                    disabled={status === 'completed'}
                    className={`
                      w-full text-left p-2 rounded-md border transition-all duration-200
                      ${isClickable ? 'cursor-pointer hover:scale-102 hover:shadow-md' : 'cursor-not-allowed opacity-60'}
                      ${status === 'active' ? 'border-blue-400 bg-blue-500/20' : 'border-white/20'}
                      ${hoveredQuest === quest.id && isClickable ? 'bg-white/10' : 'bg-white/5'}
                    `}
                  >
                    <div className="flex items-start gap-2">
                      {/* Quest Icon - SMALLER */}
                      <div className={`
                        flex-shrink-0 w-7 h-7 rounded-md bg-gradient-to-br ${getStatusColor(status)}
                        flex items-center justify-center text-sm shadow-md
                      `}>
                        {quest.icon}
                      </div>

                      {/* Quest Info - SMALLER */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h4 className="text-white font-semibold text-xs truncate">
                            {quest.name}
                          </h4>
                          <span className="flex-shrink-0 text-xs">
                            {getStatusIcon(status)}
                          </span>
                        </div>
                        <p className="text-white/70 text-xs line-clamp-1">
                          {quest.description}
                        </p>
                        {status === 'completed' && (
                          <span className="inline-block mt-1 text-green-400 text-xs font-semibold">
                            ✓ Terminée
                          </span>
                        )}
                        {status === 'active' && (
                          <span className="inline-block mt-1 text-blue-400 text-xs font-semibold animate-pulse">
                            ▶ En cours
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
