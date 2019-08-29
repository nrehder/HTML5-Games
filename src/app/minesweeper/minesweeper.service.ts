import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class MinesweeperService {
	playing: boolean = true;
	explode: boolean = false;

	totalRows: number;
	totalCols: number;
	totalMines: number;
	board: {
		mine: boolean;
		flag: boolean;
		clicked: boolean;
		number: number;
	}[][];

	createBoard(rowNum: number, colNum: number, mines: number) {
		this.totalRows = rowNum;
		this.totalCols = colNum;
		this.totalMines = mines;
		this.board = [];
		for (let row = 0; row < this.totalRows; row++) {
			this.board.push([]);
			for (let col = 0; col < this.totalCols; col++) {
				this.board[row].push({
					mine: false,
					flag: false,
					clicked: false,
					number: 0,
				});
			}
		}
		this.placeMines(mines);
	}

	onFlag(row: number, col: number) {
		this.board[row][col].flag = !this.board[row][col].flag;
	}

	onReveal(row: number, col: number) {
		if (!this.board[row][col].flag) {
			if (!this.checkMines(row, col)) {
				this.board[row][col].clicked = true;
				if (this.board[row][col].number === 0) {
					this.onCascade(row, col);
				}
			}
		}
	}

	private placeMines(mines: number) {
		for (let i = 0; i < mines; i++) {
			let row = Math.floor(Math.random() * this.totalRows);
			let col = Math.floor(Math.random() * this.totalCols);
			if (this.board[row][col].mine) {
				continue;
			} else {
				this.board[row][col].mine = true;
			}
		}
		this.setNumbers();
	}

	private setNumbers() {
		for (let row = 0; row < this.totalRows; row++) {
			for (let col = 0; col < this.totalCols; col++) {
				let count = 0;
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

	private checkMines(row: number, col: number) {
		if (this.board[row][col].mine) {
			this.explode = true;
			return true;
		}
		return false;
	}
	private onCascade(row: number, col: number) {
		let checked = {};
		let firstKey = row * 1000 + col;
		let toCheck = { [firstKey]: firstKey };
		let tries = 0;
		while (Object.keys(toCheck).length > 0 && tries < 5000) {
			let curKey = +Object.keys(toCheck)[0];
			let curRow = Math.floor(curKey / 1000);
			let curCol = curKey % 1000;
			if (
				!this.board[curRow][curCol].flag &&
				!this.board[curRow][curCol].mine
			) {
				this.board[curRow][curCol].clicked = true;

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
									//checks if to be checked already contains element
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
