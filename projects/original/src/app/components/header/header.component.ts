import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  @Output() messageEventFromHeader = new EventEmitter<any>();

  onBackClicked() {
    this.messageEventFromHeader.emit({
      action: "goBack"
    });
  }
}
