import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import GameScene from './GameScene'
import Overlay from './Overlay'
import LevelUp from './LevelUp'
import Badges from './Badges'

// Define keyboard control mappings
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
]

function App() {
  // State for managing which POI modal is active (null = no modal)
  const [activePOI, setActivePOI] = useState(null)
  // Player level (persisted to localStorage)
  const [level, setLevel] = useState(() => {
    try {
      const v = parseInt(localStorage.getItem('ndi_level') || '1', 10)
      return Number.isNaN(v) ? 1 : v
    } catch (e) {
      return 1
    }
  })

  // XP progress inside current level (persisted)
  const [xpProgress, setXpProgress] = useState(() => {
    try {
      const v = parseInt(localStorage.getItem('ndi_xp_progress') || '0', 10)
      return Number.isNaN(v) ? 0 : v
    } catch (e) {
      return 0
    }
  })

  // Persist level and xp progress when they change
  useEffect(() => {
    try {
      localStorage.setItem('ndi_level', String(level))
      localStorage.setItem('ndi_xp_progress', String(xpProgress))
    } catch (e) {
      // ignore
    }
  }, [level, xpProgress])

  // Track completed POIs so we don't increment level twice for same POI
  const [completedPOIs, setCompletedPOIs] = useState(() => {
    try {
      const raw = localStorage.getItem('ndi_completed_pois')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('ndi_completed_pois', JSON.stringify(completedPOIs))
    } catch (e) {
      // ignore
    }
  }, [completedPOIs])

  // Badges (persisted)
  const [badges, setBadges] = useState(() => {
    try {
      const raw = localStorage.getItem('ndi_badges')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('ndi_badges', JSON.stringify(badges))
    } catch (e) {
      // ignore
    }
  }, [badges])

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
          Digital Independence Mission
        </h1>
        <div className="absolute right-6 top-4 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-md text-white font-semibold w-52">
          <div className="flex items-center justify-between mb-1">
            <span>Level {level}</span>
            <span className="text-xs">{xpProgress}/{xpNeededForLevel(level)}</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-2 bg-green-400"
              style={{ width: `${Math.round((xpProgress / Math.max(1, xpNeededForLevel(level))) * 100)}%` }}
            />
          </div>
        </div>
        {/* Badges button */}
        <div className="absolute right-6 top-20">
          <button
            onClick={() => setShowBadges(true)}
            className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20"
          >
            Badges
          </button>
        </div>
        <p className="text-white/90 text-center mt-2 text-sm">
          Drive your Repair Truck to the colored markers to learn about tech freedom!
        </p>
      </div>

      {/* Controls Guide */}
      <div className="absolute bottom-0 left-0 z-10 bg-black/60 backdrop-blur-sm p-4 rounded-tr-xl">
        <p className="text-white text-sm font-semibold mb-2">Controls:</p>
        <div className="text-white/80 text-xs space-y-1">
          <p>↑ W - Forward</p>
          <p>↓ S - Backward</p>
          <p>← A - Turn Left</p>
          <p>→ D - Turn Right</p>
        </div>
      </div>

      {/* POI Legend */}
      <div className="absolute bottom-0 right-0 z-10 bg-black/60 backdrop-blur-sm p-4 rounded-tl-xl">
        <p className="text-white text-sm font-semibold mb-2">Mission Objectives:</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
            <span className="text-white/80 text-xs">Stop Waste</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
            <span className="text-white/80 text-xs">Go Open Source</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
            <span className="text-white/80 text-xs">Data Privacy</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{ position: [0, 20, 20], fov: 50 }}
          className="bg-gradient-to-b from-sky-400 to-sky-200"
        >
          <GameScene onPOITrigger={setActivePOI} />
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
              const pointsCount = poi.content?.points?.length || 0
              const award = pointsCount * XP_PER_POINT

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
                waste: {
                  id: 'badge_waste',
                  name: 'Stop Waste Badge',
                  icon: '♻️',
                  description: 'Committed to reducing e-waste by choosing reconditioned devices.'
                },
                opensource: {
                  id: 'badge_open_source',
                  name: 'Open Source Advocate',
                  icon: '🐧',
                  description: 'Supports open source solutions and software freedom.'
                },
                privacy: {
                  id: 'badge_privacy',
                  name: 'Privacy Protector',
                  icon: '🔒',
                  description: 'Takes steps to protect personal data and privacy.'
                }
              }

              const TIER_BADGES = [
                { count: 1, id: 'tier_1', name: 'Emerging Advocate', icon: '🌱', description: 'Completed 1 mission.' },
                { count: 2, id: 'tier_2', name: 'Eco Advocate', icon: '🌿', description: 'Completed 2 missions.' },
                { count: 3, id: 'tier_3', name: 'Digital Steward', icon: '🏅', description: 'Completed 3 missions.' }
              ]

              const newBadges = []

              // topic badge
              const topic = TOPIC_BADGES[poi.id]
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

              if (newBadges.length > 0) {
                setBadges(prev => [...prev, ...newBadges])
                setHighlightBadgeId(newBadges[0].id)
                setShowBadges(true)
              }

              if (gainedLevels > 0) {
                setLevelUpNumber(newLevel)
                setLevelUpXP(award)
                setLevelUpLevels(gainedLevels)
                setShowLevelUp(true)
              }
            }

            setActivePOI(null)
          }}
        />
      )}

      {showLevelUp && (
        <LevelUp level={levelUpNumber} onClose={() => setShowLevelUp(false)} />
      )}
      {showBadges && (
        <Badges badges={badges} onClose={() => { setShowBadges(false); setHighlightBadgeId(null) }} highlightId={highlightBadgeId} />
      )}
    </div>
  )
}

export default App
