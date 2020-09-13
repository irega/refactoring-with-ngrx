import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { APP_SETTINGS, SETTINGS } from './app.config';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CustomModalService } from './services/custom-modal/custom-modal.service';

const initialState = {
  questionGroyups: []
};

describe('The app component', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [HeaderComponent, CustomModalComponent, LoaderComponent],
    imports: [RouterTestingModule, FormsModule],
    providers: [
      { provide: APP_SETTINGS, useFactory: () => SETTINGS },
      CustomModalService,
      provideMockStore({ initialState })
    ]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
