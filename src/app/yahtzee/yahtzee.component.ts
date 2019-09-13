import { Component } from "@angular/core";

@Component({
	selector: "app-yahtzee",
	templateUrl: "./yahtzee.component.html",
	styleUrls: ["./yahtzee.component.scss"],
})
export class YahtzeeComponent {
	title = "Yahtzee";
	description =
		"In Yahtzee you roll 5 dice to attempt to score as many points as possible.  Per round, you roll the dice once, choose which dice to keep their values and reroll.  You get a total of three rolls (initial roll plus two rerolls).  At any time, you may choose to score your roll, but it will end that round. \n\nThe upper category adds together the dice that match that number.  For example, 3 ones will be a score of 3, but 3 twos will be a score of 6.  If the total of your upper score is 63 or more, you get a 35 point bonus.\n\nThe lower section has several different categories.  Three or four of a kind will add up the total of the dice if you have a three or four of a kind.  For example, a 3-3-3-4-5 will sum to 18 for a three of a kind.\n\n A small straight is a straight that has a length of 4 or 5 and gives 30 points.  A large straight is a straight that has a length of 5 and gives 40 points.\n\nA full house has a three of a kind and a two of a kind together.  It awards 25 points.\n\n Chance just sums up your current board.\n\nA Yahtzee occurs when all 5 dice have the same face.  It is worth 50 points the first time it occurs.  If it occurs again, the Yahtzee score is increased by 100 points and then it scores based on the following:\nFirst it attempts to place your board into the correct Upper location.\nIf that fails, it will attempt to place the sum in three of a kind, followed by four of a kind.\nIf those are full, it attempts to award you credit for a full house, small straight and finally large straight.";
	displayGame: boolean = true;
}
