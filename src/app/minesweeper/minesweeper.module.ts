import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MinesweeperComponent } from "./minesweeper.component";

@NgModule({
	declarations: [MinesweeperComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: "", component: MinesweeperComponent }]),
	],
})
export class MinesweeperModule {}
