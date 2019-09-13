import { Component, OnInit, ApplicationRef } from "@angular/core";

@Component({
	selector: "app-yaht-game",
	templateUrl: "./yaht-game.component.html",
	styleUrls: ["./yaht-game.component.scss"],
})
export class YahtGameComponent implements OnInit {
	//Dice Variables
	currentDice: number[] = [1, 1, 1, 1, 1];
	lockedDice: boolean[] = [false, false, false, false, false];
	rollingDice: boolean[] = [true, true, true, true, true];
	rolling: boolean;
	rollingInterval;

	//Game Variables
	roundRollsCount: number = 0;
	playingRound: boolean;

	//Scoreboard Variables
	displayedColumns: string[] = ["category", "score"];
	hasYahtzee: boolean = false;
	scoreboardValues: {
		category: string;
		preview: number;
		actual: number;
		scored: boolean;
	}[] = [
		{ category: "Ones", preview: 0, actual: 0, scored: false },
		{ category: "Twos", preview: 0, actual: 0, scored: false },
		{ category: "Threes", preview: 0, actual: 0, scored: false },
		{ category: "Fours", preview: 0, actual: 0, scored: false },
		{ category: "Fives", preview: 0, actual: 0, scored: false },
		{ category: "Sixes", preview: 0, actual: 0, scored: false },
		{ category: "BONUS", preview: 0, actual: 0, scored: false },
		{ category: "Upper Total", preview: 0, actual: 0, scored: true },
		{ category: "Three of a Kind", preview: 0, actual: 0, scored: false },
		{ category: "Four of a Kind", preview: 0, actual: 0, scored: false },
		{ category: "Small Straight", preview: 0, actual: 0, scored: false },
		{ category: "Large Straight", preview: 0, actual: 0, scored: false },
		{ category: "Full House", preview: 0, actual: 0, scored: false },
		{ category: "Yahtzee", preview: 0, actual: 0, scored: false },
		{ category: "Chance", preview: 0, actual: 0, scored: false },
		{ category: "Lower Total", preview: 0, actual: 0, scored: true },
		{ category: "Total", preview: 0, actual: 0, scored: true },
	];

	constructor() {}

	ngOnInit() {
		this.onStartGame();
	}

	onStartGame() {
		this.playingRound = false;
		for (let i = 0; i < this.scoreboardValues.length; i++) {
			this.scoreboardValues[i].preview = 0;
			this.scoreboardValues[i].actual = 0;
			if (
				!(
					this.scoreboardValues[i].category === "Upper Total" ||
					this.scoreboardValues[i].category === "Lower Total" ||
					this.scoreboardValues[i].category === "Total"
				)
			) {
				this.scoreboardValues[i].scored = false;
			}
		}
		for (let j = 0; j < 5; j++) {
			this.currentDice[j] = 0;
			this.lockedDice[j] = false;
		}
		this.roundRollsCount = 0;
	}

	//Whenever the user clicks the roll dice button it clears the yahtzee
	//text from the screen and sets the game to be playing again
	//If the round has already started, it just continues, but if a round is
	//over this ensures that the user can't lock dice from a previous round
	//to the next
	onRollDice() {
		this.hasYahtzee = false;
		this.playingRound = true;
		this.roundRollsCount++;
		let counter = 0;
		for (let i = 0; i < 5; i++) {
			this.rollingDice[i] = !this.lockedDice[i];
		}
		this.rolling = true;
		this.rollingInterval = setInterval(() => {
			for (let j = 0; j < 5; j++) {
				if (this.rollingDice[j]) {
					this.currentDice[j] = Math.floor(Math.random() * 6) + 1;
					if (counter >= 5) {
						this.rollingDice[j] = Math.random() < 0.8;
					}
				}
			}
			counter++;
			this.checkDice(counter);
		}, 100);
	}

	//Changes if the dice are locked or not ONLY when playing
	onToggleLock(index: number) {
		if (this.roundRollsCount < 3 && this.playingRound)
			this.lockedDice[index] = !this.lockedDice[index];
	}

	//resets the number of rolls, which dice are locked, clears the scoreboard
	//previews and then gets new totals
	onEndRound() {
		this.roundRollsCount = 0;
		for (let j = 0; j < 5; j++) {
			this.lockedDice[j] = false;
		}
		this.clearBoard();
		this.sumBoard();
	}

	//is sent the index of which scoreboard category was clicked
	//If that category hasn't been clicked yet, scores that category
	//and triggers the end of the round
	onSetScore(index: number) {
		if (
			this.scoreboardValues[index].scored === false &&
			this.playingRound
		) {
			this.playingRound = false;
			this.scoreboardValues[index].actual = this.scoreboardValues[
				index
			].preview;
			this.scoreboardValues[index].scored = true;

			this.onEndRound();
		}
	}

	//Adds up the upper, lower and total.  Also adds in the upper bonus
	private sumBoard() {
		let sumUpper = 0;
		for (let i = 0; i < 6; i++) {
			sumUpper += this.scoreboardValues[i].actual;
		}
		if (sumUpper > 62) {
			this.scoreboardValues[6].actual = 35;
			this.scoreboardValues[6].scored = true;
			sumUpper += 35;
		}
		this.scoreboardValues[7].actual = sumUpper;

		let sumLower = 0;
		for (let i = 8; i < 15; i++) {
			sumLower += this.scoreboardValues[i].actual;
		}
		this.scoreboardValues[15].actual = sumLower;

		this.scoreboardValues[16].actual = sumUpper + sumLower;
	}

	//Clears the current preview values, sorts the dice and then runs the
	//score checks to update the preview
	private scorePreview() {
		this.clearBoard();
		let dice = [...this.currentDice];
		dice.sort((a, b) => {
			if (a > b) return 1;
			return -1;
		});
		this.checkUpper(dice);
		this.checkStraight(dice);
		this.checkKind(dice);
		this.scoreboardValues[14].preview = this.sumDice(dice);
	}

	//Counts the number of dice that have a 1/2/3/etc and then returns the count
	private countDice(dice: number[]) {
		let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
		for (let i = 0; i < 5; i++) {
			count[dice[i]]++;
		}
		return count;
	}

	//Gets the sum of all the dice values and returns it
	private sumDice(dice: number[]) {
		let sum = 0;
		for (let i = 0; i < 5; i++) {
			sum += dice[i];
		}
		return sum;
	}

	//Gets the count from countDice and then updates the categories
	//to be that count times the value (three 1s = 3pts, three 2s = 6pts, etc)
	private checkUpper(dice: number[]) {
		let finishedCount = this.countDice(dice);
		for (let i = 0; i < 6; i++) {
			this.scoreboardValues[i].preview = finishedCount[i + 1] * (i + 1);
		}
	}

	//Checks a sorted list of the dice numbers to see how long the largest
	//stretch of numbers in a row occur
	private checkStraight(dice: number[]) {
		let count = 1;
		let highestCount = 1;
		for (let i = 1; i < 5; i++) {
			//ignores duplicates
			if (dice[i - 1] !== dice[i]) {
				if (dice[i - 1] === dice[i] - 1) {
					count++;
					highestCount = Math.max(highestCount, count);
				} else {
					highestCount = Math.max(highestCount, count);
					count = 1;
				}
			}
		}

		//small straight is 4 in a row and is stored in index 10 for 30 points
		if (highestCount >= 4) this.scoreboardValues[10].preview = 30;
		//large straight is 5 in a row and is stored in index 11 for 40 points
		if (highestCount === 5) this.scoreboardValues[11].preview = 40;
	}

	//Gets the count from countDice and then checks to see if there is a 3/4
	//of a kind, full house or yahtzee
	private checkKind(dice: number[]) {
		let finishedCount = this.countDice(dice);
		let hasTwo = false;
		let hasThree = false;
		for (let i = 1; i < 7; i++) {
			if (finishedCount[i] === 2) {
				hasTwo = true;
			}
			if (finishedCount[i] === 3) {
				hasThree = true;
				this.scoreboardValues[8].preview = this.sumDice(dice);
			}
			if (finishedCount[i] >= 4) {
				let sum = this.sumDice(dice);
				this.scoreboardValues[8].preview = sum;
				this.scoreboardValues[9].preview = sum;
			}
			if (finishedCount[i] === 5) {
				this.scoreYahtzee(dice[0]);
			}
		}
		if (hasThree && hasTwo) {
			this.scoreboardValues[12].preview = 25;
		}
	}

	/*If no yahtzee has been scored yet, gives the user 50 points
	If there has been a yahtzee, adds 100 points to it and triggers joker
	If there hasn't been a yahtzee and the user scored 0 points in the
	yahtzee category, the user only gets the joker points*/
	private scoreYahtzee(dieValue) {
		this.hasYahtzee = true;
		if (this.scoreboardValues[13].scored) {
			if (this.scoreboardValues[13].actual > 0)
				this.scoreboardValues[13].actual += 100;
			this.jokerRules(dieValue);
		} else {
			this.scoreboardValues[13].actual = 50;
			this.scoreboardValues[13].scored = true;
		}
	}

	//Second and beyond yahtzees can be used as a joker based on the order
	//provided in the description
	private jokerRules(dieValues: number) {
		let sum = dieValues * 5;
		if (this.scoreboardValues[dieValues - 1].actual === 0) {
			this.scoreboardValues[dieValues - 1].actual = sum;
		} else if (this.scoreboardValues[8].actual === 0) {
			this.scoreboardValues[8].actual = sum;
		} else if (this.scoreboardValues[9].actual === 0) {
			this.scoreboardValues[9].actual = sum;
		} else if (this.scoreboardValues[12].actual === 0) {
			this.scoreboardValues[12].actual = 25;
		} else if (this.scoreboardValues[10].actual === 0) {
			this.scoreboardValues[10].actual = 30;
		} else if (this.scoreboardValues[11].actual === 0) {
			this.scoreboardValues[11].actual = 40;
		}
		this.clearBoard();
	}

	//clears the previews
	private clearBoard() {
		for (let i = 0; i < 15; i++) {
			this.scoreboardValues[i].preview = 0;
		}
	}

	//Checks if the dice are done being randomized
	private checkDice(counter: number) {
		let count = 0;
		for (let i = 0; i < 5; i++) {
			if (!this.rollingDice[i]) {
				count++;
			}
		}
		if (count === 5 || counter >= 50) {
			this.rolling = false;
			clearInterval(this.rollingInterval);
			this.scorePreview();
		}
	}
}
