var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var cubegeometry = new THREE.CubeGeometry(1,1,1);
var cubematerial = new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000});

var cube = new THREE.Mesh(cubegeometry, cubematerial);

scene.add(cube);

camera.position.z = 5;

var spheregeometry = new THREE.SphereGeometry(0.8, 16, 16);
var spherematerial = new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000});
var sphere = new THREE.Mesh(spheregeometry, spherematerial);

sphere.position.set(-2.0, 0, 0);

scene.add(sphere);

var render = function () {
	requestAnimationFrame(render);

	cube.rotation.y += 0.01;
	cube.rotation.x += 0.01;
	cube.rotation.z += 0.01;

	sphere.rotation.y += 0.01;

	renderer.render(scene, camera);
};

// Calling the render function
render();