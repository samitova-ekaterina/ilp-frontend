import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function MaterialUploadPage() {
  const { t } = useTranslation('library');
  return <PageHeading>{t('upload.title')}</PageHeading>;
}
