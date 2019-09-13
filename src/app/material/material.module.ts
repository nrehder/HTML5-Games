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
	MatTableModule,
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
	MatTableModule,
];

@NgModule({
	imports: [materialModules],
	exports: [materialModules],
})
export class MaterialModule {}
