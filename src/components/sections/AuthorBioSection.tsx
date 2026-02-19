import React from "react";

type AuthorBioSectionProps = {
  paragraphs: string[];
};

const AuthorBioSection: React.FC<AuthorBioSectionProps> = ({ paragraphs }) => (
  <div>
    <div className="flex flex-wrap mx-auto lg:justify-around bg-beige-100">
      <div className="w-full lg:ml-auto lg:max-w-[600px] lg:w-1/2 p-10">
        <p className="font-normal">
          {paragraphs.map((paragraph, index) => (
            <div key={index}>
              {paragraph}
              <br />
            </div>
          ))}
        </p>
      </div>
      <div className="w-full lg:w-1/2 bg-[url(/cardinal-filoni.png)] bg-top bg-center bg-cover bg-no-repeat min-h-[800px]" />
    </div>
  </div>
);

export default AuthorBioSection;
