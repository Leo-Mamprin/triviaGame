import * as THREE from 'three';
import { gameState } from './script.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

class Pin extends THREE.Group {
    constructor(scene) {
        super();
        this.model = null;
        this.scene = scene;
        this.activeAction = null;
        this.mixer = null;
        this.animations = [];

        const loader = new GLTFLoader();
        loader.load('./asset/man.glb', (gltf) => {
            this.model = gltf.scene;
            this.add(this.model);

            this.mixer = new THREE.AnimationMixer(this.model);
            this.animations = gltf.animations;

            this.idle();
        });
    }

    update(dt) {
        if (this.mixer !== null) this.mixer.update(dt);
    }

    walk() {
        console.log("walk pin");
        if (this.activeAction) {
            this.activeAction.fadeOut(0.5);
        }
        this.activeAction = this.mixer.clipAction(this.animations[1]);
        this.activeAction.reset();
        this.activeAction.fadeIn(0.5).play();
    }

    idle() {
        console.log("idle pin");
        if (this.activeAction) {
            this.activeAction.fadeOut(0.5);
        }
        this.activeAction = this.mixer.clipAction(this.animations[0]);
        this.activeAction.reset();
        this.activeAction.fadeIn(0.5).play();
    }

    win() {
        console.log("win pin");
        if (this.activeAction) {
            this.activeAction.fadeOut(0.5);
        }
        this.activeAction = this.mixer.clipAction(this.animations[4]);
        this.activeAction.reset();
        this.activeAction.fadeIn(0.5).play();
    }

    lose() {
        console.log("lose pin");
        if (this.activeAction) {
            this.activeAction.fadeOut(0.5);
        }
        this.activeAction = this.mixer.clipAction(this.animations[3]);
        this.activeAction.reset();
        this.activeAction.fadeIn(0.5).play();
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    moveTo(x, y, z) {
        const destination = new THREE.Vector3(x, y, z);
        const distance = this.position.distanceTo(destination);
        const duration = distance / 0.05;
        let timeElapsed = 0;
    
        const updatePosition = () => {
            timeElapsed += 0.016;
            const t = Math.min(timeElapsed / duration, 1);
            this.position.lerp(destination, t);

            const targetRotation = Math.atan2(destination.x - this.position.x, destination.z - this.position.z);

            this.rotation.y = targetRotation;
    
            if (t < 1) {
                requestAnimationFrame(updatePosition);
            }
        };
    
        updatePosition();
    }
}

export { Pin };
