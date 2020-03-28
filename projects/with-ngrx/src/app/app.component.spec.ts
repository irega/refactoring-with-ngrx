import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './components/header/header.component';

const initialState = {
  questionGroyups: []
};

describe('The app component', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [HeaderComponent],
    imports: [RouterTestingModule],
    providers: [provideMockStore({ initialState })]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
