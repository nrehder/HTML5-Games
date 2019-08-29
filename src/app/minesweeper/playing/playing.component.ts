import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-playing",
	templateUrl: "./playing.component.html",
	styleUrls: ["./playing.component.scss"],
})
export class PlayingComponent implements OnInit {
	board: {
		mine: boolean;
		flag: boolean;
		clicked: boolean;
		number: boolean;
	}[][];

	constructor() {}

	ngOnInit() {}
}
