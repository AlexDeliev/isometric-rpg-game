import * as THREE from 'three';
import { GameObject } from './GameObject';

const rockGeometry = new THREE.SphereGeometry(1, 6, 5);

const rockMaterial = new THREE.MeshStandardMaterial({
  color: 0xb0b0b0,
  flatShading: true
});

export class Rock extends GameObject {
  minRadius = 0.2;
  maxRadius = 0.4;
  minHeight = 0.1;
  maxHeight = 0.3;

  /**
   * @param {THREE.Vector3} coords 
   */
  constructor(coords) {
    super(coords, rockGeometry, rockMaterial);

    this.name = `Rock-(${coords.x},${coords.z})`;

    const radius = this.minRadius +
      (Math.random() * (this.maxRadius - this.minRadius));
    const height = this.minHeight +
      (Math.random() * (this.maxHeight - this.minHeight));

    this.scale.set(radius, height, radius);
    this.position.set(
      coords.x + 0.5,
      coords.y + height / 4,
      coords.z + 0.5
    );
  }
}