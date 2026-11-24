import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function AdaptationProposalPage() {
  const { t } = useTranslation('students');
  return <PageHeading>{t('proposal.title')}</PageHeading>;
}
