import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function StudentsPage() {
  const { t } = useTranslation('students');
  return <PageHeading>{t('list.title')}</PageHeading>;
}
