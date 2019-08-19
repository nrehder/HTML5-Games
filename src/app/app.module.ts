import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

//Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MinesweeperComponent } from "./minesweeper/minesweeper.component";

//Modules
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";

@NgModule({
	declarations: [AppComponent, HeaderComponent, MinesweeperComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
