import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '../models/language';
import { useLanguages } from '../services/languages';
import { LoadingPlaceholder } from './LoadingPlaceholder';

function ownName(language: Language): string {
  // A language is listed under its own name, so a person finds it whatever the current language is.
  return (
    new Intl.DisplayNames([language.code], { type: 'language' }).of(language.code) ?? language.name
  );
}

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const selectId = useId();
  const languages = useLanguages();

  if (languages.isPending) {
    return <LoadingPlaceholder />;
  }
  if (languages.isError) {
    return null;
  }
  return (
    <div>
      <label htmlFor={selectId}>{t('language.label')}</label>
      <select
        id={selectId}
        value={i18n.resolvedLanguage}
        onChange={(event) => void i18n.changeLanguage(event.target.value)}
      >
        {languages.data.map((language) => (
          <option key={language.code} value={language.code} lang={language.code}>
            {ownName(language)}
          </option>
        ))}
      </select>
    </div>
  );
}
