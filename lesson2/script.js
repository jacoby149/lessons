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
function addBox(rowNumber) {
    var rows = bigBox.getElementsByClassName('grid');
    var row = rows[rowNumber];
    row.innerHTML += `<div class="grid-item"></div>`
}

//gets alot of grid items all in the same row
function grid1(n) {
    addRow();
    for (var i = 0; i < n; i++) {
        addBox(0);
        //setTimeout(() => addBox(0), i * 200);
    }
}

bigBox.style.width = 'auto';
grid1(161);
