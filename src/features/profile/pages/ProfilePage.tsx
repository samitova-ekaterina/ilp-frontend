import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function ProfilePage() {
  const { t } = useTranslation('profile');
  return <PageHeading>{t('title')}</PageHeading>;
}
