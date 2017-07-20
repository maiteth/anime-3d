(function () {
    // on initialise le moteur de rendu
    var renderer = new THREE.WebGLRenderer();

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // on initialise la scène
    var scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1000);
    scene.add(camera);

    var geometry = new THREE.SphereGeometry(200, 32, 32);

    var loader = new THREE.TextureLoader();

    function animate() {
        // on appel la fonction animate() récursivement à chaque frame
        requestAnimationFrame(animate);
        // on fait tourner le cube sur ses axes x et y
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        // on effectue le rendu de la scène
        renderer.render(scene, camera);
    }

    // load a resource
    loader.load('metal.jpg', function (texture) {
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            overdraw: true
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // on ajoute une lumière blanche
        var lumiere = new THREE.DirectionalLight(0xffffff, 1.0);
        lumiere.position.set(0, 0, 400);
        scene.add(lumiere);
        animate();

    });
})();
