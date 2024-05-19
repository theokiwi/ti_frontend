import * as THREE from 'three'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {ArcballControls} from 'three/addons/controls/ArcballControls.js'

const FOV = 75;
const CAMERA_DEPTH = 5;
const W_WIDTH = window.innerWidth;
const W_HEIGHT = window.innerHeight;
const PIXEL_RATIO = window.devicePixelRatio;
const ASPECT_RATIO = W_WIDTH / W_HEIGHT;

//COLORS
const C_BLACK = 0x000000;
const C_WHITE = 0xffffff;

//SCENE
const scene = new THREE.Scene();

//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(W_WIDTH, W_HEIGHT);
renderer.setPixelRatio(PIXEL_RATIO);
renderer.setClearColor(C_BLACK);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

//CAMERA
const camera = new THREE.PerspectiveCamera(45, ASPECT_RATIO, 1 , 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0,0,0);

//SPOTLIGHT
const spotLight = new THREE.SpotLight(C_WHITE, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
scene.add(spotLight);

//LOADER
const loader = new GLTFLoader().setPath("public/computer/");
loader.load("scene.gltf", (glft)=>{
    const mesh = glft.scene;
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
})

//CONTROLS
const controls = new ArcballControls(camera, renderer.domElement, scene);
controls.addEventListener("change", ()=>{
    renderer.render(scene, camera);
})

controls.update();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();