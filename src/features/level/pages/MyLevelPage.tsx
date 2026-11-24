import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function MyLevelPage() {
  const { t } = useTranslation('level');
  return <PageHeading>{t('title')}</PageHeading>;
}
