import { Component, AfterViewInit, OnInit } from "@angular/core";
import { MinesweeperService } from "./minesweeper.service";

@Component({
	selector: "app-minesweeper",
	templateUrl: "./minesweeper.component.html",
	styleUrls: ["./minesweeper.component.scss"],
})
export class MinesweeperComponent implements OnInit {
	//Description Variables
	description =
		"The goal of minesweeper is to uncover all free spaces without hitting a mine.  The board will start fully covered.  To start, click/tap any cell in the grid.  The game will make sure that the first click is not a mine, and then reveal the clue behind your first click.  The clues are based on the number of mines that are in neighboring squares to the one the clue is in.  If there are no mines, a blank square will be revealed and will trigger a cascade to reveal other clues.  If you think there is a mine under a specific square based on the clues you see, you can right click (long press on mobile) to place a flag down, preventing you from accidentally clicking it.  Once all non-mine squares have been revealed, you win.  Icons provided by ";
	link = "http://www.sireasgallery.com/iconset/minesweeper/";
	title = "Minesweeper";

	constructor(public mineServ: MinesweeperService) {}
	ngOnInit() {
		if (
			localStorage.getItem("minesweeper_board") &&
			localStorage.getItem("minesweeper_variables")
		) {
			this.mineServ.loadGame();
		}
	}
}
