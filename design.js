const ROW = 20;
const COLUMN = 10;
const SQ = 20;
const EMPTY = "#FFF";

let board = [ ];
for ( let r = 0; r < ROW; r++){
      board[r] = [ ];
      for( let c = 0; c < COLUMN; c++){
        board[r][c] = EMPTY;
    }
}

drawBoard() {
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COLUMN; c++){
            drawSquare(c, r, board[r][c])
        }
    }
}

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, SQ, SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, SQ, SQ);
}

Piece.prototype.draw = function() {
    for (r = 0; r <this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++){
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x+c, this.y+r, this.color);
            }
        }
    }
}

function Piece(Tetromino, color){
    this.tetromino = tetromino;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.color = color;
    this.x = 3;
    this.y = -2;
}
