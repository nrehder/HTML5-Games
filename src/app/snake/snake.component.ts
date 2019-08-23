import {
	Component,
	AfterViewInit,
	ViewChild,
	ElementRef,
	HostListener,
	OnDestroy,
	OnInit,
} from "@angular/core";
import { Subscription } from "rxjs";

import { ThemeService } from "../shared/services/theme.service";

@Component({
	selector: "app-snake",
	templateUrl: "./snake.component.html",
	styleUrls: ["./snake.component.scss"],
})
export class SnakeComponent implements OnInit, AfterViewInit, OnDestroy {
	//Description Info
	description =
		"Use arrow keys to control direction snake moves.  Eat pellets to gain points and grow your snake.  Avoid the walls and other parts of your snake.";
	title = "Snake";

	//Theme info
	themeSub: Subscription;
	primaryColor: string;
	secondaryColor: string;
	offColor: string;
	darkMode: boolean;

	//Score Variables
	@ViewChild("score", { static: false }) scoreCanvas: ElementRef;
	scoreContext: CanvasRenderingContext2D;
	scoreWidth: number;
	scoreHeight: number;
	scoreValue: number;

	//Game Variables
	@ViewChild("snake", { static: false }) gameCanvas: ElementRef;
	gameContext: CanvasRenderingContext2D;
	gameWidth: number;
	gameHeight: number;
	gridSize: number;
	gameGridAmount: number;
	playing: boolean;
	snake: {
		direction: string;
		length: number;
		pieces: { x: number; y: number }[];
	};
	pellet: {
		x: number;
		y: number;
	};
	intervalStore;

	constructor(private theme: ThemeService) {}

	ngOnInit() {
		this.primaryColor = "white";
		this.secondaryColor = "black";
		this.offColor = "grey";
		this.themeSub = this.theme.isDarkTheme.subscribe(mode => {
			this.darkMode = mode;
			if (mode) {
				this.primaryColor = "black";
				this.secondaryColor = "white";
			} else {
				this.primaryColor = "white";
				this.secondaryColor = "black";
			}
			this.drawScore();
			//updates the current display if the game is not running
			if (!this.playing) {
				this.drawPellet();
				this.drawSnake();
				this.drawGameOver();
			}
		});
	}

	ngAfterViewInit() {
		//Stores the element reference as a 2D HTML canvas element
		this.gameContext = (<HTMLCanvasElement>(
			this.gameCanvas.nativeElement
		)).getContext("2d");

		//Saves game area info
		this.gameHeight = this.gameCanvas.nativeElement.height;
		this.gameWidth = this.gameCanvas.nativeElement.width;
		this.gameGridAmount = 25;
		this.gridSize = this.gameHeight / this.gameGridAmount;

		//Stores score element reference as a 2D HTML canvas element
		this.scoreContext = (<HTMLCanvasElement>(
			this.scoreCanvas.nativeElement
		)).getContext("2d");

		//Saves score area info
		this.scoreHeight = this.scoreCanvas.nativeElement.height;
		this.scoreWidth = this.scoreCanvas.nativeElement.width;

		//Sets default text behavior
		this.scoreContext.textAlign = "center";
		this.scoreContext.textBaseline = "middle";
		this.scoreContext.font = "32px Arial";
		this.gameContext.textAlign = "center";
		this.gameContext.textBaseline = "middle";

		//starts game
		this.setup();
	}

	setup() {
		//sets initial values
		this.scoreValue = 0;
		this.playing = true;

		//randomly places the snake and then places the pallet
		this.placeSnake();
		this.placePallet();

		//begins the game and draws the scoreboard
		this.runGame();
		this.drawScore();
	}

	//Randomly places snakes initial position, direction, etc
	placeSnake() {
		this.snake = {
			length: 2,
			pieces: [],
			direction: "",
		};

		//splaces snake anywhere but the edge
		this.snake.pieces.push({
			x: Math.floor(Math.random() * (this.gameGridAmount - 2)) + 1,
			y: Math.floor(Math.random() * (this.gameGridAmount - 2)) + 1,
		});

		/*
		Makes a list of possible directions based on being too close to a wall
		Then randomly chooses from the list
		*/
		let possibleDirections = [];
		if (this.snake.pieces[0].x > 4) possibleDirections.push("left");
		if (this.snake.pieces[0].x < this.gameGridAmount - 5)
			possibleDirections.push("right");
		if (this.snake.pieces[0].y > 4) possibleDirections.push("up");
		if (this.snake.pieces[0].y < this.gameGridAmount - 5)
			possibleDirections.push("down");
		this.snake.direction =
			possibleDirections[
				Math.floor(Math.random() * possibleDirections.length)
			];
	}

	//creates and stores an interval to run the game
	runGame() {
		this.intervalStore = setInterval(() => {
			if (this.moveQueue.length > 0) {
				this.snake.direction = this.moveQueue.pop();
			}
			this.gameContext.clearRect(0, 0, this.gameHeight, this.gameWidth);
			this.drawPellet();
			this.drawSnake();
			if (
				this.snake.pieces[0].x === this.pellet.x &&
				this.snake.pieces[0].y === this.pellet.y
			) {
				this.eatPellet();
			}
			if (!this.checkCollision()) {
				this.moveSnake();
			}
		}, 100);
	}

	//moves snake and updates the snakes pieces locations
	moveSnake() {
		let curPosition = { ...this.snake.pieces[0] };
		switch (this.snake.direction) {
			case "up":
				curPosition.y -= 1;
				break;
			case "right":
				curPosition.x += 1;
				break;
			case "down":
				curPosition.y += 1;
				break;
			case "left":
				curPosition.x -= 1;
				break;
		}
		this.snake.pieces.unshift(curPosition);
		if (this.snake.pieces.length > this.snake.length) {
			this.snake.pieces.pop();
		}
	}

	//Triggers whenever the head of the snake goes over a pellet
	eatPellet() {
		this.snake.length += 1;
		this.placePallet();
		this.incrementScore();
	}

	//increases the score and the updates the scoreboard
	incrementScore() {
		this.scoreValue += 1;
		this.drawScore();
	}

	//checks to see if there is a collision
	checkCollision() {
		if (
			this.snake.pieces[0].x < 0 ||
			this.snake.pieces[0].x > this.gameGridAmount - 1 ||
			this.snake.pieces[0].y < 0 ||
			this.snake.pieces[0].y > this.gameGridAmount - 1
		) {
			this.crash();
			return true;
		}
		for (let i = 1; i < this.snake.pieces.length; i++) {
			if (
				this.snake.pieces[0].x === this.snake.pieces[i].x &&
				this.snake.pieces[0].y === this.snake.pieces[i].y
			) {
				this.crash();
				return true;
			}
		}
		return false;
	}

	//Randomly places pellet in area not on edge of playable area and not where
	//the snake currently is
	placePallet() {
		let toBePlaced = true;
		let x: number;
		let y: number;
		while (toBePlaced) {
			x = Math.floor(Math.random() * (this.gameGridAmount - 2)) + 1;
			y = Math.floor(Math.random() * (this.gameGridAmount - 2)) + 1;
			for (let i = 0; i < this.snake.pieces.length; i++) {
				if (
					this.snake.pieces[i].x !== x &&
					this.snake.pieces[i].y !== y
				) {
					toBePlaced = false;
				}
			}
		}
		this.pellet = { x, y };
	}

	//clears the board and displays game over screen; stops interval
	crash() {
		this.playing = false;
		clearInterval(this.intervalStore);
		this.drawGameOver();
	}

	//updates the scoreboard; made its own fn to be able to set initial score
	drawScore() {
		this.scoreContext.clearRect(0, 0, this.scoreWidth, this.scoreHeight);
		this.scoreContext.fillStyle = this.secondaryColor;
		this.scoreContext.fillText(
			this.scoreValue.toString(),
			this.scoreWidth / 2,
			this.scoreHeight / 2
		);
	}

	//Draws all pieces of snake
	drawSnake() {
		this.gameContext.fillStyle = this.secondaryColor;
		for (let i = 0; i < this.snake.pieces.length; i++) {
			this.gameContext.fillRect(
				this.snake.pieces[i].x * this.gridSize,
				this.snake.pieces[i].y * this.gridSize,
				this.gridSize,
				this.gridSize
			);
		}
	}

	//Draws the pellet
	drawPellet() {
		this.gameContext.fillStyle = this.offColor;
		this.gameContext.fillRect(
			this.pellet.x * this.gridSize,
			this.pellet.y * this.gridSize,
			this.gridSize,
			this.gridSize
		);
	}

	//Draws the game over screen
	drawGameOver() {
		this.gameContext.font = "64px Arial";
		this.gameContext.fillText(
			"GAME OVER",
			this.gameWidth / 2,
			this.gameHeight / 2 - 50
		);
		this.gameContext.font = "32px Arial";
		this.gameContext.fillText(
			"Press any key to continue",
			this.gameWidth / 2,
			this.gameHeight / 2 + 50
		);
	}

	//stores the next movement to an array to prevent turning 180.  without the queue, you could press up and right almost simultaneously to turn around
	moveQueue = [];
	@HostListener("document:keydown", ["$event"])
	onkeypress(event: KeyboardEvent) {
		if (this.playing) {
			if (event.key === "ArrowUp" && this.snake.direction != "down") {
				this.moveQueue[0] = "up";
			} else if (
				event.key === "ArrowDown" &&
				this.snake.direction != "up"
			) {
				this.moveQueue[0] = "down";
			} else if (
				event.key === "ArrowRight" &&
				this.snake.direction != "left"
			) {
				this.moveQueue[0] = "right";
			} else if (
				event.key === "ArrowLeft" &&
				this.snake.direction != "right"
			) {
				this.moveQueue[0] = "left";
			}
		} else {
			this.setup();
		}
	}

	//ensures interval is removed on navigating away
	ngOnDestroy() {
		clearInterval(this.intervalStore);
		this.themeSub.unsubscribe();
	}
}
