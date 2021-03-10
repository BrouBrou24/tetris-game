var canvas = document.querySelector("#canvas")
function makeGrid() {
    c = 0;
    while (c < 21) {
        var newRow = canvas.insertRow(c)
        c += 1;
        for (let r = 0; r < 11; r++)
            newRow.insertCell(r);
    }
}