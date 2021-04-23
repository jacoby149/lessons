////////////////////////////////
///// ignore these 
////////////////////////////////

// external js: isotope.pkgd.js
$('.row').isotope({
    itemSelector: '.box',
    masonry: {
        columnWidth: 100
    }
});
//adding random element getter to js arrays
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}


///////////////////////////
//grid helper functions
///////////////////////////


//get row i in the grid
function getRow(i) {
    var rows = document.getElementsByClassName("row")
    return rows[i];
}

//get box j from row i in the grid.
function getBox(i, j) {
    var row = getRow(i);
    var boxes = row.getElementsByClassName("box");
    return boxes[j]
}

//sets the color of a box in row i, column j to color c
function setColor(c, i, j) {
    var box = getBox(i, j)
    box.style.backgroundColor = c;
}
//adds a grid row to the grid.
function addRow() {
    gridContainer.innerHTML += `<div class="row"></div>`;
}
//adds a box to row i in the grid.
function addBox(i) {
    var row = getRow(i);
    row.innerHTML += `<div class="box"></div>`;
}


///////////////////////////////
////// grid functions
///////////////////////////////

//makes a one row grid that overflows with random colors.
function grid1(n) {
    gridContainer.style.width = 'auto';
    gridContainer.style.maxWidth = 900;
    var interval = 100;
    //this is called an array, it can hold multiple values
    var colors = ["red", "orange", "yellow"];
    addRow();
    for (let i = 0; i < n; i++) {
        //addBox(0);
        setTimeout(() => { addBox(0); setColor(colors.random(), 0, i); }, i * interval);
    }
}

//makes a numRows x numCols grid that grows diagonally in the direction <-1,1>
function grid2(numRows, numCols) {
    var interval = 200;
    //don't use var in for loops.
    //change the lets to var, and watch it break.
    for (let i = 0; i < numRows; i++) {
        addRow();
        for (let j = 0; j < numCols; j++) {
            //addBox(i);
            setTimeout(() => { addBox(i); setColor("white", i, j) }, (-i + j) * interval)
        }
    }
}

//very nice and simple grid with rows by cols
function grid3(rows, cols) {
    for (let i = 0; i < rows; i++) {
        addRow();
        for (let j = 0; j < cols; j++) {
            addBox(i); // adds a box to row i
            setColor("lightgreen", i, j);
        }
    }
}

// try and copy grid 1,2, or 3, and write your own grid4() here
function grid4() {
    return;
}


/////////////////////////////////
///// grid game
/////////////////////////////////

//initialization of grid mini game
var width = 10; var height = 6; var x = 3; var y = 3;
var lastx = x; var lasty = y;

function move(dX, dY) {
    lastx = x; lasty = y;
    x = (width + x + dX) % width;
    y = (height + y + dY) % height;
}

//control your position with the wasd keys
function control(event) {
    switch (event.code) {
        case "KeyS": move(0, 1); break;
        case "KeyW": move(0, -1); break;
        case "KeyA": move(-1, 0); break;
        case "KeyD": move(1, 0); break;
        default: return; // Quit when this doesn't handle the key event.
    }
}

//what to draw on every frame
function frame() {
    setColor("yellow", lasty, lastx);// draw your trail
    setColor("red", y, x); // draw your location
}

//initializes the game thing.
function initGame() {
    grid2(height, width); //initialize the map
    setInterval(frame, 10); //trigger frames every 10ms
    document.addEventListener('keydown', control); //listen for wasd controls
}


///////////////////////////////////
//// choosing and running a grid
///////////////////////////////////

//change your grid choice here
var gridChoice = 1

//logic to display the correct grid
if (gridChoice == 1) {
    grid1(30);
} else if (gridChoice == 2) {
    grid2(5, 10);
} else if (gridChoice == 3) {
    grid3(4, 6);
} else if (gridChoice == 4) {
    grid4();
} else {
    initGame();
}