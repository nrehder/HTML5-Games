import { NgModule } from "@angular/core";
import {
	MatButtonModule,
	MatButtonToggleModule,
	MatIconModule,
	MatBadgeModule,
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatToolbarModule,
	MatSidenavModule,
	MatCardModule,
	MatGridListModule,
	MatSlideToggleModule,
} from "@angular/material";

const materialModules = [
	MatButtonModule,
	MatButtonToggleModule,
	MatIconModule,
	MatBadgeModule,
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatToolbarModule,
	MatSidenavModule,
	MatCardModule,
	MatGridListModule,
	MatSlideToggleModule,
];

@NgModule({
	imports: [materialModules],
	exports: [materialModules],
})
export class MaterialModule {}
