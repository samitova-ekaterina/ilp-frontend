import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function TaskPage() {
  const { t } = useTranslation('today');
  return <PageHeading>{t('task.title')}</PageHeading>;
}
