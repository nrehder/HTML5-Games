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
export class SudokuComponent implements AfterViewInit {
	@ViewChild("test", { static: false }) svgTest: ElementRef;

	//Description Variables
	description = "Fill each row/column with the numbers 1 through 9.";
	title = "Sudoku";

	//SVG Variables
	boxSize = 300;
	valueFontSize = "250px";
	guessFontSize = "";

	//Game Variables
	startingValues = [[]];
	playerValues = [[]];
	playerGuesses = [[]];

	ngAfterViewInit() {}
}
