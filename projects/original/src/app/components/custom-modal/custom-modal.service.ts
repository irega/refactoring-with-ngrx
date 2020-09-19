import { EventEmitter, Output } from "@angular/core";

export class CustomModalService {
  @Output() stateChange: EventEmitter<any> = new EventEmitter();

  show(params: any) {
    const args = { ...params };
    args.show = true;
    this.stateChange.emit(args);
  }

  hide(params: any) {
    const args = { ...params };
    args.show = false;
    this.stateChange.emit(args);
  }
}
