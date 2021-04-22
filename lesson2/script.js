//ignore this. this 
// external js: isotope.pkgd.js
$('.grid').isotope({
    itemSelector: '.grid-item',
    masonry: {
        columnWidth: 100
    }
});

//adds a grid row to the bigBox div element.
function addRow() {
    bigBox.innerHTML += `<div class="grid"></div>`;
}

//adds a box to the grid row with specified number.
function addBox(rowNumber, color = "#0d8") {
    var rows = [...bigBox.getElementsByClassName('grid')];
    var row = rows[rowNumber];
    row.innerHTML += `<div class="grid-item" style="background-color:${color};"></div>`
}

//gets alot of grid items all in the same row
function grid1(n) {
    addRow();
    for (let i = 0; i < n; i++) {
        //addBox(0);
        setTimeout(() => addBox(0), i * 200);
    }
}

//get a rowsxcolumns sized grid with rows rows.
function grid2(numRows, numCols) {
    var boxNumber = 0
    //don't use var in for loops.
    //change the lets to var, and watch it break.
    for (let i = 0; i < numRows; i++) {
        addRow();
        for (let j = 0; j < numCols; j++) {
            //addBox(i);
            setTimeout(() => addBox(i), (-i + j) * 200)
            boxNumber++;
        }
    }
}


bigBox.style.width = 'auto';
bigBox.style.maxWidth = 900;
grid1(161);

//bigBox.style.width = 900;
//grid2(5, 20);