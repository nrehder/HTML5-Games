import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameComponent } from "./game/game.component";
import { SnakeComponent } from "./snake/snake.component";
import { MinesweeperComponent } from "./minesweeper/minesweeper.component";

const routes: Routes = [
	{
		path: "minesweeper",
		component: MinesweeperComponent,
	},
	{ path: "snake", component: SnakeComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
