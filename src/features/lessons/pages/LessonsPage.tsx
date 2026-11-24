import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function LessonsPage() {
  const { t } = useTranslation('lessons');
  return <PageHeading>{t('list.title')}</PageHeading>;
}
