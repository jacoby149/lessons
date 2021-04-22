//ignore this. this 
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
    var rows = [...bigBox.getElementsByClassName('grid')];
    var row = rows[rowNumber];
    row.innerHTML += `<div class="grid-item"></div>`
}


//gets alot of grid items all in the same row
function grid1(n) {
    var colors = ["red", "orange", "yellow"];
    addRow();
    var interval = 200
    for (let i = 0; i < n; i++) {
        //addBox(0);
        setTimeout(() => { addBox(0); setColor(colors.random(), 0, i); }, i * interval);
    }
}
//get a rowsxcolumns sized grid with rows rows.
function grid2(numRows, numCols) {
    var boxNumber = 0;
    var interval = 200;
    //don't use var in for loops.
    //change the lets to var, and watch it break.
    for (let i = 0; i < numRows; i++) {
        addRow();
        for (let j = 0; j < numCols; j++) {
            //addBox(i);
            setTimeout(() => { addBox(i); setColor("white", i, j) }, (-i + j) * interval)
            boxNumber++;
        }
    }
}


var gridChoice = 1
if (gridChoice == 1) {
    bigBox.style.width = 'auto';
    bigBox.style.maxWidth = 900;
    grid1(100);
} else if (gridChoice == 2) {
    bigBox.style.width = 900;
    grid2(5, 20);
} else if (gridChoice == 3) {
    bigBox.style.width = 900;
    grid3(5, 20);
} //add your own grid4 function here.