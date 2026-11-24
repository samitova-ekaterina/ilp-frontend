import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useNavigation } from 'react-router';
import { LanguageSwitcher } from '../shared/components/LanguageSwitcher';
import { LoadingPlaceholder } from '../shared/components/LoadingPlaceholder';
import { ToastList } from '../shared/components/ToastList';
import { SECTIONS } from './sections';

export function AppLayout() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <>
      <header>
        <nav aria-label={t('menu.label')}>
          <ul>
            {SECTIONS.map((section) => (
              <li key={section.path}>
                <NavLink to={section.path}>{t(section.label)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher />
      </header>
      <main>
        {navigation.state === 'loading' ? <LoadingPlaceholder /> : null}
        <Suspense fallback={<LoadingPlaceholder />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastList />
    </>
  );
}
