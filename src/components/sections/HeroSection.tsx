import React from "react";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  intro1: string;
  intro2: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, intro1, intro2 }) => (
  <div>
    <div className="relative flex mx-auto max-w-[1200px] p-4 flex-col gap-4 md:gap-6 lg:gap-10 items-center mt-10 md:mt-20 lg:mt-30">
      <h1 className="uppercase roboto-condensed text-[36px] md:text-[48px] lg:text-[52px] xl:text-[62px] font-bold w-[358px] md:w-[700px] lg:w-[750px] xl:w-[900px] leading-[1.1] text-center">
        {title}
      </h1>
      <h2 className="uppercase roboto-condensed text-[32px] md:text-[36px] font-medium w-[358px] md:w-[500px] lg:w-[650px] xl:w-[900px] leading-[1.1] text-center text-brand-600">
        {subtitle}
      </h2>
      <img
        src="/bookcover.jpg"
        alt="Book Cover"
        className="my-8 md:my-2 w-60 lg:absolute lg:w-[320px] lg:overflow-hidden lg:block lg:-left-30 xl:-left-40 lg:top-30 lg:-rotate-18"
      />
      <p className="roboto-condensed text-[18px] w-[358px] md:w-[600px] lg:w-[500px] xl:w-[600px] leading-normal text-center">
        {intro1}
        <br />
        {intro2}
      </p>
    </div>
  </div>
);

export default HeroSection;
