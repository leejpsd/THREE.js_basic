import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {FlyControls} from "three/examples/jsm/controls/FlyControls"
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls"
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls"
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import { mix } from 'three/examples/jsm/nodes/Nodes';

const renderer = new THREE.WebGLRenderer({antialias:true}); // 출력하는 기계 , 모니터 //antialias 모서리 우글우글 방지 
renderer.shadowMap.enabled = true; // 그림자를 그리기 위한 필수옵션
// renderer.shadowMap.type = THREE.BasicShadowMap // 성능은 좋으나 그림자 품질이 떨어지는 기본옵션
// renderer.shadowMap.type = THREE.PCFShadowMap // BasicShadowMap 보다 품질이 좋음
renderer.shadowMap.type = THREE.PCFSoftShadowMap // PCFShadowMap 보다 품질이 좋으나 성능이 가장 낮음
renderer.setSize(window.innerWidth,window.innerHeight); // 브라우저에 꽉차게 모니터 설정
document.body.appendChild(renderer.domElement) //html 에 추가

const scene = new THREE.Scene(); // 물체가 존재할 공간,장소,캔버스(화면에 꽉차게 장소만듬) 

const camera = new THREE.PerspectiveCamera( // 촬영하는 카메라 , 원근감 있는 기본ㄱ카메라
  60,// 시야각 fov
  window.innerWidth/window.innerHeight, //aspect 촬영하는 장면의 가로세로비율
  0.1, // near 카메라와 가장 가까운 면의 거리
  100, // far 가장 먼 거리 
);

camera.position.z = 8; // 카메라의 위치를 바꿈 , 기본적으로 카메라는 물체와 동일한곳에 존재하는게 기본값
camera.position.y = 1;

// const directionalLight = new THREE.DirectionalLight(0xffffff,5) 
// // 조명 (DirectionalLight 는 직사광선) ,인자 색과 빛의 세기 //MeshStandardMaterial를 위해 추가 
// directionalLight.castShadow = true ; 
// directionalLight.position.set(3,4,5)
// directionalLight.lookAt(0,0,0) // 빛이 바라보는 방향 (기본값 0,0,0)
// scene.add(directionalLight)

const floorGeometry = new THREE.PlaneGeometry(20,20) // 가로 세로 
const floorMaterial = new THREE.MeshStandardMaterial({ color:0xbbbbbb })
const floor = new THREE.Mesh(floorGeometry,floorMaterial);
floor.rotation.x = -Math.PI / 2;  //x축을 기준으로 90도 눕힘
floor.receiveShadow = true; // 그림자를 받는
floor.castShadow = true; // 그림자를 주는
floor.name = 'FLOOR'
scene.add(floor);

// Geometry
// const geometry = new THREE.BoxGeometry(1,1,1) // 가로세로높이가 111 인 박스 , 쉐입 모양
// // const material = new THREE.MeshBasicMaterial({color:0xff0000}) // 색상
// const material = new THREE.MeshStandardMaterial({color:0xff0000}) // MeshStandardMaterial 빛에 영향 즉 빛이 없으면 안보임
// const mesh = new THREE.Mesh(geometry,material)
// mesh.castShadow =true;
// mesh.receiveShadow =true;
// mesh.position.y = 0.5
// scene.add(mesh); // 장소에 물체를 넣음

// const capsuleGeometry = new THREE.CapsuleGeometry(1,2,20,30)
// const capsuleMaterial = new THREE.MeshStandardMaterial({color:0xffff00})
// const capsuleMesh = new THREE.Mesh(capsuleGeometry,capsuleMaterial);
// capsuleMesh.position.set(3,1.75,0)
// capsuleMesh.castShadow =true; // 그림자를 드리우는 
// capsuleMesh.receiveShadow = true //
// scene.add(capsuleMesh)


// const cylinderGeometry = new THREE.CylinderGeometry(1,1,2);
// const cylinderMaterial = new THREE.MeshStandardMaterial({color:0x00ff00})
// const cylinderMesh = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
// cylinderMesh.position.set(-3,1,0);
// cylinderMesh.castShadow=true;
// cylinderMesh.receiveShadow= true;
// scene.add(cylinderMesh)

// const torusGeometry = new THREE.TorusGeometry(0.5,0.1,16,100)
// const torusMaterial = new THREE.MeshStandardMaterial({color:0x0000ff})
// const torusMesh = new THREE.Mesh(torusGeometry,torusMaterial)
// torusMesh.position.set(0,0.5,1);
// torusMesh.castShadow=true;
// torusMesh.receiveShadow= true;
// scene.add(torusMesh)

// const starShape = new THREE.Shape();
// starShape.moveTo(0,1); // 시작점
// starShape.lineTo(0.2,0.2);
// starShape.lineTo(1,0.2);
// starShape.lineTo(0.4,-0.1);
// starShape.lineTo(0.6,-1);
// starShape.lineTo(0,-0.5)
// starShape.lineTo(-0.6,-1);
// starShape.lineTo(-0.4,-0.1);
// starShape.lineTo(-1,0.2);
// starShape.lineTo(-0.2,0.2);
// const shapeGeometry = new  THREE.ShapeGeometry(starShape);
// const shapeMaterial = new THREE.MeshStandardMaterial({color:0xff00ff})
// const shapeMesh = new THREE.Mesh(shapeGeometry,shapeMaterial);
// shapeMesh.position.set(0,1,2);
// scene.add(shapeMesh)

// const extrudeSettings = { // 쉐입메쉬를 입체로 만들기 위한 속성
//   steps: 1, // 부드럽게
//   depth:0.1, // 입체의 두께
//   bevelEnabled:true, // 모서리를 둥글게
//   bevelThickenss: 0.1, // 모서리 두께 
//   bevelSize:0.3, // 모서리의 크기
//   bevelSegments: 100, // 모서리의 얼마나 매끄럽게 나눌지
// }

// const extrudeGeometry = new THREE.ExtrudeGeometry(starShape,extrudeSettings);
// const extrudeMaterial = new THREE.MeshStandardMaterial({color:0x0ddaaf})
// const extrudeMesh = new THREE.Mesh(extrudeGeometry,extrudeMaterial);
// extrudeMesh.position.set(2,1.3,2);
// extrudeMesh.castShadow=true;
// extrudeMesh.receiveShadow= true;
// scene.add(extrudeMesh)


// const sphereGeometry = new THREE.SphereGeometry(1,32,32);
// const sphereMaterial = new THREE.MeshStandardMaterial({color:0x98daaf})
// const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
// sphereMesh.position.set(0,1,-3);
// sphereMesh.castShadow=true;
// sphereMesh.receiveShadow= true;
// scene.add(sphereMesh)


// const numPoints =1000;
// const positions = new Float32Array(numPoints * 3)

// for(let i = 0;i<numPoints;i+=1) {
//   const x = (Math.random() - 0.5) *1;
//   const y = (Math.random() - 0.5) *1;
//   const z = (Math.random() - 0.5) *1;

//   positions[i * 3] =x;
//   positions[i * 3+1] =y;
//   positions[i * 3+2] =z;
// }

// const bufferGeometry = new THREE.BufferGeometry(); //일반 지오메트리에 비해 효율이 좋음 성능 이좋음
// bufferGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positions,3)
// )

// const pointsMaterial = new THREE.PointsMaterial({
//   color: 0xffff00,
//   size: 0.05,
// })

// const point = new THREE.Points(bufferGeometry,pointsMaterial)
// point.position.set(0,0,-5);
// scene.add(point)


//Material 
// const frontSideGeometry = new THREE.BoxGeometry(1,1,1);
// const frontSideMaterial = new THREE.MeshStandardMaterial({
//   color:0x00ffff,
//   side: THREE.FrontSide
// })
// const frontSideMesh = new THREE.Mesh(frontSideGeometry,frontSideMaterial);
// frontSideMesh.position.z =4;
// frontSideMesh.position.y = 0.5;
// frontSideMesh.castShadow= true;
// frontSideMesh.receiveShadow =true;
// scene.add(frontSideMesh)

// const backSideGeometry = new THREE.BoxGeometry(1,1,1);
// const backSideMaterial = new THREE.MeshStandardMaterial({
//   color:0x00ff00,
//   side: THREE.BackSide
// })
// const backSideMesh = new THREE.Mesh(backSideGeometry,backSideMaterial);
// backSideMesh.position.set(2,0.5,4)
// backSideMesh.position.y = 0.51;
// // backSideMesh.castShadow= true;
// backSideMesh.receiveShadow =true;
// scene.add(backSideMesh)

// const doubleSideGeometry = new THREE.BoxGeometry(1,1,1);
// const doubleSideMaterial = new THREE.MeshStandardMaterial({
//   color:0x00ff00,
//   side: THREE.DoubleSide
// })
// const doubleSideMesh = new THREE.Mesh(doubleSideGeometry,doubleSideMaterial);
// doubleSideMesh.position.set(4,0.5,4)
// doubleSideMesh.position.y = 0.51;
// //  doubleSideMesh.castShadow= true;
// doubleSideMesh.receiveShadow =true;
// scene.add(doubleSideMesh)

// const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,20);

// const torusKnotStandMaterial = new THREE.MeshStandardMaterial({
//   color:0xff0000,
// })
// torusKnotStandMaterial.roughness = 0.5;
// torusKnotStandMaterial.metalness= 1;

// const torusKnotStandMesh = new THREE.Mesh(torusKnotGeometry,torusKnotStandMaterial)
// torusKnotStandMesh.castShadow =true;
// torusKnotStandMesh.receiveShadow=true;
// torusKnotStandMesh.position.set(-4,1,0)
// scene.add(torusKnotStandMesh)



// const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
//   color:0xff0000,
// })
// torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00) // 빛과 상관없이 발광하는 색 ,  가장 어두운 빛의 반대편, 빛이 안받는 부분의 색
// torusKnotLambertMaterial.emissiveIntensity = 0.2 //emissive 의 세기

// const torusKnotLambertMesh = new THREE.Mesh(torusKnotGeometry,torusKnotLambertMaterial)
// torusKnotLambertMesh.castShadow =true;
// torusKnotLambertMesh.receiveShadow=true;
// torusKnotLambertMesh.position.set(-2,1,0)
// scene.add(torusKnotLambertMesh)

// const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({
//   color:0xff0000,
// })
// torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00) // 빛과 상관없이 발광하는 색 , 가장 어두운 빛의 반대편, 빛이 안받는 부분의 색
// torusKnotPhongMaterial.emissiveIntensity = 0.2 //emissive 의 세기
// torusKnotPhongMaterial.specular = new THREE.Color(0x0000ff) // 빛이 가장 세게 받는 부분의 색 
// torusKnotPhongMaterial.shininess = 100 // specular 의 세기
// const torusKnotPhongMesh = new THREE.Mesh(torusKnotGeometry,torusKnotPhongMaterial)
// torusKnotPhongMesh.castShadow =true;
// torusKnotPhongMesh.receiveShadow=true;
// torusKnotPhongMesh.position.set(0,1,0)
// scene.add(torusKnotPhongMesh)

// const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ // 빛의 영향이 없음
//   color:0xff0000,
// })
// const torusKnotBasicMesh = new THREE.Mesh(torusKnotGeometry,torusKnotBasicMaterial)
// torusKnotBasicMesh.castShadow =true;
// torusKnotBasicMesh.receiveShadow=true;
// torusKnotBasicMesh.position.set(2,1,0)
// scene.add(torusKnotBasicMesh)

// const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ // 빛의 영향이 없음
//   color:0xffffff,
// })
// torusKnotDepthMaterial.opacity = 0.5;
// const torusKnotDepthMesh = new THREE.Mesh(torusKnotGeometry,torusKnotDepthMaterial)
// torusKnotDepthMesh.castShadow =true;
// torusKnotDepthMesh.receiveShadow=true;
// torusKnotDepthMesh.position.set(4,1,0)
// scene.add(torusKnotDepthMesh)

// const textureLoader = new THREE.TextureLoader();
// // textureLoader.load("/images.webp",(texture)=>{
// //   const textureBoxGeometry = new THREE.BoxGeometry(1,1,1)
// //   const textureMaterial = new THREE.MeshStandardMaterial({
// //     map:texture
// //   })
// //   const textureMesh = new THREE.Mesh(textureBoxGeometry,textureMaterial)
// //   textureMesh.castShadow =true;
// //   textureMesh.receiveShadow =true;
// //   textureMesh.position.set(0,0.5,2)
// //   scene.add(textureMesh)
// // })
//   const texture = await textureLoader.loadAsync('/images.webp')
//   const textureBoxGeometry = new THREE.BoxGeometry(1,1,1)
//   const textureMaterial = new THREE.MeshStandardMaterial({
//     map:texture
//   })
//   const textureMesh = new THREE.Mesh(textureBoxGeometry,textureMaterial)
//   textureMesh.castShadow =true;
//   textureMesh.receiveShadow =true;
//   textureMesh.position.set(0,0.5,2)
//   scene.add(textureMesh)

// Light
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const boxMaterial = new THREE.MeshStandardMaterial({color:0xfff000})
const boxMesh= new THREE.Mesh(boxGeometry,boxMaterial);
boxMesh.castShadow =true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
// scene.add(boxMesh)

// const ambientLight = new THREE.AmbientLight(0xffffff,5)
// scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff,5)
directionalLight.castShadow = true;
directionalLight.position.set(3,4,5)
directionalLight.lookAt(0,0,0)
directionalLight.shadow.mapSize.width = 4096 // 그림자 해상도 
directionalLight.shadow.mapSize.height = 4096
directionalLight.shadow.camera.top = 2; // 쉐도우 카메라는 기본이 OrthographicCamera 
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;
scene.add (directionalLight)
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,1)
// scene.add(directionalLightHelper)

const gltfLoader = new GLTFLoader();
// 동기적 로드
// gltfLoader.load("/dancer.glb",(gltf)=>{
//   const character = gltf.scene;
//   character.position.y = 0.8;
//   character.scale.set(0.01,0.01,0.01);
//   scene.add(character);
// })
const gltf = await gltfLoader.loadAsync("/dancer.glb")
console.log(gltf)
const character = gltf.scene;
const animationClips = gltf.animations
character.position.y = 0.8;
character.scale.set(0.01,0.01,0.01);
character.castShadow = true;
character.receiveShadow = true;
character.traverse((obj)=>{
  if(obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
}) // 그룹 안에 있는 모든 칠드런 메쉬들의 그림자 속성을 켜줘야 함 
scene.add(character);

const mixer = new THREE.AnimationMixer(character)
const action = mixer.clipAction(animationClips[3])
// action.setLoop(THREE.LoopOnce)
// action.setLoop(THREE.LoopRepeat) // 기본값
// action.setDuration(10) // 재생속도
// action.setEffectiveTimeScale(2) // 재생속도 배수 
// action.setEffectiveWeight(2)
action.setLoop(THREE.LoopPingPong)
action.play()

// setTimeout(()=>{
//   mixer.clipAction(animationClips[3]).paused = true // 애니매이션 정지
// },3000)


// const hemisphereLight = new THREE.HemisphereLight(0xb4a912,0x12f34f,5)
// hemisphereLight.position.set(0,1,0);
// hemisphereLight.lookAt(0,0,0)
// scene.add(hemisphereLight)
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,1)
// scene.add(hemisphereLightHelper)

// const pointLight = new THREE.PointLight(0xffffff,5,5,4)
// pointLight.castShadow =true;
// pointLight.position.set(1,1,1)
// scene.add(pointLight)
// const pointLightHelper = new THREE.PointLightHelper(pointLight,1) 
// scene.add(pointLightHelper)

// const rectAreaLight = new THREE.RectAreaLight(0xffffff,5,2,2)
// rectAreaLight.position.set(0,1,2);
// scene.add(rectAreaLight)

//spotLight 는 lookAt 이 없기 때문에 targetObj 가 필요 
// const targetObj = new THREE.Object3D()
// scene.add(targetObj)
// const spotLight = new THREE.SpotLight(0xffffff,10,100,Math.PI/4,1,1)
// spotLight.castShadow = true;
// spotLight.position.set(0,5,0);
// spotLight.target= targetObj;
// spotLight.target.position.set(1,0,2)
// scene.add(spotLight)
// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)


const orbitControls = new OrbitControls(camera, renderer.domElement);// 카메라 시점 조절
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03; // 0.05 가 기본값 낮을수록 부드럽게 천천히
// orbitControls.enableZoom = true; // 기본값 true false 로 해제가능
// orbitControls.enablePan = true; // 기본값 true , 우클릭 또는 트랙패드로 카메라 축 이동가능
// orbitControls.enableRotate = true; // 기본값 true , 좌클릭 카메라 회전 가능 
// orbitControls.autoRotate = false; // 자동 회전 
// orbitControls.autoRotateSpeed = 10; // 기본값 5
// orbitControls.maxPolarAngle = Math.PI / 2;  // 좌클릭 수직방향(하단) 카메라 이동 범위  
// orbitControls.minPolarAngle = Math.PI / 4;  // 좌클릭 수직방향(상단) 카메라 이동 범위  
// orbitControls.maxAzimuthAngle = Math.PI / 2;  // 좌클릭 수평방향 카메라 이동 범위  
// orbitControls.maxAzimuthAngle = -Math.PI / 2;  // 좌클릭 수평방향 카메라 이동 범위  
// orbitControls.update(); // 위와 같은 orbitControls 속성이 있을경우 아래의 렌더함수에서 실행해야함 

// const flyControls = new FlyControls(camera,renderer.domElement)
// flyControls.movementSpeed = 1; // wasd 방향키로 이동하는 카메라의 속도
// flyControls.rollSpeed = Math.PI / 10;
// flyControls.autoForward = false;

// camera.position.set(0,1,5) // firstPersonControls를 위해 임시변경 
// const firstPersonControls  = new FirstPersonControls(camera, renderer.domElement)
// firstPersonControls.lookSpeed = 0.1; //카메라 시선(축에 의한 회전)의 속도
// firstPersonControls.movementSpeed = 1; //카메라의 이동 속력 카메라 자체를 이동하는 속도 
// firstPersonControls.lookVertical = true; //카메라의 수직이동  활성화

// const pointerLockControls = new PointerLockControls(camera, renderer.domElement)
// window.addEventListener('click',()=>{
//   pointerLockControls.lock()
// })

// const trackballControls = new TrackballControls(camera, renderer.domElement)
// trackballControls.rotateSpeed =2 ; 
// trackballControls.zoomSpeed = 1.5 ;
// trackballControls.panSpeed = 0.5 ;
// trackballControls.noRotate = false;
// trackballControls.noZoom = false;
// trackballControls.noPan = false;
// trackballControls.staticMoving = false; // 댐핑이 있는 무빙을 하겠다.=> false
// trackballControls.dynamicDampingFactor = 0.05;

// //임시로 타겟(메쉬)를 만들고 trackballControls 의 기준 축을 타겟으로 옮김
// const target = new THREE.Mesh( new THREE.SphereGeometry(0.5), new THREE.MeshStandardMaterial({color:0x0000ff}))
// target.position.set(4,0.5,0);
// scene.add(target)
// trackballControls.target = target.position;

const newPosition = new THREE.Vector3(0,1,0)
const rayCaster = new THREE.Raycaster();

renderer.domElement.addEventListener("pointerdown",(e)=>{
  const x = (e.clientX / window.innerWidth) * 2 -1
  const y = -((e.clientY / window.innerHeight) * 2 -1)

  rayCaster.setFromCamera(new THREE.Vector2(x,y), camera)

  const intersects = rayCaster.intersectObjects(scene.children)
  //rayCaster 를 이용해 intersectObjects 오브젝트를 관통한다 . > 씬에 있는 모든 자식들
  

  const intersectFloor = intersects.find((i)=> i.object.name === "FLOOR")
  console.log(intersectFloor)

  newPosition.copy(intersectFloor.point)

  newPosition.y = 1;

})


window.addEventListener('resize',()=>{ // 반응형으로 브라우저 사이즈에 따라 
  renderer.setSize(window.innerWidth,window.innerHeight) // 꽉차게 
  camera.aspect = window.innerWidth/window.innerHeight; // 카메라의 두번쨰 인자였던 aspect 도 추가 mesh 찌그러짐 방지 
  camera.updateProjectionMatrix(); // 카메라의 설정값이 바뀐다면 반드시 업데이트 해줘야함.
  renderer.render(scene,camera);
})
const clock = new THREE.Clock(); // flyControls를 업데이트 하기위한 필수 델타값  

const targetVector = new THREE.Vector3()

const render = ()=> {
  character.lookAt(newPosition)
  targetVector.subVectors(newPosition, character.position).normalize().multiplyScalar(0.01)
  
  if(Math.abs(character.position.x - newPosition.x) >= 1 || Math.abs(character.position.z - newPosition.z) >= 1) {
    character.position.x += targetVector.x;
    character.position.z += targetVector.z;
    action.stop()
  }
  action.play()
  renderer.render(scene,camera) // 송출하는 기계에 장소와 카메라를 출력 
  requestAnimationFrame(render) //orbitControls 를 위한것 , 마우스로 카메라시점 조절가능 
  // textureMesh.rotation.y += 0.01; //autoRotate과 충돌 
  orbitControls.update() // orbitControls 의 속성이 있을 경우 이벤트 안에서 실행
  // flyControls.update(clock.getDelta()) // flyControls는 반드시 애니메이션 루프안에서 업데이트 실행
  // firstPersonControls.update(clock.getDelta())
  // trackballControls.update();
  if(mixer) {
    mixer.update(clock.getDelta())
  }
}

render();
