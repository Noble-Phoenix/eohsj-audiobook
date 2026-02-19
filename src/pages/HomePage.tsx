import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SiteShell from "../components/layout/SiteShell";
import AuthorBioSection from "../components/sections/AuthorBioSection";
import CtaSection from "../components/sections/CtaSection";
import HeroSection from "../components/sections/HeroSection";

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const downloadUrl = (t("audio.downloadUrl") as string).trim();
  const streamUrl = (t("audio.streamUrl") as string).trim();
  const resolvedDownloadUrl = downloadUrl || streamUrl;
  const hasDownloadUrl =
    !!resolvedDownloadUrl &&
    resolvedDownloadUrl !== "audio.downloadUrl" &&
    resolvedDownloadUrl !== "audio.streamUrl";
  const authorBio = t("author.bio", { returnObjects: true }) as string[];

  return (
    <SiteShell>
      <HeroSection
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        intro1={t("hero.intro_1")}
        intro2={t("hero.intro_2")}
      />
      <CtaSection
        buyLabel={t("cta.buy")}
        onBuy={() => window.open(t("cta.purchase"), "_blank")}
        downloadLabel={t("cta.download_audio")}
        onDownload={() => {
          if (hasDownloadUrl) window.open(resolvedDownloadUrl, "_blank", "noopener,noreferrer");
        }}
        downloadDisabled={!hasDownloadUrl}
        listenLabel={t("cta.listen_online")}
        onListen={() => navigate(`/${i18n.language}/listen`)}
      />
      <AuthorBioSection paragraphs={authorBio} />
    </SiteShell>
  );
};

export default HomePage;
