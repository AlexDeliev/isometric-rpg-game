import * as THREE from 'three';
import { GameObject } from '../objects/GameObject';
import { World } from '../world';
import { Action, MeleeAttackAction, MovementAction, RangedAttackAction, WaitAction } from '../actions';

const geometry = new THREE.CapsuleGeometry(0.25, 0.5);

/**
 * Base player class that human and computer players derive from
 */
export class Player extends GameObject {
  name = 'Player';

  /**
   * Instantiates a new instance of the player
   * @param {THREE.Vector3} coords 
   */
  constructor(coords) {
    const material = new THREE.MeshStandardMaterial({ color: 0x4040c0 });
    super(coords, geometry, material);
    this.moveTo(coords);
    this.healthDisplay.visible = true;
  }

  /**
   * 
   * @returns {Action[]}
   */
  getActions() {
    return [
      new MovementAction(this),
      new MeleeAttackAction(this),
      new RangedAttackAction(this),
      new WaitAction()
    ];
  }

  /**
   * Wait for the player to choose a target square
   * @param {World} world
   * @returns {Promise<Vector3 | null>}
   */
  async getTargetSquare(world) {
    return null;
  }

  /**
   * Wait for the player to choose a target GameObject
   * @param {World} world
   * @returns {Promise<GameObject | null>}
   */
  async getTargetObject(world) {
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