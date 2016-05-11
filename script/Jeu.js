var ballDirX = -1, ballDirY = 1;
var rectangle1DirY = 0, rectangle2DirY = 0

function initGame(){
    ball.position.x = 0;
    ball.position.y = 0;
    ballDirX = -1;
    ballDirY = 1;
    partieEnCours = false;
    speedBall = document.getElementById("speedBall").value;
    sizeBall = document.getElementById("sizeBall").value;
}

function newGame(){
    initGame();
    partieEnCours = true;
}

function moveBall(){
    if (ball.position.x <= -window.innerWidth*coefTable/2){
        $('.alert-danger').fadeIn('slow', function() {
            setTimeout(function(){ $(".alert-danger").fadeOut('slow');}, 3000);
        });
        initGame();
    }

    if (ball.position.x >= window.innerWidth*coefTable/2) {
        $('.alert-success').fadeIn('slow', function() {
            setTimeout(function(){ $(".alert-success").fadeOut('slow');}, 3000);
        });
        initGame();
    }

    if (ball.position.y <= -window.innerHeight*coefTable/2)
        ballDirY = -ballDirY;
    if (ball.position.y >= window.innerHeight*coefTable/2)
        ballDirY = -ballDirY;

    ball.position.x += ballDirX * speedBall;
    ball.rotation.x += 0.05;
    ball.position.y += ballDirY * speedBall;
    ball.rotation.y += 0.05;

    if (ballDirY > speedBall * 2)
        ballDirY = speedBall * 2;
    else if (ballDirY < -speedBall * 2)
        ballDirY = -speedBall * 2;
}

function collisionBall(){

    // détection de collision
    if (ball.position.x <= - window.innerWidth*coefTable*0.95/2 + sizeBall)
        if(ball.position.y >= rectangle1.position.y - sizeRectangle/2 && ball.position.y <= rectangle1.position.y + sizeRectangle/2)
            if (ballDirX < 0){
                ballDirX = -ballDirX;
                ballDirY -= rectangle1DirY * 0.1;
            }
    if (ball.position.x >= window.innerWidth*coefTable*0.95/2 - sizeBall)
        if(ball.position.y >= rectangle2.position.y - sizeRectangle/2 && ball.position.y <= rectangle2.position.y + sizeRectangle/2)
            if (ballDirX > 0){
                ballDirX = -ballDirX;
                ballDirY -= rectangle2DirY * 0.1;
            }
}

function moveRectangleJoueur(){
    if (Key.isDown(Key.Z)){
        if (rectangle1.position.y < window.innerHeight*coefTable/2 - sizeRectangle/2)
            rectangle1DirY = speedRectangle;
        else
            rectangle1DirY = 0;
    }
    else if (Key.isDown(Key.S)){
        if (rectangle1.position.y > - window.innerHeight*coefTable/2 + sizeRectangle/2)
            rectangle1DirY = - speedRectangle;
       else
            rectangle1DirY = 0;
    }
    else
        rectangle1DirY = 0;

    rectangle1.position.y += rectangle1DirY;
}

function moveRectangleIA()
{
    rectangle2DirY = (ball.position.y - rectangle2.position.y);

    if (Math.abs(rectangle2DirY) <= speedRectangle)
        rectangle2.position.y += rectangle2DirY;
    else{
        if (rectangle2DirY > speedRectangle)
            rectangle2.position.y += speedRectangle;
        else if (rectangle2DirY < -speedRectangle)
            rectangle2.position.y -= speedRectangle;
    }
}