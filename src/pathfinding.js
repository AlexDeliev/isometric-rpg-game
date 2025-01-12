import * as THREE from 'three';
import { World } from "./world";

const getKey = (coords) => `${coords.x}-${coords.y}`;

/**
 * A* pathfinding algorithm
 * @param {THREE.Vector2} start 
 * @param {THREE.Vector2} end 
 * @param {World} world 
 * @returns {THREE.Vector2[]} Returns an array of coordinates that represent the path
 */

export function search(start, end, world){    
    //If the start and end are the same, skip the search
    if(start.x === end.x && start.y === end.y) {
        return [];//Return an empty array
    }
    console.log(`Searching from ${start.x},${start.y} to ${end.x},${end.y}`);
    
    const maxSearchDistance = 20;//Maximum distance to search
    const visited = new Set();//The set of visited nodes
    const frontier = [start];//The frontier is the list of nodes to explore
  

    //While there are still nodes to explore
    while(frontier.length > 0) {
        //Get the square whit the shortest metric
        // Dijkstra's algorithm - distance to origin
        // A* algorithm - distance to origin + distance to destination
        frontier.sort((v1, v2) => {
            const d1 = start.manhattanDistanceTo(v1);
            const d2 = start.manhattanDistanceTo(v2);

            return d1 - d2;
        })

        const candidate = frontier.shift();//Get the square with the shortest metric
        console.log('Candidate', candidate);

        //Did we find the end goal?
        if(candidate.x === end.x && candidate.y === end.y) {
            console.log('Found the end');
            break;
        }

        //Mark the square as visited
        visited.add(getKey(candidate));

        // If we have exceeded the maximum search distance, skip this square
        if(candidate.manhattanDistanceTo(start) > maxSearchDistance) {
            continue;
        }

        

        
        // Search the neighbors of the square
        const neighbors = getNeighbors(candidate, world, visited);
        frontier.push(...neighbors);
    }
}

//Get the neighbors of a set of coordinates
/**
 * Get the neighbors of a set of coordinates
 * @param {THREE.Vector2} coords
 * @param {World} world
 * @param {Set} visited
 */
function getNeighbors(coords, world, visited) {
    let neighbors = [];

    //Left
    if(coords.x > 0) {
        neighbors.push(new THREE.Vector2(coords.x - 1, coords.y));
    }
    //Right
    if(coords.x < world.width - 1) {
        neighbors.push(new THREE.Vector2(coords.x + 1, coords.y));
    }
    //Top
    if(coords.y > 0) {
        neighbors.push(new THREE.Vector2(coords.x, coords.y - 1));
    }
    //Bottom
    if(coords.y < world.height - 1) {
        neighbors.push(new THREE.Vector2(coords.x - 1, coords.y + 1));
    }

    //Filter out the neighbors that have already been visited
    neighbors = neighbors.filter(coords => !visited.has(getKey(coords)));
 
    return neighbors;
}