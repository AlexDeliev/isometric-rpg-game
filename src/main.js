import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { World } from './world';
import { HumanPlayer } from './players/HumanPlayer';
import { CombatManager } from './CombatManager';
import { Action, MovementAction } from './actions';

const gui = new GUI();

const stats = new Stats()
document.body.appendChild(stats.dom)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(5, 0, 5);
camera.position.set(0, 2, 0);
controls.update();

//Change the background color of the scene
scene.background = new THREE.Color(0x87ceeb);

const world = new World(10, 10);
scene.add(world);

// Create materials for the players
const blueMaterial = new THREE.MeshStandardMaterial({ color: 0x4040c0 });
const redMaterial = new THREE.MeshStandardMaterial({ color: 0xc04040 });

// Create two players
const player1 = new HumanPlayer(new THREE.Vector3(1, 0, 5), camera, world);
scene.add(player1);
world.addObject(player1, 'players');

const player2 = new HumanPlayer(new THREE.Vector3(8, 0, 3), camera, world);
scene.add(player2);
world.addObject(player2, 'players');

const combatManager = new CombatManager();
combatManager.addPlayer(player1);
combatManager.addPlayer(player2);

const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1, 2, 3);
scene.add(sun);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

// Set the camera position to the center of the world
//camera.position.set(10, 2, 10); // Correctly set the camera position
const centerX = world.width / 2;
const centerZ = world.height / 2;

camera.position.set(centerX, 10, centerZ + 10); // Camera position set to the center of the world and 10 units above it
controls.target.set(centerX, 0, centerZ);       // Set the camera target to the center of the world
controls.update();

function animate() {
  controls.update();
  renderer.render(scene, camera);
  stats.update();
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const worldFolder = gui.addFolder('World');
worldFolder.add(world, 'width', 1, 20, 1).name('Width');
worldFolder.add(world, 'height', 1, 20, 1).name('Height');
worldFolder.add(world, 'treeCount', 1, 100, 1).name('Tree Count');
worldFolder.add(world, 'rockCount', 1, 100, 1).name('Rock Count');
worldFolder.add(world, 'bushCount', 1, 100, 1).name('Bush Count');
worldFolder.add(world, 'generate').name('Generate');
gui.addColor({ background: scene.background.getStyle() }, 'background')
    .name('Background Color')
    .onChange((value) => {
        scene.background.set(value); // Задаване на новия цвят
    });
combatManager.takeTurns();