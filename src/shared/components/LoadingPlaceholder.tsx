import { useTranslation } from 'react-i18next';

export function LoadingPlaceholder() {
  const { t } = useTranslation();
  return <p role="status">{t('loading')}</p>;
}
