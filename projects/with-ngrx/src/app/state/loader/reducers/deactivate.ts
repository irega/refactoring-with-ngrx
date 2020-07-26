import { Loader } from '../entities';

export function DEACTIVATE(state: Loader): Loader {
  const newState = { ...state };
  newState.pendingRequests--;
  newState.isActive = newState.pendingRequests !== 0;
  return newState;
}
