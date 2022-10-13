import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const plane02MeshX = -60;
const plane02MeshY = -50;

const plane03MeshX = -260;
const plane03MeshY = -160;
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);

renderer.render(scene, camera);

// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);


// plane01

const plane01 = new THREE.PlaneGeometry(10,10);
const materialPlane01 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const plane01Mesh = new THREE.Mesh(plane01, materialPlane01);
plane01Mesh.position.set(30,8,-18); 

scene.add(plane01Mesh);


// plane02

const plane02 = new THREE.PlaneGeometry(10,10);
const materialPlane02 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const plane02Mesh = new THREE.Mesh(plane02, materialPlane02);
plane02Mesh.position.set(plane02MeshX,plane02MeshY,-10); 
plane02Mesh.quaternion.set(0,0,0,0);

scene.add(plane02Mesh);


const plane03 = new THREE.PlaneGeometry(20,20);
const materialPlane03 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const plane03Mesh = new THREE.Mesh(plane03, materialPlane03);
plane03Mesh.position.set(plane03MeshX,plane03MeshY,0); 
plane03Mesh.quaternion.set(0,0,0,0);

scene.add(plane03Mesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(100));

//   star.position.set(x, y, z);
//   scene.add(star);
// }

// Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

// scene.add(jeff);

// Moon

// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: normalTexture,
//   })
// );

// scene.add(moon);

// moon.position.z = 30;
// moon.position.setX(-10);

// jeff.position.z = -5;
// jeff.position.x = 2;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  //根据页面滚动的距离实时更新plane的位置信息
  plane01Mesh.position.x = 30 + (t* -0.06);
  plane01Mesh.position.z = t* +0.02;

  plane01Mesh.rotation.z -= 0.04;


  plane02Mesh.position.x = plane02MeshX + ( t* -0.07);
  plane02Mesh.position.y = plane02MeshY + ( t* -0.07);
  plane02Mesh.position.z = 0 + (t* +0.02);


  plane03Mesh.position.x = plane03MeshX + ( t* -0.1);
  plane03Mesh.position.y = plane03MeshY + ( t* -0.1);

  plane03Mesh.position.z = t* +0.02;



  // console.log(plane01.position);

  // camera.position.z = t * -0.01;
  // camera.position.x = t * -0.0004;
  // camera.rotation.y = t * -0.0005;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  //plane沿Z轴自旋转
  plane01Mesh.rotation.z += -0.02;

  // moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
