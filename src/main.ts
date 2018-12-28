import * as THREE from "three";
import { Mesh } from "three";

window.addEventListener("load", init);

function init() {
  const canvas = document.querySelector("#app");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1.0);
  camera.position.set(0, 0, 500);

  const textList = [];

  const loader = new THREE.FontLoader();
  loader.load("Motosansserif_Regular.json", function(font) {
    for (let i = 0; i < 200; i++) {
      const textGeometry = new THREE.TextGeometry(randomChar(), {
        font: font,
        size: 50,
        height: 5,
        curveSegments: 12
      });
      textGeometry.center();
      const material = new THREE.MeshLambertMaterial({ color: randomColor() });
      const textMesh = new THREE.Mesh(textGeometry, material);
      textMesh.position.x = (Math.random() - 0.5) * 500;
      textMesh.position.y = (Math.random() - 0.5) * 500;
      textMesh.position.z = (Math.random() - 0.5) * 500;
      textMesh.rotation.x = Math.random() * 2 * Math.PI;
      textMesh.rotation.y = Math.random() * 2 * Math.PI;
      textMesh.rotation.z = Math.random() * 2 * Math.PI;
      scene.add(textMesh);
      textList.push(textMesh);
    }
  });

  const ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);

  tick();

  function tick(): void {
    for (let value of textList) {
      value.rotation.x += 0.01;
      value.rotation.y += 0.01;
      value.rotation.z += 0.01;
      value.position.y -= 1;
      if (value.position.y < -250) value.position.y = 250;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", onReSize);

  function onReSize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  onReSize();

  function randomChar() {
    const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return c[Math.floor(Math.random() * c.length)];
  }
  function randomColor() {
    const c = [
      0xff8484,
      0xff84c1,
      0xff84ff,
      0xc184ff,
      0x8484ff,
      0x84c1ff,
      0x84ffff,
      0x84ffc1,
      0x84ff84,
      0xc1ff84,
      0xffff84,
      0xffc184
    ];
    return c[Math.floor(Math.random() * c.length)];
  }
}

function clock() {
  const now = new Date();
  const h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;
  document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
}
setInterval(clock, 1000);
