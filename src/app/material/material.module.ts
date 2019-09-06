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
	MatSliderModule,
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
	MatSliderModule,
];

@NgModule({
	imports: [materialModules],
	exports: [materialModules],
})
export class MaterialModule {}
