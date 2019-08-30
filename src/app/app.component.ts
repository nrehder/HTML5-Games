import { Component, OnInit, OnDestroy } from "@angular/core";
import { ThemeService } from "./shared/services/theme.service";
import { Observable, Subscription } from "rxjs";
import { VariableMessageService } from "./shared/variable-message/variable-message.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
	isDarkTheme: boolean;
	isDarkSub: Subscription;
	constructor(
		private themeService: ThemeService,
		public vmService: VariableMessageService
	) {}

	ngOnInit() {
		this.isDarkSub = this.themeService.isDarkTheme.subscribe(res => {
			this.isDarkTheme = res;
		});
	}

	ngOnDestroy() {
		this.isDarkSub.unsubscribe();
	}
}
