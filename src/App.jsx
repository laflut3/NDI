import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import GameScene from './GameScene'
import Overlay from './Overlay'
import IntroPopup from './IntroPopup'
import QuestTracker from './QuestTracker'
import QuestSuccess from './QuestSuccess'
import LevelUp from './LevelUp'
import Badges from './Badges'
import { POIS } from './GameScene'

// Define keyboard control mappings
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'boost', keys: ['ShiftLeft', 'ShiftRight', 'Space'] },
]

function App() {
  // State for managing which POI modal is active (null = no modal)
  const [activePOI, setActivePOI] = useState(null)

  // Load initial game state from localStorage
  const loadGameState = () => {
    try {
      const saved = localStorage.getItem('ndi_game_state')
      if (saved) {
        const data = JSON.parse(saved)
        return {
          level: data.level || 1,
          xpProgress: data.xpProgress || 0,
          completedPOIs: data.completedPOIs || [],
          badges: data.badges || [],
          currentQuest: data.currentQuest || 'quest1',
          showIntro: data.showIntro !== undefined ? data.showIntro : true
        }
      }
    } catch (e) {
      console.error('Error loading game state:', e)
    }
    return { level: 1, xpProgress: 0, completedPOIs: [], badges: [], currentQuest: 'quest1', showIntro: true }
  }

  const initialState = loadGameState()

  // Player level
  const [level, setLevel] = useState(initialState.level)
  // XP progress inside current level
  const [xpProgress, setXpProgress] = useState(initialState.xpProgress)
  // Track completed POIs
  const [completedPOIs, setCompletedPOIs] = useState(initialState.completedPOIs)
  // Badges
  const [badges, setBadges] = useState(initialState.badges)
  // State for showing intro popup
  const [showIntro, setShowIntro] = useState(initialState.showIntro)
  // Current quest being tracked
  const [currentQuest, setCurrentQuest] = useState(initialState.currentQuest)
  // Quest success modal
  const [showQuestSuccess, setShowQuestSuccess] = useState(false)
  const [completedQuestId, setCompletedQuestId] = useState(null)

  // Locked POI notification
  const [lockedMessage, setLockedMessage] = useState(null)

  // Listen for locked POI events
  useEffect(() => {
    const handleLockedPOI = (event) => {
      setLockedMessage(event.detail.message)
      // Auto-hide after 3 seconds
      setTimeout(() => setLockedMessage(null), 3000)
    }

    window.addEventListener('poi-locked', handleLockedPOI)
    return () => window.removeEventListener('poi-locked', handleLockedPOI)
  }, [])

  // Save game state whenever it changes
  useEffect(() => {
    try {
      const gameState = {
        level,
        xpProgress,
        completedPOIs,
        badges,
        currentQuest,
        showIntro,
        lastSaved: Date.now()
      }
      localStorage.setItem('ndi_game_state', JSON.stringify(gameState))
    } catch (e) {
      console.error('Error saving game state:', e)
    }
  }, [level, xpProgress, completedPOIs, badges, currentQuest, showIntro])

  // Reset progress function
  const resetProgress = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ?')) {
      localStorage.removeItem('ndi_game_state')
      setLevel(1)
      setXpProgress(0)
      setCompletedPOIs([])
      setBadges([])
      setCurrentQuest('quest1')
      setShowIntro(true)
    }
  }

  // Handle quest click from tracker
  const handleQuestClick = (quest) => {
    setCurrentQuest(quest.id)
    // Find the POI location for this quest
    const poi = POIS.find(p => p.id === quest.requiredPOI)
    if (poi) {
      // You can add camera/player navigation here in the future
      console.log(`Navigate to POI at position:`, poi.position)
    }
  }

  const [showBadges, setShowBadges] = useState(false)
  const [highlightBadgeId, setHighlightBadgeId] = useState(null)

  // Level-up modal state
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [levelUpNumber, setLevelUpNumber] = useState(level)
  const [levelUpXP, setLevelUpXP] = useState(0)
  const [levelUpLevels, setLevelUpLevels] = useState(0)

  const XP_PER_POINT = 25

  // XP required for next level (increasing difficulty)
  function xpNeededForLevel(lv) {
    // Example scaling: base 100, 1.5x per level
    return Math.floor(100 * Math.pow(1.5, lv - 1))
  }

  return (
    <div className="w-full h-full relative">
      {/* Game Title Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6">
        <h1 className="text-3xl font-bold text-white text-center drop-shadow-lg">
          🐧 La Confrérie du Manchot
        </h1>
        <div className="absolute right-6 top-4 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-md text-white font-semibold w-52">
          <div className="flex items-center justify-between mb-1">
            <span>Niveau {level}</span>
            <span className="text-xs">{xpProgress}/{xpNeededForLevel(level)}</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-2 bg-green-400"
              style={{ width: `${Math.round((xpProgress / Math.max(1, xpNeededForLevel(level))) * 100)}%` }}
            />
          </div>
        </div>
        {/* Badges and Reset buttons */}
        <div className="absolute right-6 top-20 flex flex-col gap-2">
          <button
            onClick={() => setShowBadges(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 shadow-lg flex items-center gap-2 font-semibold"
          >
            <span className="text-xl">🏆</span>
            <span>Badges</span>
            {badges.length > 0 && (
              <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {badges.length}
              </span>
            )}
          </button>
          <button
            onClick={resetProgress}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 shadow-lg flex items-center gap-2 font-semibold text-sm"
          >
            <span className="text-lg">🔄</span>
            <span>Réinitialiser</span>
          </button>
        </div>
        <p className="text-white/90 text-center mt-2 text-sm">
          Conduis ton camion de réparation à travers le campus. Complète les quiz et libère les machines !
        </p>
      </div>

      {/* Controls Guide */}
      <div className="absolute bottom-0 left-0 z-10 bg-black/60 backdrop-blur-sm p-4 rounded-tr-xl">
        <p className="text-white text-sm font-semibold mb-2">Contrôles:</p>
        <div className="text-white/80 text-xs space-y-1">
          <p>↑ W - Avancer</p>
          <p>↓ S - Reculer</p>
          <p>← A - Tourner à gauche</p>
          <p>→ D - Tourner à droite</p>
          <p className="text-yellow-300 font-semibold">⚡ SHIFT/ESPACE - Turbo</p>
        </div>
      </div>

      {/* POI Legend */}
      <div className="absolute bottom-0 right-0 z-10 bg-black/60 backdrop-blur-sm p-4 rounded-tl-xl">
        <p className="text-white text-sm font-semibold mb-2">Points d'Intérêt:</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white shadow-lg shadow-white/50"></div>
            <span className="text-white/80 text-xs">Stations Quiz (4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
            <span className="text-white/80 text-xs">Assistant Numérique</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
            <span className="text-white/80 text-xs">Faits Intéressants</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50"></div>
            <span className="text-white/80 text-xs">Vidéo Éducative</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{ position: [0, 20, 20], fov: 50 }}
          className="bg-gradient-to-b from-sky-400 to-sky-200"
          gl={{
            antialias: false, // Disable antialiasing for performance
            powerPreference: "high-performance"
          }}
          dpr={[1, 1.5]} // Limit pixel ratio for performance
          performance={{ min: 0.5 }} // Allow frame rate to drop to maintain performance
        >
          <GameScene
            onPOITrigger={setActivePOI}
            currentQuest={currentQuest}
            completedPOIs={completedPOIs}
          />
        </Canvas>
      </KeyboardControls>

      {/* Modal Overlay */}
      {activePOI && (
        <Overlay
          poiData={activePOI}
          onClose={() => setActivePOI(null)}
          onContinue={(poi) => {
            // Only award XP once per POI
            if (!completedPOIs.includes(poi.id)) {
              // Calculate XP based on POI type
              let award = 0

              // For quiz type, use the actual quiz results if available
              if (poi.type === 'quiz' && poi.quizResults) {
                award = poi.quizResults.xpEarned
              } else {
                // For other types, calculate based on content
                let pointsCount = 0
                if (poi.content?.points) {
                  pointsCount = poi.content.points.length
                } else if (poi.content?.facts) {
                  pointsCount = poi.content.facts.length
                } else if (poi.type === 'chatbot') {
                  pointsCount = 3 // Fixed XP for chatbot interaction
                }
                award = pointsCount * XP_PER_POINT
              }

              // Compute new progress and level ups
              let newLevel = level
              let newProgress = xpProgress + award
              let gainedLevels = 0

              while (newProgress >= xpNeededForLevel(newLevel)) {
                newProgress -= xpNeededForLevel(newLevel)
                newLevel += 1
                gainedLevels += 1
              }

              setLevel(newLevel)
              setXpProgress(newProgress)
              // Award completed POI
              setCompletedPOIs(prev => [...prev, poi.id])

              // Award badges: topic badge for this POI, and tier badges based on total completed
              const TOPIC_BADGES = {
                quiz1: {
                  id: 'badge_quiz_master',
                  name: 'Quiz Master',
                  icon: '📝',
                  description: 'Completed quiz challenges on digital independence.'
                },
                chatbot: {
                  id: 'badge_tech_explorer',
                  name: 'Tech Explorer',
                  icon: '🤖',
                  description: 'Engaged with the digital assistant.'
                },
                funfact: {
                  id: 'badge_knowledge_seeker',
                  name: 'Knowledge Seeker',
                  icon: '💡',
                  description: 'Discovered amazing tech facts.'
                }
              }

              const TIER_BADGES = [
                { count: 1, id: 'tier_1', name: 'Digital Novice', icon: '🌱', description: 'Completed your first mission!' },
                { count: 2, id: 'tier_2', name: 'Tech Enthusiast', icon: '🌿', description: 'Completed 2 missions.' },
                { count: 3, id: 'tier_3', name: 'Digital Advocate', icon: '🏅', description: 'Completed 3 missions.' },
                { count: 4, id: 'tier_4', name: 'Tech Champion', icon: '⭐', description: 'Completed 4 missions.' },
                { count: 6, id: 'tier_5', name: 'Digital Master', icon: '👑', description: 'Completed all missions!' }
              ]

              const newBadges = []

              // Award topic badge based on POI type (not specific ID)
              let badgeKey = poi.id
              if (poi.type === 'quiz' && !badges.find(b => b.id === 'badge_quiz_master')) {
                badgeKey = 'quiz1' // Use first quiz for badge lookup
              }

              const topic = TOPIC_BADGES[badgeKey]
              if (topic && !badges.find(b => b.id === topic.id)) {
                newBadges.push({ ...topic, earnedAt: Date.now() })
              }

              // tiers (based on next completed count)
              const nextCompletedCount = completedPOIs.length + 1
              TIER_BADGES.forEach(tb => {
                if (nextCompletedCount >= tb.count && !badges.find(b => b.id === tb.id)) {
                  newBadges.push({ id: tb.id, name: tb.name, icon: tb.icon, description: tb.description, earnedAt: Date.now() })
                }
              })

              // Store new badges for later display
              if (newBadges.length > 0) {
                setBadges(prev => [...prev, ...newBadges])
                setHighlightBadgeId(newBadges[0].id)
              }

              // Close POI overlay first
              setActivePOI(null)

              // Check if this POI is a quest completion
              const QUEST_MAP = {
                'quiz1': 'quest1',
                'quiz2': 'quest2',
                'quiz3': 'quest3',
                'quiz4': 'quest4'
              }
              const completedQuest = QUEST_MAP[poi.id]
              const shouldShowQuestSuccess = completedQuest && poi.type === 'quiz'

              // Advance to next quest if applicable
              if (completedQuest) {
                const questNumber = parseInt(completedQuest.replace('quest', ''))
                if (questNumber < 4) {
                  setCurrentQuest(`quest${questNumber + 1}`)
                }
              }

              // Show modals in sequence: Quest Success -> Level-up -> Badges
              if (shouldShowQuestSuccess) {
                // Show quest success first
                setCompletedQuestId(poi.id)
                setTimeout(() => setShowQuestSuccess(true), 300)
              } else if (gainedLevels > 0) {
                // Show level-up immediately
                setLevelUpNumber(newLevel)
                setLevelUpXP(award)
                setLevelUpLevels(gainedLevels)
                setShowLevelUp(true)

                // Queue badges to show after level-up if we have new badges
                if (newBadges.length > 0) {
                  // Badges will be shown when level-up closes (handled in LevelUp onClose)
                  // We'll use a timeout to ensure level-up is seen first
                }
              } else if (newBadges.length > 0) {
                // No level-up, show badges directly after a short delay
                setTimeout(() => setShowBadges(true), 300)
              }
            } else {
              // No XP/badges, just close the overlay
              setActivePOI(null)
            }
          }}
        />
      )}

      {/* Level Up Modal */}
      {showLevelUp && (
        <LevelUp
          level={levelUpNumber}
          onClose={() => {
            setShowLevelUp(false)
            // Show badges modal after level-up if there are new badges
            if (highlightBadgeId) {
              setTimeout(() => setShowBadges(true), 300)
            }
          }}
        />
      )}

      {/* Badges Modal */}
      {showBadges && (
        <Badges badges={badges} onClose={() => { setShowBadges(false); setHighlightBadgeId(null) }} highlightId={highlightBadgeId} />
      )}

      {/* Quest Success Modal */}
      {showQuestSuccess && completedQuestId && (
        <QuestSuccess
          questId={completedQuestId}
          onClose={() => {
            setShowQuestSuccess(false)
            setCompletedQuestId(null)
            // After quest success, show level-up if needed, then badges
            const gainedLevels = levelUpLevels
            if (gainedLevels > 0) {
              setTimeout(() => setShowLevelUp(true), 300)
            } else if (highlightBadgeId) {
              setTimeout(() => setShowBadges(true), 300)
            }
          }}
        />
      )}

      {/* Intro Popup */}
      {showIntro && (
        <IntroPopup onClose={() => setShowIntro(false)} />
      )}

      {/* Quest Tracker */}
      <QuestTracker
        completedPOIs={completedPOIs}
        currentQuest={currentQuest}
        onQuestClick={handleQuestClick}
      />


      {/* Locked POI Notification */}
      {lockedMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-red-400 max-w-md">
            <p className="text-xl font-bold text-center">{lockedMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
