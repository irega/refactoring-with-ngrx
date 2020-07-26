import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraInfoComponent {}
