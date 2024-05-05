import * as THREE from 'three';
import {GLTFLoader} from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import {CheckPoint} from './checkpoint.js';

class Map extends THREE.Group {
    constructor(scene) {
        super();
        this.checkPoints = [];
        this.model = null;
        this.scene = scene;
        this.mixer = null;

        let loader = new GLTFLoader();
        loader.load('./asset/rome.glb', (gltf) => {
            this.model = gltf.scene;
            this.add(this.model);
            this.mixer = new THREE.AnimationMixer(this.model);
        });

        this.addCheckPoints();
    }

    addCheckPoints() {
        this.checkPoints.push(new CheckPoint(this.scene, 12, -4.3, -3.5));
        this.checkPoints.push(new CheckPoint(this.scene, -6, -4.3, 12));
        this.checkPoints.push(new CheckPoint(this.scene, -10, -4.3, 7));
        this.checkPoints.push(new CheckPoint(this.scene, -18, -4.3, -0.2));
        this.checkPoints.push(new CheckPoint(this.scene, -4, -4.3, -13));
        this.checkPoints.push(new CheckPoint(this.scene, 4.5, -4.3, -23));
    }
}

export {Map};
