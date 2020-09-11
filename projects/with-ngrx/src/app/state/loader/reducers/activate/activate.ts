import { Loader } from '../../entities';

export function ACTIVATE(state: Loader): Loader {
  const newState = { ...state };
  newState.pendingRequests++;
  newState.isActive = true;
  return newState;
}
