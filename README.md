# Digital Independence Mission - 3D Driving Game

A hackathon project: An educational 3D browser game built with React, Vite, TailwindCSS, and React Three Fiber.

## Game Overview

Drive a Repair Truck around a school campus and discover three Points of Interest (POIs) to learn about:
- **Stop Waste** - Computer reconditioning vs buying new
- **Go Open Source** - Replacing proprietary software with FOSS
- **Data Privacy** - Avoiding Big Tech surveillance

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Three Fiber** - 3D rendering with Three.js
- **@react-three/drei** - R3F helpers (KeyboardControls)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

## Controls

- **↑ / W** - Drive forward
- **↓ / S** - Drive backward
- **← / A** - Turn left
- **→ / D** - Turn right

## Project Structure

```
src/
├── App.jsx          # Main app with Canvas setup and game state
├── GameScene.jsx    # 3D environment (map, roads, trees, buildings, POIs)
├── Player.jsx       # Vehicle physics and camera follow logic
├── Overlay.jsx      # Educational modal system
├── main.jsx         # React entry point
└── index.css        # Tailwind imports
```

## Key Features

### Simple Physics Engine
- Velocity-based movement with friction
- No external physics library needed
- Smooth steering and acceleration
- Boundary collision detection

### Camera System
- Isometric view following the player
- Smooth lerp-based tracking
- Fixed perspective for top-down gameplay

### Interaction System
- Distance-based POI detection (< 3 units)
- Automatic pause when reaching POIs
- Beautiful modal overlays with educational content
- Cooldown system to prevent spam triggers

### Visual Design
- Low-poly 3D aesthetic
- Glowing POI markers with point lights
- Shadow-casting objects
- Gradient sky background
- TailwindCSS-styled UI overlays

## Customization

### Adding New POIs

Edit `src/GameScene.jsx` and add to the `POIS` array:

```javascript
{
  id: 'new-poi',
  position: [x, 0.5, z],
  color: '#hexcolor',
  title: 'Your Title',
  icon: '🎯',
  content: {
    heading: 'Main Heading',
    points: ['Point 1', 'Point 2', ...]
  }
}
```

### Adjusting Vehicle Physics

Edit `src/Player.jsx` movement parameters:

```javascript
const acceleration = 15    // Speed gain rate
const turnSpeed = 2.5      // Rotation speed
const friction = 0.92      // Deceleration (0-1)
const maxSpeed = 8         // Top speed cap
```

### Changing Map Size

Edit `src/GameScene.jsx`:

```javascript
<planeGeometry args={[100, 100]} /> // Ground size
```

## Building for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## License

Hackathon project - Free to use and modify

## Credits

Built for the Digital Independence educational initiative.
