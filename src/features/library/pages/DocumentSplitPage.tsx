import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function DocumentSplitPage() {
  const { t } = useTranslation('library');
  return <PageHeading>{t('split.title')}</PageHeading>;
}
