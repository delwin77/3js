import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

camera.position.z = 4.4;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

let hari
const loader = new GLTFLoader();
loader.load("./hari.glb", (glif) => {
    hari = glif.scene;
    // hari.rotation.x = 20
    // hari.position.y = -10
    scene.add(hari)
}, (xhr) => {
    // console.log(xhr);
}, (error) => {
    console.error(error);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
topLight.position.set(500, 500, 500);
scene.add(topLight);

let allowRotation = false;
const modelName = document.getElementById('modelName');

window.addEventListener('wheel', (e) => {
    if (!allowRotation) {
        modelName.classList.add('hidden');
        allowRotation = true;
    }

    if(scrollY < 15){
        modelName.classList.remove('hidden');
    }else{
        modelName.classList.add('hidden');
    }
});


let scrollY = 0;
const rotationRadius = 5;

window.addEventListener('wheel', (event) => {
    scrollY += event.deltaY * 0.01;
    scrollY = Math.max(0, scrollY);

    const angle = scrollY * 0.1;
    camera.position.x = Math.sin(angle) * rotationRadius;
    camera.position.z = Math.cos(angle) * rotationRadius;
    camera.lookAt(scene.position);
});

function animate() {
    requestAnimationFrame(animate);

    // if(hari){
    //     // hari.rotation.y += 0.02;
    //     // hari.rotation.x += 0.01;
    // }
    

    renderer.render(scene, camera);
}
animate();
