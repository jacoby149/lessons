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

//gets alot of grid items all in the same row
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
//get a rowsxcolumns sized grid with rows rows.
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

//write your own function grid3 from scratch


////////////////////////////////
//// choosing a grid
////////////////////////////////

var gridChoice = 1
if (gridChoice == 1) {
    grid1(100);
} else if (gridChoice == 2) {
    grid2(5, 20);
}  //add your own grid3 function here.