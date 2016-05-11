var Key = {
    _pressed: {},

    Z:90,
    S:83,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

function updateSizeBall(value){
    sizeBall = value;
    var x = ball.position.x;
    var y = ball.position.y;
    removeEntity(ball);
    var geometryBall = new THREE.SphereGeometry(sizeBall, 32, 32);
    var materialBall = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('assets/ball.jpg'), overdraw: true });
    ball = new THREE.Mesh(geometryBall, materialBall);
    ball.position.z = sizeBall;
    ball.position.x = x;
    ball.position.y = y;
    scene.add(ball);
    ball.name = "ball";
    ball.receiveShadow = true;
    ball.castShadow = true;
}

function updateSpeedBall(value){
    speedBall = value;
}