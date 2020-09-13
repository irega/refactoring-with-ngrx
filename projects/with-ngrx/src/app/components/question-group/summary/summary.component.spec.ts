import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { SummaryComponent } from './summary,.component';

describe('The summary component', () => {
  let spectator: Spectator<SummaryComponent>;
  const createComponent = createComponentFactory({
    component: SummaryComponent
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
