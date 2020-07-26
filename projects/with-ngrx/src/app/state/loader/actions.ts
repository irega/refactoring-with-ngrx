import { createAction, props } from '@ngrx/store';

export enum LoaderActionTypes {
  ACTIVATE = '[Loader] Activate',
  DEACTIVATE = '[Loader] Deactivate'
}

export const activate = createAction(LoaderActionTypes.ACTIVATE, props<{ payload: { text: string } }>());
export const deactivate = createAction(LoaderActionTypes.DEACTIVATE);
