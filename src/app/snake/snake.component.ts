import {
	Component,
	OnInit,
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
	//Canvas Variables
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
	pellet: {
		x: number;
		y: number;
	};
	inverval;

	ngAfterViewInit() {
		//Stores the element reference as a 2D HTML canvas element
		this.gameContext = (<HTMLCanvasElement>(
			this.gameCanvas.nativeElement
		)).getContext("2d");
		this.height = this.gameCanvas.nativeElement.height;
		this.width = this.gameCanvas.nativeElement.width;
		this.gridAmount = 25;
		this.gridSize = this.height / this.gridAmount;

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
		this.runGame();
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
			this.moveSnake();
		}, 100);
	}

	moveSnake() {
		let curPosition = { ...this.snake.pieces[0] };
		switch (this.snake.direction) {
			case "up":
				if (curPosition.y > 0) {
					curPosition.y -= 1;
				} else {
					this.crash();
				}
				break;
			case "right":
				if (curPosition.x + 1 < this.width / this.gridSize) {
					curPosition.x += 1;
				} else {
					this.crash();
				}
				break;
			case "down":
				if (curPosition.y + 1 < this.height / this.gridSize) {
					curPosition.y += 1;
				} else {
					this.crash();
				}
				break;
			case "left":
				if (curPosition.x > 0) {
					curPosition.x -= 1;
				} else {
					this.crash();
				}
				break;
		}
		this.snake.pieces.unshift(curPosition);
		if (this.snake.pieces.length > this.snake.length) {
			this.snake.pieces.pop();
		}
	}

	eatPellet() {
		this.snake.length += 1;
		let toBePlaced = true;
		let x: number;
		let y: number;
		while (toBePlaced) {
			x = Math.floor(Math.random() * this.gridAmount);
			y = Math.floor(Math.random() * this.gridAmount);
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
	crash() {
		//endgame
	}

	@HostListener("document:keydown", ["$event"])
	onkeypress(event: KeyboardEvent) {
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
	}
}
