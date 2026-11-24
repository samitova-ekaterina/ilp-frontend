import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { logError } from '../shared/services/logger';
import { isApiError, NETWORK_FAILURE } from '../shared/services/request';
import { type ToastMessage, useToasts } from '../shared/services/toasts';
import { router, SIGN_IN_PATH } from './router';

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const ATTEMPTS_AFTER_THE_FIRST = 2;

function isShownInPlaceOfThePage(error: unknown): boolean {
  return isApiError(error) && (error.status === FORBIDDEN || error.status === NOT_FOUND);
}

function isWorthAnotherAttempt(error: unknown): boolean {
  return isApiError(error) && (error.status === NETWORK_FAILURE || error.status >= SERVER_ERROR);
}

function messageFor(status: number, shownByThePage: boolean): ToastMessage | null {
  if (status === NETWORK_FAILURE) {
    return 'errors.network';
  }
  if (status === FORBIDDEN) {
    return shownByThePage ? null : 'errors.forbidden.text';
  }
  if (status === NOT_FOUND) {
    return shownByThePage ? null : 'errors.notFound.text';
  }
  return status >= SERVER_ERROR ? 'errors.server' : 'errors.unexpected';
}

function report(error: unknown, shownByThePage: boolean): void {
  if (!isApiError(error)) {
    logError('A request failed before its answer could be used', error);
    useToasts.getState().show('errors.unexpected');
    return;
  }
  const requestId = error.problem?.requestId;
  logError('A request failed', error, {
    status: error.status,
    code: error.problem?.code,
    requestId,
  });
  if (error.status === UNAUTHORIZED) {
    void router.navigate(SIGN_IN_PATH);
    return;
  }
  const message = messageFor(error.status, shownByThePage);
  if (message !== null) {
    useToasts.getState().show(message, requestId);
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => report(error, true),
  }),
  mutationCache: new MutationCache({ onError: (error) => report(error, false) }),
  defaultOptions: {
    queries: {
      throwOnError: isShownInPlaceOfThePage,
      retry: (failures, error) =>
        failures < ATTEMPTS_AFTER_THE_FIRST && isWorthAnotherAttempt(error),
    },
  },
});
