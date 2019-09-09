import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class MinesweeperService {
	//Display Variables
	iconSize: number = 20;

	//Game Variables
	displayGame: boolean = false;
	playing: boolean = false;
	win: boolean = false;
	explode: boolean = false;
	started: boolean = false;

	//Game Settings
	totalMines: number;
	totalRows: number;
	totalCols: number;

	//Board Variables
	flags: number = 0;
	board: {
		mine: boolean;
		flag: boolean;
		revealed: boolean;
		number: number;
		badflag: boolean;
	}[][];

	//Takes in the number of rows/columns/mines and creates a new game
	startGame(row, col, mine) {
		this.totalRows = row;
		this.totalCols = col;
		this.totalMines = mine;
		this.displayGame = true;

		this.resetGame();
	}

	//resets the game with the same settings
	resetGame() {
		this.playing = true;
		this.win = false;
		this.explode = false;
		this.flags = 0;
		this.started = false;
		this.board = [];
		this.createBoard();
		this.clearSaveData();
	}

	//checks if a game is already being played
	continueGame() {
		if (this.playing) {
			this.displayGame = true;
		}
	}

	//saves the game to local storage
	saveGame() {
		let gameData = "";
		gameData += this.started ? "1_" : "0_";
		gameData +=
			this.totalMines +
			"_" +
			this.totalRows +
			"_" +
			this.totalCols +
			"_" +
			this.flags;
		localStorage.setItem("minesweeper_variables", gameData);
		localStorage.setItem("minesweeper_board", JSON.stringify(this.board));
	}

	//loads game from local storage
	loadGame() {
		let gameData = localStorage.getItem("minesweeper_variables");
		let splitData = gameData.split("_");
		this.started = splitData[0] === "1";
		this.totalMines = +splitData[1];
		this.totalRows = +splitData[2];
		this.totalCols = +splitData[3];
		this.board = JSON.parse(localStorage.getItem("minesweeper_board"));
		this.playing = true;
	}

	//deletes data from local storage
	clearSaveData() {
		localStorage.removeItem("minesweeper_board");
		localStorage.removeItem("minesweeper_variables");
	}

	//checks if the game is running and if the cell hasn't been revealed
	//before toggling the flag and changing the number of flags
	onFlag(row: number, col: number) {
		if (!this.board[row][col].revealed && this.playing) {
			this.saveGame();
			if (this.board[row][col].flag) {
				this.board[row][col].flag = false;
				this.flags--;
			} else {
				this.board[row][col].flag = true;
				this.flags++;
			}
		}
	}

	onReveal(row: number, col: number) {
		//checks to see if this is the first click of the game
		if (!this.started) {
			//checks to see if the first click was on a mine, and moves it
			if (this.board[row][col].mine) {
				let moving = true;
				while (moving) {
					let newRow = Math.floor(Math.random() * this.totalRows);
					let newCol = Math.floor(Math.random() * this.totalCols);
					if (!this.board[newRow][newCol].mine) {
						this.board[row][col].mine = false;
						this.board[newRow][newCol].mine = true;
						moving = false;
						this.setNumbers();
					}
				}
			}

			this.started = true;
		}

		//checks to make sure the game is running, the cell is hidden and it
		//doesn't have a flag.  Then checks if the click was on a mine.
		if (
			!this.board[row][col].flag &&
			this.playing &&
			!this.board[row][col].revealed &&
			!this.checkMines(row, col)
		) {
			//checks the number.  If it is a 0 it triggers the cascade,
			//otherwise it reveals the cell.  Either way it checks if the game
			//has been won
			if (this.board[row][col].number === 0) {
				this.onCascade(row, col);
			} else {
				this.board[row][col].revealed = true;
			}
			this.saveGame();
			this.checkRemaining();
		}
	}

	/*When an already revealed cell is double clicked, it checks to see if the
	number of flags on neighboring cells matches the number for the clicked cell
	If so, it reveals all other neighboring cells.  If a user has a wrong flag,
	this can trigger a mine.*/
	onDoubleClick(row: number, col: number) {
		if (this.board[row][col].revealed) {
			let numFlags = 0;
			//Counts flags.  If statement prevents out of bounds checks
			for (let i = -1; i < 2; i++) {
				for (let j = -1; j < 2; j++) {
					if (
						row + i >= 0 &&
						row + i < this.totalRows &&
						col + j >= 0 &&
						col + j < this.totalCols
					) {
						numFlags += this.board[row + i][col + j].flag ? 1 : 0;
					}
				}
			}

			//reveals all neighboring spaces.  Flags prevent the reveal
			if (numFlags === this.board[row][col].number) {
				for (let i = -1; i < 2; i++) {
					for (let j = -1; j < 2; j++) {
						if (
							row + i >= 0 &&
							row + i < this.totalRows &&
							col + j >= 0 &&
							col + j < this.totalCols
						) {
							this.onReveal(row + i, col + j);
						}
					}
				}
			}
		}
	}

	//creates a board based on the total rows and columns
	private createBoard() {
		for (let row = 0; row < this.totalRows; row++) {
			this.board.push([]);
			for (let col = 0; col < this.totalCols; col++) {
				this.board[row].push({
					mine: false,
					flag: false,
					revealed: false,
					number: 0,
					badflag: false,
				});
			}
		}
		this.placeMines();
	}

	//randomly places mines based on the total mines
	private placeMines() {
		for (let i = 0; i < this.totalMines; i++) {
			let row = Math.floor(Math.random() * this.totalRows);
			let col = Math.floor(Math.random() * this.totalCols);

			//if the random location already has a mine, reduces the count by 1
			//to make sure the correct number of mines are placed.
			if (this.board[row][col].mine) {
				i--;
			} else {
				this.board[row][col].mine = true;
			}
		}
		this.setNumbers();
	}

	//counts the number of mines touching a cell and saves it to the board
	private setNumbers() {
		for (let row = 0; row < this.totalRows; row++) {
			for (let col = 0; col < this.totalCols; col++) {
				//checks to make sure the cell isn't a mine
				if (!this.board[row][col].mine) {
					let count = 0;

					/*checks if the 8 cells around the current cell have a mine
					the if statements make sure that the edges don't check
					indices that don't exist.  The ternary operator adds 1 to
					the count if that cell has a mine */
					if (row > 0 && col > 0)
						count += this.board[row - 1][col - 1].mine ? 1 : 0;
					if (row > 0) count += this.board[row - 1][col].mine ? 1 : 0;
					if (row > 0 && col < this.totalCols - 1)
						count += this.board[row - 1][col + 1].mine ? 1 : 0;
					if (col > 0) count += this.board[row][col - 1].mine ? 1 : 0;
					if (col < this.totalCols - 1)
						count += this.board[row][col + 1].mine ? 1 : 0;
					if (row < this.totalRows - 1 && col > 0)
						count += this.board[row + 1][col - 1].mine ? 1 : 0;
					if (row < this.totalRows - 1)
						count += this.board[row + 1][col].mine ? 1 : 0;
					if (row < this.totalRows - 1 && col < this.totalCols - 1)
						count += this.board[row + 1][col + 1].mine ? 1 : 0;

					this.board[row][col].number = count;
				}
			}
		}
	}

	//counts the number of revealed cells and compares to the number of mines
	private checkRemaining() {
		let count = 0;
		for (let row = 0; row < this.totalRows; row++) {
			for (let col = 0; col < this.totalCols; col++) {
				//adds to the count if the cell is revealed and not a mine
				//a mine should never have been revealed, but its there just
				//incase
				if (this.board[row][col].revealed && !this.board[row][col].mine)
					count++;
			}
		}
		if (count === this.totalRows * this.totalCols - this.totalMines) {
			this.win = true;
			this.playing = false;
			this.clearSaveData();
		}
	}

	//called when a cell is clicked.  This checks if that cell is a mine,
	//triggers the explode loss condition and ends the game
	private checkMines(row: number, col: number) {
		if (this.board[row][col].mine) {
			this.explode = true;
			this.playing = false;
			this.checkFlags();
			this.clearSaveData();
			//This return prevents the cell from being revealed or a cascade
			//from triggering
			return true;
		}
		return false;
	}

	//Checks the board to see if a flag is in the wrong spot
	private checkFlags() {
		for (let row = 0; row < this.totalRows; row++) {
			for (let col = 0; col < this.totalCols; col++) {
				if (this.board[row][col].flag && !this.board[row][col].mine) {
					this.board[row][col].badflag = true;
				}
			}
		}
	}

	//If the cell clicked is a 0 it cascade reveals other cells
	//It should reveal all 0's and numbers touching a 0.
	private onCascade(row: number, col: number) {
		//saves row/col to a key/value ID for easy comparison (removes the
		//need for multiple loops)
		let checked = {};
		let firstKey = row * 1000 + col;
		let toCheck = { [firstKey]: firstKey };

		//tries keeps the number of cells attempted below 5000.  It should
		//never be triggered.  Just there to prevent an infinite loop
		let tries = 0;

		//checks the number of keys in the toCheck object.  If there is 0, the
		//cascade is over.  Starts with 1.
		while (Object.keys(toCheck).length > 0 && tries < 5000) {
			//gets the first key in the list, figures out the row/col from it
			let curKey = +Object.keys(toCheck)[0];
			let curRow = Math.floor(curKey / 1000);
			let curCol = curKey % 1000;

			//checks if the current key has a flag or a mine, if not it reveals
			//the cell and checks if it is 0.  If so, it then adds the neighbors
			//to the toCheck object
			if (
				!this.board[curRow][curCol].flag &&
				!this.board[curRow][curCol].mine
			) {
				this.board[curRow][curCol].revealed = true;

				if (this.board[curRow][curCol].number === 0) {
					//cycle through all neighbors
					for (let i = -1; i < 2; i++) {
						for (let j = -1; j < 2; j++) {
							//prevents current cell from being checked
							if (!(i === 0 && j === 0)) {
								//prevents out of bounds
								if (
									curRow + i >= 0 &&
									curRow + i < this.totalRows &&
									curCol + j >= 0 &&
									curCol + j < this.totalCols
								) {
									//checks if to be checked already contains
									//the current key
									if (
										typeof toCheck[
											(curRow + i) * 1000 + curCol + j
										] !== "number" &&
										typeof checked[
											(curRow + i) * 1000 + curCol + j
										] !== "number"
									) {
										let newKey =
											(curRow + i) * 1000 + curCol + j;
										toCheck[newKey] = newKey;
									}
								}
							}
						}
					}
				}
				checked[curKey] = 1;
				delete toCheck[curKey];
			} else {
				checked[curKey] = 1;
				delete toCheck[curKey];
			}
			tries++;
		}
	}
}
