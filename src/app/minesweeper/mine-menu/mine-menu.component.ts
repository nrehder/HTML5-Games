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

	onCustom() {}
}
