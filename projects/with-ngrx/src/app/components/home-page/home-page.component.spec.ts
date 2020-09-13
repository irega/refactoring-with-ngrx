import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { State } from 'src/app/state/definition';
import { ActionsMenuComponent } from './actions-menu/actions-menu.component';
import { HomePageComponent } from './home-page.component';

const initialState: State = {
  answers: [],
  questions: [],
  questionGroups: [],
  currentQuestionGroup: { id: 0, name: '' },
  loader: { isActive: false, pendingRequests: 0 }
};

describe('The home page component', () => {
  let spectator: Spectator<HomePageComponent>;
  const createComponent = createComponentFactory({
    component: HomePageComponent,
    declarations: [ActionsMenuComponent],
    imports: [RouterTestingModule],
    providers: [CustomModalService, provideMockStore({ initialState })]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
