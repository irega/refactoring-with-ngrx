import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/state/definition';
import { Loader } from 'src/app/state/loader/entities';
import { selectLoader } from 'src/app/state/loader/selectors';
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
  let mockLoaderSelector: MemoizedSelector<State, Loader>;
  const an_active_loader = { isActive: true, pendingRequests: 1 };

  const createComponent = createComponentFactory({
    component: LoaderComponent,
    providers: [provideMockStore({ initialState })]
  });

  beforeEach(() => {
    spectator = createComponent();
    mockStore = spectator.inject(MockStore);
    mockLoaderSelector = mockStore.overrideSelector(selectLoader, an_active_loader);
    spectator.detectChanges();
  });

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });

  it("should be rendered when it's active", () => {
    mockLoaderSelector.setResult(an_active_loader);

    mockStore.refreshState();
    spectator.detectChanges();

    expect(spectator.query('div')).toBeTruthy();
  });

  it("should not be rendered when it's not active", () => {
    const an_inactive_loader = { isActive: false, pendingRequests: 0 };
    mockLoaderSelector.setResult(an_inactive_loader);

    mockStore.refreshState();
    spectator.detectChanges();

    expect(spectator.query('div')).toBeFalsy();
  });
});
