import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './components/header/header.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { FormsModule } from '@angular/forms';
import { CustomModalService } from './services/custom-modal/custom-modal.service';

const initialState = {
  questionGroyups: []
};

describe('The app component', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [HeaderComponent, CustomModalComponent],
    imports: [RouterTestingModule, FormsModule],
    providers: [CustomModalService, provideMockStore({ initialState })]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
