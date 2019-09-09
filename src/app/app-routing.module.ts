import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SnakeComponent } from "./snake/snake.component";
import { MinesweeperComponent } from "./minesweeper/minesweeper.component";
import { SudokuComponent } from "./sudoku/sudoku.component";
import { YahtzeeComponent } from "./yahtzee/yahtzee.component";

const routes: Routes = [
	{
		path: "minesweeper",
		component: MinesweeperComponent,
	},
	{ path: "snake", component: SnakeComponent },
	{
		path: "sudoku",
		component: SudokuComponent,
	},
	{
		path: "yahtzee",
		component: YahtzeeComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
