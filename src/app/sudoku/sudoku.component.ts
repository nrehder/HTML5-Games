import {
	Component,
	OnInit,
	AfterViewInit,
	ViewChild,
	ElementRef,
} from "@angular/core";

@Component({
	selector: "app-sudoku",
	templateUrl: "./sudoku.component.html",
	styleUrls: ["./sudoku.component.scss"],
})
export class SudokuComponent implements OnInit, AfterViewInit {
	Math = Math;

	//Description Variables
	description = "Fill each row/column with the numbers 1 through 9.";
	title = "Sudoku";

	//SVG Variables
	boxSize = 300;
	valueFontSize = "250px";
	guessFontSize = "";

	//Game Variables

	/*
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
			{ value: 1, source: "player" },
			{ value: 2, source: "given" },
			{ value: 3, source: "given" },
			{ value: 4, source: "given" },
			{ value: 5, source: "given" },
			{ value: 6, source: "given" },
			{ value: 7, source: "given" },
			{ value: 8, source: "given" },
			{ value: 9, source: "given" },
		],
		[
			{ value: 2, source: "player" },
			{ value: 3, source: "given" },
			{ value: 4, source: "given" },
			{ value: 5, source: "given" },
			{ value: 6, source: "given" },
			{ value: 7, source: "given" },
			{ value: 8, source: "given" },
			{ value: 9, source: "given" },
			{ value: 1, source: "given" },
		],
		[
			{ value: 3, source: "given" },
			{ value: 4, source: "given" },
			{ value: 5, source: "given" },
			{ value: 6, source: "given" },
			{ value: 7, source: "given" },
			{ value: 8, source: "given" },
			{ value: 9, source: "given" },
			{ value: 1, source: "player" },
			{ value: 2, source: "given" },
		],
		[
			{ value: 4, source: "given" },
			{ value: 5, source: "given" },
			{ value: 6, source: "given" },
			{ value: 7, source: "given" },
			{ value: 8, source: "given" },
			{ value: 9, source: "given" },
			{ value: 1, source: "player" },
			{ value: 2, source: "given" },
			{ value: 3, source: "given" },
		],
		[
			{ value: 5, source: "given" },
			{ value: 6, source: "given" },
			{ value: 7, source: "given" },
			{ value: 8, source: "given" },
			{ value: 9, source: "given" },
			{ value: 1, source: "player" },
			{ value: 2, source: "given" },
			{ value: 3, source: "given" },
			{ value: 4, source: "given" },
		],
		[
			{ value: 6, source: "given" },
			{ value: 7, source: "given" },
			{ value: 8, source: "given" },
			{ value: 9, source: "given" },
			{ value: 1, source: "player" },
			{ value: 2, source: "given" },
			{ value: 3, source: "given" },
			{ value: 4, source: "given" },
			{ value: 5, source: "given" },
		],
		[
			{ value: 7, source: "given" },
			{ value: 8, source: "given" },
			{ value: 9, source: "given" },
			{ value: 1, source: "player" },
			{ value: 2, source: "given" },
			{ value: 3, source: "given" },
			{ value: 4, source: "given" },
			{ value: 5, source: "given" },
			{ value: 6, source: "given" },
		],
		[
			{ value: 8, source: "given" },
			{ value: 9, source: "given" },
			{ value: 1, source: "player" },
			{ value: 2, source: "given" },
			{ value: 3, source: "given" },
			{ value: 4, source: "given" },
			{ value: 5, source: "given" },
			{ value: 6, source: "given" },
			{ value: 7, source: "given" },
		],
		[
			{ value: 9, source: "given" },
			{ value: 1, source: "player" },
			{ value: 2, source: "given" },
			{ value: 3, source: "given" },
			{ value: 4, source: "given" },
			{ value: 5, source: "given" },
			{ value: 6, source: "given" },
			{ value: 7, source: "given" },
			{ value: 8, source: "given" },
		],
	];

	ngOnInit() {
		for (let i = 0; i < this.boardState.length; i++) {
			for (let j = 0; j < this.boardState[i].length; j++) {
				if (Math.random() > 0.5) {
					this.boardState[i][j].source = "given";
				} else {
					this.boardState[i][j].source = "player";
				}
			}
		}
	}
	ngAfterViewInit() {}
}
