import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  HelpCircle,
  Sparkles,
  GraduationCap,
  Layers,
  Search,
  Volume2,
  Bookmark,
  Eye,
  CheckCircle,
  ScrollText,
  FileQuestion,
  Compass,
  ArrowUp
} from 'lucide-react';
import {
  EXAM_INFO,
  ALL_FIGURES,
  EXAM_RECOGNITION_GUIDE,
  FINAL_EXAMPLE
} from './literatureData';
import { InteractiveBlock } from './InteractiveBlock';
import { QuizSection } from './QuizSection';
import { VocabTrainer } from './VocabTrainer';
import { ExamGuideSection } from './ExamGuideSection';
import { speakSpanish } from './SpeechUtil';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [globalMode, setGlobalMode] = useState<'click' | 'all' | 'spanish_only'>('click');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter figures for search
  const filteredFigures = useMemo(() => {
    if (!searchQuery) return ALL_FIGURES;
    const q = searchQuery.toLowerCase();
    return ALL_FIGURES.filter(
      (f) =>
        f.nameEs.toLowerCase().includes(q) ||
        f.nameHy.toLowerCase().includes(q) ||
        f.defEs.toLowerCase().includes(q) ||
        f.defHy.toLowerCase().includes(q) ||
        f.exampleEs.toLowerCase().includes(q) ||
        f.exampleHy.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const fontSizeClass =
    fontSize === 'xlarge'
      ? 'font-size-xlarge'
      : fontSize === 'large'
      ? 'font-size-large'
      : 'font-size-normal';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-200 selection:text-amber-900 pb-20 ${fontSizeClass}`}>
      {/* Top Banner & Header */}
      <header className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white border-b border-amber-900/30 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3.5 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-500/20 shrink-0">
                📚
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    LITERATURA — ԳՐԱԿԱՆՈՒԹՅՈՒՆ
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400/25 text-amber-300 border border-amber-400/30">
                    7.º de ESO
                  </span>
                </div>
                <p className="text-sm text-amber-200/90 font-medium">
                  Preparación para el examen · Քննության ամբողջական պատրաստություն
                </p>
              </div>
            </div>

            {/* Global Display Controls & Bookmarks */}
            <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
              {/* Font Size Adjuster */}
              <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex items-center gap-1">
                <span className="text-xs text-slate-400 px-1 font-semibold hidden sm:inline">Տառաչափ՝</span>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    fontSize === 'normal'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Ստանդարտ տառաչափ (Normal)"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2.5 py-1 rounded-lg text-sm font-bold transition-all ${
                    fontSize === 'large'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Մեծ տառաչափ (Grande - Առաջարկվող)"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2.5 py-1 rounded-lg text-base font-bold transition-all ${
                    fontSize === 'xlarge'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Շատ մեծ տառաչափ (Muy grande)"
                >
                  A++
                </button>
              </div>

              {/* Mode Selector */}
              <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex items-center gap-1">
                <button
                  onClick={() => setGlobalMode('click')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    globalMode === 'click'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Սեղմիր իսպաներենի վրա՝ հայերենը բացելու համար"
                >
                  <span>👆</span>
                  <span className="hidden sm:inline">Սեղմելով բացել</span>
                </button>

                <button
                  onClick={() => setGlobalMode('all')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    globalMode === 'all'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Բոլոր հայերեն թարգմանությունները միշտ բացված"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Բոլորը բաց</span>
                </button>

                <button
                  onClick={() => setGlobalMode('spanish_only')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    globalMode === 'spanish_only'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Միայն իսպաներեն՝ ինքնաստուգման համար"
                >
                  <span>🇪🇸</span>
                  <span className="hidden sm:inline">Միայն իսպաներեն</span>
                </button>
              </div>

              {/* Bookmarks toggle */}
              <button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className={`px-3 py-2 rounded-xl font-bold border transition-colors flex items-center gap-1.5 ${
                  showBookmarksOnly
                    ? 'bg-amber-400 text-slate-950 border-amber-400'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Ընտրյալներ</span>
                <span className="ml-0.5 px-2 py-0.5 rounded-full bg-slate-900/40 text-xs">
                  {bookmarks.size}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Nav Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 mt-2 border-t border-slate-800 scrollbar-none text-xs sm:text-sm font-semibold">
            {[
              { id: 'all', label: '📖 Բոլորը (Todo)' },
              { id: 'guide6', label: '📘 Քննական ամփոփ (6 էջ)' },
              { id: 'sec1', label: '1. Géneros' },
              { id: 'sec2', label: '2. Popular/Culta' },
              { id: 'sec3', label: '3. Romance/Mito' },
              { id: 'sec4', label: '4. Lenguaje' },
              { id: 'sec5', label: '5. Figuras' },
              { id: 'sec6', label: '6. Resumen' },
              { id: 'sec7', label: '7. 📝 Examen' },
              { id: 'sec8', label: '8. 🎯 Reconocer' },
              { id: 'vocab', label: '💡 Բառարան' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== 'all' && tab.id !== 'vocab' && tab.id !== 'guide6') {
                    const el = document.getElementById(tab.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (tab.id === 'guide6') {
                    const el = document.getElementById('guide6-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Intro Hero Banner */}
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-amber-600/15 relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Ինտերակտիվ ուսումնական ուղեցույց
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Իսպաներեն գրականություն 7.º de ESO
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-amber-50 leading-relaxed">
              <p className="font-semibold text-white">
                {EXAM_INFO.introEs}
              </p>
              <p className="text-amber-100 bg-black/10 p-3 rounded-2xl border border-white/10">
                {EXAM_INFO.introHy}
              </p>
            </div>

            {/* Instruction tooltip */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-amber-950">
              <div className="bg-amber-100/90 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                <span>👆</span>
                <span>Սեղմեք ցանկացած իսպաներեն բլոկի վրա՝ հայերեն թարգմանությունն ու բացատրությունը բացելու համար</span>
              </div>
              <div className="bg-white/90 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm text-slate-800">
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Սեղմեք «Լսել»՝ իսպաներեն արտասանությունը լսելու համար</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Search Filter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Փնտրել թեմաներ, գրական արտահայտչամիջոցներ, օրինակներ (Buscar figura, término, concepto)..."
            className="w-full text-sm sm:text-base outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 bg-slate-100 rounded-lg"
            >
              Մաքրել
            </button>
          )}
        </div>

        {/* View mode indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Ընթացիկ ռեժիմ՝</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
              {globalMode === 'click'
                ? '👆 Սեղմելով բացել (Ակտիվ ինքնաստուգում)'
                : globalMode === 'all'
                ? '👁️ Բոլոր հայերեն թարգմանությունները բացված'
                : '🇪🇸 Միայն իսպաներեն տեքստ'}
            </span>
          </div>
          {searchQuery && (
            <span className="text-amber-800 font-medium">
              Գտնվել է {filteredFigures.length} համընկնում
            </span>
          )}
        </div>

        {/* TAB: 6-PAGE EXAM GUIDE */}
        {activeTab === 'guide6' && (
          <div id="guide6-section">
            <ExamGuideSection
              globalMode={globalMode}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
            />
          </div>
        )}

        {/* TAB: VOCABULARY TRAINER */}
        {activeTab === 'vocab' && (
          <div id="vocab">
            <VocabTrainer />
          </div>
        )}

        {/* TAB: QUIZ SECTION ONLY */}
        {activeTab === 'sec7' && (
          <div id="sec7">
            <QuizSection />
          </div>
        )}

        {/* ALL SECTIONS CONTENT (Shown when activeTab === 'all' or corresponding section tab) */}
        {(activeTab === 'all' || activeTab.startsWith('sec')) && activeTab !== 'sec7' && (
          <div className="space-y-16">
            {/* ---------------- SECTION 1: GRANDES GÉNEROS LITERARIOS ---------------- */}
            {(activeTab === 'all' || activeTab === 'sec1') && (
              <section id="sec1" className="space-y-8 scroll-mt-24">
                <div className="border-b-2 border-amber-500 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Թեմա 1
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    1. Grandes géneros literarios — Գրականության հիմնական սեռերը
                  </h2>
                </div>

                {/* Section Overview Block */}
                <InteractiveBlock
                  badge="Ընդհանուր սահմանում"
                  title="Los tres grandes géneros"
                  spanish="Los tres grandes géneros literarios son la lírica, la narrativa y el teatro. Se diferencian principalmente por la forma de presentar los sentimientos, contar historias o representar acciones."
                  armenian="Գրականության երեք հիմնական սեռերն են քնարերգությունը, պատմողական գրականությունը և թատրոնը։ Դրանք հիմնականում տարբերվում են նրանով, թե ինչպես են արտահայտվում զգացմունքները, պատմվում իրադարձությունները կամ ներկայացվում գործողությունները։"
                  globalMode={globalMode}
                  isBookmarked={bookmarks.has('gen-intro')}
                  onToggleBookmark={() => toggleBookmark('gen-intro')}
                />

                {/* 1.1 LÍRICA */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-sm flex items-center justify-center">
                      1.1
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Lírica — Քնարերգություն
                    </h3>
                  </div>

                  {/* 1.1 A */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      A. Discurso subjetivo del autor o autora
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում A"
                      spanish="A. Discurso subjetivo del autor o autora mediante el que se expresa una emoción o un sentimiento."
                      armenian="Հեղինակի սուբյեկտիվ խոսք, որի միջոցով արտահայտվում է որևէ հույզ կամ զգացմունք։"
                      explanationEs="La lírica es un género literario en el que el autor o la voz poética expresa sentimientos, emociones, pensamientos o experiencias personales. La palabra subjetivo significa que el texto presenta una visión personal, relacionada con lo que alguien siente o piensa."
                      explanationHy="Քնարերգությունը գրականության այն սեռն է, որտեղ հեղինակը կամ բանաստեղծական խոսողը արտահայտում է զգացմունքներ, հույզեր, մտքեր և անձնական ապրումներ։ Subjetivo նշանակում է սուբյեկտիվ՝ հիմնված մարդու անձնական զգացմունքների և տեսակետի վրա։"
                      globalMode={globalMode}
                    />

                    {/* Example */}
                    <InteractiveBlock
                      badge="Օրինակ — Ejemplo"
                      title="¿Por qué es lírica? — Ինչո՞ւ է քնարերգություն"
                      spanish="Mi corazón está triste porque te has ido."
                      armenian="Սիրտս տխուր է, որովհետև դու հեռացել ես։"
                      whyEs="Porque expresa un sentimiento de tristeza y nostalgia."
                      whyHy="Որովհետև արտահայտվում են տխրություն և կարոտ։"
                      globalMode={globalMode}
                    />
                  </div>

                  {/* 1.1 B */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      B. Preferencia por el verso, ritmo y musicalidad
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում B"
                      spanish="B. Preferencia por el uso del verso (aunque también existe la prosa poética), del ritmo y de la musicalidad."
                      armenian="Նախապատվություն չափածոյի (թեև գոյություն ունի նաև բանաստեղծական արձակ), ռիթմի և երաժշտականության կիրառմանը։"
                      explanationEs="En la lírica se prefiere el verso porque permite crear ritmo, musicalidad y efectos sonoros. Sin embargo, la lírica también puede escribirse en prosa poética. La palabra preferencia significa que algo se utiliza más habitualmente, pero no es obligatorio."
                      explanationHy="Քնարերգության մեջ նախապատվությունը տրվում է չափածոյին, որովհետև դրա միջոցով կարելի է ստեղծել ռիթմ և երաժշտականություն։ Սակայն քնարերգությունը կարող է գրվել նաև բանաստեղծական արձակով։ Preferencia նշանակում է «նախապատվություն»։ Այս բառը չի նշանակում, թե չափածոն պարտադիր է։"
                      globalMode={globalMode}
                    />

                    {/* Vocabulary Mini-Table for 1.1 B */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                      <div className="text-xs font-bold uppercase text-slate-500 mb-2">
                        Բառարանային աղյուսակ (1.1 B)
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        {[
                          { es: 'Preferencia', hy: 'Նախապատվություն' },
                          { es: 'Verso', hy: 'Բանաստեղծական տող, չափածո' },
                          { es: 'Aunque', hy: 'Թեև, չնայած' },
                          { es: 'Prosa poética', hy: 'Բանաստեղծական արձակ' },
                          { es: 'Ritmo', hy: 'Ռիթմ' },
                          { es: 'Musicalidad', hy: 'Երաժշտականություն' }
                        ].map((w, i) => (
                          <div key={i} className="bg-white p-2 rounded-lg border border-slate-200 flex flex-col justify-between">
                            <span className="font-bold text-slate-900">{w.es}</span>
                            <span className="text-emerald-800">{w.hy}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InteractiveBlock
                        badge="Չափածո օրինակ — Ejemplo en verso"
                        spanish={`La luna brilla en el cielo,\nmi alma busca consuelo.`}
                        armenian={`Լուսինը փայլում է երկնքում,\nիմ հոգին մխիթարություն է փնտրում։`}
                        whyEs="Porque expresa sentimientos con ritmo, musicalidad y estructura en versos."
                        whyHy="Որովհետև արտահայտում է զգացմունքներ չափածոյի, ռիթմի և երաժշտականության միջոցով։"
                        globalMode={globalMode}
                      />

                      <InteractiveBlock
                        badge="Բանաստեղծական արձակ — Prosa poética"
                        spanish="La noche está en silencio. Mi corazón es un mar de tristeza."
                        armenian="Գիշերը լուռ է։ Իմ սիրտը տխրության ծով է։"
                        whyEs="Porque expresa sentimientos mediante un lenguaje artístico, aunque tenga forma de prosa."
                        whyHy="Որովհետև գրված է արձակ ձևով, բայց պատկերավոր լեզվով արտահայտում է խորը զգացմունքներ։"
                        globalMode={globalMode}
                      />
                    </div>
                  </div>

                  {/* 1.1 C */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      C. Uso de recursos retóricos: fónicos, morfosintácticos y semánticos
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում C"
                      spanish="C. Uso de recursos retóricos: fónicos, morfosintácticos y semánticos."
                      armenian="Հռետորական արտահայտչամիջոցների կիրառում՝ հնչյունական, ձևաբանական-շարահյուսական և իմաստային։"
                      explanationEs="Los recursos retóricos o figuras literarias son procedimientos que hacen que el lenguaje sea más expresivo, artístico y emocionante. Se pueden estudiar según tres niveles: fónico, morfosintáctico y semántico."
                      explanationHy="Հռետորական կամ գրական արտահայտչամիջոցները լեզվական հնարքներ են, որոնք խոսքը դարձնում են ավելի գեղեցիկ, պատկերավոր և ազդեցիկ։ Դրանք կարող ենք ուսումնասիրել երեք մակարդակով։"
                      globalMode={globalMode}
                    />

                    {/* Three levels table */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-1">
                        <span className="text-xs font-black uppercase text-purple-800">1. Nivel Fónico</span>
                        <div className="font-bold text-slate-900 text-sm">Repetición o imitación de sonidos</div>
                        <div className="text-xs text-purple-900 font-medium">Հնչյունների կրկնություն կամ նմանակում</div>
                        <div className="text-[11px] text-slate-600 pt-2 border-t border-purple-200">
                          Օրինակ՝ Susana susurra suavemente (Aliteración)
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-1">
                        <span className="text-xs font-black uppercase text-blue-800">2. Nivel Morfosintáctico</span>
                        <div className="font-bold text-slate-900 text-sm">Repetición y orden de palabras</div>
                        <div className="text-xs text-blue-900 font-medium">Բառերի կրկնություն և շարադասություն</div>
                        <div className="text-[11px] text-slate-600 pt-2 border-t border-blue-200">
                          Օրինակ՝ Quiero cantar. Quiero bailar (Anáfora)
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1">
                        <span className="text-xs font-black uppercase text-amber-800">3. Nivel Semántico</span>
                        <div className="font-bold text-slate-900 text-sm">Significados y sentidos figurados</div>
                        <div className="text-xs text-amber-900 font-medium">Իմաստներ և փոխաբերական արտահայտություններ</div>
                        <div className="text-[11px] text-slate-600 pt-2 border-t border-amber-200">
                          Օրինակ՝ Tus ojos son estrellas (Metáfora)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1.2 NARRATIVA */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center">
                      1.2
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Narrativa — Պատմողական գրականություն
                    </h3>
                  </div>

                  {/* 1.2 A */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      A. Presencia de un narrador o narradora (1.ª o 3.ª persona)
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում A"
                      spanish="A. Presencia de un narrador o narradora, principalmente en primera o tercera persona, que cuenta una historia."
                      armenian="Պատմողի առկայություն (հիմնականում առաջին կամ երրորդ դեմքով), որը պատմում է պատմություն։"
                      explanationEs="La narrativa es un género literario que cuenta una historia mediante acontecimientos, personajes y acciones. Generalmente aparece un narrador, que puede contar los hechos en primera o tercera persona."
                      explanationHy="Պատմողական գրականության մեջ ներկայացվում է որևէ պատմություն՝ իրադարձություններով, կերպարներով և գործողություններով։ Սովորաբար կա պատմող, որը դեպքերը ներկայացնում է առաջին կամ երրորդ դեմքով։"
                      globalMode={globalMode}
                    />

                    {/* Attention Note about Cuenta */}
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl space-y-1 text-sm">
                      <div className="font-bold text-amber-950">Atención — Ուշադրություն․ Cuenta բառի նշանակությունը</div>
                      <p className="text-slate-700">
                        <strong className="text-slate-900">Cuenta</strong> այստեղ «պատմում է» իմաստով բայ է։
                      </p>
                      <ul className="list-disc list-inside text-xs space-y-0.5 text-slate-800 pl-1">
                        <li><strong>Contar</strong> — պատմել</li>
                        <li><strong>Cuenta</strong> — նա պատմում է (él/ella cuenta)</li>
                        <li><strong>Cuento</strong> — պատմվածք կամ հեքիաթ</li>
                      </ul>
                    </div>

                    {/* 1st vs 3rd person examples */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InteractiveBlock
                        badge="Primera persona — Առաջին դեմք"
                        spanish="Yo encontré una carta misteriosa."
                        armenian="Ես գտա խորհրդավոր նամակ։"
                        whyEs="El narrador habla de lo que le ocurrió a él mismo (primera persona)."
                        whyHy="Պատմողը ներկայացնում է իր հետ կատարվածը (առաջին դեմք՝ Yo)։"
                        globalMode={globalMode}
                      />

                      <InteractiveBlock
                        badge="Tercera persona — Երրորդ դեմք"
                        spanish="Laura encontró una carta misteriosa."
                        armenian="Լաուրան գտավ խորհրդավոր նամակ։"
                        whyEs="El narrador cuenta lo que le ocurrió a Laura (tercera persona)."
                        whyHy="Պատմողը ներկայացնում է Լաուրայի հետ կատարվածը (երրորդ դեմք՝ Ella)։"
                        globalMode={globalMode}
                      />
                    </div>
                  </div>

                  {/* 1.2 B */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      B. Narrativas sin narrador o narradora explícito
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում B"
                      spanish="B. También existen narrativas sin narrador o narradora."
                      armenian="Գոյություն ունեն նաև պատմողական ստեղծագործություններ՝ առանց պատմողի։"
                      explanationEs="Algunas narraciones no presentan un narrador explícito. Los acontecimientos pueden darse a conocer a través de diálogos, documentos o diferentes recursos narrativos. Esto no significa que todas las narraciones carezcan de narrador."
                      explanationHy="Որոշ պատմողական ստեղծագործություններում առանձին կամ ակնհայտ պատմող չի ներկայացվում։ Դեպքերը կարող են բացահայտվել կերպարների խոսքերի, նամակների կամ այլ միջոցների օգնությամբ։ Սակայն պատմողական ստեղծագործությունների մեծ մասում կա պատմող։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="Օրինակ — Ejemplo sin narrador"
                      spanish={`Mensaje de Ana: «He llegado al castillo».\nMensaje de Pedro: «Ten cuidado. Dicen que está encantado».`}
                      armenian={`Անայի հաղորդագրությունը․ «Ես հասել եմ ամրոց»։\nՊեդրոյի հաղորդագրությունը․ «Զգույշ եղիր։ Ասում են՝ այն կախարդված է»։`}
                      whyEs="Conocemos los acontecimientos mediante mensajes, sin una voz narrativa externa que los explique."
                      whyHy="Իրադարձություններին ծանոթանում ենք հաղորդագրությունների միջոցով՝ առանց դրանք բացատրող առանձին արտաքին պատմողի։"
                      globalMode={globalMode}
                    />
                  </div>

                  {/* 1.2 C */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      C. Ficción y realidad
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում C"
                      spanish="C. La historia relatada es una ficción que, sin embargo, puede incorporar elementos extraídos de la realidad."
                      armenian="Պատմված պատմությունը հորինվածք է, որը, սակայն, կարող է ներառել իրականությունից վերցված տարրեր։"
                      explanationEs="Una historia de ficción es una historia imaginada. Puede incluir personas, lugares y situaciones reales junto con elementos inventados."
                      explanationHy="Հորինված պատմության մեջ դեպքերն ու կերպարները կարող են երևակայական լինել։ Սակայն այդ պատմության մեջ կարող են հանդիպել նաև իրական քաղաքներ, վայրեր կամ իրավիճակներ։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="Օրինակ՝ Իրականություն և երևակայություն"
                      spanish="Un niño encontró una puerta mágica en Madrid."
                      armenian="Մի տղա Մադրիդում կախարդական դուռ գտավ։"
                      whyEs="Madrid es una ciudad real (realidad), mientras que la puerta mágica es un elemento fantástico (ficción). Una narración puede combinar realidad y fantasía."
                      whyHy="Մադրիդը իրական քաղաք է, իսկ կախարդական դուռը՝ երևակայական տարր։ Պատմողական ստեղծագործությունը կարող է միավորել իրականությունն ու երևակայությունը։"
                      globalMode={globalMode}
                    />
                  </div>

                  {/* 1.2 D */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      D. Prosa actual frente al verso original
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում D"
                      spanish="D. Actualmente se usa la prosa y la descripción, mientras que en la épica, en su origen, se utilizaba el verso."
                      armenian="Ներկայումս կիրառվում է արձակն ու նկարագրությունը, մինչդեռ էպոսում իր ծագման ժամանակ օգտագործվում էր չափածոն։"
                      explanationEs="En la narrativa actual predomina la prosa. Las novelas y muchos cuentos se escriben mediante oraciones y párrafos. En cambio, antiguamente muchas obras épicas narraban historias heroicas en verso."
                      explanationHy="Ժամանակակից պատմողական գրականության մեջ գերակշռում է արձակը։ Վեպերն ու պատմվածքները հաճախ գրվում են սովորական նախադասություններով և պարբերություններով։ Հնում շատ հերոսական էպիկական ստեղծագործություններ գրվում էին չափածոյով։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="Օրինակ արձակով — Prosa"
                      spanish="Pedro salió de casa. Caminó por el bosque y encontró un caballo."
                      armenian="Պեդրոն դուրս եկավ տնից։ Քայլեց անտառով և ձի գտավ։"
                      whyEs="Porque cuenta una secuencia de acontecimientos en prosa. Regla: la narrativa no tiene que estar escrita siempre en prosa, también puede existir en verso."
                      whyHy="Որովհետև ներկայացնում է իրադարձությունների հաջորդականություն։ Կանոն՝ պատմողական գրականությունը պարտադիր չէ, որ միշտ արձակ լինի, այն կարող է լինել նաև չափածո։"
                      globalMode={globalMode}
                    />
                  </div>
                </div>

                {/* 1.3 TEATRO */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                      1.3
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Teatro — Թատրոն
                    </h3>
                  </div>

                  {/* 1.3 A */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      A. Acción destinada a ser representada en un escenario
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում A"
                      spanish="A. Acción destinada a ser representada en un escenario ante un público."
                      armenian="Գործողություն, որը նախատեսված է բեմում հանդիսատեսի առջև ներկայացնելու համար։"
                      explanationEs="El teatro es el género literario cuyas obras están destinadas a representarse ante un público, normalmente en un escenario."
                      explanationHy="Թատրոնը գրականության այն սեռն է, որի ստեղծագործությունները նախատեսված են բեմում հանդիսատեսի առջև ներկայացնելու համար։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="Օրինակ — Diálogo teatral"
                      spanish={`ANA: ¿Dónde está Carlos?\nMARTA: Está en el jardín.\nANA: Voy a buscarlo.`}
                      armenian={`Անա․ Որտե՞ղ է Կառլոսը։\nՄարտա․ Նա պարտեզում է։\nԱնա․ Գնում եմ նրան փնտրելու։`}
                      whyEs="Porque el texto está organizado para que los personajes hablen y actúen en una representación."
                      whyHy="Որովհետև տեքստը կառուցված է այնպես, որ կերպարները խոսեն ու գործեն ներկայացման ընթացքում։"
                      globalMode={globalMode}
                    />
                  </div>

                  {/* 1.3 B */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      B. Ausencia de narrador y predominio del diálogo
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում B"
                      spanish="B. Ausencia de narrador o narradora. El texto dramático está construido principalmente por el diálogo entre sus personajes."
                      armenian="Պատմողի բացակայություն։ Դրամատիկական տեքստը հիմնականում կառուցված է կերպարների միջև երկխոսությամբ։"
                      explanationEs="En el teatro normalmente no hay un narrador que cuente todos los hechos. Los personajes presentan la acción mediante sus diálogos y sus movimientos. También pueden aparecer monólogos o, en algunas obras, un narrador."
                      explanationHy="Թատրոնում սովորաբար չկա պատմող, որը ներկայացնում է բոլոր դեպքերը։ Դերասանների խոսքի և գործողությունների միջոցով հանդիսատեսն ինքն է հասկանում կատարվող իրադարձությունները։ Կարող են հանդիպել նաև մենախոսություններ կամ որոշ ստեղծագործություններում՝ պատմող։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="Օրինակ — Երկխոսություն"
                      spanish={`LUCÍA: Tengo miedo.\nPABLO: No te preocupes. Estoy contigo.`}
                      armenian={`Լուսիա․ Ես վախենում եմ։\nՊաբլո․ Մի՛ անհանգստացիր։ Ես քեզ հետ եմ։`}
                      whyEs="Sabemos que Lucía tiene miedo porque ella misma lo dice mediante el diálogo directo, sin intermediario de un narrador."
                      whyHy="Մենք հասկանում ենք, որ Լուսիան վախենում է, որովհետև նա ինքն է դա ասում ուղղակի խոսքով՝ առանց պատմողի միջամտության։"
                      globalMode={globalMode}
                    />
                  </div>

                  {/* 1.3 C */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      C. Códigos diversos y acotaciones
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում C"
                      spanish="C. Uso de códigos diversos: música, gestos de los actores."
                      armenian="Տարբեր նշանային համակարգերի կիրառում՝ երաժշտություն, դերասանների ժեստեր։"
                      explanationEs="El teatro utiliza diferentes medios de expresión. Además de las palabras, son importantes los gestos, los movimientos, la música, los sonidos y la expresión facial de los actores."
                      explanationHy="Թատրոնում իմաստը փոխանցվում է ոչ միայն խոսքերով, այլև շարժումներով, ժեստերով, երաժշտությամբ, ձայներով և դերասանների դիմախաղով։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="Բեմական ցուցում — Acotación"
                      spanish="(Marta empieza a llorar. Pedro se acerca y la abraza.)"
                      armenian="(Մարտան սկսում է լաց լինել։ Պեդրոն մոտենում է և գրկում նրան։)"
                      whyEs="Esta indicación entre paréntesis se llama acotación y explica qué hacen los personajes o cómo debe actuar el actor."
                      whyHy="Փակագծերում գրված այս ցուցումը կոչվում է acotación (բեմական ցուցում) և բացատրում է, թե ինչ են անում կերպարները։"
                      globalMode={globalMode}
                    />
                  </div>

                  {/* 1.3 D */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      D. Atrezo, decorado y vestuario
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում D"
                      spanish="D. Importancia del atrezo, el decorado y el vestuario."
                      armenian="Բեմական պարագաների (atrezo), ձևավորման (decorado) և հագուստի (vestuario) կարևորությունը։"
                      explanationEs="El atrezo, el decorado y el vestuario permiten crear el ambiente de la obra, mostrar dónde ocurre la acción y caracterizar a los personajes. Ayudan al público a comprender el lugar, la época y la situación."
                      explanationHy="Բեմական պարագաները, ձևավորումը և հագուստը օգնում են ստեղծել ներկայացման միջավայրը, ցույց տալ գործողության վայրը և ներկայացնել կերպարներին։ Դրանք օգնում են հանդիսատեսին հասկանալ ժամանակաշրջանը և իրավիճակը։"
                      globalMode={globalMode}
                    />

                    {/* Table of Atrezo, Decorado, Vestuario */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                        <div className="font-black text-slate-900 text-sm">Atrezo</div>
                        <div className="text-emerald-800 font-semibold">Բեմական պարագաներ</div>
                        <div className="text-slate-600 mt-1 font-mono">Una mesa — սեղան</div>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                        <div className="font-black text-slate-900 text-sm">Decorado</div>
                        <div className="text-emerald-800 font-semibold">Բեմի ձևավորում</div>
                        <div className="text-slate-600 mt-1 font-mono">Un bosque pintado — անտառի պատկեր</div>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                        <div className="font-black text-slate-900 text-sm">Vestuario</div>
                        <div className="text-emerald-800 font-semibold">Բեմական հագուստ</div>
                        <div className="text-slate-600 mt-1 font-mono">El traje del rey — թագավորի հագուստ</div>
                      </div>
                    </div>
                  </div>

                  {/* 1.3 E */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      E. Prosa y verso en el teatro
                    </h4>

                    <InteractiveBlock
                      badge="Սահմանում E"
                      spanish="E. Empleo preferente de la prosa, aunque antiguamente predominaba el texto en verso."
                      armenian="Արձակի նախընտրելի կիրառություն, թեև հին ժամանակներում գերակշռում էր չափածո տեքստը։"
                      explanationEs="Hoy muchas obras teatrales están escritas en prosa, aunque en épocas anteriores era frecuente que las obras dramáticas estuvieran escritas en verso."
                      explanationHy="Այսօր շատ թատերական ստեղծագործություններ գրվում են արձակով, թեև հին ժամանակներում հաճախ օգտագործվում էր չափածոն։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="Եզրակացություն թատրոնի մասին"
                      spanish="El teatro puede estar escrito tanto en prosa como en verso. Lo fundamental es su carácter dramático y representable."
                      armenian="Թատրոնը կարող է գրվել և՛ արձակով, և՛ չափածոյով։ Գլխավորն այն է, որ այն ունի դրամատիկական բնույթ և նախատեսված է ներկայացման համար։"
                      globalMode={globalMode}
                    />
                  </div>

                  {/* Comparison Summary Table */}
                  <div className="mt-6 pt-6 border-t-2 border-slate-200 space-y-3">
                    <h4 className="text-base font-black text-slate-900">
                      Comparación — Երեք գրական սեռերի համեմատություն
                    </h4>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-100 font-bold text-slate-700">
                          <tr>
                            <th className="p-3">Género (Սեռ)</th>
                            <th className="p-3">Español</th>
                            <th className="p-3">Հայերեն</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr className="hover:bg-purple-50/50">
                            <td className="p-3 font-bold text-purple-900">Lírica</td>
                            <td className="p-3">Expresa sentimientos y emociones.</td>
                            <td className="p-3 font-medium text-emerald-900">Արտահայտում է զգացմունքներ և հույզեր։</td>
                          </tr>
                          <tr className="hover:bg-blue-50/50">
                            <td className="p-3 font-bold text-blue-900">Narrativa</td>
                            <td className="p-3">Cuenta una historia.</td>
                            <td className="p-3 font-medium text-emerald-900">Պատմում է պատմություն։</td>
                          </tr>
                          <tr className="hover:bg-emerald-50/50">
                            <td className="p-3 font-bold text-emerald-900">Teatro</td>
                            <td className="p-3">Representa acciones mediante personajes.</td>
                            <td className="p-3 font-medium text-emerald-900">Կերպարների միջոցով ներկայացնում է գործողություններ։</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950">
                      <strong>Ուշադրություն (Atención): </strong>
                      Երեք սեռերն էլ կարող են օգտագործել գրական արտահայտչամիջոցներ, ինչպես նաև որոշ ստեղծագործություններում՝ արձակ կամ չափածո։ Դրանք միայն արտաքին ձևով տարբերել չի կարելի։
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ---------------- SECTION 2: LITERATURA POPULAR Y CULTA ---------------- */}
            {(activeTab === 'all' || activeTab === 'sec2') && (
              <section id="sec2" className="space-y-8 scroll-mt-24">
                <div className="border-b-2 border-amber-500 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Թեմա 2
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    2. Literatura popular y literatura culta — Ժողովրդական և հեղինակային գրականություն
                  </h2>
                </div>

                {/* 2.1 LITERATURA POPULAR */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
                      2.1
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Literatura popular — Ժողովրդական գրականություն
                    </h3>
                  </div>

                  <InteractiveBlock
                    badge="Սահմանում"
                    spanish="La literatura popular pertenece al pueblo. Sus obras suelen ser anónimas y se transmiten de generación en generación, generalmente de forma oral."
                    armenian="Ժողովրդական գրականությունը պատկանում է ժողովրդին։ Դրա ստեղծագործությունների հեղինակները հաճախ անհայտ են, և դրանք սովորաբար փոխանցվում են սերնդեսերունդ՝ բանավոր ձևով։"
                    globalMode={globalMode}
                  />

                  {/* 6 Características */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      Características — 6 հիմնական հատկանիշներ
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <InteractiveBlock
                        badge="1. Հեղինակ"
                        title="Obras anónimas"
                        spanish="Muchas obras populares no tienen un autor conocido. No sabemos quién las creó originalmente."
                        armenian="Շատ ժողովրդական ստեղծագործությունների հեղինակն անհայտ է։ Մենք չգիտենք, թե ով է առաջինը ստեղծել դրանք։"
                        globalMode={globalMode}
                      />

                      <InteractiveBlock
                        badge="2. Փոխանցում"
                        title="Transmisión oral"
                        spanish="Las historias, canciones y poemas se transmiten de una persona a otra mediante la palabra hablada."
                        armenian="Պատմությունները, երգերն ու բանաստեղծությունները փոխանցվում են մարդկանց միջև բանավոր՝ պատմելու կամ երգելու միջոցով։"
                        whyEs="Ejemplo: La abuela cuenta a sus nietos una leyenda que aprendió cuando era niña."
                        whyHy="Օրինակ՝ Տատիկն իր թոռներին պատմում է մի ավանդազրույց, որը սովորել էր մանուկ հասակում։"
                        globalMode={globalMode}
                      />

                      <InteractiveBlock
                        badge="3. Ժամանակաշրջան"
                        title="De generación en generación"
                        spanish="Una misma obra puede ser conocida por los abuelos, los padres y los hijos."
                        armenian="Նույն ստեղծագործությունը կարող են իմանալ տատիկներն ու պապիկները, ծնողները և երեխաները։"
                        globalMode={globalMode}
                      />

                      <InteractiveBlock
                        badge="4. Տարբերակներ"
                        title="Modificaciones"
                        spanish="Como las obras se transmiten oralmente, pueden cambiar algunas palabras o detalles de la historia."
                        armenian="Քանի որ ստեղծագործությունները փոխանցվում են բանավոր, ժամանակի ընթացքում դրանց որոշ բառեր կամ մանրամասներ կարող են փոփոխվել։"
                        globalMode={globalMode}
                      />

                      <InteractiveBlock
                        badge="5. Ծավալ"
                        title="Obras generalmente breves"
                        spanish="Muchas composiciones populares son breves y fáciles de recordar."
                        armenian="Ժողովրդական ստեղծագործություններից շատերը կարճ են և հեշտ հիշվող։"
                        globalMode={globalMode}
                      />

                      <InteractiveBlock
                        badge="6. Լեզվական ոճ"
                        title="Lenguaje coloquial"
                        spanish="Pueden aparecer palabras y expresiones propias del habla cotidiana."
                        armenian="Կարող են օգտագործվել առօրյա խոսքին բնորոշ բառեր և արտահայտություններ։"
                        whyEs="Ejemplo: ¡Oye, ven aquí y escucha esta historia!"
                        whyHy="Օրինակ՝ Հե՛յ, արի այստեղ և լսիր այս պատմությունը։"
                        globalMode={globalMode}
                      />
                    </div>
                  </div>

                  {/* Recursos Habituales */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      Recursos habituales — Հաճախ օգտագործվող միջոցներ
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <InteractiveBlock
                        badge="Կրկներգ"
                        title="Estribillo"
                        spanish="Es un verso o grupo de versos que se repite en una canción: «Vamos a cantar, vamos a bailar»."
                        armenian="Երգի մեջ կրկնվող տող կամ տողերի խումբ է։"
                        globalMode={globalMode}
                      />

                      <InteractiveBlock
                        badge="Ձայնանմանություն"
                        title="Onomatopeya"
                        spanish="Son palabras que imitan sonidos: «¡Pim, pam, pum!»"
                        armenian="Իրական ձայները նմանակող բառեր են։"
                        globalMode={globalMode}
                      />

                      <InteractiveBlock
                        badge="Ուշադրություն գրավող"
                        title="Llamadas al receptor"
                        spanish="Son expresiones que sirven para captar la atención de quien escucha: «Escuchad bien esta historia»."
                        armenian="Արտահայտություններ են, որոնց միջոցով պատմողը գրավում է լսողի ուշադրությունը։"
                        globalMode={globalMode}
                      />
                    </div>
                  </div>

                  {/* Popular genres list */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">
                      Ժողովրդական գրականության տեսակներ (Ejemplos de literatura popular)
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      {[
                        { es: 'Canciones de trabajo', hy: 'Աշխատանքային երգեր' },
                        { es: 'Canciones de fiesta', hy: 'Տոնական երգեր' },
                        { es: 'Canciones de amor', hy: 'Սիրային երգեր' },
                        { es: 'Villancicos', hy: 'Սուրբծննդյան երգեր' },
                        { es: 'Nanas', hy: 'Օրորոցայիններ' },
                        { es: 'Romances', hy: 'Պատմողական բանաստեղծություններ' },
                        { es: 'Coplas', hy: 'Ժողովրդական կարճ տներ' },
                        { es: 'Leyendas', hy: 'Ավանդազրույցներ' },
                        { es: 'Mitos', hy: 'Առասպելներ' },
                        { es: 'Cuentos populares', hy: 'Ժողովրդական հեքիաթներ' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200">
                          <div className="font-bold text-slate-900">{item.es}</div>
                          <div className="text-emerald-800">{item.hy}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2.2 LITERATURA CULTA */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center">
                      2.2
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Literatura culta — Հեղինակային, մշակված գրականություն
                    </h3>
                  </div>

                  <InteractiveBlock
                    badge="Սահմանում"
                    spanish="La literatura culta es la literatura elaborada por autores generalmente conocidos. Se caracteriza por un lenguaje cuidado y por una elaboración artística consciente."
                    armenian="Հեղինակային գրականությունը ստեղծվում է սովորաբար հայտնի հեղինակների կողմից։ Այն բնութագրվում է մտածված մշակված լեզվով և գեղարվեստական արտահայտչամիջոցներով։"
                    globalMode={globalMode}
                  />

                  {/* 4 Characteristics of Culta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InteractiveBlock
                      badge="1. Autor conocido"
                      spanish="Normalmente conocemos el nombre de la persona que escribió la obra."
                      armenian="Սովորաբար հայտնի է ստեղծագործությունը գրած հեղինակի անունը։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="2. Transmisión escrita"
                      spanish="Las obras se difunden principalmente mediante manuscritos, libros y publicaciones."
                      armenian="Ստեղծագործությունները հիմնականում տարածվում են ձեռագրերով, գրքերով և հրատարակություններով։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="3. Lenguaje elaborado"
                      spanish="El autor selecciona cuidadosamente las palabras, las expresiones y los recursos literarios."
                      armenian="Հեղինակը ուշադիր ընտրում է բառերը, արտահայտությունները և պատկերավորման միջոցները։"
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="4. Conservación del texto"
                      spanish="Generalmente, el texto se conserva tal como lo escribió su autor, aunque puede haber diferentes ediciones."
                      armenian="Ստեղծագործության բնագիրը սովորաբար պահպանվում է հեղինակի գրած ձևով, թեև կարող են գոյություն ունենալ տարբեր հրատարակություններ։"
                      globalMode={globalMode}
                    />
                  </div>

                  {/* Comparison Table Popular vs Culta */}
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                    <h4 className="text-base font-black text-slate-900">
                      Literatura popular vs. Literatura culta (Համեմատական աղյուսակ)
                    </h4>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-100 font-bold text-slate-700">
                          <tr>
                            <th className="p-3">Հարց / Pregunta</th>
                            <th className="p-3 bg-amber-50 text-amber-900">Popular — Ժողովրդական</th>
                            <th className="p-3 bg-indigo-50 text-indigo-900">Culta — Հեղինակային</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr>
                            <td className="p-3 font-semibold text-slate-800">¿Quién es el autor? Ո՞վ է հեղինակը։</td>
                            <td className="p-3 bg-amber-50/40">Suele ser anónimo (հաճախ անհայտ է)</td>
                            <td className="p-3 bg-indigo-50/40">Suele ser conocido (սովորաբար հայտնի է)</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-slate-800">¿Cómo se transmite? Ինչպե՞ս է փոխանցվում։</td>
                            <td className="p-3 bg-amber-50/40">Oralmente (բանավոր)</td>
                            <td className="p-3 bg-indigo-50/40">Por escrito (գրավոր)</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-slate-800">¿Puede cambiar? Կարո՞ղ է փոփոխվել։</td>
                            <td className="p-3 bg-amber-50/40">Sí, puede tener variantes (կարող է ունենալ տարբերակներ)</td>
                            <td className="p-3 bg-indigo-50/40">El texto suele ser estable (բնագիրը սովորաբար կայուն է)</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-slate-800">¿Qué lenguaje utiliza? Ի՞նչ լեզու է օգտագործվում։</td>
                            <td className="p-3 bg-amber-50/40">A menudo tradicional y sencillo (ավանդական և պարզ)</td>
                            <td className="p-3 bg-indigo-50/40">Cuidado y elaborado (մտածված և մշակված)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-xs text-blue-950">
                      <strong>Կարևոր տարբերություն (Diferencia importante): </strong>
                      Una obra popular también puede escribirse y conservarse en un libro. Lo importante es su origen y su tradición.
                      <div className="mt-1 text-slate-700">
                        Ժողովրդական ստեղծագործությունը նույնպես կարող է գրի առնվել և պահպանվել գրքում։ Կարևոր է նրա ծագումն ու ժողովրդական ավանդույթը։
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ---------------- SECTION 3: ROMANCE, LEYENDA, MITO Y CUENTO ---------------- */}
            {(activeTab === 'all' || activeTab === 'sec3') && (
              <section id="sec3" className="space-y-8 scroll-mt-24">
                <div className="border-b-2 border-amber-500 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Թեմա 3
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    3. Romance, leyenda, mito y cuento — Ռոմանս, ավանդազրույց, առասպել և պատմվածք
                  </h2>
                </div>

                {/* 3.1 ROMANCE */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 font-black text-sm flex items-center justify-center">
                      3.1
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Romance — Պատմողական բանաստեղծություն
                    </h3>
                  </div>

                  <InteractiveBlock
                    badge="Ռոմանսի սահմանում"
                    spanish="El romance es un poema narrativo formado por un número indefinido de versos octosílabos, con rima asonante en los versos pares y versos impares sueltos."
                    armenian="Ռոմանսը պատմողական բանաստեղծություն է, որը կազմված է անորոշ թվով ութվանկ տողերից։ Զույգ համարներով տողերն ունեն ասոնանսային հանգ, իսկ կենտ համարներով տողերը պարտադիր հանգ չունեն։"
                    globalMode={globalMode}
                  />

                  {/* Octosílabo explanation */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm">
                      ¿Qué significa octosílabo? — Ի՞նչ է նշանակում ութվանկ
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700">
                      Un verso octosílabo es un verso que tiene ocho sílabas métricas.
                    </p>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-amber-900">
                      Mira la noche callada.
                      <div className="text-slate-600 font-sans text-xs mt-1">
                        Mi-ra (2) + la (1) + no-che (2) + ca-lla-da (3) = <strong>8 sílabas</strong> (ութ վանկ)
                      </div>
                    </div>
                  </div>

                  {/* Rima asonante vs consonante */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        Rima asonante — Ասոնանսային հանգ
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800">
                        Coinciden las <strong>vocales</strong> a partir de la última vocal acentuada.
                      </p>
                      <p className="text-xs text-emerald-900">
                        Վերջին շեշտված ձայնավորից սկսած համընկնում են միայն ձայնավորները։
                      </p>
                      <div className="font-mono text-xs text-amber-950 font-bold bg-white p-2 rounded-lg border border-amber-200">
                        ci<strong>e</strong>l<strong>o</strong> / vi<strong>e</strong>nt<strong>o</strong> (e - o)
                      </div>
                    </div>

                    <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                        Rima consonante — Լիակատար հանգ
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800">
                        Coinciden las <strong>vocales y las consonantes</strong> a partir de la última vocal acentuada.
                      </p>
                      <p className="text-xs text-emerald-900">
                        Վերջին շեշտված ձայնավորից սկսած համընկնում են և՛ ձայնավորները, և՛ բաղաձայնները։
                      </p>
                      <div className="font-mono text-xs text-blue-950 font-bold bg-white p-2 rounded-lg border border-blue-200">
                        can<strong>ción</strong> / ilu<strong>sión</strong> (-ión)
                      </div>
                    </div>
                  </div>

                  {/* Full Romance Example */}
                  <InteractiveBlock
                    badge="Ռոմանսի ամբողջական օրինակ"
                    title="Ejemplo de romance"
                    spanish={`Una tarde por el bosque,\ncorre libre un caballero;\nuna niña lo contempla\ny le cuenta sus secretos.`}
                    armenian={`Մի օր՝ երեկոյան, անտառում ազատ վազում է մի ասպետ։\nՄի աղջիկ նայում է նրան և պատմում իր գաղտնիքները։`}
                    whyEs="Porque cuenta una pequeña historia en versos octosílabos y presenta rima asonante en los versos pares (caballero / secretos -> e-o)."
                    whyHy="Որովհետև պատմում է փոքրիկ պատմություն ութվանկ տողերով, իսկ զույգ տողերն ունեն ասոնանսային հանգ (caballero / secretos -> e-o)։"
                    globalMode={globalMode}
                  />
                </div>

                {/* 3.2 LEYENDA */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 font-black text-sm flex items-center justify-center">
                      3.2
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Leyenda — Ավանդազրույց
                    </h3>
                  </div>

                  <InteractiveBlock
                    badge="Սահմանում"
                    spanish="La leyenda es un relato tradicional que parte de hechos, personajes o lugares vinculados con la realidad e incorpora elementos fantásticos."
                    armenian="Ավանդազրույցը ավանդական պատմություն է, որը կապված է իրական աշխարհի վայրերի, մարդկանց կամ իրադարձությունների հետ, սակայն ներառում է նաև երևակայական տարրեր։"
                    globalMode={globalMode}
                  />

                  <InteractiveBlock
                    badge="Օրինակ"
                    spanish="Dicen que en un antiguo castillo de Toledo aparece cada noche el fantasma de una princesa."
                    armenian="Ասում են, որ Տոլեդոյի մի հին ամրոցում ամեն գիշեր հայտնվում է արքայադստեր ուրվականը։"
                    whyEs="Porque el relato está relacionado con un lugar real (Toledo) y contiene un elemento sobrenatural (el fantasma)."
                    whyHy="Որովհետև պատմությունը կապված է իրական վայրի հետ (Տոլեդո) և պարունակում է գերբնական տարր՝ ուրվական։"
                    globalMode={globalMode}
                  />

                  <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-slate-600">
                    <span className="font-bold text-slate-800">Հիմնական բառեր՝</span>
                    <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Lugar real (իրական վայր)</span>
                    <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Tradición (ավանդույթ)</span>
                    <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Elemento fantástico (երևակայական տարր)</span>
                  </div>
                </div>

                {/* 3.3 MITO */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
                      3.3
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Mito — Առասպել
                    </h3>
                  </div>

                  <InteractiveBlock
                    badge="Սահմանում"
                    spanish="El mito es un relato tradicional de carácter maravilloso, protagonizado frecuentemente por dioses, héroes o seres sobrenaturales, que puede explicar el origen del mundo o de los fenómenos naturales."
                    armenian="Առասպելը ավանդական, հրաշապատում պատմություն է, որտեղ հաճախ հանդես են գալիս աստվածներ, հերոսներ կամ գերբնական էակներ։ Առասպելը կարող է բացատրել աշխարհի կամ բնական երևույթների ծագումը։"
                    globalMode={globalMode}
                  />

                  <InteractiveBlock
                    badge="Օրինակ"
                    spanish="En tiempos antiguos, un dios creó el viento para mover las nubes."
                    armenian="Հին ժամանակներում մի աստված ստեղծեց քամին, որպեսզի շարժի ամպերը։"
                    whyEs="Porque aparece un dios y se intenta explicar el origen de un fenómeno natural (el viento)."
                    whyHy="Որովհետև պատմության մեջ կա աստված, և բացատրվում է բնական երևույթի (քամու) ծագումը։"
                    globalMode={globalMode}
                  />
                </div>

                {/* 3.4 CUENTO */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 font-black text-sm flex items-center justify-center">
                      3.4
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Cuento — Պատմվածք / Հեքիաթ
                    </h3>
                  </div>

                  <InteractiveBlock
                    badge="Սահմանում"
                    spanish="El cuento es una narración breve, normalmente escrita en prosa, con pocos personajes y un argumento relativamente sencillo."
                    armenian="Պատմվածքը կարճ պատմողական ստեղծագործություն է, որը սովորաբար գրվում է արձակով, ունի քիչ կերպարներ և համեմատաբար պարզ սյուժե։"
                    globalMode={globalMode}
                  />

                  <InteractiveBlock
                    badge="Օրինակ"
                    spanish="Un niño encontró un perro perdido. Lo llevó a casa, le dio comida y al día siguiente encontró a su dueño."
                    armenian="Մի տղա կորած շուն գտավ։ Նրան տարավ տուն, կերակրեց և հաջորդ օրը գտավ նրա տիրոջը։"
                    whyEs="Porque es una historia breve con pocos personajes y un argumento sencillo."
                    whyHy="Որովհետև սա կարճ պատմություն է՝ քիչ կերպարներով և պարզ սյուժեով։"
                    globalMode={globalMode}
                  />
                </div>

                {/* Comparison 3.1 - 3.4 */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-sm">
                  <h4 className="text-base font-black text-slate-900">
                    Comparación importante — Ինչպես տարբերել այս 4 տեսակները քննությանը
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-100 font-bold text-slate-700">
                        <tr>
                          <th className="p-3">Տեսակ (Tipo)</th>
                          <th className="p-3">Español — Cómo reconocerlo</th>
                          <th className="p-3">Հայերեն — Ինչպես ճանաչել</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3 font-bold text-rose-900">Romance</td>
                          <td className="p-3">Poema narrativo con versos octosílabos y rima asonante</td>
                          <td className="p-3 font-medium text-emerald-900">Պատմողական բանաստեղծություն՝ ութվանկ տողերով</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-orange-900">Leyenda</td>
                          <td className="p-3">Tradición relacionada con lugares o hechos reales y elementos fantásticos</td>
                          <td className="p-3 font-medium text-emerald-900">Իրական աշխարհի հետ կապված ավանդական պատմություն՝ երևակայական տարրերով</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-teal-900">Mito</td>
                          <td className="p-3">Dioses, héroes, seres sobrenaturales y explicación del origen del mundo</td>
                          <td className="p-3 font-medium text-emerald-900">Աստվածներ, հերոսներ, գերբնական էակներ և աշխարհի ծագման բացատրություն</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-sky-900">Cuento</td>
                          <td className="p-3">Narración breve con un argumento sencillo y pocos personajes</td>
                          <td className="p-3 font-medium text-emerald-900">Կարճ պատմություն՝ քիչ կերպարներով և պարզ սյուժեով</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* ---------------- SECTION 4: EL LENGUAJE LITERARIO ---------------- */}
            {(activeTab === 'all' || activeTab === 'sec4') && (
              <section id="sec4" className="space-y-8 scroll-mt-24">
                <div className="border-b-2 border-amber-500 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Թեմա 4
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    4. El lenguaje literario — Գրական լեզու
                  </h2>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-sm">
                  <InteractiveBlock
                    badge="Գրական լեզվի սահմանում"
                    spanish="El lenguaje literario es el uso artístico y expresivo de las palabras para transmitir ideas, sentimientos y emociones, prestando especial atención a la forma del mensaje."
                    armenian="Գրական լեզուն բառերի գեղարվեստական և արտահայտիչ օգտագործումն է՝ մտքեր, զգացմունքներ և հույզեր փոխանցելու համար։ Այստեղ մեծ նշանակություն ունի ոչ միայն բովանդակությունը, այլև արտահայտման ձևը։"
                    globalMode={globalMode}
                  />

                  {/* Lenguaje cotidiano vs literario */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      Lenguaje cotidiano vs. Lenguaje literario (Առօրյա և գրական լեզուների տարբերությունը)
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">Առօրյա լեզու (Cotidiano)</span>
                        <div className="font-bold text-slate-900">Estoy triste.</div>
                        <div className="text-xs text-slate-600">Ես տխուր եմ։</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                        <span className="text-[11px] font-bold text-amber-800 uppercase">Գրական լեզու (Literario)</span>
                        <div className="font-bold text-amber-950">Mi corazón está lleno de sombras.</div>
                        <div className="text-xs text-amber-900 font-medium">Իմ սիրտը լի է ստվերներով։</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">Առօրյա լեզու (Cotidiano)</span>
                        <div className="font-bold text-slate-900">Hace mucho calor.</div>
                        <div className="text-xs text-slate-600">Շատ շոգ է։</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                        <span className="text-[11px] font-bold text-amber-800 uppercase">Գրական լեզու (Literario)</span>
                        <div className="font-bold text-amber-950">El sol abraza la tierra con fuego.</div>
                        <div className="text-xs text-amber-900 font-medium">Արևը կրակով գրկում է երկիրը։</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">Առօրյա լեզու (Cotidiano)</span>
                        <div className="font-bold text-slate-900">Tiene ojos bonitos.</div>
                        <div className="text-xs text-slate-600">Նա գեղեցիկ աչքեր ունի։</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                        <span className="text-[11px] font-bold text-amber-800 uppercase">Գրական լեզու (Literario)</span>
                        <div className="font-bold text-amber-950">Sus ojos son dos estrellas.</div>
                        <div className="text-xs text-amber-900 font-medium">Նրա աչքերը երկու աստղեր են։</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">Առօրյա լեզու (Cotidiano)</span>
                        <div className="font-bold text-slate-900">Corre muy rápido.</div>
                        <div className="text-xs text-slate-600">Նա շատ արագ է վազում։</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                        <span className="text-[11px] font-bold text-amber-800 uppercase">Գրական լեզու (Literario)</span>
                        <div className="font-bold text-amber-950">Corre como el viento.</div>
                        <div className="text-xs text-amber-900 font-medium">Նա վազում է քամու պես։</div>
                      </div>
                    </div>
                  </div>

                  {/* 4.1 Verso & 4.2 Prosa */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <InteractiveBlock
                      badge="4.1 Verso — Չափածո"
                      spanish="El verso es cada una de las líneas de un poema. Puede presentar ritmo, medida y rima."
                      armenian="Չափածոյի յուրաքանչյուր բանաստեղծական տող կոչվում է verso։ Այն կարող է ունենալ ռիթմ, վանկաչափ և հանգ։"
                      whyEs={`Ejemplo:\nLa luna mira la tierra,\nel viento canta en el mar,\nlas estrellas se despiertan,\ny la noche empieza a soñar.`}
                      whyHy={`Օրինակ՝\nԼուսինը նայում է երկրին,\nքամին երգում է ծովում,\nաստղերն արթնանում են,\nև գիշերը սկսում է երազել։`}
                      globalMode={globalMode}
                    />

                    <InteractiveBlock
                      badge="4.2 Prosa — Արձակ"
                      spanish="La prosa es una forma de expresión que se organiza normalmente en oraciones y párrafos, sin la división métrica propia del verso."
                      armenian="Արձակը խոսքի ձև է, որը սովորաբար կառուցվում է նախադասություններով և պարբերություններով՝ առանց բանաստեղծական տողերի չափական կառուցվածքի։"
                      whyEs="Ejemplo: Laura salió de casa temprano. Caminó por el parque y encontró a su amiga. Juntas fueron a la biblioteca."
                      whyHy="Օրինակ՝ Լաուրան վաղ դուրս եկավ տնից։ Քայլեց այգով և հանդիպեց ընկերուհուն։ Նրանք միասին գնացին գրադարան։"
                      globalMode={globalMode}
                    />
                  </div>

                  <div className="bg-slate-100 p-4 rounded-2xl text-xs text-slate-800">
                    <strong>Տարբերություն (Diferencia): </strong>
                    Չափածոն և արձակը (Verso y prosa) գրելու ձևեր են (formas de escribir), իսկ քնարերգությունը, պատմողական գրականությունը և թատրոնը՝ գրական սեռեր (géneros literarios)։
                  </div>
                </div>
              </section>
            )}

            {/* ---------------- SECTION 5: LAS FIGURAS LITERARIAS ---------------- */}
            {(activeTab === 'all' || activeTab === 'sec5') && (
              <section id="sec5" className="space-y-8 scroll-mt-24">
                <div className="border-b-2 border-amber-500 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Թեմա 5
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    5. Las figuras literarias — Գրական արտահայտչամիջոցներ
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Լեզվական հնարքներ՝ ըստ 3 մակարդակների․ Fónico, Morfosintáctico և Semántico։
                  </p>
                </div>

                {/* Filtered figures list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFigures.map((fig, idx) => (
                    <InteractiveBlock
                      key={fig.nameEs}
                      badge={`${fig.level} · #${idx + 1}`}
                      title={fig.nameEs}
                      spanish={`${fig.nameEs} — ${fig.formula}\n\n${fig.defEs}\n\nEjemplo:\n${fig.exampleEs}`}
                      armenian={`${fig.nameHy}\n\n${fig.defHy}\n\nՕրինակ՝\n${fig.exampleHy}`}
                      whyEs={fig.whyEs}
                      whyHy={fig.whyHy}
                      globalMode={globalMode}
                      isBookmarked={bookmarks.has(fig.nameEs)}
                      onToggleBookmark={() => toggleBookmark(fig.nameEs)}
                    />
                  ))}
                </div>

                {/* In-depth: Metaphor 3 Forms & Metaphor vs Comparison */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-sm">
                  <h3 className="text-xl font-black text-slate-900">
                    Փոխաբերության խորացված ուսուցում (Metáfora: 3 formas & vs. Comparación)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1">
                      <span className="font-black text-amber-900 uppercase">1. Ձև՝ A es B</span>
                      <div className="font-bold text-slate-900 text-sm">Tus dientes son perlas.</div>
                      <div className="text-emerald-900 font-medium">Քո ատամները մարգարիտներ են։</div>
                      <div className="text-slate-600 pt-2 border-t border-amber-200">
                        A = dientes (իրական), B = perlas (պատկերավոր)
                      </div>
                    </div>

                    <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1">
                      <span className="font-black text-amber-900 uppercase">2. Ձև՝ B de A</span>
                      <div className="font-bold text-slate-900 text-sm">Las perlas de tus dientes.</div>
                      <div className="text-emerald-900 font-medium">Քո ատամների մարգարիտները։</div>
                      <div className="text-slate-600 pt-2 border-t border-amber-200">
                        B = perlas, A = dientes
                      </div>
                    </div>

                    <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1">
                      <span className="font-black text-amber-900 uppercase">3. Ձև՝ B</span>
                      <div className="font-bold text-slate-900 text-sm">Al sonreír, mostró sus perlas.</div>
                      <div className="text-emerald-900 font-medium">Ժպտալիս նա ցույց տվեց իր մարգարիտները։</div>
                      <div className="text-slate-600 pt-2 border-t border-amber-200">
                        Նշվում է միայն պատկերավոր տարրը (perlas = dientes)
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm">
                      Metáfora vs. Comparación — Փոխաբերություն և համեմատություն
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="font-bold text-amber-800">Metáfora:</span> Tus ojos son estrellas. (Քո աչքերը աստղեր են)
                        <div className="text-slate-600 text-xs mt-1">Ուղղակի նույնացում</div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="font-bold text-blue-800">Comparación:</span> Tus ojos brillan como estrellas. (Քո աչքերը փայլում են աստղերի պես)
                        <div className="text-slate-600 text-xs mt-1">Բացահայտ նմանություն «como» բառով</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ---------------- SECTION 6: RESUMEN DE TODAS LAS FIGURAS ---------------- */}
            {(activeTab === 'all' || activeTab === 'sec6') && (
              <section id="sec6" className="space-y-6 scroll-mt-24">
                <div className="border-b-2 border-amber-500 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Թեմա 6
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    6. Resumen de todas las figuras — Բոլոր արտահայտչամիջոցների ամփոփում
                  </h2>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-100 font-bold text-slate-800 uppercase tracking-wider text-xs">
                        <tr>
                          <th className="p-3.5">Figura (Արտահայտչամիջոց)</th>
                          <th className="p-3.5">Español — Cómo reconocerla</th>
                          <th className="p-3.5">Հայերեն — Ինչպես ճանաչել</th>
                          <th className="p-3.5 text-center">Ձայն</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {ALL_FIGURES.map((fig) => (
                          <tr key={fig.nameEs} className="hover:bg-amber-50/50 transition-colors">
                            <td className="p-3.5 font-bold text-slate-900">
                              <div>{fig.nameEs}</div>
                              <div className="text-xs font-normal text-slate-500">{fig.level}</div>
                            </td>
                            <td className="p-3.5 font-semibold text-amber-900">
                              {fig.formula}
                            </td>
                            <td className="p-3.5 font-medium text-emerald-900">
                              {fig.nameHy}
                            </td>
                            <td className="p-3.5 text-center">
                              <button
                                onClick={() => speakSpanish(fig.nameEs + '. ' + fig.exampleEs)}
                                className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg"
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
                </div>
              </section>
            )}

            {/* ---------------- SECTION 8: CÓMO RECONOCER LOS TEXTOS EN EL EXAMEN ---------------- */}
            {(activeTab === 'all' || activeTab === 'sec8') && (
              <section id="sec8" className="space-y-8 scroll-mt-24">
                <div className="border-b-2 border-amber-500 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Թեմա 8
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    8. Cómo reconocer los textos en el examen — Ինչպես ճանաչել տեքստերը քննության ժամանակ
                  </h2>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-sm">
                  {/* 6 Essential Questions Table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-100 font-bold text-slate-700">
                        <tr>
                          <th className="p-3">Pregunta en español</th>
                          <th className="p-3">Հայերեն հարց</th>
                          <th className="p-3">Ի՞նչ պետք է փնտրել քննությանը</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {EXAM_RECOGNITION_GUIDE.map((g, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-900">{g.questionEs}</td>
                            <td className="p-3 font-medium text-emerald-900">{g.questionHy}</td>
                            <td className="p-3 text-slate-700 bg-amber-50/30">{g.toLookFor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Final Analysis Example */}
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-black text-slate-900">
                        Ejemplo final — Վերջնական քննական վերլուծության օրինակ
                      </h4>
                      <button
                        onClick={() => speakSpanish(FINAL_EXAMPLE.poem)}
                        className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-amber-700" />
                        Լսել բանաստեղծությունը
                      </button>
                    </div>

                    <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 font-serif text-base sm:text-lg text-slate-900 leading-relaxed italic text-center">
                      «Mi corazón es un mar.<br />
                      Mi corazón quiere soñar.<br />
                      Mi corazón busca la luz.»
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {FINAL_EXAMPLE.questions.map((q) => (
                        <InteractiveBlock
                          key={q.num}
                          badge={`Հարց ${q.num}`}
                          spanish={`${q.qEs}\n\nRespuesta:\n${q.aEs}`}
                          armenian={`${q.qHy}\n\nՊատասխան՝\n${q.aHy}`}
                          globalMode={globalMode}
                        />
                      ))}
                    </div>

                    {/* Final Conclusion */}
                    <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-xs sm:text-sm space-y-2">
                      <div className="font-black text-emerald-950 text-sm">
                        Conclusión para el examen — Եզրակացություն քննության համար
                      </div>
                      <p className="text-slate-800 font-medium">
                        <strong className="text-slate-900">ES: </strong>
                        {FINAL_EXAMPLE.conclusionEs}
                      </p>
                      <p className="text-emerald-900">
                        <strong className="text-emerald-950">Հայերեն՝ </strong>
                        {FINAL_EXAMPLE.conclusionHy}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* In the 'all' tab, also show the complete Quiz Section */}
            {activeTab === 'all' && (
              <section id="sec7" className="pt-4 scroll-mt-24">
                <QuizSection />
              </section>
            )}

            {/* Continuation Guide (6-page exam preparation) */}
            {activeTab === 'all' && (
              <section id="guide6-continuation" className="pt-8 border-t-4 border-dashed border-indigo-200 scroll-mt-24">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-0.5 bg-indigo-200 flex-1"></div>
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-200">
                    Շարունակություն · Քննական ամփոփ ուղեցույց (6 էջ)
                  </span>
                  <div className="h-0.5 bg-indigo-200 flex-1"></div>
                </div>
                <ExamGuideSection
                  globalMode={globalMode}
                  bookmarks={bookmarks}
                  onToggleBookmark={toggleBookmark}
                />
              </section>
            )}
          </div>
        )}
      </main>

      {/* Floating Action Button: Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl hover:bg-amber-600 flex items-center justify-center transition-all z-50 hover:scale-110 border border-white/20"
        title="Վերադառնալ վերև"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
