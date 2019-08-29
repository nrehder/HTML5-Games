import { Component, OnInit } from "@angular/core";
import { MinesweeperService } from "../minesweeper.service";

@Component({
	selector: "app-mine-play",
	templateUrl: "./mine-play.component.html",
	styleUrls: ["./mine-play.component.scss"],
})
export class MinePlayComponent implements OnInit {
	constructor(public mineServ: MinesweeperService) {}

	ngOnInit() {
		//set to 20 by 20 with 5 mines
		this.mineServ.createBoard(20, 20, 10);
	}

	onFlag(row: number, col: number) {
		this.mineServ.onFlag(row, col);
		return false;
	}
	onReveal(row: number, col: number) {
		this.mineServ.onReveal(row, col);
		return false;
	}
}
