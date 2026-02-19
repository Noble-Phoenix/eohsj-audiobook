import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListenPage from "./pages/ListenPage";

const supportedLanguages = ["en", "fr", "de", "it", "ru", "es"];

const getDefaultLang = () => {
  const browserLang = navigator.language.slice(0, 2);
  return supportedLanguages.includes(browserLang) ? browserLang : "en";
};

const LanguageWrapper: React.FC = () => {
  const { i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  useEffect(() => {
    if (lng && i18n.language !== lng && supportedLanguages.includes(lng)) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return <Outlet />;
};

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to={`/${getDefaultLang()}`} replace />} />
    <Route path="/:lng" element={<LanguageWrapper />}>
      <Route index element={<HomePage />} />
      <Route path="listen" element={<ListenPage />} />
    </Route>
    <Route path="*" element={<Navigate to={`/${getDefaultLang()}`} replace />} />
  </Routes>
);

export default App;
