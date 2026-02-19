import React from "react";
import { useTranslation } from "react-i18next";
import { AudiobookPlayer } from "../components/Audiobook";
import SiteShell from "../components/layout/SiteShell";
import AuthorBioSection from "../components/sections/AuthorBioSection";
import CtaSection from "../components/sections/CtaSection";
import HeroSection from "../components/sections/HeroSection";

const ListenPage: React.FC = () => {
  const { t } = useTranslation();
  const streamUrl = (t("audio.streamUrl") as string).trim();
  const downloadUrl = (t("audio.downloadUrl") as string).trim();
  const resolvedDownloadUrl = downloadUrl || streamUrl;
  const hasStreamUrl = !!streamUrl && streamUrl !== "audio.streamUrl";
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
        downloadLabel={t("cta.download_audio")}
        onDownload={() => {
          if (hasDownloadUrl) window.open(resolvedDownloadUrl, "_blank", "noopener,noreferrer");
        }}
        downloadDisabled={!hasDownloadUrl}
      >
        {hasStreamUrl ? (
          <AudiobookPlayer src={streamUrl} />
        ) : (
          <p className="mx-auto w-full max-w-[760px] rounded-2xl bg-white p-4 text-center text-gray-900">
            {t("cta.listen_online")}
          </p>
        )}
      </CtaSection>
      <AuthorBioSection paragraphs={authorBio} />
    </SiteShell>
  );
};

export default ListenPage;
