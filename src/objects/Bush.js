import * as THREE from 'three';
import { GameObject } from './GameObject';

const bushMaterial = new THREE.MeshStandardMaterial({
  color: 0x80a040,
  flatShading: true
});

const bushGeometry = new THREE.SphereGeometry(1, 8, 8);

export class Bush extends GameObject {
  minRadius = 0.2;
  maxRadius = 0.4;

  /**
   * @param {THREE.Vector3} coords 
   */
  constructor(coords) {
    super(coords, bushGeometry, bushMaterial);

    this.name = `Bush-(${coords.x},${coords.z})`;

    const radius = this.minRadius +
      (Math.random() * (this.maxRadius - this.minRadius));

    this.scale.set(radius, radius, radius);
    this.position.set(
      coords.x + 0.5,
      coords.y + radius,
      coords.z + 0.5
    );
  }
}