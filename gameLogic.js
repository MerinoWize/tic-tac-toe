class Space {
    constructor (row, col) {
        this.row = row;
        this.col = col;
    }

    toString () {
        return `${row},${col}`;
    }
}

// 1,1     1,2     1,3
// 2,1     2,2     2,3
// 3,1     3,2     3,3

class Player {
    constructor (name) {
        this.name = name || 'anon player';
        this.spaces = [];
        this.won = false;
    }

    reset () {
        this.spaces = [];
        this.won = false;
    }

    addSpace (row, col) {
        this.spaces.push(new Space(row, col));
        console.log(`${this.name} ADDED SPACE ${row},${col}`);
        console.log(`${this.name}  SPACES`, this.spaces);
    }

    calculateWin () {
        let rows = {};
        let columns = {};
        let diagLtoR = 0;
        let diagRtoL = 0;
        if (this.spaces.length >= 3) {
            this.spaces.forEach((space) => {
                const { row, col } = space;
                if (rows[row]) {
                    rows[row] ++;  
                } else {
                    rows[row] = 1;
                }

                if (columns[col]) {
                    columns[col] ++;  
                } else {
                    columns[col] = 1;
                }

                if (row === 1 && col === 1) {
                    diagLtoR ++;
                }

                if (row === 1 && col === 3) {
                    diagRtoL ++;
                }

                if (row === 2 && col === 2) {
                    diagLtoR ++;
                    diagRtoL ++;
                }

                if (row === 3 && col === 3) {
                    diagLtoR ++;
                }

                if (row === 3 && col === 1) {
                    diagRtoL ++;
                }

            });

            console.log(`${this.name} rows`, rows);
            console.log(`${this.name} columns`, columns);
            console.log(`${this.name} diagLtoR`, diagLtoR);
            console.log(`${this.diagRtoL} diagLtoR`, diagRtoL);

            if (
                Object.values(rows).includes(3) ||
                Object.values(columns).includes(3) ||
                diagLtoR === 3 ||
                diagRtoL === 3
            ) {
                this.won = true;
            }
        }
    }
}

class Game {
    constructor (Player1, Player2) {
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.currentPlayer = this.Player1;
        this.gameEnd = false;
        this.winner = null;
    }

    switchPlayer () {
        if (this.currentPlayer === this.Player1)
            this.currentPlayer = this.Player2;
        else
            this.currentPlayer = this.Player1
    }

    makePlay (row, col) {
        this.currentPlayer.addSpace(row, col);
        this.currentPlayer.calculateWin();

        if (this.currentPlayer.won) {
            this.gameEnd = true;
            this.winner = this.currentPlayer;

            console.log(`GAME ENDED!!!! congratulations ${this.winner.name}`);
        } else {
            this.switchPlayer();
        }
    }

    resetGame () {
        this.Player1.reset();
        this.Player2.reset();
        this.gameEnd = false;
        this.winner = null;
    }
}

const bluePlayer = new Player('blue');
const redPlayer = new Player('red');

const ticTacToe = new Game(bluePlayer, redPlayer);