(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('container').appendChild(warning);

		return;
	}

	const renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	document.body.prepend(renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(0, -5, 2);
	const origin = new THREE.Vector3(0, 0, 0);
	camera.lookAt(origin);

	scene.add(camera);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	var light = new THREE.PointLight(0xffffff, 1);
	light.position.set(5, 5, 5);
	scene.add(light);

	const spotLight = new THREE.SpotLight(0xffffff, 0.5);

	spotLight.position.set(5, 5, 5);
	spotLight.angle = 0;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.distance = 200;

	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 200;
	scene.add(spotLight);

	const lightHelper = new THREE.SpotLightHelper(spotLight);
	scene.add(lightHelper);

	const shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
	// scene.add(shadowCameraHelper);

	scene.add(new THREE.AxisHelper(1000));

	const geometry = new THREE.BoxGeometry(3, 3, 0.2);
	var material = new THREE.MeshPhongMaterial({ color: 0x808080, dithering: true });
	var plate = new THREE.Mesh(geometry, material);
	scene.add(plate);

	var angle = 0.02;
	var inc = 0.0002;

	function animate() {
		requestAnimationFrame(animate);
		if (angle > 0.13) {
			inc = -inc;
		}
		if (angle <= 0.01) {
			inc = -inc;
		}
		angle += inc;
		spotLight.angle = angle;
		lightHelper.update();
		shadowCameraHelper.update();
		renderer.render(scene, camera);
		document.getElementById('info').innerText = 'angle = ' + angle.toFixed(2);

	}

	animate();
})();
