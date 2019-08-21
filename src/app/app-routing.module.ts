import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
	{
		path: "minesweeper",
		loadChildren: "./minesweeper/minesweeper.module#MinesweeperModule",
	},
	{ path: "snake", loadChildren: "./snake/snake.module#SnakeModule" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
