//////////////////////////////////////////
// source : 
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Move_the_ball
//////////////////////////////////////////


/////////////////////////////////
//////  initialization //////////
/////////////////////////////////

//initilization of canvas and ctx variables 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = Math.floor(window.innerWidth * .4);

//balls array
//list of all ball objects, currently set to an empty list.
var balls = [];

//environment initialization
var leftWall = 0; //hor. location of the left wall
var rightWall = canvas.width; //hor. location of the right wall
var floor = canvas.height; //vert. location of the ball when it touches the floor

//time initialization
var timeLast = Date.now(); //init. time to right now
var simSpeed = .03; //controls how fast time passes

//initializes a new ball
function initBall(inputColor) {
    //ball is a dictionary. it is a collection of key value pairs.
    //key:value,key:value
    var ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: 2,
        vy: 0,
        ay: 1,
        radius: 10,
        floorSpeed: null,
        color: "black"
    };
    //push the ball dictionary onto the array of balls
    balls.push(ball);
}

///////////////////////////
//// model functions //////
///////////////////////////

function modelBall(ball, dT) {
    //floor bounce
    if (ball.y >= floor - ball.radius && ball.vy >= 0) {

        //if we did this the ball would bounce higher and higher due to computer rounding errors.
        //vy = -vy;

        //instead, we store the vertical velocity on the first bounce, and re use it on later bounces.
        //this way the ball always bounces back to the same height.
        if (ball.floorSpeed == null) ball.floorSpeed = -ball.vy;
        ball.vy = ball.floorSpeed;
    }
    //right wall bounce
    else if (ball.x >= rightWall && ball.vx >= 0) {
        ball.vx = -ball.vx;
    }
    //left wall bounce
    else if (ball.x <= leftWall && ball.vx <= 0) {
        ball.vx = - ball.vx;
    }
    else {
        //otherwise, update the ball position normally
        ball.x += ball.vx * dT;
        ball.y += ball.vy * dT;
        ball.vy += ball.ay * dT;
    }
}

function model() {
    time = Date.now()
    dT = (time - timeLast) * simSpeed; //change in time since the last frame
    for ([i, ball] of balls.entries()) {
        modelBall(ball, dT);
    }
    timeLast = time;
}


/////////////////////////////
//// control functions //////
/////////////////////////////

function control(event) {
    var m = 15;
    switch (event.code) {
        case "Space":
            console.log("space hit");
            initBall("pink");
            break;
        case "KeyW":
            console.log("w hit");
            initBall("green");
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
}


///////////////////////////
///// view functions //////
///////////////////////////

function viewBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

//functionality for viewing
function view() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for ([i, ball] of balls.entries()) {
        viewBall(ball);
    }
}

function frame() {
    model();
    view();
}
document.addEventListener('keydown', control);

//runs the frame function every 10 milliseconds
setInterval(frame, 10);