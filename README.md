# Isometric RPG Game Prototype 

## Description
This project is designed to provide a powerful and flexible 3D simulation using the Three.js library. The project includes customizable world generation, camera controls, and interactive features such as raycasting and combat management. It also features a user interface for adjusting parameters in real-time.

## Features
- **Dynamic World Generation**: Generate a customizable world with trees, rocks, and bushes.
- **Camera Controls**: Smooth camera movement and controls using OrbitControls.
- **Lighting**: Includes ambient and directional lighting for a realistic scene.
- **Interactive GUI**: Modify world parameters (e.g., width, height, object counts) and background settings in real-time.
- **Raycasting Support**: Easily handle user interaction with 3D objects.
- **Combat Management**: Manage player interactions and turns in a simulated combat scenario.
- **Pathfinding**: Efficient navigation logic for players and objects.

## Usage

- Open the project in your browser at `#`.
- Use the GUI panel to customize the scene and interact with the world.

## File Structure
```
project-root/
├── public/                      # Static assets
├── src/                         # Main source files
│   ├── CombatManager.js         # Combat management logic
│   ├── main.js                  # Entry point of the application
│   ├── pathfinding.js           # Pathfinding algorithms
│   ├── player.js                # Player-related logic
│   ├── utils.js                 # Utility functions
│   ├── world.js                 # World generation logic
│   ├── actions/                 # Action-related logic
│   │   ├── Action.js            # Base class for actions
│   │   └── MovementAction.js    # Action for player movement
|   ├── helpers/
│   │   └── RaycastingHelper.js  # Helper for raycasting logic
│   ├── objects/                 # 3D object definitions
│   │   ├── Bush.js              # Bush object
│   │   ├── GameObject.js        # Base class for objects
│   │   ├── Rock.js              # Rock object
│   │   └── Tree.js              # Tree object
│   └── players/                 # Player-related classes
│       ├── HumanPlayer.js       # Logic for human-controlled players
│       └── Player.js            # Base class for players
├── package.json                 # Project metadata and dependencies
└── README.md                    # Project documentation
```

## Key Scripts
- **`main.js`**: Initializes the scene, camera, controls, and GUI.
- **`world.js`**: Handles the generation of the 3D world.
- **`pathfinding.js`**: Implements pathfinding algorithms for efficient navigation in the 3D environment. This script ensures that players and objects can move dynamically while avoiding obstacles.
- **`CombatManager.js`**: Manages combat logic and turn-taking.
- **`RaycastingHelper.js`**: Provides utilities for raycasting.

## Customization

- Modify the default parameters for the world, such as its width, height, and the number of objects (trees, rocks, bushes) by editing `world.js` or through the GUI.
- Adjust camera settings, such as the field of view and initial position, in `main.js`.
- Add new textures or replace the default background by updating the `assets/` directory and configuring the `TextureLoader`.

## Dependencies

- **Three.js**: Used for rendering the 3D scene.
- **OrbitControls**: Provides camera control functionality.
- **Stats.js**: Displays performance stats.
- **lil-gui**: Lightweight GUI for real-time parameter adjustment.

## Future Enhancements
- Add more object types to the world (e.g., water, mountains).
- Implement advanced lighting effects such as shadows and reflections.
- Support saving and loading world configurations.
- NPCs

## Acknowledgements
- [Three.js Documentation](https://threejs.org/docs/)
- [lil-gui](https://lil-gui.georgealways.com/)
- [OrbitControls](https://threejs.org/examples/#controls/OrbitControls)

