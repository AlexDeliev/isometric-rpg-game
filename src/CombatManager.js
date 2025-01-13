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
  async takeTurns() {
    while (true) {
      for (const player of this.players) {
        let actionPerformed = false;
        do {
          const action = await player.requestAction();
          if (await action.canPerform()) {
            // Wait for the player to finish performing their action
            await action.perform();
            actionPerformed = true;
          } else {
            alert('Cannot perform action, pick another action.');
          }
        } while (!actionPerformed)
      }
    }
  }
}