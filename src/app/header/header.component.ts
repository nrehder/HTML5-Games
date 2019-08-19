import { Component, OnInit } from "@angular/core";
import {
	trigger,
	state,
	style,
	transition,
	animate,
} from "@angular/animations";
import { ThemeService } from "../shared/services/theme.service";
import { Observable } from "rxjs";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	animations: [
		trigger("fadeInOut", [
			state(
				"void",
				style({
					opacity: 0,
					height: 0,
				})
			),
			transition("void<=>*", animate("0.2s ease-in")),
		]),
	],
})
export class HeaderComponent implements OnInit {
	navbarOpen: boolean = false;
	isDarkTheme: Observable<boolean>;

	constructor(private themeService: ThemeService) {}

	ngOnInit() {
		this.isDarkTheme = this.themeService.isDarkTheme;
	}

	onToggleTheme(checked: boolean) {
		this.themeService.setDarkTheme(checked);
	}

	onToggleNavbar() {
		this.navbarOpen = !this.navbarOpen;
	}
}
