// src/App.tsx
import React from "react";
// Note: We use the i18n instance from react-i18next
import { useTranslation } from "react-i18next";

// Define the component as a functional component (React.FC)
const App: React.FC = () => {
	const { t, i18n } = useTranslation();

	// Define the type for the language code, which is a string
	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	return (
		<>
			{/* // ... your JSX content remains the same ... */}
			<div className="flex justify-center align-center flex-col">
				{/* Language Switcher */}
				<div className="bg-gray-500 ">
					<div className="flex mx-auto max-w-[1200px] justify-center md:justify-end p-4 items-center gap-4 flex-wrap">
						<span className="text-white hidden md:inline-flex">{t("language_label")}:</span>
						<button
							onClick={() => changeLanguage("en")}
							disabled={i18n.language === "en"}
						>
							<img src="src/assets/english.svg" alt="English" className="w-10 cursor-pointer" />
						</button>
						<button
							onClick={() => changeLanguage("fr")}
							disabled={i18n.language === "fr"}
						>
							<img src="src/assets/francias.svg" alt="Français" className="w-10 cursor-pointer" />
						</button>
            <button
							onClick={() => changeLanguage("de")}
							disabled={i18n.language === "de"}
						>
							<img src="src/assets/deutsch.svg" alt="Deutsch" className="w-10 cursor-pointer" />
						</button>
            <button
							onClick={() => changeLanguage("it")}
							disabled={i18n.language === "it"}
						>
							<img src="src/assets/italia.svg" alt="Italiano" className="w-10 cursor-pointer" />
						</button>
            <button
							onClick={() => changeLanguage("ru")}
							disabled={i18n.language === "ru"}
						>
							<img src="src/assets/russia.svg" alt="Русский" className="w-10 cursor-pointer" />
						</button>
					</div>
				</div>
				<div className=''>
					<div className="flex mx-auto max-w-[1200px] p-4 flex-col gap-4 md:gap-6 lg:gap-10 items-center mt-10 md:mt-20 lg:mt-30">
						{/* Translated Content */}
            <h1 className="uppercase roboto-condensed text-[36px] md:text-[48px] lg:text-[62px] font-bold w-[358px] md:w-[700px] lg:w-[900px] leading-[1.1] text-center">The House Was Filled With The Fragrance Of The Perfume:</h1>
            <h2 className="uppercase roboto-condensed text-[32px] md:text-[36px] font-medium w-[358px] md:w-[600px] lg:w-[900px] leading-[1.1] text-center text-brand-600">A Spirituality of the Order of the Holy Sepulchre</h2>
            <p className='roboto-condensed text-[18px] w-[358px] md:w-[500px] lg:w-[600px] leading-[1.5] text-center'>
              In his book on the spirituality of the Equestrian Order of the Holy Sepulchre of Jerusalem, the Grand Master of the Order, Cardinal Fernando Filoni, reflects on the life, the beliefs, the values, and the choices of a Knight and Dame.
            <br/>
              This book will help help current members of the Order in deepening their faith journey.  It will serve as an introduction to the Order for Catholics interested in our mission for caring for the peoples and places in the Holy Land.
            </p>
						{/* <h1 className="text-red-500">{t("title")}</h1> */}
					</div>
				</div>


        <div className="mt-22 w-0 h-0 border-l-[50vw] border-l-transparent border-r-[50vw] border-r-transparent border-b-[48px] md:border-b-[80px] lg:border-b-[90px] border-b-gray-900"></div>
        <div className="bg-gray-900">
          <div className="flex flex-wrap mx-auto max-w-[1200px] p-4 mt-6 mb-8 gap-12 md:gap-8 justify-center md:justify-around items-center">
            <button className="h-18 w-[300px] text-[24px] bg-brand-600 text-black hover:bg-brand-900 cursor-pointer text-white uppercase font-bold py-2 px-4 rounded-2xl">
								{/* {t("call_to_action")}  */}
                Buy Book
							</button>
            <button className="h-18 w-[300px] text-[24px] bg-brand-600 text-black hover:bg-brand-900 cursor-pointer text-white uppercase font-bold py-2 px-4 rounded-2xl">
								{/* {t("call_to_action")}  */}
                Download Audio
							</button>
              <button className="h-18 w-[300px] text-[24px] bg-brand-600 text-black hover:bg-brand-900 cursor-pointer text-white uppercase font-bold py-2 px-4 rounded-2xl">
								{/* {t("call_to_action")}  */}
                Listen Online
							</button>
          </div>
        </div>
        <div className=''>
					<div className="flex flex-wrap mx-auto bg-beige-100">
						<div className="w-full lg:w-1/2 p-10">
            <h3 className="uppercase roboto-condensed text-xl">The Author</h3>
            <h2 className="uppercase roboto-condensed text-3xl font-bold mb-6">Cardinal Fernando Filoni</h2>
            <p className="font-normal">
              His Eminence, Cardinal Fernando Filoni was born on 15 April 1946 in Manduria (Taranto, Italy), but at an early age, his family moved back to their original town of origin Galatone (Lecce). He attended middle school in the minor seminary of Nardò before completing his high school studies in Molfetta at the Pugliese Regional Seminary Pio XI and theology studies in Viterbo at the Seminary Santa Maria della Quercia.
              <br/>Monsignor Antonio Rosario Mennonna, Bishop of Nardò, ordained him a priest on 3 July 1970 in Galatone. He attended the Pontifical Lateran University, where he obtained a degree in canon law, and the La Sapienza State University, where he graduated in philosophy. He then pursued further studies at the Pro Deo (now known as the Free International University of Social Studies - LUISS) earning a postgraduate diploma in Political and Social Sciences, specializing in journalism. During this period in Rome, he served as an assistant parish priest, focusing in particular on the education of young people and teaching at the classical high schools Vivona and Socrates.
              <br/>At the end of his studies, the then Cardinal Vicar of Rome, Ugo Poletti, proposed that he enter the Pontifical Ecclesiastical Academy. On 3 April 1981, he received his first diplomatic posting to Sri Lanka. After three years, he was sent to Iran (1983-1985). Later he was called to the Secretariat of State to follow relations with international organizations. In 1989, he was sent to Brazil until 1992, when he was formally accredited in the Philippines as a Cultural Attaché, with residence in Hong Kong, where the Holy See had opened a Study Mission to closely follow the situation of the Church in China.
              <br/>On 17 January 2001, he was elected to the titular see of Volturno, with the dignity of Archbishop, and appointed Apostolic Nuncio to Jordan and Iraq. He received episcopal ordination from Pope John Paul II in the Vatican Basilica on March 19, 2001.
            </p>
            </div>
            <div className="w-full lg:w-1/2 bg-[url(src/assets/cardinal-filoni.png)] bg-top bg-cover bg-no-repeat bg-center min-h-[800px]"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
