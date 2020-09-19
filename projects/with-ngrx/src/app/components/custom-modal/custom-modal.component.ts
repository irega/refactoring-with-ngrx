import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CustomModalService } from '../../services/custom-modal/custom-modal.service';

// TODO: Once the refactor to ngrx will be finished, analyze if a general modal is needed, or we have specific modal components without common functionality.
@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html'
})
export class CustomModalComponent implements OnDestroy {
  params: any;

  constructor(private customModalService: CustomModalService, private cdRef: ChangeDetectorRef) {
    this.customModalService.stateChange.subscribe(params => {
      this.params = params;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.cdRef.detach();
  }

  onCancelClicked() {
    this.customModalService.hide(this.params);
  }

  onOkClicked() {
    this.params.confirmed = true;
    this.cdRef.detectChanges();
    this.customModalService.hide(this.params);
  }
}
