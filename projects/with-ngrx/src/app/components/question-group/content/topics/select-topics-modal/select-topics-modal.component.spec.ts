import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { SelectTopicsModalComponent } from './select-topics-modal.component';

describe('The select topics modal component', () => {
  let spectator: Spectator<SelectTopicsModalComponent>;
  const createComponent = createComponentFactory({
    component: SelectTopicsModalComponent
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
