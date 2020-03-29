import { CustomModalComponent } from './custom-modal.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FormsModule } from '@angular/forms';
import { CustomModalService } from '../../services/custom-modal/custom-modal.service';

describe('The custom modal component', () => {
  let spectator: Spectator<CustomModalComponent>;
  const createComponent = createComponentFactory({
    component: CustomModalComponent,
    imports: [FormsModule],
    providers: [CustomModalService]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
