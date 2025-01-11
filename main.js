import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const gui = new GUI();

const stats = new Stats();
document.body.appendChild( stats.dom );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );

// Creating directional light (simulating sunlight) to illuminate the scene
const sun = new THREE.DirectionalLight();
sun.position.set( 1, 2, 3 );
scene.add(sun);

// Creating ambient light with low intensity for natural lighting
const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

// Creating a cube with geometry and material
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
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
const folder = gui.addFolder('Cube');
folder.add(cube.position, 'x', -2, 2, 0.1).name('Position X');
folder.addColor(cube.material, 'color');