import { EventEmitter, Injectable, Output } from '@angular/core';

// TODO: Remove if the general modal component is not needed in the future.
@Injectable()
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
