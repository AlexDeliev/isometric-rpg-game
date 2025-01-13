import * as THREE from 'three';
import { GameObject } from './GameObject';

const treeGeometry = new THREE.ConeGeometry(0.5, 2, 8);

const treeMaterial = new THREE.MeshStandardMaterial({
  color: 0x305010,
  flatShading: true
});

export class Tree extends GameObject {
  /**
   * @param {THREE.Vector3} coords 
   */
  constructor(coords) {
    super(coords, treeGeometry, treeMaterial);

    this.name = `Tree-(${coords.x},${coords.z})`;

    this.position.set(
      coords.x + 0.5,
      coords.y /2 + 1,
      coords.z + 0.5
    );
  }
}