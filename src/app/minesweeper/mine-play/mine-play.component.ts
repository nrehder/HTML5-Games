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
	zoomLevel: number = 1;

	constructor(
		public mineServ: MinesweeperService,
		private vmService: VariableMessageService
	) {}

	ngOnInit() {}

	onFlag(row: number, col: number) {
		this.mineServ.onFlag(row, col);
		return false;
	}
	onReveal(row: number, col: number) {
		this.mineServ.onReveal(row, col);
		return false;
	}
	onDoubleClick(row: number, col: number) {
		console.log(row + ", " + col);
		this.mineServ.onDoubleClick(row, col);
		return false;
	}
	onMenu() {
		this.mineServ.displayGame = false;
	}
	onNewGame() {
		if (this.mineServ.playing) {
			this.vmService.message =
				"Are you sure you want to start a new game with the same settings?";
			this.vmService.choice.pipe(take(1)).subscribe(res => {
				if (res === "confirm") {
					//go to mine-menu
					this.mineServ.resetGame();
				}
			});
		} else {
			this.mineServ.resetGame();
		}
	}
}
