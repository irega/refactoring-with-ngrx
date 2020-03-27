import { HomePageComponent } from './home-page.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';

const initialState = {
  questionGroyups: []
};

describe('The home page component', () => {
  let spectator: Spectator<HomePageComponent>;
  const createComponent = createComponentFactory({
    component: HomePageComponent,
    providers: [provideMockStore({ initialState })]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
