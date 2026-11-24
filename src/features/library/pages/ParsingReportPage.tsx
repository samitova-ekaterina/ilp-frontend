import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../../shared/components/PageHeading';

export default function ParsingReportPage() {
  const { t } = useTranslation('library');
  return <PageHeading>{t('report.title')}</PageHeading>;
}
