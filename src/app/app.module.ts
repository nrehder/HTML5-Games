import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

//Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SnakeComponent } from "./snake/snake.component";
import { GameComponent } from "./game/game.component";

//Modules
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";
import { MinesweeperComponent } from "./minesweeper/minesweeper.component";
import { SudokuComponent } from './sudoku/sudoku.component';
import { LinksComponent } from './header/links/links.component';
import { MenuComponent } from './minesweeper/menu/menu.component';
import { PlayingComponent } from './minesweeper/playing/playing.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		GameComponent,
		SnakeComponent,
		MinesweeperComponent,
		SudokuComponent,
		LinksComponent,
		MenuComponent,
		PlayingComponent,
	],
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
