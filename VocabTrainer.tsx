import React, { useState } from 'react';
import { Volume2, RotateCcw, ArrowRight, ArrowLeft, Search, Check, Sparkles } from 'lucide-react';
import { VOCABULARY_LIST, VocabItem } from './literatureData';
import { speakSpanish } from './SpeechUtil';

export const VocabTrainer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showTable, setShowTable] = useState<boolean>(false);

  const filteredVocab = VOCABULARY_LIST.filter(
    (item) =>
      item.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentItem: VocabItem | undefined = filteredVocab[currentIndex] || filteredVocab[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredVocab.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length);
  };

  const handleRandom = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredVocab.length);
    setCurrentIndex(randomIndex);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Բառարան և ուսուցողական քարտեր (Tarjetas)
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Գրական տերմինների բառարան — Vocabulario
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Ընդհանուր {VOCABULARY_LIST.length} կարևոր բառ և արտահայտություն քննության համար։
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTable(!showTable)}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            {showTable ? 'Քարտերի ռեժիմ (Flashcards)' : 'Աղյուսակի ռեժիմ (Tabla)'}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          placeholder="Որոնել բառեր իսպաներեն կամ հայերեն (Buscar término)..."
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Մաքրել
          </button>
        )}
      </div>

      {/* Mode 1: Flashcard Trainer */}
      {!showTable && currentItem && (
        <div className="space-y-4 max-w-xl mx-auto">
          {/* Card container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group relative h-72 sm:h-80 w-full cursor-pointer perspective rounded-3xl transition-transform duration-300 hover:scale-[1.01]"
          >
            <div
              className={`w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border shadow-lg transition-all duration-300 ${
                isFlipped
                  ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 border-emerald-300 ring-2 ring-emerald-400/40'
                  : 'bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white border-amber-600 ring-2 ring-amber-500/30'
              }`}
            >
              {/* Card top */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    isFlipped
                      ? 'bg-emerald-200/80 text-emerald-900'
                      : 'bg-white/20 text-white backdrop-blur-sm'
                  }`}
                >
                  {isFlipped ? '🇦🇲 Հայերեն թարգմանություն' : '🇪🇸 Իսպաներեն տերմին'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakSpanish(currentItem.es);
                    }}
                    className={`p-2 rounded-xl transition-all ${
                      isFlipped
                        ? 'text-emerald-800 hover:bg-emerald-200/70'
                        : 'text-white hover:bg-white/20'
                    }`}
                    title="Լսել իսպաներեն արտասանությունը"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <span
                    className={`text-xs font-semibold ${
                      isFlipped ? 'text-emerald-700' : 'text-amber-100'
                    }`}
                  >
                    {currentIndex + 1} / {filteredVocab.length}
                  </span>
                </div>
              </div>

              {/* Card middle */}
              <div className="text-center py-4">
                {!isFlipped ? (
                  <div className="space-y-4">
                    <h3 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                      {currentItem.es}
                    </h3>
                    <p className="text-amber-100 text-sm sm:text-base font-medium">
                      👆 Սեղմեք քարտին՝ հայերեն նշանակությունը բացելու համար
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight leading-tight">
                      {currentItem.hy}
                    </h3>
                    {currentItem.note && (
                      <p className="text-base sm:text-lg font-medium text-emerald-900 bg-emerald-100/80 p-3 rounded-2xl border border-emerald-300">
                        {currentItem.note}
                      </p>
                    )}
                    {currentItem.example && (
                      <p className="text-sm sm:text-base text-slate-800 bg-white/90 p-2.5 rounded-xl border border-emerald-200">
                        <span className="font-bold">Օրինակ՝</span> {currentItem.example}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Card bottom footer */}
              <div
                className={`text-center text-xs font-medium border-t pt-3 ${
                  isFlipped ? 'border-emerald-200/80 text-emerald-700' : 'border-white/20 text-amber-100'
                }`}
              >
                {isFlipped ? 'Սեղմիր կրկին՝ իսպաներենին վերադառնալու համար' : 'Հայերեն թարգմանությունը թաքցված է'}
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Նախորդ
            </button>

            <button
              onClick={handleRandom}
              className="px-4 py-2.5 rounded-xl border border-amber-300 text-amber-900 bg-amber-50 hover:bg-amber-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Պատահական բառ
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              Հաջորդ <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: Full Vocabulary Table */}
      {showTable && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-600 font-bold">
              <tr>
                <th className="p-3.5">#</th>
                <th className="p-3.5">Español (Իսպաներեն)</th>
                <th className="p-3.5">Հայերեն (Traducción)</th>
                <th className="p-3.5">Նշում / Օրինակ</th>
                <th className="p-3.5 text-center">Ձայն</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVocab.map((item, idx) => (
                <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-3.5 text-xs text-slate-400 font-mono">{idx + 1}</td>
                  <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <span>{item.es}</span>
                  </td>
                  <td className="p-3.5 font-medium text-emerald-900">{item.hy}</td>
                  <td className="p-3.5 text-xs text-slate-600">
                    {item.note && <div className="text-slate-700 font-medium">{item.note}</div>}
                    {item.example && (
                      <div className="text-amber-800 font-mono mt-0.5">{item.example}</div>
                    )}
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => speakSpanish(item.es)}
                      className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50"
                      title="Լսել արտասանությունը"
                    >
                      <Volume2 className="w-4 h-4 text-amber-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
