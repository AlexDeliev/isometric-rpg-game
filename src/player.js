import * as THREE from 'three';

export class Player extends THREE.Mesh {
    /** 
     * @type {THREE.Raycaster} 
    **/
    raycaster = new THREE.Raycaster();

    constructor(camera, terrain) {
        super();
        this.geometry = new THREE.CapsuleGeometry(0.25, 0.5);
        this.material = new THREE.MeshStandardMaterial({ color: 0x4040c0 });
        this.position.set(5.5, 0.5, 5.5);

        this.camera = camera;
        this.terrain = terrain;
        window.addEventListener( 'mousedown', this.onMouseDown.bind(this));
    }
    /** 
     * @param {MouseEvent} event 
    **/

    onMouseDown(event) {
        //console.log('Mouse down');

        const coords = new THREE.Vector2( 
            (event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1
        );

        // update the picking ray with the camera and pointer position
        this.raycaster.setFromCamera( coords, this.camera );
        
        // calculate objects intersecting the picking ray
        const intersection = this.raycaster.intersectObjects([this.terrain]);
    
        
        if(intersection.length > 0) { 
            this.position.set(
                Math.floor(intersection[0].point.x) + 0.5,
                0.5,
                Math.floor(intersection[0].point.z) + 0.5
            )
        }
    }
}


