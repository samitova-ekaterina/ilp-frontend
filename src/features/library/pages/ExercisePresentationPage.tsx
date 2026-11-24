import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function ExercisePresentationPage() {
  const { t } = useTranslation('library');
  return <PageHeading>{t('presentation.title')}</PageHeading>;
}
