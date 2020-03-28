import { HeaderComponent } from './header.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';

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
