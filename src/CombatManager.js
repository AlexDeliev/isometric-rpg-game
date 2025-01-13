import * as THREE from 'three';
import { Player } from './players/Player';

export class CombatManager {
  /**
   * @type {Player[]} Active players in combat
   */
  players = [];

  constructor() {

  }

  /**
   * Get player's initiative and add them to the
   * array of players
   * @param {Player} player 
   */
  addPlayer(player) {
    this.players.push(player);
  }

  /**
   * Main combat loop
   */
  async takeTurns(world) {
    while (true) {
      for (const player of this.players) {
        if (player.isDead) continue;

        player.material.color = new THREE.Color(0xffff00);

        let actionPerformed = false;
        do {
          const action = await player.requestAction();
          if (await action.canPerform(world)) {
            // Wait for the player to finish performing their action
            await action.perform(world);
            actionPerformed = true;
          } else {
            alert('Cannot perform action, pick another action.');
          }
        } while (!actionPerformed)

        player.material.color = new THREE.Color(0x0000ff);
      }
    }
  }
}