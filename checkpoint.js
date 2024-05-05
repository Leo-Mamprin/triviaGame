import * as THREE from 'three';

class CheckPoint {
    constructor(scene, x, y, z) {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0});
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.x = x
        this.cube.position.y = y;
        this.cube.position.z = z;
        this.scene = scene;
        this.scene.add(this.cube);
    }
}

export {CheckPoint}