import { Component, OnInit, OnDestroy } from "@angular/core";
import { MinesweeperService } from "../minesweeper.service";
import { Subscription } from "rxjs";
import { ThemeService } from "src/app/shared/services/theme.service";

@Component({
	selector: "app-mine-menu",
	templateUrl: "./mine-menu.component.html",
	styleUrls: ["./mine-menu.component.scss"],
})
export class MineMenuComponent implements OnInit, OnDestroy {
	constructor(
		public mineServ: MinesweeperService,
		private themeService: ThemeService
	) {}
	isDarkTheme: boolean;
	isDarkSub: Subscription;
	custom: boolean;
	custRow: number = 9;
	custCol: number = 9;
	custMines: number = 10;
	maxMines: number = 64;

	ngOnInit() {
		this.isDarkSub = this.themeService.isDarkTheme.subscribe(res => {
			this.isDarkTheme = res;
		});
	}

	ngOnDestroy() {
		this.isDarkSub.unsubscribe();
	}

	onContinue() {
		this.mineServ.continueGame();
	}

	onEasy() {
		this.mineServ.startGame(9, 9, 10);
	}

	onMedium() {
		this.mineServ.startGame(16, 16, 40);
	}

	onHard() {
		this.mineServ.startGame(16, 30, 99);
	}

	onCustom() {
		this.custom = true;
	}

	onSubmitForm(data: { row: number; col: number; mine: number }) {
		this.mineServ.startGame(data.row, data.col, data.mine);
	}

	onCancel() {
		this.custom = false;
	}

	updateRow(data) {
		this.custRow = data;
		this.updateMaxMine();
	}

	updateCol(data) {
		this.custCol = data;
		this.updateMaxMine();
	}

	updateMine(data) {
		this.custMines = data;
	}

	updateMaxMine() {
		this.maxMines = Math.floor(0.8 * this.custRow * this.custCol);
	}
}
