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


/////////////////////////////////
///// initiallize snake game
/////////////////////////////////
var width = 15; var height = 15;
var vX = 0; var vY = 1; //speed of the snake
var snake =
    [
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 3 }
    ];


//////////////////////////////////
////// model snake game
//////////////////////////////////
function move() {
    var head = snake[0]; //get the current head of the snake
    var newHead = {
        x: (width + head.x + vX) % width,
        y: (height + head.y + vY) % height
    };
    snake.unshift(newHead); //extend the head of the snake
    snake.pop(); //recede the tail of the snake
}

function model() {
    move();
}


//////////////////////////////////
////// control snake game
//////////////////////////////////
function control(event) {
    switch (event.code) {
        case "KeyS": vX = 0; vY = 1; break;
        case "KeyW": vX = 0; vY = -1; break;
        case "KeyA": vX = -1; vY = 0; break;
        case "KeyD": vX = 1; vY = 0; break;
        default: return; // Quit when this doesn't handle the key event.
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
function view() {
    clearAll();
    viewMap(width, height);
    viewSnake();
}


////////////////////////////////
////// start the game
////////////////////////////////
function frame() {
    model();
    view();
}
function startGame() {
    setInterval(frame, 100);
    document.addEventListener('keydown', control); //listen for wasd controls
}
startGame();