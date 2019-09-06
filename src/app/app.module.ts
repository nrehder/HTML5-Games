import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

//Modules
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";

//Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SnakeComponent } from "./snake/snake.component";
import { GameComponent } from "./game/game.component";
import { MinesweeperComponent } from "./minesweeper/minesweeper.component";
import { SudokuComponent } from "./sudoku/sudoku.component";
import { LinksComponent } from "./header/links/links.component";
import { MinePlayComponent } from "./minesweeper/mine-play/mine-play.component";
import { MineMenuComponent } from "./minesweeper/mine-menu/mine-menu.component";
import { VariableMessageComponent } from "./shared/variable-message/variable-message.component";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		GameComponent,
		SnakeComponent,
		MinesweeperComponent,
		SudokuComponent,
		LinksComponent,
		MinePlayComponent,
		MineMenuComponent,
		VariableMessageComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
