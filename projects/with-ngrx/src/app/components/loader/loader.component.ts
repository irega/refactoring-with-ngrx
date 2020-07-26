import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { State } from 'src/app/state/definition';
import { Loader } from 'src/app/state/loader/entities';
import { selectLoader } from 'src/app/state/loader/selectors';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, OnDestroy {
  loader$: Observable<Loader> = this.store.select(selectLoader);
  isActive = false;
  private loaderSubscription: Subscription;

  constructor(private store: Store<State>, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.loaderSubscription = this.loader$.subscribe(({ isActive }) => {
      this.isActive = isActive;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }
}
