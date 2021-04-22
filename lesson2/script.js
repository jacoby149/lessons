//////////////////////////////////////////
// source : 
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Move_the_ball
//////////////////////////////////////////

///////////////////////////////////////////////////////////
//// model view control (MVC) - 
//// a design strategy where you separate viewing, data modeling, and controlling into separate functions.
//// see the functions model(), view(), and control() below.
//// the frame function call model() and view(), frames happen every 10 milliseconds
//// controls are handled separately outside of the frame function() 
///////////////////////////////////////////////////////////

/////////////////////////////////
//////  initialization //////////
/////////////////////////////////

//initilization of canvas and ctx variables 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * .4;
canvas.height = window.innerWidth * .25;

//ball physics initialization
var x = canvas.width / 2; //horizontal location
var y = canvas.height / 2; //vertical location
var vx = 2; //init. horizontal speed
var vy = 0; //init. vertical speed
var ay = 1; //vertical acceleration (gravity)
var radius = 10; //radius of the ball
var vertFloorReboundSpeed = null; //vertical floor rebound speed of the ball (we will get this on the first ball bounce)

//environment initialization
var leftWall = 0; //hor. location of the left wall
var rightWall = canvas.width; //hor. location of the right wall
floor = canvas.height - radius; //vert. location of the ball when it touches the floor

//time initialization
var timeLast = Date.now() //init. time to right now
//controls how fast time passes
var simSpeed = .03


///////////////////////////
///// view functions //////
///////////////////////////

function viewBall() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//functionality for viewing
function view() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    viewBall();
}


///////////////////////////
//// model functions //////
///////////////////////////

function modelBall(dT) {

    //floor bounce
    if (y >= floor && vy >= 0) {

        //if we did this the ball would bounce higher and higher due to computer rounding errors.
        //vy = -vy;

        //instead, we store the vertical velocity on the first bounce, and re use it on later bounces.
        //this way the ball always bounces back to the same height.
        if (vertFloorReboundSpeed == null) vertFloorReboundSpeed = -vy;
        vy = vertFloorReboundSpeed;
    }
    //right wall bounce
    else if (x >= rightWall && vx >= 0) {
        vx = -vx;
    }
    //left wall bounce
    else if (x <= leftWall && vx <= 0) {
        vx = - vx;
    }
    else {
        //otherwise, update the ball position normally
        x += vx * dT;
        y += vy * dT;
        vy += ay * dT;
    }
}

function model() {
    time = Date.now()
    dT = (time - timeLast) * simSpeed; //change in time since the last frame
    modelBall(dT)
    timeLast = time;
}

function control(event) {
    var m = 15;
    switch (event.code) {
        case "KeyS":
            y = y + m;
        case "KeyW": //todo
            return;
        case "KeyA": //todo
            return;
        case "KeyD": //todo
            return;
        default:
            return; // Quit when this doesn't handle the key event.
    }
}

function frame() {
    model();
    view();
}
document.addEventListener('keydown', control);

//runs the frame function every 10 milliseconds
setInterval(frame, 10);