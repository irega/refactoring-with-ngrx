import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
