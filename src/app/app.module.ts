import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

//Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

//Modules
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";
import { SnakeModule } from "./snake/snake.module";

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		MaterialModule,
		SnakeModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
