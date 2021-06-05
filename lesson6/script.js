////////////////////////////////
///// ignore these 
////////////////////////////////
$('.row').isotope({
    itemSelector: '.box',
    masonry: {
        columnWidth: 50
    }
});
//adding random element getter to js arrays
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}


///////////////////////////
// helper functions
///////////////////////////
function getRandomInt(max) {
    return parseInt(Math.floor(Math.random() * max));
}
function getRow(i) {
    var rows = document.getElementsByClassName("boxRow")
    return rows[i];
}
function getBox(i, j) {
    var row = getRow(i);
    var boxes = row.getElementsByClassName("box");
    return boxes[j]
}
function addRow() {
    gridContainer.innerHTML += `<div class="boxRow"></div>`;
}
function addBox(i) {
    var row = getRow(i);
    row.innerHTML += `<div class="box"></div>`;
}
function clearAll() {
    gridContainer.innerHTML = "";
}
function setColor(c, i, j) {
    var box = getBox(i, j)
    box.style.backgroundColor = c;
}
//checks if coordinates of 2 XY dictionaries are equal
function sameXY(c1, c2) {
    return c1.x == c2.x && c1.y == c2.y;
}
//checks if xy coordinate is in the snake
function inSnake(c) {
    return snake.some((segment) => sameXY(segment, c))
}



/////////////////////////////////
///// initiallize snake game
/////////////////////////////////
var width = 15; var height = 15;
var score = null;var highScore = 0;
var vX = null; var vY = null; //speed of the snake
var snake = null;
var food = null;
var gameOver = false;

//initializes all segments of the snake
function initSnake() {
    snake = [
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 2, y: 2 },
        { x: 2, y: 1 }
    ];
}
//initializes the food
function initFood() {
    food = {
        x: getRandomInt(width), //random int from 0 to width - 1
        y: getRandomInt(height)
    }
    // retry initting food if the food is generated on top of the snake
    if (inSnake(food)) {
        initFood();
    }
}
//sets the game variables to make the game start properly
function initGame() {
    score = 0; vX = 1; vY = 0; gameOver = false;
    initSnake();
    initFood();
}


//////////////////////////////////
////// model snake game
//////////////////////////////////
function legal(newHead) {
    var isLegal = true;
    var newHeadOutOfBounds = newHead.x < 0 || newHead.x >= width ||
        newHead.y < 0 || newHead.y >= height;
    var newHeadCollidesWithSnake = inSnake(newHead);
    if (newHeadOutOfBounds || newHeadCollidesWithSnake) isLegal = false;
    return isLegal;
}
function move(eaten) {
    var head = snake[0]; //get the current head of the snake
    var newHead = {
        x: head.x + vX,
        y: head.y + vY
    };
    if (!legal(newHead)) gameOver = true;
    else {
        snake.unshift(newHead); //extend the head of the snake
        if (!eaten) snake.pop();
        //recede the tail of the snake,dont recede if food is eaten
    }
}
function foodModel() {
    var head = snake[0];
    var eaten = sameXY(head, food) //food is eaten if head is where the food is
    if (eaten) {
        initFood(); //re init food when food is eaten by the head of the snake.
    }
    return eaten
}
function model() {
    eaten = foodModel(); // manage food logic
    move(eaten);
    score += eaten;
    highScore = Math.max(score,highScore);

}


//////////////////////////////////
////// control snake game
//////////////////////////////////
function control(event) {
    if (event.code == "KeyR") initGame();
    if (!gameOver) {
        switch (event.code) {
            case "KeyS": vX = 0; vY = 1; break;
            case "KeyW": vX = 0; vY = -1; break;
            case "KeyA": vX = -1; vY = 0; break;
            case "KeyD": vX = 1; vY = 0; break;
            default: return; // Quit when this doesn't handle the key event.
        }
    }
}


///////////////////////////////////
//// view snake game
///////////////////////////////////
function viewMap(width, height) {
    for (let i = 0; i < height; i++) {
        addRow();
        for (let j = 0; j < width; j++) {
            addBox(i); // adds a box to row i
            setColor("white", i, j);
        }
    }
}
function viewSnake() {
    for ([i, segment] of snake.entries()) {
        setColor("red", segment.y, segment.x); // draw your location
    }
}

function viewFood() {
    setColor("green", food.y, food.x);
}

function view() {
    clearAll();
    viewMap(width, height);
    viewSnake();
    viewFood();
    if (gameOver)gameMessage.innerHTML = `Game Over! Press 'R' to retry. Score : ${score}`;
    else {
        highScoreMessage.innerHTML = `High Score : ${highScore}`;
        gameMessage.innerHTML = `Playing Snake! Score : ${score}`;
    }
}


////////////////////////////////
////// start the game
////////////////////////////////
function frame() {
    model();
    view();
}
function startGame() {
    initGame();
    setInterval(frame, 100);
    document.addEventListener('keydown', control); //listen for wasd controls
}
startGame();