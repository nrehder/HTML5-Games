import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class VariableMessageService {
	message: string;
	choice = new EventEmitter<string>();
}
