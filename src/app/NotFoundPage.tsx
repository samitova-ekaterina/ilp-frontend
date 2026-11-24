import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '../shared/components/ErrorMessage';

export function NotFoundPage() {
  const { t } = useTranslation();
  return <ErrorMessage title={t('errors.notFound.title')} text={t('errors.notFound.text')} />;
}
