import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-topics-modal',
  templateUrl: './select-topics-modal.component.html'
})
export class SelectTopicsModalComponent {
  @Input() params: any = {};
  @Output() closed = new EventEmitter<any>();
  private result: Array<string> = [];

  changeStatus(item, checked) {
    const idx = this.result.indexOf(item);
    if (checked) {
      if (idx === -1) {
        this.result.push(item);
      }
    } else {
      if (idx !== -1) {
        this.result.splice(idx, 1);
      }
    }
  }

  onCancelClicked() {
    // TODO: ¿Direct reference to document? :|
    document.querySelectorAll('.modal .checkboxes input').forEach(input => ((input as any).checked = false));
    this.closed.emit(this.params);
  }

  onOkClicked() {
    const newParams = {
      ...this.params,
      input: Array.isArray(this.params.input) ? this.result.slice() : this.params.input,
      confirmed: true
    };

    // TODO: ¿Direct reference to document? :|
    document.querySelectorAll('.modal .checkboxes input').forEach(input => ((input as any).checked = false));
    this.closed.emit(newParams);
  }
}
