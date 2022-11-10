import { useTranslationChange } from 'i18nano';

export const translations = {
  home: {
    en: () => import('./en.json'),
    ru: () => import('./ru.json'),
  },
};

export const LanguageChange = () => {
  const { lang, change, all } = useTranslationChange();
  return (
    <select
      value={lang}
      onChange={(event) => {
        change(event.target.value);
      }}
    >
      {all.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};
