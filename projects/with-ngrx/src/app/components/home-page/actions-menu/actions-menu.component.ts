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

  public openMenu: boolean;

  constructor(private customModalService: CustomModalService) {
    this.openMenu = false;
  }

  openMenuEvent(): void {
    this.openMenu = !this.openMenu;
  }

  openModalEdit() {
    this.customModalService.show({
      title: this.questionGroup.name,
      description: 'Modify the name of this question group',
      descriptionSmall: true,
      createEdit: true,
      labelInputText: { text: 'Name' },
      ok: { text: 'Edit' },
      cancel: { text: 'Cancel' }
    });
    const subscription = this.customModalService.stateChange.subscribe(({ confirmed, title, icon }) => {
      subscription.unsubscribe();
      if (!confirmed) {
        return;
      }
      this.edited.emit(Object.assign({}, this.questionGroup, { name: title, image: icon }));
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
