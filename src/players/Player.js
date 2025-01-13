import * as THREE from 'three';
import { GameObject } from '../objects/GameObject';
import { World } from '../world';

const geometry = new THREE.CapsuleGeometry(0.25, 0.5);
const material = new THREE.MeshStandardMaterial({ color: 0x4040c0 });

/**
 * Base player class that human and computer players derive from
 */
export class Player extends GameObject {
  name = 'Player';

  /**
   * Instantiates a new instance of the player
   * @param {THREE.Vector3} coords 
   * @param {THREE.Camera} camera 
   * @param {World} world 
   */
  constructor(coords, camera, world, material = new THREE.MeshStandardMaterial({ color: 0x4040c0 })) {
    super(coords, geometry, material);
    this.moveTo(coords);
    this.camera = camera;
    this.world = world;
  }

  /**
   * Wait for the player to choose a target square
   * @returns {Promise<Vector3 | null>}
   */
  async getTargetSquare() {
    return null;
  }

  /**
   * Wait for the player to choose a target GameObject
   * @returns {Promise<GameObject | null>}
   */
  async getTargetObject() {
    return null;
  }

  /**
   * Wait for the player to select an action to perform
   * @returns {Promise<Action | null>}
   */
  async requestAction() {
    return null;
  }
}