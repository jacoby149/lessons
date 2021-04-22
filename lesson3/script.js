////////////////////////////////
///// ignore these 
////////////////////////////////

// external js: isotope.pkgd.js
$('.grid').isotope({
    itemSelector: '.grid-item',
    masonry: {
        columnWidth: 100
    }
});
//adding random element getter to js arrays
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}


///////////////////////////
//box modifying functions
///////////////////////////

//sets the color of a box in row i, column j to color c
function setColor(c, i, j) {
    var row = document.getElementsByClassName("grid")[i];
    var box = row.getElementsByClassName("grid-item")[j];
    box.style.backgroundColor = c;
}
//adds a grid row to the bigBox div element.
function addRow() {
    bigBox.innerHTML += `<div class="grid"></div>`;
}
//adds a box to the grid row with specified number.
function addBox(rowNumber) {
    var row = bigBox.getElementsByClassName('grid')[rowNumber];
    row.innerHTML += `<div class="grid-item"></div>`
}


///////////////////////////////
////// grid functions
///////////////////////////////

//makes a one row grid that overflows with random colors.
function grid1(n) {
    bigBox.style.width = 'auto';
    bigBox.style.maxWidth = 900;
    var interval = 100;
    var colors = ["red", "orange", "yellow"];
    addRow();
    for (let i = 0; i < n; i++) {
        //addBox(0);
        setTimeout(() => { addBox(0); setColor(colors.random(), 0, i); }, i * interval);
    }
}

//makes a numRows x numCols grid that grows diagonally in the direction <-1,1>
function grid2(numRows, numCols) {
    bigBox.style.width = 900;
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

//simplest numrows by numcols grid
function simpleGrid(numRows, numCols) {
    for (let i = 0; i < numRows; i++) {
        addRow();
        for (let j = 0; j < numCols; j++) {
            addBox(i);
        }
    }
}

//initialization of my location in grid 3
var x = 3;
var y = 3;
var w = 10;
var h = 6;

function control(event) {
    switch (event.code) {
        case "KeyS":
            y = (h + y + 1) % h;
            break;
        case "KeyW":
            y = (h + y - 1) % h;
            break;
        case "KeyA":
            x = (w + x - 1) % w;
            break;
        case "KeyD":
            x = (w + x + 1) % w;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
}

function view() {
    simpleGrid(h, w); //draw the background
    setColor("white", y, x); //draw your location
}

// a model() function would be necessary if the game was more complicated.
function frame() {
    bigBox.innerHTML = "" //clear the frame
    view();
}

function game() {
    setInterval(frame, 10);
    document.addEventListener('keydown', control);
    return;
}

//write your own function grid3 from scratch


////////////////////////////////
//// choosing a grid
////////////////////////////////

//change your grid choice here
var gridChoice = 1

//logic to display the correct grid
if (gridChoice == 1) {
    grid1(30);
} else if (gridChoice == 2) {
    grid2(5, 10);
} else if (gridChoice == 3) {
    game();
}//add your own grid function here.