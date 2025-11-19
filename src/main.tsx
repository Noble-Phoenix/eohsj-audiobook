/// <reference lib="dom" />

import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n.ts";
import { HeadProvider, Title, Meta, Link } from "react-head";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

const supportedLanguages = ["en", "fr", "de", "it", "ru"];

// Head meta component stays the same
const HeadMeta: React.FC = () => {
  const { t, ready } = useTranslation();

  if (!ready) return null;

  return (
    <>
      <Title>{t("hero.title")}</Title>
      <Meta name="description" content={t("hero.intro_1")} />
      <Meta property="og:title" content={t("hero.title")} />
      <Meta property="og:description" content={t("hero.intro_1")} />
      <Meta property="og:image" content="/bookcover.jpg" />
      <Link rel="canonical" href="https://www.eohsjaudiobook.com" />
    </>
  );
};

// Language-aware wrapper
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

// Determine browser language for default redirect
const getDefaultLang = () => {
  const browserLang = navigator.language.slice(0, 2);
  return supportedLanguages.includes(browserLang) ? browserLang : "en";
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={null}>
        <HeadProvider>
          <HeadMeta />
          <BrowserRouter>
            <Routes>
              {/* Root redirects to browser language */}
              <Route path="/" element={<Navigate to={`/${getDefaultLang()}`} replace />} />

              {/* Language-specific routes */}
              <Route path="/:lng/*" element={<LanguageWrapper />} />

              {/* Catch-all redirects to default */}
              <Route path="*" element={<Navigate to={`/${getDefaultLang()}`} replace />} />
            </Routes>
          </BrowserRouter>
        </HeadProvider>
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>
);
