import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function FlaggedItemsPage() {
  const { t } = useTranslation('library');
  return <PageHeading>{t('flagged.title')}</PageHeading>;
}
