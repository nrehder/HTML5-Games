import { Component, OnInit } from "@angular/core";
import { MinesweeperService } from "../minesweeper.service";

@Component({
	selector: "app-mine-menu",
	templateUrl: "./mine-menu.component.html",
	styleUrls: ["./mine-menu.component.scss"],
})
export class MineMenuComponent implements OnInit {
	constructor(private mineServ: MinesweeperService) {}

	ngOnInit() {}
}
