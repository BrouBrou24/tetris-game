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

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

function drawBoard() {
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COLUMN; c++){
            drawSquare(c, r, board[r][c])
        }
    }
}


function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.color = color;
    this.x = 3;
    this.y = -2;
}

Piece.prototype.draw = function() {
    for (r = 0; r <this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x+c, this.y+r, this.color);
            }
        }
    }
}

Piece.prototype.unDraw = function() {
    for (r = 0; r <this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++){
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x+c, this.y+r, EMPTY);
            }
        }
    }
}

Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.draw();
    }else{
        this.lock();
        piece = randomPiece();
    }
}

Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.draw();
    }
}

Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.draw();
    }
}

Piece.prototype.rotate = function() {
    let nextPattern = this.tetromino[(this.tetromino + 1) % this.tetromino.length];
    let kick = 0;
    if (this.collision(0, 0, nextPattern)) {
        if (this.x > COLUMN/2) {
            kick = -1;
        }else{
            kick = 1;
        }
    }
    if (!this.collision(kick, 0, nextPattern)){
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

Piece.prototype.collision = function(x, y, piece) {
    for (r = 0; r < piece.length; r++) {
        for (c = 0; c < piece.length; c++) {
            if (!piece[r][c]) { continue; }

            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if (newX < 0 || newX >= COLUMN || newY > ROW) {
                return true;
            }

            if (newY < 0) { continue; }
            if (board[newY][newX] != EMPTY) {
                return true
            }
        }
    }
    return false;
}

Piece.prototype.lock = function() {
    for (r = 0; r <this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (!this.activeTetromino[r][c]) {
                continue;
            }
            if (this.y + r < 0) {
                gameOver = true;
                alert("Game Over");
                break;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }
}

const PIECES = [[Z, 'red'], [S, 'green'], [T, 'cyan'], [O, 'indigo'], [l, 'blue'], [L, 'purple'], [J, 'orange']]

function randomPiece() {
    let randomN = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[randomN][0], PIECES[randomN][1]);
}



function CONTROL(event) {
    if (event.keycode == 37) {
        piece.moveLeft();
    }
    else if (event.keycode == 38) {
        piece.rotate();
    }
    else if (event.keycode == 39) {
        piece.moveRight();
    }
    else if (event.keycode == 40) {
        piece.moveDown();
    }

}

document.addEventListener("keydown", CONTROL);

drawBoard();
