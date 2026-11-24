import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function SignInPage() {
  const { t } = useTranslation('auth');
  return <PageHeading>{t('signIn.title')}</PageHeading>;
}
