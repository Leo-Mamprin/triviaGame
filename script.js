//TODO: risolvere i problemi della rotazione


import * as THREE from 'three';
import { Map } from './map.js';
import { Pin } from './pin.js';
import { hideTriviaCard, res } from "./card.js";
import { getQuiz } from "./quiz.js";

let scene = null;
let renderer = null;
let camera = null;
let mappa = null;
let personaggio = null;
let currentCheckpointIndex = 0;
let currentCheckpoint = null;
let gameState = null;
let clock;
let distance;
let dl;

function initScene() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 10);
    //camera.lookAt(personaggio.position);

    dl = new THREE.DirectionalLight(0xffffff, 100);
    dl.position.set(0, 30, 0);
    scene.add(dl);

    clock = new THREE.Clock();

    mappa = new Map(scene, camera);
    scene.add(mappa);

    personaggio = new Pin(scene);
    personaggio.setPosition(5, -4.3, -0.2);
    scene.add(personaggio);

    renderer.setAnimationLoop(animate);
    enterWait();
}

function onClick_Wait() {
    enterMove();
}

function enterWait() {
    gameState = "WAIT";
    document.addEventListener("click", onClick_Wait, false);
}

function doWait() {}

function enterMove() {
    gameState = "MOVE";
    personaggio.walk();
    document.removeEventListener("click", onClick_Wait, false);

    currentCheckpoint = mappa.checkPoints[currentCheckpointIndex]
    distance = personaggio.position.distanceTo(currentCheckpoint.cube.position);
}

function doMove(dt) {
    if (distance < 0.1) {
        enterQuestion();
        currentCheckpointIndex++;
    } else {
        const nextCheckpoint = mappa.checkPoints[currentCheckpointIndex];
        const position = nextCheckpoint.cube.position;
        personaggio.moveTo(position.x, position.y, position.z);
        distance = personaggio.position.distanceTo(currentCheckpoint.cube.position);
    }
}

async function enterQuestion() {
    gameState = "QUESTION";
    personaggio.idle();
    await getQuiz();

    for (let i = 0; i < document.getElementsByClassName("answer").length; i++) {
        document.getElementById("answer" + i).addEventListener("click", onClick_Question);
    }
}

function doQuestion() {}

async function onClick_Question() {
    setTimeout(hideTriviaCard, 2000);

    if (res) {
        if (currentCheckpointIndex < 6) setTimeout(enterMove, 4500);
        else setTimeout(win, 2000);
    } else {
        setTimeout(null, 4500)
        setTimeout(enterQuestion, 4500);
    }
}

function win() {
    gameState = "WIN";
    personaggio.win();
    document.removeEventListener("click", onClick_Wait, false);
    document.getElementById("message").innerHTML = "You Win!"
    document.getElementById("message").style.display = "block";
}

function animate() {
    let dt = clock.getDelta();

    personaggio.update(dt);

    // Update camera position to follow the pin
    camera.position.lerp(new THREE.Vector3(personaggio.position.x, personaggio.position.y + 5, personaggio.position.z + 10), 0.1);
    camera.lookAt(personaggio.position);

    switch (gameState) {
        case "WAIT":
            doWait();
            break;
        case "MOVE":
            doMove(dt);
            break;
        case "QUESTION":
            doQuestion();
            break;
    }

    renderer.clear();
    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initScene, 100);
});

export { personaggio, currentCheckpointIndex, gameState };
