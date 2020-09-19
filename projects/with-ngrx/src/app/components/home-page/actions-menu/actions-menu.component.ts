import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { QuestionGroup } from 'src/app/state/questionGroups/entities';

@Component({
  selector: 'app-question-group-actions-menu',
  templateUrl: './actions-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsMenuComponent {
  @Input() questionGroup: QuestionGroup;
  @Output() edited = new EventEmitter<QuestionGroup>();
  @Output() deleted = new EventEmitter<number>();

  // TODO: In future iterations, analyze if it's better create a specific modal component instead of the general modal component.
  constructor(private customModalService: CustomModalService) {}

  openModalEdit() {
    this.customModalService.show({
      title: this.questionGroup.name,
      description: 'Modify the name of this question group',
      createEdit: true,
      labelInputText: { text: 'Name' },
      ok: { text: 'Edit' },
      cancel: { text: 'Cancel' }
    });
    const subscription = this.customModalService.stateChange.subscribe(({ confirmed, title }) => {
      subscription.unsubscribe();
      if (!confirmed) {
        return;
      }
      this.edited.emit(Object.assign({}, this.questionGroup, { name: title }));
    });
  }

  openModalDelete(): void {
    this.customModalService.show({
      title: 'Delete a question group',
      description: 'Are you sure you want to delete this question group?',
      ok: { text: 'Yes' },
      cancel: { text: 'No' }
    });
    const subscription = this.customModalService.stateChange.subscribe(({ confirmed }) => {
      subscription.unsubscribe();
      if (!confirmed) {
        return;
      }
      this.deleted.emit(this.questionGroup.id);
    });
  }
}
