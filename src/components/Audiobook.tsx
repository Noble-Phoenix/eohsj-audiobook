import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LS_TIME_KEY = "audiobook:time";
const LS_RATE_KEY = "audiobook:rate";

function formatTime(sec: number) {
  if (!Number.isFinite(sec)) return "0:00";
  const s = Math.floor(sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return h > 0 ? `${h}:${mm}:${String(r).padStart(2, "0")}` : `${m}:${String(r).padStart(2, "0")}`;
}

type AudiobookPlayerProps = {
  src: string;
  downloadName?: string;
};

export function AudiobookPlayer({ src, downloadName = "eng-audiobook.mp3" }: AudiobookPlayerProps) {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);

  const savedTime = useMemo(() => {
    const raw = localStorage.getItem(LS_TIME_KEY);
    const n = raw ? Number(raw) : 0;
    return Number.isFinite(n) ? n : 0;
  }, []);

  const savedRate = useMemo(() => {
    const raw = localStorage.getItem(LS_RATE_KEY);
    const n = raw ? Number(raw) : 1;
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, []);

  // Support share links like /listen?t=1234
  const initialTimeFromUrl = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("t");
    const n = t ? Number(t) : 0;
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    // restore playback rate
    el.playbackRate = savedRate;

    const onLoaded = () => {
      setDuration(el.duration || 0);
      setIsReady(true);

      // prefer URL timestamp, else resume
      const startAt = initialTimeFromUrl > 0 ? initialTimeFromUrl : savedTime;
      if (startAt > 0 && Number.isFinite(el.duration) && startAt < el.duration - 1) {
        el.currentTime = startAt;
        setCurrent(startAt);
      }
    };

    let lastWrite = 0;
    const onTime = () => {
      setCurrent(el.currentTime || 0);
      const now = Date.now();
      // throttle localStorage writes
      if (now - lastWrite > 1000) {
        localStorage.setItem(LS_TIME_KEY, String(el.currentTime || 0));
        lastWrite = now;
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onRate = () => localStorage.setItem(LS_RATE_KEY, String(el.playbackRate));

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ratechange", onRate);

    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ratechange", onRate);
    };
  }, [initialTimeFromUrl, savedRate, savedTime]);

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) await el.play();
    else el.pause();
  };

  const seek = (next: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min(next, duration || next));
    setCurrent(el.currentTime);
  };

  const setRate = (rate: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = rate;
  };

  const resumeFromSaved = () => seek(Number(localStorage.getItem(LS_TIME_KEY) || 0));
  const restart = () => {
    localStorage.setItem(LS_TIME_KEY, "0");
    seek(0);
  };

  const download = () => {
    // Use a normal anchor click so browser handles it
    const a = document.createElement("a");
    a.href = src;
    a.download = downloadName;
    a.rel = "noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section className="mx-auto w-full max-w-[760px] p-4">
      <div className="rounded-2xl border border-gray-300 bg-white p-4">
        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={togglePlay}
            disabled={!isReady}
            className="inline-flex h-12 min-w-28 items-center justify-center rounded-2xl bg-brand-600 px-4 font-bold uppercase text-white transition-colors hover:bg-brand-900 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            {isPlaying ? t("audiobook.pause") : t("audiobook.play")}
          </button>

          <div className="min-w-[180px] text-[16px] font-semibold text-gray-900">
            {formatTime(current)} / {formatTime(duration)}
          </div>

          <label className="flex items-center gap-2 text-[16px] font-semibold text-gray-900">
            {t("audiobook.speed")}{" "}
            <select
              defaultValue={String(savedRate)}
              onChange={(e) => setRate(Number(e.target.value))}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2"
              aria-label={t("audiobook.playback_speed_aria")}
            >
              <option value="1">1×</option>
              <option value="1.25">1.25×</option>
              <option value="1.5">1.5×</option>
              <option value="2">2×</option>
            </select>
          </label>

          <button
            onClick={download}
            disabled={!src}
            className="inline-flex h-12 min-w-40 items-center justify-center rounded-2xl bg-brand-600 px-4 font-bold uppercase text-white transition-colors hover:bg-brand-900 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            {t("audiobook.download")}
          </button>

          {Number(localStorage.getItem(LS_TIME_KEY) || 0) > 10 && (
            <>
              <button
                onClick={resumeFromSaved}
                className="inline-flex h-12 min-w-28 items-center justify-center rounded-2xl bg-brand-600 px-4 font-bold uppercase text-white transition-colors hover:bg-brand-900"
              >
                {t("audiobook.resume")}
              </button>
              <button
                onClick={restart}
                className="inline-flex h-12 min-w-32 items-center justify-center rounded-2xl bg-brand-600 px-4 font-bold uppercase text-white transition-colors hover:bg-brand-900"
              >
                {t("audiobook.start_over")}
              </button>
            </>
          )}
        </div>

        <div className="mt-3">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={1}
            value={current}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full accent-brand-600"
            aria-label={t("audiobook.seek_aria")}
            disabled={!isReady}
          />
        </div>
      </div>
    </section>
  );
}
