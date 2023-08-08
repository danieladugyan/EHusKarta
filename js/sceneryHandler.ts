import { ArrowHelper, BackSide, BoxGeometry, Mesh, MeshBasicMaterial, Scene, SphereGeometry, TextureLoader, Vector3 } from "three";

export const scenery = {
  scene: new Scene(),
  sphere: createSphere(),
  skybox: createSkybox(),
  arrow: createArrow(),
};

export function createSkybox() {
  const materials: MeshBasicMaterial[] = [];
  const textureFront = new TextureLoader().load('Skybox/front.png');
  const textureBack = new TextureLoader().load('Skybox/Back.jpg');
  const textureUp = new TextureLoader().load('Skybox/up.png');
  const textureDown = new TextureLoader().load('Skybox/Down.jpg');
  const textureRight = new TextureLoader().load('Skybox/left.jpg');
  const textureLeft = new TextureLoader().load('Skybox/right.png');

  materials.push(new MeshBasicMaterial({ map: textureFront }));
  materials.push(new MeshBasicMaterial({ map: textureBack }));
  materials.push(new MeshBasicMaterial({ map: textureUp }));
  materials.push(new MeshBasicMaterial({ map: textureDown }));
  materials.push(new MeshBasicMaterial({ map: textureRight }));
  materials.push(new MeshBasicMaterial({ map: textureLeft }));

  for (let i = 0; i < 6; i++) materials[i].side = BackSide;

  const skyboxGeo = new BoxGeometry(5000, 5000, 5000);
  const skybox = new Mesh(skyboxGeo, materials);
  return skybox;
}

export function createSphere() {
  const geometry = new SphereGeometry(1, 8, 8);
  const material = new MeshBasicMaterial({
    color: 'lightgreen',
  });

  const sphereMesh = new Mesh(geometry, material);
  sphereMesh.position.set(-8, -15, 7);
  sphereMesh.scale.set(0.5, 0.5, 0.5);

  return sphereMesh;
}

export function createArrow() {
  const dir = new Vector3(0, -1, 0);
  const orgin = new Vector3(0, -100, 0);
  const length = 1;
  const hex = 'lightgreen';

  return new ArrowHelper(dir, orgin, length, hex);
}
