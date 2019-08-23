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
		minesweeper: {
			description: "The displayed number tells how many mines are touching that location.  Use the clues to find all mines.  Left click = reveal location, right click = mark mine.";
			title: "Minesweeper";
		};
	};
}
