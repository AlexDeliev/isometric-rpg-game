import { Action } from './Action';
import { World } from '../world';
import { Player } from '../players/Player';
import { GameObject } from '../objects/GameObject';

export class MeleeAttackAction extends Action {
  name = 'Melee Attack';

  /**
   * @type {GameObject}
   */
  target;

  /**
   * 
   * @param {Player} source 
   */
  constructor(source) {
    super(source);
  }

  /**
   * Performs the action
   * @param {World} world 
   */
  async perform(world) {
    this.target.hit(Math.ceil(5 * Math.random()));
  }

  /**
   * Returns true if the action can be performed
   * @param {World} world 
   * @returns {Promise<{value: boolean, reason: string?}>}
   */
  async canPerform(world) {
    this.target = await this.source.getTargetObject(world);

    if (!this.target) {
      return {
        value: false,
        reason: 'No target selected, please try again.'
      };
    }

    if (this.target === this.source) {
      return {
        value: false,
        reason: 'Cannot target self.'
      };
    }

    // Get the distance to the target
    const distanceToTarget = this.target.coords.clone().sub(this.source.coords).length();

    if (distanceToTarget > 1) {
      return {
        value: false,
        reason: 'Target is out of range.'
      };
    }

    return { value: true };
  }
}