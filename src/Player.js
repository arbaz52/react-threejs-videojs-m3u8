import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

export class Player {
  renderer;
  scene;
  camera;
  abortController;
  controls;
  constructor(parent) {
    this.abortController = new AbortController();

    const width = window.innerWidth,
      height = window.innerHeight;

    // init

    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    this.camera.position.z = 5;

    this.scene = new THREE.Scene();

    const light = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(light);

    // adding plane
    const geometry = new THREE.PlaneGeometry(5, 3);
    const texture = new THREE.VideoTexture(document.querySelector("video"));
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    parent.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    //controls.update() must be called after any manual changes to the camera's transform
    this.controls.update();

    this.animate();
  }

  unmount() {
    this.abortController.abort();
    this.renderer.domElement.remove();
  }

  animate() {
    if (!this.abortController.signal.aborted)
      requestAnimationFrame(() => this.animate());

    this.renderer.render(this.scene, this.camera);
  }
}
