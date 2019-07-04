(() => {
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();

    // Camera settings

    const camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;
    camera.lookAt(scene.position);

    // Light settings

    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.8;
    scene.add(ambientLight);
    
    // Loading element

    const loader = new THREE.LegacyJSONLoader();
    loader.load('assets/iphone.json', geometry => {
        const material = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture("assets/iphone.jpg")
        });
        const model = new THREE.Mesh(geometry, material);
        model.position.y = -4;
        scene.add(model);
    });

    // Render settings

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.autoRotate = true;
    container.appendChild(renderer.domElement);

    const render = () => {
        controls.update();
        renderer.render(scene,camera);
        requestAnimationFrame(render);
    }

    render();
})();
