import { HomePageComponent } from './home-page.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { ActionsMenuComponent } from './actions-menu/actions-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';

const initialState = {
  questionGroyups: []
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
