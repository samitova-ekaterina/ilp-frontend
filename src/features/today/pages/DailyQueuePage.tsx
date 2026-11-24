import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function DailyQueuePage() {
  const { t } = useTranslation('today');
  return <PageHeading>{t('queue.title')}</PageHeading>;
}
