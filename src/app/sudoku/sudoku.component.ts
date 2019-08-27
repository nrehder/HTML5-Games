import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

@Component({
	selector: "app-sudoku",
	templateUrl: "./sudoku.component.html",
	styleUrls: ["./sudoku.component.scss"],
})
export class SudokuComponent implements AfterViewInit {
	@ViewChild("test",{static:false}) svgTest:ElementRef;

	//Description Variables
	description =
		"Fill each row/column with the numbers 1 through 9.";
	title = "Sudoku";

	//SVG Variables
	boxSize = 300;
	valueFontSize = "250px";
	guessFontSize = "";

	//Game Variables
	startingValues = [[]];
	playerValues = [[]];
	playerGuesses = [[]];

	ngAfterViewInit() {
		// let rectHeight = 300
		// let strokeWidth = 10

		// //svg area
		// this.svgTest.nativeElement.setAttribute('height',rectHeight+2*strokeWidth)
		// this.svgTest.nativeElement.setAttribute('width',rectHeight+2*strokeWidth)

		// //rectangle
		// this.svgTest.nativeElement.childNodes[0].setAttribute('height',rectHeight)
		// this.svgTest.nativeElement.childNodes[0].setAttribute('width',rectHeight)
		// this.svgTest.nativeElement.childNodes[0].style.strokeWidth = 10
		// this.svgTest.nativeElement.childNodes[0].setAttribute('x',strokeWidth)
		// this.svgTest.nativeElement.childNodes[0].setAttribute('y',strokeWidth)

		// this.svgTest.nativeElement.childNodes[1].setAttribute('x',0.5*(rectHeight+2*strokeWidth))
		// this.svgTest.nativeElement.childNodes[1].setAttribute('y',0.5*(rectHeight+2*strokeWidth))
		// this.svgTest.nativeElement.childNodes[1].setAttribute('font-size',0.8*(rectHeight+2*strokeWidth))
		
	}

	/*
	To adjust size of squares
	svg height/width = rect height/width + stroke-width*#
	rect x/y = stroke-width
	text x/y = .5*svg height/width
	text font-size = 80% of svg height/width
	*/

}
