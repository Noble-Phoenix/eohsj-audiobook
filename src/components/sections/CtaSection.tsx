import React from "react";

type CtaSectionProps = {
  buyLabel?: string;
  onBuy?: () => void;
  downloadLabel?: string;
  onDownload?: () => void;
  downloadDisabled?: boolean;
  listenLabel?: string;
  onListen?: () => void;
  children?: React.ReactNode;
};

const baseButtonClass =
  "inline-flex items-center justify-center h-18 w-[300px] text-[24px] leading-[1.2] bg-brand-600 text-white hover:bg-brand-900 cursor-pointer dark:text-white uppercase font-bold py-2 px-4 rounded-2xl";

const CtaSection: React.FC<CtaSectionProps> = ({
  buyLabel,
  onBuy,
  downloadLabel,
  onDownload,
  downloadDisabled = false,
  listenLabel,
  onListen,
  children,
}) => (
  <>
    <div className="mt-22 w-0 h-0 border-l-[50vw] border-l-transparent border-r-[50vw] border-r-transparent border-b-48 md:border-b-80 lg:border-b-90 border-b-gray-900" />
    <div className="bg-gray-900 w-full">
      <div className="mx-auto max-w-[1200px] p-4 mt-6 mb-8">
        <div className="flex flex-wrap justify-center md:justify-around items-center gap-12 md:gap-8">
          {buyLabel && onBuy ? (
            <button onClick={onBuy} className={baseButtonClass}>
              {buyLabel}
            </button>
          ) : null}
          {downloadLabel && onDownload ? (
            <button
              onClick={onDownload}
              disabled={downloadDisabled}
              className={`${baseButtonClass} disabled:cursor-not-allowed disabled:bg-gray-600`}
            >
              {downloadLabel}
            </button>
          ) : null}
          {listenLabel && onListen ? (
            <button onClick={onListen} className={baseButtonClass}>
              {listenLabel}
            </button>
          ) : null}
        </div>
        {children ? <div className="mt-8 md:mt-12">{children}</div> : null}
      </div>
    </div>
  </>
);

export default CtaSection;
