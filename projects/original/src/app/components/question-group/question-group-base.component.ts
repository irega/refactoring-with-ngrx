import {
  ChangeDetectorRef,
  EventEmitter,
  Input,
  OnDestroy
} from "@angular/core";

export abstract class QuestionGroupBaseComponent implements OnDestroy {
  @Input() items: Array<any>;
  protected entityToAddText = "";
  protected emitter: EventEmitter<any>;

  constructor(protected ref: ChangeDetectorRef, protected entityName: string) {}

  ngOnDestroy() {
    this.ref.detach();
  }

  onDelete(elementId: number) {
    this.emitter.emit({
      action: this.entityName + "-delete",
      value: elementId
    });
  }

  onAdd(keyCode: number) {
    if (keyCode !== 13) {
      return;
    }
    this.emitter.emit({
      action: this.entityName + "-add",
      value: this.entityToAddText
    });
    this.entityToAddText = "";
  }

  onUpdate(keyCode: number, element: any, text: string) {
    if (keyCode !== 13) {
      return;
    }
    const entityToUpdate = Object.assign({}, element, { text });
    this.emitter.emit({
      action: this.entityName + "-update",
      value: entityToUpdate
    });
  }
}
