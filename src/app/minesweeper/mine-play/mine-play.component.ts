import { Component, OnInit } from "@angular/core";
import { MinesweeperService } from "../minesweeper.service";
import { VariableMessageService } from "src/app/shared/variable-message/variable-message.service";
import { take } from "rxjs/operators";

@Component({
	selector: "app-mine-play",
	templateUrl: "./mine-play.component.html",
	styleUrls: ["./mine-play.component.scss"],
})
export class MinePlayComponent implements OnInit {
	constructor(
		public mineServ: MinesweeperService,
		private vmService: VariableMessageService
	) {}

	ngOnInit() {
		//set to 20 by 20 with 5 mines
		this.mineServ.startGame();
	}

	onFlag(row: number, col: number) {
		this.mineServ.onFlag(row, col);
		return false;
	}
	onReveal(row: number, col: number) {
		this.mineServ.onReveal(row, col);
		return false;
	}
	onMenu() {
		this.mineServ.displayGame = false;
		// this.vmService.message = "Are you sure you want to go to the game?";
		// this.vmService.choice.pipe(take(1)).subscribe(res => {
		// 	if (res === "confirm") {

		// 	}
		// });
	}
	onNewGame() {
		if (this.mineServ.playing) {
			this.vmService.message =
				"Are you sure you want to start a new game with the same settings?";
			this.vmService.choice.pipe(take(1)).subscribe(res => {
				if (res === "confirm") {
					//go to mine-menu
					this.mineServ.startGame();
				}
			});
		} else {
			this.mineServ.startGame();
		}
	}
}
