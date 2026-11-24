import { useTranslation } from 'react-i18next';

type PageHeadingProps = {
  children: string;
};

export function PageHeading({ children }: PageHeadingProps) {
  const { t } = useTranslation();
  return (
    <>
      <title>{t('pageTitle', { page: children })}</title>
      <h1>{children}</h1>
    </>
  );
}
