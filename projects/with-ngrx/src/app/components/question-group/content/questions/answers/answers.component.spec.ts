import { FormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AnswersComponent } from './answers.component';

describe('The answers component', () => {
  let spectator: Spectator<AnswersComponent>;
  const createComponent = createComponentFactory({
    component: AnswersComponent,
    imports: [FormsModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
