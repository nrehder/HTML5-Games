// @ViewChild("minesweeper", { static: false }) gameCanvas: ElementRef;

// 	gameContext: CanvasRenderingContext2D;
// 	gameTimer;
// 	filling: boolean = false;
// 	x: number = 0;
// 	y: number = 470;
// 	prevTime: Date;
// 	pressedKeys: { [key: string]: boolean } = {
// 		ArrowRight: false,
// 		ArrowLeft: false,
// 	};

// 	ngAfterViewInit() {
// 		this.gameContext = (<HTMLCanvasElement>(
// 			this.gameCanvas.nativeElement
// 		)).getContext("2d");

// 		this.gameContext.font = "30px Arial";

// 		let snakepieces = [
// 			{
// 				x: 5,
// 				y: 5,
// 			},
// 			{
// 				x: 6,
// 				y: 5,
// 			},
// 		];

// 		this.gameContext.beginPath();
// 		this.gameContext.arc(
// 			(snakepieces[0].x + 1) * 25,
// 			(snakepieces[0].y + 0.5) * 25,
// 			12.5,
// 			Math.PI / 2,
// 			-Math.PI / 2
// 		);
// 		this.gameContext.fill();
// 		this.gameContext.fillRect(
// 			snakepieces[1].x * 25,
// 			snakepieces[1].y * 25,
// 			25,
// 			25
// 		);
// 	}
// 	/*
// 	@HostListener("document:keydown", ["$event"])
// 	onKeyDown(event: KeyboardEvent) {
// 		switch (event.key) {
// 			case "ArrowRight":
// 				this.pressedKeys.ArrowRight = true;
// 				break;
// 			case "ArrowLeft":
// 				this.pressedKeys.ArrowLeft = true;
// 				break;
// 		}
// 	}
// 	@HostListener("document:keyup", ["$event"])
// 	onKeyUp(event: KeyboardEvent) {
// 		switch (event.key) {
// 			case "ArrowRight":
// 				this.pressedKeys.ArrowRight = false;
// 				break;
// 			case "ArrowLeft":
// 				this.pressedKeys.ArrowLeft = false;
// 				break;
// 		}
// 	}
// 	paddle() {
// 		setInterval(() => {
// 			this.gameContext.clearRect(0, 0, 500, 500);
// 			this.gameContext.fillRect(this.x, this.y, 100, 25);
// 			if (this.pressedKeys.ArrowRight) {
// 				if (this.x < 500 - 100) this.x += 5;
// 			}
// 			if (this.pressedKeys.ArrowLeft) {
// 				if (this.x > 0) this.x -= 5;
// 			}
// 		}, 16);
// 	}

// 	mouseMove(event: MouseEvent) {
// 		if (this.filling)
// 			this.gameContext.fillRect(
// 				event.offsetX - 25,
// 				event.offsetY - 25,
// 				50,
// 				50
// 			);
// 	}

// 	startFill(event: MouseEvent) {
// 		this.filling = true;
// 		this.gameContext.fillRect(
// 			event.offsetX - 25,
// 			event.offsetY - 25,
// 			50,
// 			50
// 		);
// 	}
// 	endFill() {
// 		this.filling = false;
// 	}
// 	createRect(
// 		initX: number,
// 		spdX: number,
// 		initY: number,
// 		spdY: number,
// 		width: number,
// 		height: number,
// 		color: string
// 	) {
// 		return {
// 			x: initX,
// 			y: initY,
// 			spdX,
// 			spdY,
// 			width,
// 			height,
// 			color,
// 		};
// 	}

// 	drawRect(rect: rect) {
// 		this.gameContext.fillStyle = rect.color;
// 		this.gameContext.fillRect(rect.x, rect.y, rect.width, rect.height);
// 	}

// 	multipleCollidingRects() {
// 		let rectArray: rect[] = [];

// 		rectArray.push(this.createRect(0, 1, 0, 1, 200, 200, "blue"));
// 		rectArray.push(this.createRect(300, -2, 300, 2, 50, 50, "black"));

// 		this.gameTimer = setInterval(() => {
// 			this.gameContext.clearRect(0, 0, 500, 500);
// 			for (let i = 0; i < rectArray.length; i++) {
// 				this.drawRect(rectArray[i]);
// 			}
// 			this.updateRects(rectArray);
// 		}, 16);
// 	}

// 	updateRects(rectArray: rect[]) {
// 		//checks if a collision occurs

// 		for (let i = 0; i < rectArray.length; i++) {
// 			for (let j = i + 1; j < rectArray.length; j++) {
// 				this.checkCollision(rectArray[i], rectArray[j]);
// 			}
// 		}
// 		//updates the position of all rectangles
// 		for (let i = 0; i < rectArray.length; i++) {
// 			rectArray[i].x += rectArray[i].spdX;
// 			rectArray[i].y += rectArray[i].spdY;
// 			this.wallCollision(rectArray[i]);
// 		}
// 	}

// 	wallCollision(rect: rect) {
// 		if (rect.x > 500 - rect.width && rect.spdX > 0) {
// 			rect.spdX = -rect.spdX;
// 		}
// 		if (rect.x < 0 && rect.spdX < 0) {
// 			rect.spdX = -rect.spdX;
// 		}
// 		if (rect.y > 500 - rect.height && rect.spdY > 0) {
// 			rect.spdY = -rect.spdY;
// 		}
// 		if (rect.y < 0 && rect.spdY < 0) {
// 			rect.spdY = -rect.spdY;
// 		}
// 	}

// 	checkCollision(rect1: rect, rect2: rect) {
// 		//basic collision detection
// 		if (
// 			rect1.x < rect2.x + rect2.width &&
// 			rect1.x + rect1.width > rect2.x &&
// 			rect1.y < rect2.y + rect2.height &&
// 			rect1.y + rect1.height > rect2.y
// 		) {
// 			//checks angle from rectangle 1 to 2
// 			let dx = rect2.x + rect2.width / 2 - (rect1.x + rect1.width / 2);
// 			let dy = rect2.y + rect2.height / 2 - (rect1.y + rect1.height / 2);
// 			let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
// 			if (angle < 0) angle += 360;
// 			console.log(angle);

// 			if ((angle >= 0 && angle < 45) || (angle > 315 && angle < 360)) {
// 				//if 1 is to the left of 2, flip speed of 1 if its moving to
// 				//the right and 2 if its moving to the left
// 				if (rect1.spdX > 0) rect1.spdX = -rect1.spdX;
// 				if (rect2.spdX < 0) rect2.spdX = -rect2.spdX;
// 			} else if (angle >= 45 && angle < 135) {
// 				//1 is below 2
// 				if (rect1.spdY > 0) rect1.spdY = -rect1.spdY;
// 				if (rect2.spdY < 0) rect2.spdY = -rect2.spdY;
// 			} else if (angle >= 135 && angle < 225) {
// 				//1 is left of 2
// 				if (rect1.spdX < 0) rect1.spdX = -rect1.spdX;
// 				if (rect2.spdX > 0) rect2.spdX = -rect2.spdX;
// 			} else {
// 				//1 is above 2
// 				if (rect1.spdY < 0) rect1.spdY = -rect1.spdY;
// 				if (rect2.spdY > 0) rect2.spdY = -rect2.spdY;
// 			}
// 		}
// 	}

// 	multipleRects() {
// 		let rectArray: rect[] = [];

// 		rectArray.push(this.createRect(0, 2, 0, 1, 50, 50, "blue"));
// 		rectArray.push(this.createRect(90, -2, 90, 4, 50, 50, "black"));
// 		rectArray.push(this.createRect(150, 2, 250, -2, 25, 25, "red"));

// 		setInterval(() => {
// 			this.gameContext.clearRect(0, 0, 500, 500);
// 			for (let i = 0; i < rectArray.length; i++) {
// 				this.drawRect(rectArray[i]);
// 				this.updateRect(rectArray[i]);
// 			}
// 		}, 16);
// 	}

// 	updateRect(rect: rect) {
// 		rect.x += rect.spdX;
// 		if (rect.x > 500 - rect.width || rect.x < 0) {
// 			rect.spdX = -rect.spdX;
// 		}
// 		rect.y += rect.spdY;
// 		if (rect.y > 500 - rect.height || rect.y < 0) {
// 			rect.spdY = -rect.spdY;
// 		}
// 	}

// 	// randomSquareFill(speed: number) {
// 	// 	setInterval(() => {
// 	// 		let x = Math.random() * 450;
// 	// 		let y = Math.random() * 450;
// 	// 		let red = Math.floor(Math.random() * 255);
// 	// 		let green = Math.floor(Math.random() * 255);
// 	// 		let blue = Math.floor(Math.random() * 255);
// 	// 		this.gameContext.fillStyle = `rgb(${red},${green},${blue})`;
// 	// 		this.gameContext.fillRect(x, y, 50, 50);
// 	// 	}, speed);
// 	// }

// 	// bouncingSquare(startX: number, startY: number, spdX: number, spdY: number) {
// 	// 	let x = startX;
// 	// 	let y = startY;
// 	// 	this.gameContext.fillRect(x, y, 50, 50);
// 	// 	setInterval(() => {
// 	// 		this.gameContext.clearRect(0, 0, 500, 500); //clears entire screen
// 	// 		x += spdX;
// 	// 		if (x > 450 || x < 0) {
// 	// 			spdX = -spdX;
// 	// 		}
// 	// 		y += spdY;
// 	// 		if (y > 450 || y < 0) {
// 	// 			spdY = -spdY;
// 	// 		}

// 	// 		this.gameContext.fillRect(x, y, 50, 50);
// 	// 	}, 16);
// 	// }
// */
