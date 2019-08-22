import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class GameDescriptionsService {
	games: {
		snake: {
			description: "Use arrow keys to control direction snake moves.  Eat pellets to gain points and grow your snake.  Avoid the walls and other parts of your snake.";
			title: "Snake";
		};
	};
}
