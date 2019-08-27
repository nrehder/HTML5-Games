import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SnakeComponent } from "./snake/snake.component";
import { MinesweeperComponent } from "./minesweeper/minesweeper.component";
import { SudokuComponent } from './sudoku/sudoku.component';

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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
