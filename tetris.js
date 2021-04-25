function hidelist2() {
    for (i = 0; i < 3; i++) {
        loader = document.getElementsByClassName("loader")[i]
        loader.style.display = "none";
    }
}
music = document.getElementById("background-music")

function bkmusic() { //whenever we click the options in the homepage this function will help to stop displaying the homepage and start displaying the sound controls page.
    document.getElementById("home-list").style.display = "none";
    for (i = 0; i < 3; i++) {
        loader = document.getElementsByClassName("loader")[i]
        loader.style.display = "none";
    }
    document.getElementById("sounds").style.display = "block"
}

function on() {
    music.play(); //Play is a keyword which plays the music.
}

function off() {
    music.pause(); //Pause is also a keyword which pauses the music.
}

function hidelist() {
    for (i = 0; i < 3; i++) {
        loader = document.getElementsByClassName("loader")[i]
        loader.style.display = "block";
        document.getElementById("sounds").style.display = "none"
    }
}

function helpback() { //This function will be called whenever we click the back button in help.
    document.getElementById("home-list").style.display = "block";
    hidelist();
    document.getElementById("help-text").style.display = "none"
}

function backbtn() { ///This function will be called whenever we click the back button in options.
    document.getElementById("home-list").style.display = "block";
    hidelist();
}

function help() { //whenever we click the help in the homepage this function will help to stop displaying the homepage and start displaying the help page.
    document.getElementById("home-list").style.display = "none";
    document.getElementById("game-title").style.display = "none";
    document.getElementById("help-text").style.display = "block"
    hidelist2();
}

function start() {
    document.getElementById("minicanvas").style.display = "block"
    document.getElementById("tetris").style.display = "block";
    document.getElementById("home-list").style.display = "none";
    document.getElementById("game-title").style.display = "none";
    hidelist2();
    document.getElementsByClassName("loader")
    document.getElementById("scoreboard").style.display = "block";
    const canvas = document.getElementById("tetris");
    const ctx = canvas.getContext("2d")
    const scoreElement = document.getElementById("score");
    const minicanvas = document.getElementById("minicanvas");
    //Here we are creating two canvas one for the actual gameboard(canvas) and another one for displaying the upcoming shape(minicanvas).
    const can = minicanvas.getContext("2d"); //const defines a constant reference to a value
    const ROW = 20;
    const COL = COLUMN = 10;
    //ROW  and COL is used to set rows and colums for the gameboard.
    const MROW = 5;
    const MCOL = 5;
    //MROW  and MCOL is used to set rows and colums for the minicanvas.
    const SQ = 20; //The SQ variable explains the size of each square inside the gameboard.
    const VACANT = "WHITE"; // color of an empty square

    // draw a square
    function drawSquare(x, y, color) { //x and explains the position of the square in the gameboard(basically cordinates.)
        ctx.fillStyle = color;
        ctx.fillRect(x * SQ, y * SQ, SQ, SQ); //fills the square with the given color.
        ctx.strokeStyle = "BLACK";
        ctx.strokeRect(x * SQ, y * SQ, SQ, SQ); //Draws the border for the square.
    }

    // create the board
    // First we create a 2d array named (board) for which the size will be number of rows * number of columns we also fill each element in the array with vacant.
    //In the drawboard function, with the help of map function we iterate through each element of the array and draw square by calling the draw square function.
    let board = Array(ROW).fill(null).map(() => Array(COL).fill(null).map(() => VACANT));
    let drawBoard = () => {
        board.map((rowval, rindex) => rowval.map((colval, cindex) => drawSquare(cindex, rindex, colval)))
    };
    drawBoard();

    //draw mini square
    //Same as draw square apart from the task that this is used for drawing square in the minicanvas.
    function minidrawSquare(x, y, color) { //3 4
        can.fillStyle = color;
        can.fillRect(x * SQ, y * SQ, SQ, SQ);
        can.strokeStyle = "BLACK";
        can.strokeRect(x * SQ, y * SQ, SQ, SQ);
    }

    //draws mini board
    let miniboard = Array(MROW).fill(null).map(() => Array(MCOL).fill(null).map(() => VACANT));
    let minidrawBoard = () => {
        miniboard.map((rowval, rindex) => rowval.map((colval, cindex) => minidrawSquare(cindex, rindex, colval)))
    };
    minidrawBoard();

    //Minidraw is the function which is used to display the upcoming tetrimino to the user.
    minidraw = function (piece) {
        piece.activeTetromino.map((rowval, rindex) => rowval.map((colval, cindex) => {
            if (colval) {
                minidrawSquare(rindex, cindex, piece.color);
            }
        }));
    }

    //The pieces and their colors.Each piece describe a shape or patter.
    const PIECES = [
        [Z, "red"],
        [S, "green"],
        [T, "yellow"],
        [O, "blue"],
        [L, "purple"],
        [I, "cyan"],
        [J, "orange"]
    ];

    // Generate random pieces
    //This function generates random pieces from the PIECES array with the help of random function.
    //Then it sends the randomly generated piece to the minidraw function. 
    function randomPiece() {
        can.clearRect(0, 0, 100, 100);
        let r = Math.floor(Math.random() * PIECES.length) // 0 -> 6
        let piece = new Piece(PIECES[r][0], PIECES[r][1]);
        minidraw(piece);
        return piece;
    }

    // The Object Piece
    //This is a function but it is used like a constructor and we can aslo include or add many function into this function by the way of using prototype. 
    function Piece(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoN = 0; // we start from the first pattern i[0]
        this.activeTetromino = this.tetromino[this.tetrominoN]; //The activeTetrimino is piece which will be generated by the randompiece function.
        // These are the cordinates above the gaming canvas from where every piece will start droping.
        this.x = 3;
        this.y = -2;

    }
    // fill function
    //This function is added to the piece function by using prototype method.
    // This function will fill the activetetriminos with color with the help of map function.
    //This will loop through the array of activetertrimino and it will fill color where the element returns true as value.
    Piece.prototype.fill = function (color) {
        this.activeTetromino.map((rowval, rindex) => rowval.map((colval, cindex) => {
            if (colval) {
                drawSquare(this.x + cindex, this.y + rindex, color);
            }
        }))
    };
    // Draws a piece to the board.
    Piece.prototype.draw = function () {
        this.fill(this.color);
    }
    // Undraws a piece from the board.
    Piece.prototype.unDraw = function () {
        this.fill(VACANT);
    }
    // Move Down the piece
    Piece.prototype.moveDown = function (nextPiece) {
        if (!this.collision(0, 1, this.activeTetromino)) { // calls the collison function and checks if there is any collision.If the collision function returns false it will undraw the piece from where it was before and increases the y axis to move down then draws the piece again.
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            //If there is collision it means that the tetriminno has reached the end of the board so the lock function is called and then the nextpiece is called.  
            // we lock the piece and generate a new one
            this.lock();
            p = nextPiece;
        }
    }
    // move Right the piece
    //If the collision function returns false it will undraw the piece from where it was before and increases the x axis to move right then draws the piece again.
    Piece.prototype.moveRight = function () {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }
    // move Left the piece
    //If the collision function returns false it will undraw the piece from where it was before and decreases the x axis to move left then draws the piece again.
    Piece.prototype.moveLeft = function () {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }
    // rotates the piece
    Piece.prototype.rotate = function () {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;
        if (this.collision(0, 0, nextPattern)) { //creates a nextpattern to check if there is a collision after rotation.If the collision function returns true it checks in which side of the board the collision happens.
            if (this.x > COL / 2) {
                // it's the right wall
                kick = -1; // we need to move the piece to the left
            } else {
                // it's the left wall
                kick = 1; // we need to move the piece to the right
            }
        }
        //If the collision function returns false it will undraw the piece from where it was before rotates the piece by calling the respective element of the tertrimino array for example z[1] and draw the piece.
        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick; //with the help of kick we move the piece from where it is rotate it.
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }
    let score = 0;
    Piece.prototype.lock = function () {
        for (r = 0; r < this.activeTetromino.length; r++) {
            for (c = 0; c < this.activeTetromino.length; c++) { //loops through the value of activetrimino and locks them to board by coloring the board.
                // we skip the vacant squares
                if (!this.activeTetromino[r][c]) {
                    continue;
                }
                // pieces to lock on top = game over
                if (this.y + r < 0) {
                    if (!gameOver) {
                        alert("Game Over");
                         music.pause();
                         window.location.reload()
                        // stop request animation frame
                        gameOver = true;
                        break;
                    }
                }
                // we lock the piece
                board[this.y + r][this.x + c] = this.color;
            }
        }
        nextPiece = randomPiece() //So  after locking we then call the randompiece function and store the piece in next piece .
        // remove full rows
        for (r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (c = 0; c < COL; c++) { //here we loop through each and every square of the gameboard.If we find a whole low full we will increase the score by 10 points.
                isRowFull = isRowFull && (board[r][c] != VACANT);
            }
            if (isRowFull) {
                // if the row is full
                // we move down all the rows above it
                for (y = r; y > 1; y--) {
                    for (c = 0; c < COL; c++) {
                        board[y][c] = board[y - 1][c];
                    }
                }
                // the top row board[0][..] has no row above it
                for (c = 0; c < COL; c++) {
                    board[0][c] = VACANT;
                }
                // increment the score
                score += 10;
            }
        }
        // update the board
        drawBoard();
        // update the score
        scoreElement.innerHTML = score;
    }
    // collision fucntion
    Piece.prototype.collision = function (x, y, piece) {
        for (r = 0; r < piece.length; r++) {
            for (c = 0; c < piece.length; c++) {
                // if the square is empty, we skip it
                if (!piece[r][c]) {
                    continue;
                }
                // coordinates of the piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                // conditions
                if (newX < 0 || newX >= COL || newY >= ROW) {
                    return true;
                }
                // skip newY < 0; board[-1] will crush our game
                if (newY < 0) {
                    continue;
                }
                // check if there is a locked piece alrady in place
                if (board[newY][newX] != VACANT) {
                    return true;
                }
            }
        }
        return false;
    }
    // CONTROLS the piece
    document.addEventListener("keydown", CONTROL);

    function CONTROL(e) {
        if (e.keyCode == 37) {
            p.moveLeft();
            dropStart = performance.now();
        } else if (e.keyCode == 38) {
            p.rotate();
            dropStart = performance.now();
        } else if (e.keyCode == 39) {
            p.moveRight();
            dropStart = performance.now();
        } else if (e.keyCode == 40) {
            p.moveDown(nextPiece);
        }
    }
    document.addEventListener("mousemove", (e) => {
        if (e.offsetX > 227) {
            p.moveLeft();
            dropStart = performance.now();
        } else if (e.offsetX < 227) {
            p.moveRight();
            dropStart = performance.now();
        } else if (e.offsetY > 200) {
            p.rotate();
            dropStart = performance.now();
        }
    })
    let p = randomPiece();
    let nextPiece = randomPiece()
    // drops a piece every 1sec
    let dropStart = performance.now(); //perforamnce.now is similar to date.now
    let gameOver = false;

    function drop() {
        let now = performance.now();
        let diff = now - dropStart; //stores the time difference.
        if (diff > 1000) { //checks if the difference is more than 1 sec or 1000 ms.
            p.moveDown(nextPiece);
            dropStart = performance.now();
        }
        if (!gameOver) { //check if the game is not over before calling the drop function.
            requestAnimationFrame(drop);
        }
    }
    drop();
};
