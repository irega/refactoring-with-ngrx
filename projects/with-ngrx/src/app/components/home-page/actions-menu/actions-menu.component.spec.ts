import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ActionsMenuComponent } from './actions-menu.component';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';

describe('The question group actions menu component', () => {
  let spectator: Spectator<ActionsMenuComponent>;
  const createComponent = createComponentFactory({
    component: ActionsMenuComponent,
    providers: [CustomModalService]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
