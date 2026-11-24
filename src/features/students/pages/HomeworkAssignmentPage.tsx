import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function HomeworkAssignmentPage() {
  const { t } = useTranslation('students');
  return <PageHeading>{t('homework.title')}</PageHeading>;
}
