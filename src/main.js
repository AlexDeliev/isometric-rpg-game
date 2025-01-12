import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { World } from './world.js';
import { Player } from './player.js';


const gui = new GUI();

const stats = new Stats();
document.body.appendChild( stats.dom );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );

//Change the background color of the scene
scene.background = new THREE.Color(0x87ceeb); // Светлосин цвят

// Creating world with width and height
const world = new World(10, 10);
scene.add(world);

// Creating player
const player = new Player(camera, world);
scene.add(player);

// Creating directional light (simulating sunlight) to illuminate the scene
const sun = new THREE.DirectionalLight();
sun.intensity = 3;  
sun.position.set( 1, 2, 3 );
scene.add(sun);

// Creating ambient light with low intensity for natural lighting
const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

/* Creating a cube with geometry and material
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
*/

// Set the camera position to the center of the world
//camera.position.set(10, 2, 10); // Correctly set the camera position
const centerX = world.width / 2;
const centerZ = world.height / 2;

camera.position.set(centerX, 10, centerZ + 10); // Camera position set to the center of the world and 10 units above it
controls.target.set(centerX, 0, centerZ);       // Set the camera target to the center of the world
controls.update();

function animate() {

	controls.update();
	renderer.render( scene, camera );
  stats.update();// Update performance stats
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});

// Creating a GUI for interactive cube settings
const worldFolder = gui.addFolder('World');
worldFolder.add(world, 'width', 1, 20, 1).name('Width');
worldFolder.add(world, 'height', 1, 20, 1).name('Height');
worldFolder.add(world, 'treeCount', 0, 100, 1).name('Tree Count');
worldFolder.add(world, 'rockCount', 0, 100, 1).name('Rock Count');  
worldFolder.add(world, 'bushCount', 0, 100, 1).name('Bush Count');  
/*worldFolder.addColor({ color: world.terrain.material.color.getStyle() }, 'color')
    .name('Terrain Color')
    .onChange((value) => {
        world.terrain.material.color.set(value); // Update the terrain color
    });
*/
// Добавяне на GUI опция за промяна на цвета на фона
gui.addColor({ background: scene.background.getStyle() }, 'background')
    .name('Background Color')
    .onChange((value) => {
        scene.background.set(value); // Задаване на новия цвят
    });

worldFolder.add(world, 'generate').name('Generate');
