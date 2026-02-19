import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const supportedLanguages = [
  { code: "en", label: "English", flag: "/english.svg" },
  { code: "es", label: "Español", flag: "/espania.svg" },
  { code: "fr", label: "Français", flag: "/francias.svg" },
  { code: "de", label: "Deutsch", flag: "/deutsch.svg" },
  { code: "it", label: "Italiano", flag: "/italia.svg" },
  { code: "ru", label: "Русский", flag: "/russia.svg" },
];

type SiteShellProps = {
  children: React.ReactNode;
};

const SiteShell: React.FC<SiteShellProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    if (lng !== i18n.language) {
      i18n.changeLanguage(lng);
      const newPath = window.location.pathname.replace(/^\/[^/]+/, `/${lng}`);
      navigate(newPath, { replace: true });
    }
  };

  return (
    <div className="flex justify-center align-center flex-col">
      <div className="bg-gray-500 ">
        <div className="flex mx-auto max-w-[1200px] justify-center md:justify-between p-4 px-8 items-center gap-4 flex-wrap">
          <a
            href="https://eohsjnorthamerica.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-115 transition-transform"
          >
            <img src="/cross.svg" alt="EOHSJ America Logo" className="w-10 cursor-pointer" />
          </a>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-white hidden md:inline-flex">{t("language_label")}:</span>
            {supportedLanguages.map(({ code, label, flag }) => (
              <button key={code} onClick={() => changeLanguage(code)} disabled={i18n.language === code}>
                <img src={flag} alt={label} className="w-10 cursor-pointer hover:scale-120 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SiteShell;
