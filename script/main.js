var sizeBall = 30;
var coefTable = 0.6;
var speedBall = 5;
var speedRectangle = 5;
var sizeRectangle = window.innerHeight*coefTable/4;
var partieEnCours = false;

function start() {
    initComposants();
    initGame();
    animate();
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    if (partieEnCours) {
        collisionBall();
        moveBall();
        moveRectangleJoueur();
        moveRectangleIA();
    }
}