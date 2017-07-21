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
	camera.position.set(0, -5, 0);

	const spotLight = new THREE.SpotLight(0xffffff, 1);
	const lightHelper = new THREE.SpotLightHelper(spotLight);

	let shadowCameraHelper;

	function render() {
		lightHelper.update();
		shadowCameraHelper.update();
		renderer.render(scene, camera);
	}

	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', render);
	controls.minDistance = 2;
	controls.maxDistance = 500;
	controls.enablePan = true;

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	spotLight.position.set(5, 5, 5);
	spotLight.angle = Math.PI / 60;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.distance = 200;

	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 10;
	spotLight.shadow.camera.far = 200;
	scene.add(spotLight);

	scene.add(lightHelper);

	shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
	scene.add(shadowCameraHelper);

	scene.add(new THREE.AxisHelper(1000));

	const geometry = new THREE.BoxGeometry(3, 1, 0.2);
	var material = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );
	var plate = new THREE.Mesh(geometry, material);
	scene.add(plate);

	const geometryBox = new THREE.BoxGeometry(1, 1, 1);
	var box = new THREE.Mesh(geometryBox, material);
	scene.add(box);

	render();
})();
