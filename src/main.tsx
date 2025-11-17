/// <reference lib="dom" />

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n.ts";
import { HeadProvider, Title, Meta, Link } from "react-head";

const HeadMeta: React.FC = () => {
  const { t, ready } = useTranslation();

  if (!ready) return null; // wait until translations are loaded

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={null}>
        <HeadProvider>
          <HeadMeta />
          <App />
        </HeadProvider>
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>
);
