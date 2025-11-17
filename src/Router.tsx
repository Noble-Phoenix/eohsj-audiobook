import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import App from './App';

const supportedLanguages = ['en', 'fr'];

const LanguageWrapper: React.FC = () => {
  const { i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  useEffect(() => {
    if (lng && i18n.language !== lng && supportedLanguages.includes(lng)) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return <App />;
};

export const Router: React.FC = () => {
  const browserLang = navigator.language.slice(0, 2);
  const defaultLang = supportedLanguages.includes(browserLang) ? browserLang : 'en';

  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirects to browser language */}
        <Route path="/" element={<Navigate to={`/${defaultLang}`} replace />} />

        {/* Language-specific routes */}
        <Route path="/:lng/*" element={<LanguageWrapper />} />

        {/* Optional: catch-all */}
        <Route path="*" element={<Navigate to={`/${defaultLang}`} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
