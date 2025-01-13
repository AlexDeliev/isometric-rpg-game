import * as THREE from 'three';
import { World } from "./world";

const getKey = (coords) => `${coords.x}-${coords.y}`;

export function search(start, end, world) {
    if (start.x === end.x && start.y === end.y) {
        return [];
    }

    const maxSearchDistance = 20;
    const cameFrom = new Map();
    const cost = new Map();
    cost.set(getKey(start), 0);
    const frontier = [start];
    let pathFound = false;

    while (frontier.length > 0) {
        frontier.sort((v1, v2) => {
            const d1 = cost.get(getKey(v1)) + v1.manhattanDistanceTo(end);
            const d2 = cost.get(getKey(v2)) + v2.manhattanDistanceTo(end);
            return d1 - d2;
        });

        const candidate = frontier.shift();

        if (candidate.x === end.x && candidate.y === end.y) {
            pathFound = true;
            break;
        }

        if (candidate.manhattanDistanceTo(start) > maxSearchDistance) {
            continue;
        }

        const neighbors = getNeighbors(candidate, world, cost);
        frontier.push(...neighbors);

        neighbors.forEach((neighbor) => {
            cameFrom.set(getKey(neighbor), candidate);
        });
    }

    if (!pathFound) {
        return null;
    }

    const path = [];
    let curr = end;

    while (getKey(curr) !== getKey(start)) {
        path.push(curr);
        curr = cameFrom.get(getKey(curr));
    }
    path.reverse();
    return path;
}

function getNeighbors(coords, world, cost) {
    const neighbors = [];
    const potentialNeighbors = [
        new THREE.Vector2(coords.x - 1, coords.y), // Left
        new THREE.Vector2(coords.x + 1, coords.y), // Right
        new THREE.Vector2(coords.x, coords.y - 1), // Top
        new THREE.Vector2(coords.x, coords.y + 1), // Bottom
    ];

    const currentCost = cost.get(getKey(coords));

    potentialNeighbors.forEach((neighbor) => {
        if (
            neighbor.x >= 0 &&
            neighbor.y >= 0 &&
            neighbor.x < world.width &&
            neighbor.y < world.height &&
            !world.getObject(neighbor)
        ) {
            const newCost = currentCost + 1;
            if (!cost.has(getKey(neighbor)) || newCost < cost.get(getKey(neighbor))) {
                cost.set(getKey(neighbor), newCost);
                neighbors.push(neighbor);
            }
        }
    });

    return neighbors;
}

export class Player extends THREE.Mesh {
    raycaster = new THREE.Raycaster();

    constructor(camera, world) {
        super();
        this.geometry = new THREE.CapsuleGeometry(0.25, 0.5);
        this.material = new THREE.MeshStandardMaterial({ color: 0x4040c0 });
        this.position.set(1.5, 0.5, 5.5);
        this.camera = camera;
        this.world = world;
        window.addEventListener('mousedown', this.onMouseDown.bind(this));
    }

    onMouseDown(event) {
        const coords = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        this.raycaster.setFromCamera(coords, this.camera);
        const intersection = this.raycaster.intersectObject(this.world.terrain);

        if (intersection.length > 0) {
            const playerCoords = new THREE.Vector2(
                Math.floor(this.position.x),
                Math.floor(this.position.z)
            );
            const selectedCoords = new THREE.Vector2(
                Math.floor(intersection[0].point.x),
                Math.floor(intersection[0].point.z)
            );

            const path = search(playerCoords, selectedCoords, this.world);

            if (path === null) {
                console.log("No path found!");
                return;
            }

            while (this.world.path.children.length > 0) {
                const node = this.world.path.children.pop();
                this.world.path.remove(node);
            }

            path.forEach((coords) => {
                const node = new THREE.Mesh(
                    new THREE.SphereGeometry(0.1),
                    new THREE.MeshBasicMaterial({ color: 0xff0000 })
                );
                node.position.set(coords.x + 0.5, 0, coords.y + 0.5);
                this.world.path.add(node);
            });
        }
    }
}
