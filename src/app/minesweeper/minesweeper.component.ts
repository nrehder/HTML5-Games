import { Component, AfterViewInit, OnInit } from "@angular/core";
import { MinesweeperService } from "./minesweeper.service";

@Component({
	selector: "app-minesweeper",
	templateUrl: "./minesweeper.component.html",
	styleUrls: ["./minesweeper.component.scss"],
})
export class MinesweeperComponent implements OnInit {
	//Description Variables
	description = "<description>.  Icons provided by ";
	link = "http://www.sireasgallery.com/iconset/minesweeper/";
	title = "Minesweeper";

	constructor(public mineServ: MinesweeperService) {}
	ngOnInit() {}
}
