import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useRouteError } from 'react-router';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { isApiError } from '../shared/services/request';

const FORBIDDEN = 403;
const NOT_FOUND = 404;

function statusOf(error: unknown): number | undefined {
  if (isApiError(error) || isRouteErrorResponse(error)) {
    return error.status;
  }
  return undefined;
}

export function RouteErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError();
  const status = statusOf(error);
  const requestId = isApiError(error) ? error.problem?.requestId : undefined;

  if (status === FORBIDDEN) {
    return (
      <ErrorMessage
        title={t('errors.forbidden.title')}
        text={t('errors.forbidden.text')}
        requestId={requestId}
      />
    );
  }
  if (status === NOT_FOUND) {
    return (
      <ErrorMessage
        title={t('errors.notFound.title')}
        text={t('errors.notFound.text')}
        requestId={requestId}
      />
    );
  }
  return <ErrorMessage title={t('errors.page.title')} text={t('errors.page.text')} />;
}
