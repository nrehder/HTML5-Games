import {
	Component,
	AfterViewInit,
	ViewChild,
	ElementRef,
	HostListener,
	OnDestroy,
} from "@angular/core";

@Component({
	selector: "app-snake",
	templateUrl: "./snake.component.html",
	styleUrls: ["./snake.component.scss"],
})
export class SnakeComponent implements AfterViewInit, OnDestroy {
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
			this.gameContext.clearRect(0, 0, this.gameHeight, this.gameWidth);
			this.gameContext.fillStyle = "grey";
			this.gameContext.fillRect(
				this.pellet.x * this.gridSize,
				this.pellet.y * this.gridSize,
				this.gridSize,
				this.gridSize
			);
			this.gameContext.fillStyle = "black";
			for (let i = 0; i < this.snake.pieces.length; i++) {
				this.gameContext.fillRect(
					this.snake.pieces[i].x * this.gridSize,
					this.snake.pieces[i].y * this.gridSize,
					this.gridSize,
					this.gridSize
				);
			}
			if (
				this.snake.pieces[0].x === this.pellet.x &&
				this.snake.pieces[0].y === this.pellet.y
			) {
				this.eatPellet();
			}
			this.checkCollision();
			this.moveSnake();
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

	//checks to see if there is a collision
	checkCollision() {
		if (
			this.snake.pieces[0].x < 0 ||
			this.snake.pieces[0].x > this.gameGridAmount - 1 ||
			this.snake.pieces[0].y < 0 ||
			this.snake.pieces[0].y > this.gameGridAmount - 1
		) {
			this.crash();
		}
		for (let i = 1; i < this.snake.pieces.length; i++) {
			if (
				this.snake.pieces[0].x === this.snake.pieces[i].x &&
				this.snake.pieces[0].y === this.snake.pieces[i].y
			) {
				this.crash();
			}
		}
	}

	//Triggers whenever the head of the snake goes over a pellet
	eatPellet() {
		this.snake.length += 1;
		this.placePallet();
		this.incrementScore();
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

	//increases the score and the updates the scoreboard
	incrementScore() {
		this.scoreValue += 1;
		this.drawScore();
	}

	//updates the scoreboard; made its own fn to be able to set initial score
	drawScore() {
		this.scoreContext.clearRect(0, 0, this.scoreWidth, this.scoreHeight);
		this.scoreContext.fillText(
			this.scoreValue.toString(),
			this.scoreWidth / 2,
			this.scoreHeight / 2
		);
	}

	//clears the board and displays game over screen; stops interval
	crash() {
		this.playing = false;
		clearInterval(this.intervalStore);
		this.gameContext.fillStyle = "black";
		this.gameContext.fillRect(0, 0, this.gameWidth, this.gameHeight);
		this.gameContext.fillStyle = "white";
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

	//changes directions but prevents turning 180
	@HostListener("document:keydown", ["$event"])
	onkeypress(event: KeyboardEvent) {
		if (this.playing) {
			switch (event.key) {
				case "ArrowUp":
					if (this.snake.direction != "down") {
						this.snake.direction = "up";
					}
					break;
				case "ArrowDown":
					if (this.snake.direction != "up") {
						this.snake.direction = "down";
					}
					break;
				case "ArrowRight":
					if (this.snake.direction != "left") {
						this.snake.direction = "right";
					}
					break;
				case "ArrowLeft":
					if (this.snake.direction != "right") {
						this.snake.direction = "left";
					}
					break;
			}
		} else {
			this.setup();
		}
	}

	//ensures interval is removed on navigating away
	ngOnDestroy() {
		clearInterval(this.intervalStore);
	}
}
