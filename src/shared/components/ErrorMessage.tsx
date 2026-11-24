import { useTranslation } from 'react-i18next';
import { PageHeading } from './PageHeading';

type ErrorMessageProps = {
  title: string;
  text: string;
  requestId?: string;
};

export function ErrorMessage({ title, text, requestId }: ErrorMessageProps) {
  const { t } = useTranslation();
  return (
    <div role="alert">
      <PageHeading>{title}</PageHeading>
      <p>{text}</p>
      {requestId === undefined ? null : <p>{t('errors.requestId', { requestId })}</p>}
    </div>
  );
}
