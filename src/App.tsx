import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const supportedLanguages = [
  { code: "en", label: "English", flag: "/english.svg" },
  { code: "fr", label: "Français", flag: "/francias.svg" },
  { code: "de", label: "Deutsch", flag: "/deutsch.svg" },
  { code: "it", label: "Italiano", flag: "/italia.svg" },
  { code: "ru", label: "Русский", flag: "/russia.svg" },
];


const App: React.FC = () => {
	const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { lng: currentLng } = useParams<{ lng: string }>();

  const changeLanguage = (lng: string) => {
    if (lng !== i18n.language) {
      i18n.changeLanguage(lng); // update i18n
      const newPath = window.location.pathname.replace(/^\/[^/]+/, `/${lng}`);
      navigate(newPath, { replace: true });
    }
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);




  const authorBio = t("author.bio", { returnObjects: true }) as string[];

  return (
    <div className="flex justify-center align-center flex-col">
      {/* Language Switcher */}
      <div className="bg-gray-500 ">
        <div className="flex mx-auto max-w-[1200px] justify-center md:justify-between p-4 px-8 items-center gap-4 flex-wrap">
          <a href="https://eohsjnorthamerica.org" target="_blank" rel="noopener noreferrer" className='hover:scale-115 transition-transform'>
            <img src="/cross.svg" alt="EOHSJ America Logo" className="w-10 cursor-pointer" />
          </a>
          <div className='flex items-center gap-4 flex-wrap'>
            <span className="text-white hidden md:inline-flex">{t("language_label")}:</span>
            {supportedLanguages.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                disabled={i18n.language === code}
              >
                <img src={flag} alt={label} className="w-10 cursor-pointer hover:scale-120 transition-transform" />
              </button>
            ))}

          </div>
        </div>
      </div>
      <div className=''>
        <div className="relative flex mx-auto max-w-[1200px] p-4 flex-col gap-4 md:gap-6 lg:gap-10 items-center mt-10 md:mt-20 lg:mt-30">
          {/* Translated Content */}
          <h1 className="uppercase roboto-condensed text-[36px] md:text-[48px] lg:text-[52px] xl:text-[62px] font-bold w-[358px] md:w-[700px] lg:w-[750px] xl:w-[900px] leading-[1.1] text-center">{t("hero.title")}</h1>
          <h2 className="uppercase roboto-condensed text-[32px] md:text-[36px] font-medium w-[358px] md:w-[500px] lg:w-[650px] xl:w-[900px] leading-[1.1] text-center text-brand-600">{t("hero.subtitle")}</h2>
          <img src="/bookcover.jpg" alt="Book Cover" className="my-8 md:my-2 w-60 lg:absolute lg:w-[320px] lg:overflow-hidden lg:block lg:-left-30 xl:-left-40 lg:top-30 lg:-rotate-18"/>
          <p className='roboto-condensed text-[18px] w-[358px] md:w-[600px] lg:w-[500px] xl:w-[600px] leading-normal text-center'>
            {t("hero.intro_1")}
          <br/>
            {t("hero.intro_2")}
          </p>
        </div>
      </div>


      <div className="mt-22 w-0 h-0 border-l-[50vw] border-l-transparent border-r-[50vw] border-r-transparent border-b-48 md:border-b-80 lg:border-b-90 border-b-gray-900"></div>
      <div className="bg-gray-900">
        <div className="flex flex-wrap mx-auto max-w-[1200px] p-4 mt-6 mb-8 gap-12 md:gap-8 justify-center md:justify-around items-center">
          <button className="h-18 w-[300px] text-[24px] bg-brand-600 text-black hover:bg-brand-900 cursor-pointer dark:text-white uppercase font-bold py-2 px-4 rounded-2xl">
              {t("cta.buy")}
            </button>
          <button className="h-18 w-[300px] text-[24px] bg-brand-600 text-black hover:bg-brand-900 cursor-pointer dark:text-white uppercase font-bold py-2 px-4 rounded-2xl">
              {t("cta.download_audio")}
            </button>
            <button className="h-18 w-[300px] text-[24px] bg-brand-600 text-black hover:bg-brand-900 cursor-pointer dark:text-white uppercase font-bold py-2 px-4 rounded-2xl">
              {t("cta.listen_online")}
            </button>
        </div>
      </div>
      <div className=''>
        <div className="flex flex-wrap mx-auto lg:justify-around bg-beige-100">
          <div className="w-full lg:ml-auto lg:max-w-[600px] lg:w-1/2 p-10">
          <p className="font-normal">
           {authorBio.map((paragraph: string, index: number) => (
             <div key={index}>
               {paragraph}
               <br />
             </div>
            ))}
            </p>
          </div>
          <div className="w-full lg:w-1/2 bg-[url(/cardinal-filoni.png)] bg-top bg-center bg-cover bg-no-repeat min-h-[800px]"></div>
        </div>
      </div>
    </div>
	);
};

export default App;
