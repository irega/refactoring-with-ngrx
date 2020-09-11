import { Loader } from '../../entities';
import { DEACTIVATE } from './deactivate';

describe('The deactivate loader action', () => {
  const one_pending_request_counter = 1;

  it('should deactivate the loader', () => {
    const an_activated_loader: Loader = {
      isActive: true,
      pendingRequests: one_pending_request_counter
    };

    const loader = DEACTIVATE(an_activated_loader);

    expect(loader.isActive).toBeFalsy();
  });

  it('should decrease the pending requests', () => {
    const a_loader_with_pending_requests: Loader = {
      isActive: false,
      pendingRequests: one_pending_request_counter
    };

    const loader = DEACTIVATE(a_loader_with_pending_requests);

    expect(loader.pendingRequests).toEqual(one_pending_request_counter - 1);
  });
});
