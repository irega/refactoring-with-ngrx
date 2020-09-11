import { Loader } from '../../entities';
import { ACTIVATE } from './activate';

describe('The activate loader action', () => {
  const no_pending_requests_counter = 0;

  it('should activate the loader', () => {
    const a_deactivated_loader: Loader = {
      isActive: false,
      pendingRequests: no_pending_requests_counter
    };

    const loader = ACTIVATE(a_deactivated_loader);

    expect(loader.isActive).toBeTruthy();
  });

  it('should increase the pending requests', () => {
    const a_loader_with_no_pending_requests: Loader = {
      isActive: false,
      pendingRequests: no_pending_requests_counter
    };

    const loader = ACTIVATE(a_loader_with_no_pending_requests);

    expect(loader.pendingRequests).toEqual(no_pending_requests_counter + 1);
  });
});
