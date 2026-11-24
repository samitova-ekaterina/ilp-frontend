import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function LessonSummaryPage() {
  const { t } = useTranslation('lessons');
  return <PageHeading>{t('summary.title')}</PageHeading>;
}
