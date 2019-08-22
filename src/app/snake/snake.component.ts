import {
	Component,
	AfterViewInit,
	ViewChild,
	ElementRef,
	HostListener,
} from "@angular/core";

@Component({
	selector: "app-snake",
	templateUrl: "./snake.component.html",
	styleUrls: ["./snake.component.scss"],
})
export class SnakeComponent implements AfterViewInit {
	//Score Canvas Variables
	@ViewChild("score", { static: false }) scoreCanvas: ElementRef;
	scoreContext: CanvasRenderingContext2D;
	scoreWidth: number;
	scoreHeight: number;

	//Game Canvas Variables
	@ViewChild("snake", { static: false }) gameCanvas: ElementRef;
	gameContext: CanvasRenderingContext2D;
	width: number;
	height: number;
	gridSize: number;
	gridAmount: number;

	//Game Variables
	gameTimer: number;
	snake: {
		direction: string;
		length: number;
		pieces: { x: number; y: number }[];
	};
	score: number;
	pellet: {
		x: number;
		y: number;
	};
	inverval;
	playing: boolean;

	ngAfterViewInit() {
		//Stores the element reference as a 2D HTML canvas element
		this.gameContext = (<HTMLCanvasElement>(
			this.gameCanvas.nativeElement
		)).getContext("2d");

		//Saves game area info
		this.height = this.gameCanvas.nativeElement.height;
		this.width = this.gameCanvas.nativeElement.width;
		this.gridAmount = 25;
		this.gridSize = this.height / this.gridAmount;

		//Stores score element reference as a 2D HTML canvas element
		this.scoreContext = (<HTMLCanvasElement>(
			this.scoreCanvas.nativeElement
		)).getContext("2d");

		//Saves score area info
		this.scoreHeight = this.scoreCanvas.nativeElement.height;
		this.scoreWidth = this.scoreCanvas.nativeElement.width;

		//Sets default text behavior for scoreboard
		this.scoreContext.textAlign = "center";
		this.scoreContext.textBaseline = "middle";
		this.scoreContext.font = "32px Arial";

		//starts game
		this.setup();
	}

	setup() {
		//sets initial values, could be randomized later
		this.gameTimer = 0;
		this.snake = {
			direction: "right",
			length: 1,
			pieces: [{ x: 0, y: 0 }],
		};
		this.pellet = {
			x: 5,
			y: 5,
		};
		this.score = 0;
		this.playing = true;
		this.runGame();
		this.drawScore();
	}

	runGame() {
		this.inverval = setInterval(() => {
			this.gameContext.clearRect(0, 0, this.height, this.width);
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

	checkCollision() {
		if (
			this.snake.pieces[0].x < 0 ||
			this.snake.pieces[0].x > this.gridAmount - 1 ||
			this.snake.pieces[0].y < 0 ||
			this.snake.pieces[0].y > this.gridAmount - 1
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

	eatPellet() {
		this.snake.length += 1;
		let toBePlaced = true;
		let x: number;
		let y: number;
		while (toBePlaced) {
			x = Math.floor(Math.random() * (this.gridAmount - 2)) + 1;
			y = Math.floor(Math.random() * (this.gridAmount - 2)) + 1;
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
		this.incrementScore();
	}

	incrementScore() {
		this.score += 1;
		this.drawScore();
	}
	drawScore() {
		this.scoreContext.clearRect(0, 0, this.scoreWidth, this.scoreHeight);
		this.scoreContext.fillText(
			this.score.toString(),
			this.scoreWidth / 2,
			this.scoreHeight / 2
		);
	}

	crash() {
		//endgame
		this.playing = false;
		clearInterval(this.inverval);
		this.gameContext.fillStyle = "black";
		this.gameContext.fillRect(0, 0, this.width, this.height);
		this.gameContext.fillStyle = "white";
		this.gameContext.textAlign = "center";
		this.gameContext.textBaseline = "middle";
		this.gameContext.font = "64px Arial";
		this.gameContext.fillText(
			"GAME OVER",
			this.width / 2,
			this.height / 2 - 50
		);
		this.gameContext.font = "32px Arial";
		this.gameContext.fillText(
			"Press any key to continue",
			this.width / 2,
			this.height / 2 + 50
		);
	}

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
}
