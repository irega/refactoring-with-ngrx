import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { HeaderComponent } from './header.component';

describe('The header component', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [RouterTestingModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
