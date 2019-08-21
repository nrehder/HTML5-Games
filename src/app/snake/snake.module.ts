import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SnakeComponent } from "./snake.component";

@NgModule({
	declarations: [SnakeComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: "", component: SnakeComponent }]),
	],
})
export class SnakeModule {}
