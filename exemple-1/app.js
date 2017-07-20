const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.prepend(renderer.domElement);

const color = Number('0x' + tinycolor("hsl(0, 100%, 50%)").toHex8String().substring(1, 7));
console.log('color', color);

const geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();
