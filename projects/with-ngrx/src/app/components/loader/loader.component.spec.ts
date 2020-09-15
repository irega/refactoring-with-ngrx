import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/state/definition';
import { LoaderComponent } from './loader.component';

const initialState: State = {
  answers: [],
  questions: [],
  questionGroups: [],
  currentQuestionGroup: { id: 0, name: '' },
  loader: { isActive: false, pendingRequests: 0 }
};

describe('The loader component', () => {
  let spectator: Spectator<LoaderComponent>;
  let mockStore: MockStore;
  const an_active_loader = { isActive: true, pendingRequests: 1 };

  const createComponent = createComponentFactory({
    component: LoaderComponent,
    providers: [provideMockStore({ initialState })]
  });

  beforeEach(() => {
    spectator = createComponent();
    mockStore = spectator.inject(MockStore);
  });

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });

  it("should be rendered when it's active", () => {
    mockStore.setState({ ...initialState, loader: an_active_loader });

    expect(spectator.query('div')).toBeTruthy();
  });

  it("should not be rendered when it's not active", () => {
    const an_inactive_loader = { isActive: false, pendingRequests: 0 };
    mockStore.setState({ ...initialState, loader: an_inactive_loader });

    expect(spectator.query('div')).toBeFalsy();
  });
});
