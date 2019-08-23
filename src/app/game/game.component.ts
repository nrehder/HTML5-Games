import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.scss"],
})
export class GameComponent {
	@Input() title: string;
	@Input() description: string;
}
