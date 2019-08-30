import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { VariableMessageService } from "./variable-message.service";

@Component({
	selector: "app-variable-message",
	templateUrl: "./variable-message.component.html",
	styleUrls: ["./variable-message.component.scss"],
})
export class VariableMessageComponent implements OnInit {
	constructor(public vmService: VariableMessageService) {}
	@Input() dark: boolean;

	ngOnInit() {
		console.log(this.dark);
	}

	onCancel() {
		this.vmService.message = "";
		this.vmService.choice.emit("cancel");
	}
	onConfirm() {
		this.vmService.message = "";
		this.vmService.choice.emit("confirm");
	}
}
