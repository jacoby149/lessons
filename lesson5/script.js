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
//sets the color of square with coordinate (i,j) to c
function setColor(c, i, j) {
    var box = getBox(i, j)
    box.style.backgroundColor = c;
}


/////////////////////////////////
///// initiallize snake game
/////////////////////////////////
var width = 15; var height = 15;
var vX = 1; var vY = 0; //speed of the snake
var snake = null;

function initSnake() {
    snake = [
        { x: 2, y: 1 }, //x y coordinate of the head snake segment
        { x: 2, y: 2 }, //snake segment
        { x: 2, y: 3 }, //snake segment
        { x: 3, y: 3 }  //x y of the tail snake segment
    ];
    //initializes var snake to an array of snake segments
    //snake segment - a box that is a part of the snake.
}


//////////////////////////////////
////// model snake game
//////////////////////////////////
function move() {
    var head = snake[0]; //get the current head of the snake
    var newHead = {
        x: head.x + vX,
        y: head.y + vY
    };
    snake.unshift(newHead); //extend the head of the snake
    //the unshift function is called on the snake array, 
    //it adds the newhead input argument at the beginning of the array.

    //TODO recede the tail of the snake with the pop function above!
    //you can call the pop function on any array
    //the pop function takes no input arguments
    //the pop function removes the last element of an array
    //hint : read the snake.unshift comments
}

function model() {
    move();
}


//////////////////////////////////
////// control snake game
//////////////////////////////////
function control(event) {
    switch (event.code) {
        case "KeyR": initSnake(); break;
        case "KeyS": vX = 0; vY = 1; break;
        case "KeyW": break;
        case "KeyA": break;
        case "KeyD": break;
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
        //TODO make the snake visible using the setColor function
        //setColor takes a color and the coordinates of a box to color
        //use the coordinates of the segment, and a color of your choice as input
        //hint : see the use of setColor in viewMap
        console.log(segment.y);
        console.log(segment.x);
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
    initSnake();
    setInterval(frame, 100);
    document.addEventListener('keydown', control); //listen for wasd controls
}
startGame();