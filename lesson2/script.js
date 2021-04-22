//ignore this. this 
// external js: isotope.pkgd.js
$('.grid').isotope({
    itemSelector: '.grid-item',
    masonry: {
        columnWidth: 100
    }
});

//make a grid row with n boxes
function getGridRow(n) {
    var boxes = '';
    //for every number from zero to n-1, add a grid-item
    for (var i = 0; i < n; i++) {
        boxes += `<div class = "grid-item"></div>`
    }
    //add the columns into the grid row.
    return `<div class="grid">${boxes}</div>`;
}
function getGrid(rows, cols) {
    for (var i = 0; i < rows; i++) {
        bigBox.innerHTML += getGridRow(cols);
    }
}

//gets alot of grid items all in the same row
function getGridItems(n) {
    return getGrid(1, n);
}

getGridItems(161);
bigBox.style.width = 'auto';
//bigBox.style.width = 900;
//viewGrid(10, 20);