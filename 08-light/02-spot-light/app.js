(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('container').appendChild(warning);

		return;
	}

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.prepend(renderer.domElement);

	const geometry = new THREE.BoxGeometry(3, 1, 0.2);
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	var plate = new THREE.Mesh(geometry, material);
	scene.add(plate);

	var spotLight = new THREE.SpotLight(0xffffff);
	// spotLight.angle = 0;


	spotLight.position.set(2, 0, 1);
	scene.add(spotLight);

	var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	/* position the light so it shines on the cube (x, y, z) */
	// scene.add(ambientLight);

	var origin = new THREE.Vector3(0, 0, 0);

	camera.position.set(0, 0, 5);
	camera.lookAt(origin);

	var inc = 0.01;
	var hue = 0;

	var animate = function(ts) {
		requestAnimationFrame(animate);

		hue += 0.001;
		// spotLight.color = new THREE.Color().setHSL(hue, 1, 0.5);
		renderer.render(scene, camera);
		// document.getElementById('info').innerText = 'spotLight.angle = ' + spotLight.angle;
	};

	animate();
})();
