import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import GameScene from './GameScene'
import Overlay from './Overlay'
import LandingScreen from './LandingScreen'

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
  // State for showing landing screen
  const [showLanding, setShowLanding] = useState(true)

  return (
    <div className="w-full h-full relative">
      {/* Game Title Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6">
        <h1 className="text-3xl font-bold text-white text-center drop-shadow-lg">
          Digital Independence Mission
        </h1>
        <p className="text-white/90 text-center mt-2 text-sm">
          Drive your Repair Truck around the campus. Take quizzes, chat with the assistant, and discover fun facts!
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
          <p className="text-yellow-300 font-semibold">⚡ SHIFT/SPACE - Turbo Boost</p>
        </div>
      </div>

      {/* POI Legend */}
      <div className="absolute bottom-0 right-0 z-10 bg-black/60 backdrop-blur-sm p-4 rounded-tl-xl">
        <p className="text-white text-sm font-semibold mb-2">Points of Interest:</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white shadow-lg shadow-white/50"></div>
            <span className="text-white/80 text-xs">Quiz Stations (4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
            <span className="text-white/80 text-xs">Digital Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
            <span className="text-white/80 text-xs">Fun Facts</span>
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
        />
      )}

      {/* Landing Screen */}
      {showLanding && (
        <LandingScreen onStart={() => setShowLanding(false)} />
      )}
    </div>
  )
}

export default App
