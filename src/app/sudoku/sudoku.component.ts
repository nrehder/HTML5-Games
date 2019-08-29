import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-sudoku",
	templateUrl: "./sudoku.component.html",
	styleUrls: ["./sudoku.component.scss"],
})
export class SudokuComponent implements OnInit {
	Math = Math;

	//Description Variables
	description = "Fill each row/column with the numbers 1 through 9.";
	title = "Sudoku";

	//SVG Variables
	boxSize = 300;
	valueFontSize = "250px";
	guessFontSize = "";

	//Game Variables
	boardSize = 9;
	rootSize = 3;
	solvedBoard = [];
	/*
	boardState[row][col][property]

	cell object should look like
	{
		value:number,
		source:string (either player or given),
		guesses:number[]
	}

	if value empty, show guesses
	otherwise, show value

	if source is player, allow overwrite or erase
	*/
	boardState = [
		[
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
		],
		[
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
		],
		[
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
		],
		[
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
		],
		[
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
		],
		[
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
		],
		[
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
		],
		[
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
		],
		[
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
			{ value: 0, source: "", invalid: false, guesses: [] },
		],
	];

	ngOnInit() {
		this.generateBoard();
	}

	// /*
	// Takes in a number of clues to give the player at the start.  Do not make
	// this number more than 3/4 of the total possible placements.
	// */
	// randomlyPlace(num: number) {
	// 	for (let i = 0; i < num; i++) {
	// 		let placing = true;
	// 		while (placing) {
	// 			let row = Math.floor(Math.random() * 9);
	// 			let col = Math.floor(Math.random() * 9);
	// 			if (this.boardState[row][col].value === 0) {
	// 				let value = Math.floor(Math.random() * 9) + 1;
	// 				this.boardState[row][col].value = value;
	// 				this.boardState[row][col].source = "given";

	// 				placing = false;
	// 				if (this.checkRowDup(row, col)) placing = true;
	// 				if (this.checkColDup(row, col)) placing = true;
	// 				if (this.checkSquareDup(row, col)) placing = true;
	// 				if (placing) {
	// 					this.boardState[row][col].value = 0;
	// 					this.boardState[row][col].source = "";
	// 				}
	// 			}
	// 		}
	// 		console.log(i);
	// 		console.log(this.boardState);
	// 	}
	// }

	generateBoard() {
		let original = [];
		this.solvedBoard = [];

		let topRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (let i = 0; i < topRow.length; i++) {
			let random = Math.floor(Math.random() * 9);
			let temp = topRow[i];
			topRow[i] = topRow[random];
			topRow[random] = temp;
		}

		//fills the board with numbers 1 through 9
		original.push([...topRow]);
		this.solvedBoard.push([...topRow]);
		let shift = 0;
		for (let row = 1; row < this.boardSize; row++) {
			shift += 3;
			if (shift >= 9) {
				shift = (shift % 9) + 1;
			}
			let newRow = [];
			// console.log("row " + row);
			// console.log("shift " + shift);
			for (let col = 0; col < this.boardSize; col++) {
				// console.log((shift + col) % 9);
				// console.log("value: " + topRow[(shift + col) % 9]);
				newRow.push(topRow[(shift + col) % 9]);
			}
			this.solvedBoard.push([...newRow]);
			original.push([...newRow]);
		}
		//randomizes the placement of those values
		for (let i = 0; i < 100; i++) {
			this.swapRows();
			this.swapCols();
		}
		console.log("original");
		console.log(original);
		console.log("shuffled");
		console.log(this.solvedBoard);
	}

	swapRows() {
		let rowSquare = Math.floor(Math.random() * this.rootSize);
		let rowOneNum = rowSquare * 3;
		let rowOne = [...this.solvedBoard[rowOneNum]];
		let rowTwoNum = rowOneNum + 1;
		let rowTwo = [...this.solvedBoard[rowTwoNum]];
		let rowThreeNum = rowTwoNum + 1;
		let rowThree = [...this.solvedBoard[rowThreeNum]];

		//for boards more than 9x9, have to implement a possibilities calculation
		let randomizer = Math.floor(Math.random() * 6);
		switch (randomizer) {
			case 1:
				this.solvedBoard[rowTwoNum] = rowThree;
				this.solvedBoard[rowThreeNum] = rowTwo;
				break;
			case 2:
				this.solvedBoard[rowOneNum] = rowTwo;
				this.solvedBoard[rowTwoNum] = rowOne;
				break;
			case 3:
				this.solvedBoard[rowOneNum] = rowTwo;
				this.solvedBoard[rowTwoNum] = rowThree;
				this.solvedBoard[rowThreeNum] = rowOne;
				break;
			case 4:
				this.solvedBoard[rowOneNum] = rowThree;
				this.solvedBoard[rowTwoNum] = rowOne;
				this.solvedBoard[rowThreeNum] = rowTwo;
				break;
			case 5:
				this.solvedBoard[rowOneNum] = rowThree;
				this.solvedBoard[rowThreeNum] = rowOne;
				break;
		}
	}
	swapCols() {
		let colSquare = Math.floor(Math.random() * this.rootSize);
		let colOneNum = colSquare * 3;
		let colTwoNum = colOneNum + 1;
		let colThreeNum = colTwoNum + 1;

		let randomizer = Math.floor(Math.random() * 6);
		switch (randomizer) {
			case 1:
				for (let row = 0; row < this.boardSize; row++) {
					let temp2 = this.solvedBoard[row][colTwoNum];
					let temp3 = this.solvedBoard[row][colThreeNum];

					this.solvedBoard[row][colTwoNum] = temp3;
					this.solvedBoard[row][colThreeNum] = temp2;
				}
				break;
			case 2:
				for (let row = 0; row < this.boardSize; row++) {
					let temp1 = this.solvedBoard[row][colOneNum];
					let temp2 = this.solvedBoard[row][colTwoNum];

					this.solvedBoard[row][colOneNum] = temp2;
					this.solvedBoard[row][colTwoNum] = temp1;
				}
				break;
			case 3:
				for (let row = 0; row < this.boardSize; row++) {
					let temp1 = this.solvedBoard[row][colOneNum];
					let temp2 = this.solvedBoard[row][colTwoNum];
					let temp3 = this.solvedBoard[row][colThreeNum];

					this.solvedBoard[row][colOneNum] = temp2;
					this.solvedBoard[row][colTwoNum] = temp3;
					this.solvedBoard[row][colThreeNum] = temp1;
				}
				break;
			case 4:
				for (let row = 0; row < this.boardSize; row++) {
					let temp1 = this.solvedBoard[row][colOneNum];
					let temp2 = this.solvedBoard[row][colTwoNum];
					let temp3 = this.solvedBoard[row][colThreeNum];

					this.solvedBoard[row][colOneNum] = temp3;
					this.solvedBoard[row][colTwoNum] = temp1;
					this.solvedBoard[row][colThreeNum] = temp2;
				}
				break;
			case 5:
				for (let row = 0; row < this.boardSize; row++) {
					let temp1 = this.solvedBoard[row][colOneNum];
					let temp3 = this.solvedBoard[row][colThreeNum];

					this.solvedBoard[row][colOneNum] = temp3;
					this.solvedBoard[row][colThreeNum] = temp1;
				}
				break;
		}
	}

	/*
	Each of the following functions take in a cell's row/col.  The functions
	will then check to see if that cell has a value that matches another cell
	in the same row/col/square.  If so, it returns true.  If not, returns false
	*/
	checkRowDup(row: number, col: number) {
		for (let i = 0; i < this.boardState.length; i++) {
			if (
				i !== col &&
				this.boardState[row][col].value ===
					this.boardState[row][i].value
			) {
				return true;
			}
		}
		return false;
	}
	checkColDup(row: number, col: number) {
		for (let i = 0; i < this.boardState.length; i++) {
			if (
				i !== row &&
				this.boardState[row][col].value ===
					this.boardState[i][col].value
			) {
				return true;
			}
		}
		return false;
	}
	checkSquareDup(row: number, col: number) {
		let rowMult = Math.floor(row / this.rootSize);
		let colMult = Math.floor(col / this.rootSize);

		for (
			let i = rowMult * this.rootSize;
			i < (rowMult + 1) * this.rootSize;
			i++
		) {
			for (
				let j = colMult * this.rootSize;
				j < (colMult + 1) * this.rootSize;
				j++
			) {
				if (
					(i !== row || j !== col) &&
					this.boardState[row][col].value ===
						this.boardState[i][j].value
				) {
					return true;
				}
			}
		}
		return false;
	}
}
