import * as THREE from 'three'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {ArcballControls} from 'three/addons/controls/ArcballControls.js'

const FOV = 45;
const W_WIDTH = 800;
const W_HEIGHT = 600;
const PIXEL_RATIO = window.devicePixelRatio;
const ASPECT_RATIO = W_WIDTH / W_HEIGHT;
const MAIN_CANVAS = document.querySelector("#main-canvas");

//COLORS
const C_BLACK = 0x000000;
const C_WHITE = 0xffffff;

//SCENE
const scene = new THREE.Scene();

//RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: MAIN_CANVAS,
    alpha: true
});
renderer.setSize(W_WIDTH, W_HEIGHT);
renderer.setPixelRatio(PIXEL_RATIO);
renderer.setClearColor(C_BLACK, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;

//CAMERA
const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 1 , 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

//SPOTLIGHT
const spotLight = new THREE.SpotLight(C_WHITE, 3000, 100, .2, 1);
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