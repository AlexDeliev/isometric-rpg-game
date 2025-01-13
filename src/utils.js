/**
 * @param {THREE.Vector3} coords 
 * @returns Returns the key for the object map given a set of coordinates
 */
export function getKey(coords) {
    return `${coords.x}-${coords.y}-${coords.z}`;
  }