import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function AuthorLibraryPage() {
  const { t } = useTranslation('library');
  return <PageHeading>{t('list.title')}</PageHeading>;
}
