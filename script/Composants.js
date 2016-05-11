var renderer, scene, camera, controls, ball, table, surface, rectangle1, rectangle2;

function initComposants(){
    // moteur de rendu WebGL
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    // ajout au dom
    document.getElementById('container').appendChild(renderer.domElement);

    // initialisation de la scène
    scene = new THREE.Scene();

    // initialisation de la camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 0, 1000);
    scene.add(camera);

    // ajout des controles
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.enableZoom = false;

    // initialisation de la table de jeu
    var tableMaterial = new THREE.MeshLambertMaterial({ color: 0x44332b});
    var tableGeometry = new THREE.CubeGeometry(window.innerWidth*coefTable, window.innerHeight*coefTable, 30);
    table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.z = -30/2-1;
    scene.add(table);

    // initialisation du tableau de jeu
    var surfaceMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('assets/mif38.jpg'), overdraw: true });
    var sufaceGeometry = new THREE.PlaneGeometry(window.innerWidth*coefTable * 0.95, window.innerHeight*coefTable);
    surface = new THREE.Mesh(sufaceGeometry, surfaceMaterial);
    scene.add(surface);
    surface.receiveShadow = true;
    surface.castShadow = true;

    // initialisation des rectangles "joueurs"
    var rectangle1Material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('assets/metal.jpg'), overdraw: true });
    var rectangle1Geometry = new THREE.CubeGeometry(window.innerWidth*coefTable * 0.05/2, sizeRectangle, sizeBall*2);
    rectangle1 = new THREE.Mesh(rectangle1Geometry, rectangle1Material);
    rectangle1.position.z = sizeBall;
    rectangle1.position.x = - window.innerWidth*coefTable * 0.975/2 + 1;
    scene.add(rectangle1);
    rectangle1.receiveShadow = true;
    rectangle1.castShadow = true;

    var rectangle2Material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('assets/green-ground-texture.jpg'), overdraw: true });
    var rectangle2Geometry = new THREE.CubeGeometry(window.innerWidth*coefTable * 0.05/2, sizeRectangle, sizeBall*2);
    rectangle2 = new THREE.Mesh(rectangle2Geometry, rectangle2Material);
    rectangle2.position.z = sizeBall;
    rectangle2.position.x = window.innerWidth*coefTable * 0.975/2 - 1;
    scene.add(rectangle2);
    rectangle2.receiveShadow = true;
    rectangle2.castShadow = true;

    // initialisation de la balle
    var geometryBall = new THREE.SphereGeometry(sizeBall, 32, 32);
    var materialBall = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('assets/ball.jpg'), overdraw: true });
    ball = new THREE.Mesh(geometryBall, materialBall);
    ball.position.z = sizeBall;
    scene.add(ball);
    ball.name = "ball";
    ball.receiveShadow = true;
    ball.castShadow = true;

    // point de lumière
    var pointLight =  new THREE.PointLight(0xF8D898);
    pointLight.position.x = - window.innerWidth;
    pointLight.position.y = 0;
    pointLight.position.z = 500;
    pointLight.intensity = 2.9;
    pointLight.distance = 5000;
    scene.add(pointLight);

    // spot de lumière
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 500);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
    scene.add(new THREE.AmbientLight( 0xffffff));

}

function removeEntity(object) {
    var selectedObject = scene.getObjectByName(object.name);
    scene.remove(selectedObject);
}