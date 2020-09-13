import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { SelectTopicsModalComponent } from './select-topics-modal/select-topics-modal.component';
import { TopicsComponent } from './topics.component';

describe('The topics component', () => {
  let spectator: Spectator<TopicsComponent>;
  const createComponent = createComponentFactory({
    component: TopicsComponent,
    declarations: [SelectTopicsModalComponent]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
