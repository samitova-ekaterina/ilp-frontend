import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function StudentCardPage() {
  const { t } = useTranslation('students');
  return <PageHeading>{t('card.title')}</PageHeading>;
}
