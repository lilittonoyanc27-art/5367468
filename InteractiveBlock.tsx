import React, { useState, useEffect } from 'react';
import { Volume2, ChevronDown, ChevronUp, Check, Copy } from 'lucide-react';
import { speakSpanish } from './SpeechUtil';

interface InteractiveBlockProps {
  id?: string;
  badge?: string;
  title?: string;
  spanish: string;
  armenian: string;
  explanationEs?: string;
  explanationHy?: string;
  whyEs?: string;
  whyHy?: string;
  globalMode?: 'click' | 'all' | 'spanish_only';
  highlightWord?: string;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const InteractiveBlock: React.FC<InteractiveBlockProps> = ({
  badge,
  title,
  spanish,
  armenian,
  explanationEs,
  explanationHy,
  whyEs,
  whyHy,
  globalMode = 'click',
  isBookmarked,
  onToggleBookmark,
}) => {
  // If globalMode is 'all', Armenian is always visible.
  // If 'spanish_only', Armenian is hidden.
  // If 'click', user can click to reveal/hide Armenian.
  const [isOpen, setIsOpen] = useState<boolean>(globalMode === 'all');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (globalMode === 'all') {
      setIsOpen(true);
    } else if (globalMode === 'spanish_only') {
      setIsOpen(false);
    }
  }, [globalMode]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakSpanish(spanish);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${spanish}\n---\n${armenian}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleToggle}
      className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isOpen
          ? 'bg-amber-50/40 border-amber-300 shadow-md ring-1 ring-amber-300/60'
          : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-md'
      }`}
    >
      {/* Top Header / Badges */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2 flex-wrap">
          {badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              {badge}
            </span>
          )}
          {title && (
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {onToggleBookmark && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark();
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'Հեռացնել ընտրյալներից' : 'Ավելացնել ընտրյալներում'}
            >
              ★
            </button>
          )}

          <button
            onClick={handleSpeak}
            className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
            title="Լսել իսպաներեն արտասանությունը (Audio)"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline text-[11px]">Լսել</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Պատճենել տեքստը"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <span className="text-xs font-medium text-slate-400 pl-1 flex items-center">
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-amber-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
            )}
          </span>
        </div>
      </div>

      {/* Spanish Content (Clickable) */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200">
                🇪🇸 Español
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                {!isOpen && '👆 Սեղմիր իսպաներենի վրա թարգմանությունը բացելու համար'}
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed font-sans whitespace-pre-line tracking-tight">
              {spanish}
            </p>

            {explanationEs && (
              <div className="mt-3 text-base sm:text-lg text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
                <span className="font-bold text-slate-950">Explicación: </span>
                {explanationEs}
              </div>
            )}

            {whyEs && (
              <div className="mt-3 text-base sm:text-lg text-amber-950 bg-amber-50/80 p-4 rounded-xl border border-amber-200 leading-relaxed">
                <span className="font-bold text-amber-950">¿Por qué? </span>
                {whyEs}
              </div>
            )}
          </div>
        </div>

        {/* Action Hint when closed */}
        {!isOpen && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm sm:text-base text-amber-800 font-semibold">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              Սեղմեք այստեղ՝ հայերեն թարգմանությունն ու բացատրությունը տեսնելու համար
            </span>
            <span className="underline decoration-dotted text-slate-600 group-hover:text-amber-800 flex items-center gap-1 font-bold">
              Բացել 🇦🇲
            </span>
          </div>
        )}

        {/* Armenian Translation & Explanation (Revealed on Click) */}
        {isOpen && (
          <div className="mt-5 pt-5 border-t border-amber-200/80 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                🇦🇲 Հայերեն թարգմանություն
              </span>
            </div>

            <p className="text-lg sm:text-xl font-semibold text-emerald-950 leading-relaxed whitespace-pre-line bg-emerald-50/60 p-4 sm:p-5 rounded-2xl border border-emerald-200">
              {armenian}
            </p>

            {explanationHy && (
              <div className="text-base sm:text-lg text-slate-800 bg-white p-4 rounded-2xl border border-slate-200 leading-relaxed shadow-sm">
                <span className="font-bold text-slate-950">Հայերեն բացատրություն․ </span>
                {explanationHy}
              </div>
            )}

            {whyHy && (
              <div className="text-base sm:text-lg text-amber-950 bg-amber-100/70 p-4 rounded-2xl border border-amber-300 leading-relaxed">
                <span className="font-bold text-amber-950">Ինչո՞ւ է պատկանում այս տեսակին․ </span>
                {whyHy}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
