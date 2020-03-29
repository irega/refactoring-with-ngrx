import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { QuestionGroup } from 'src/app/state/questionGroups/entities';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';

@Component({
  selector: 'app-question-group-actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss'],
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
      description: 'description',
      descriptionSmall: true,
      createEdit: true,
      labelInputText: { text: 'label' },
      ok: { text: 'ok' },
      cancel: { text: 'cancel' }
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
      title: 'title',
      description: 'description',
      ok: { text: 'ok' },
      cancel: { text: 'cancel' }
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
