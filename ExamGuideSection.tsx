import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  HelpCircle,
  Layers,
  ArrowRight,
  Bookmark,
  CheckCircle2
} from 'lucide-react';
import {
  EXAM_GUIDE_HEADER,
  ELEMENTOS_TEATRO,
  DIFERENCIAS_IMPORTANTES,
  EXAM_25_QUESTIONS,
  FINAL_SUMMARY_GENRES,
  FINAL_SUMMARY_FIGURES,
  EXAM_FINAL_ADVICE
} from './literatureData';
import { InteractiveBlock } from './InteractiveBlock';
import { speakSpanish } from './SpeechUtil';

interface ExamGuideSectionProps {
  globalMode?: 'click' | 'all' | 'spanish_only';
  bookmarks: Set<string>;
  onToggleBookmark: (id: string) => void;
}

export const ExamGuideSection: React.FC<ExamGuideSectionProps> = ({
  globalMode = 'click',
  bookmarks,
  onToggleBookmark
}) => {
  const [activeSubPart, setActiveSubPart] = useState<string>('all');
  const [revealedQuestions, setRevealedQuestions] = useState<Set<number>>(new Set());

  const toggleQuestionReveal = (num: number) => {
    setRevealedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const revealAllQuestions = () => {
    setRevealedQuestions(new Set(EXAM_25_QUESTIONS.map((q) => q.num)));
  };

  const hideAllQuestions = () => {
    setRevealedQuestions(new Set());
  };

  return (
    <div className="space-y-12">
      {/* Hero Header for Continuation Guide */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {EXAM_GUIDE_HEADER.badge}
            </span>
            <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              7.º Curso
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            {EXAM_GUIDE_HEADER.title}
          </h2>

          <p className="text-base sm:text-lg text-indigo-100 font-semibold">
            {EXAM_GUIDE_HEADER.subtitle}
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
            {EXAM_GUIDE_HEADER.intro}
          </p>

          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs sm:text-sm font-bold text-amber-200">
            <span className="bg-amber-400/20 px-3 py-1 rounded-xl border border-amber-400/30">
              👆 Յուրաքանչյուր իսպաներեն հարցի կամ սահմանման վրա սեղմելով՝ բացվում է հայերեն թարգմանությունն ու պատասխանը
            </span>
          </div>
        </div>
      </div>

      {/* Sub-navigation for the 7 parts */}
      <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none text-xs sm:text-sm font-bold">
        {[
          { id: 'all', label: '📑 Բոլոր 7 մասերը (Todo)' },
          { id: 'p1', label: 'Parte 1. Géneros' },
          { id: 'p2', label: 'Parte 2. Lenguaje' },
          { id: 'p3', label: 'Parte 3. Popular/Culta' },
          { id: 'p4', label: 'Parte 4. Romance/Mito' },
          { id: 'p5', label: 'Parte 5. Figuras (13-25)' },
          { id: 'p6', label: 'Parte 6. Diferencias' },
          { id: 'p7', label: 'Parte 7. Resumen Final' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSubPart(item.id);
              if (item.id !== 'all') {
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`whitespace-nowrap px-3.5 py-2 rounded-xl transition-all ${
              activeSubPart === item.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* PARTE 1. LOS GÉNEROS LITERARIOS — ԳՐԱԿԱՆ ՍԵՌԵՐԸ */}
      {/* ========================================================= */}
      {(activeSubPart === 'all' || activeSubPart === 'p1') && (
        <section id="p1" className="space-y-6 scroll-mt-24">
          <div className="border-b-2 border-indigo-500 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
              Parte 1
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              PARTE 1. LOS GÉNEROS LITERARIOS — ԳՐԱԿԱՆ ՍԵՌԵՐԸ
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* 1. Lírica */}
            <InteractiveBlock
              badge="1. Lírica — Քնարերգություն"
              spanish="La lírica es un género literario que expresa los sentimientos, las emociones y los pensamientos del autor. Normalmente se escribe en verso y tiene ritmo y musicalidad."
              armenian="Քնարերգությունը գրական սեռ է, որն արտահայտում է հեղինակի զգացմունքները, հույզերն ու մտքերը։ Սովորաբար գրվում է չափածո, ունի ռիթմ և երաժշտականություն։"
              explanationEs="Ejemplo: «Mi corazón está triste porque te echo de menos»."
              explanationHy="Օրինակ՝ «Իմ սիրտը տխուր է, որովհետև կարոտում եմ քեզ»։"
              whyEs="¿Por qué es lírica? Porque expresa un sentimiento: la tristeza."
              whyHy="Ինչո՞ւ է քնարերգություն։ Որովհետև արտահայտում է զգացմունք՝ տխրություն։"
              globalMode={globalMode}
              isBookmarked={bookmarks.has('guide-lirica')}
              onToggleBookmark={() => onToggleBookmark('guide-lirica')}
            />

            {/* 2. Narrativa */}
            <InteractiveBlock
              badge="2. Narrativa — Պատմողական գրականություն"
              spanish={`La narrativa es un género literario que cuenta una historia mediante un narrador. Los hechos pueden ser reales o imaginarios. El narrador puede hablar en primera o tercera persona.\n\nDos tipos de narrador:\n* Primera persona: «Yo fui al parque».\n* Tercera persona: «Ana fue al parque».`}
              armenian={`Պատմողական գրականությունը պատմում է որևէ պատմություն՝ պատմողի միջոցով։ Դեպքերը կարող են լինել իրական կամ երևակայական։ Պատմողը կարող է խոսել առաջին կամ երրորդ դեմքով։\n\nՊատմողի երկու տեսակ՝\n* Առաջին դեմք՝ «Ես գնացի այգի»։\n* Երրորդ դեմք՝ «Անան գնաց այգի»։`}
              explanationEs="Ejemplo: «María salió de casa y encontró un perro perdido»."
              explanationHy="Օրինակ՝ «Մարիան դուրս եկավ տնից և գտավ կորած շուն»։"
              whyEs="¿Por qué es narrativa? Porque un narrador cuenta lo que sucede."
              whyHy="Ինչո՞ւ է պատմողական գրականություն։ Որովհետև պատմողը ներկայացնում է տեղի ունեցող դեպքերը։"
              globalMode={globalMode}
              isBookmarked={bookmarks.has('guide-narrativa')}
              onToggleBookmark={() => onToggleBookmark('guide-narrativa')}
            />

            {/* 3. Teatro */}
            <InteractiveBlock
              badge="3. Teatro — Թատերգություն"
              spanish={`El teatro presenta una historia mediante diálogos y acciones de los personajes. Está pensado para ser representado en un escenario ante un público.\n\nEjemplo:\nANA: ¿Dónde estás, Pedro?\nPEDRO: Estoy en casa.`}
              armenian={`Թատերգությունը պատմությունը ներկայացնում է կերպարների երկխոսությունների և գործողությունների միջոցով։ Նախատեսված է բեմում հանդիսատեսի առջև ներկայացնելու համար։\n\nՕրինակ՝\nԱՆԱ․ Որտե՞ղ ես, Պեդրո։\nՊԵԴՐՈ․ Ես տանն եմ։`}
              whyEs="¿Por qué es teatro? Porque los personajes hablan directamente mediante diálogos."
              whyHy="Ինչո՞ւ է թատերգություն։ Որովհետև կերպարներն անմիջապես խոսում են միմյանց հետ՝ երկխոսության միջոցով։"
              globalMode={globalMode}
              isBookmarked={bookmarks.has('guide-teatro')}
              onToggleBookmark={() => onToggleBookmark('guide-teatro')}
            />

            {/* Elementos del teatro table */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
              <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                Elementos del teatro — Թատրոնի տարրերը
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ELEMENTOS_TEATRO.map((el, i) => (
                  <div key={i} className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between">
                        <span>{el.es.split('—')[0].trim()}</span>
                        <button
                          onClick={() => speakSpanish(el.es.split('—')[0].trim())}
                          className="text-slate-400 hover:text-indigo-600 p-1"
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">{el.es.split('—')[1]?.trim()}</div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-indigo-200/60 text-xs sm:text-sm font-semibold text-emerald-900">
                      {el.hy}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preguntas de examen Parte 1 (1-4) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Preguntas de examen — Քննական հարցեր (1–4)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXAM_25_QUESTIONS.slice(0, 4).map((qa) => (
                  <InteractiveBlock
                    key={qa.num}
                    badge={`Հարց ${qa.num}`}
                    spanish={`${qa.qEs}\n\nRespuesta:\n${qa.aEs}`}
                    armenian={`${qa.qHy}\n\nՊատասխան՝\n${qa.aHy}`}
                    globalMode={globalMode}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* PARTE 2. EL LENGUAJE LITERARIO — ԳԵՂԱՐՎԵՍՏԱԿԱՆ ԼԵԶՈՒՆ */}
      {/* ========================================================= */}
      {(activeSubPart === 'all' || activeSubPart === 'p2') && (
        <section id="p2" className="space-y-6 scroll-mt-24">
          <div className="border-b-2 border-indigo-500 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
              Parte 2
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              PARTE 2. EL LENGUAJE LITERARIO — ԳԵՂԱՐՎԵՍՏԱԿԱՆ ԼԵԶՈՒՆ
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* 4. Lenguaje literario */}
            <InteractiveBlock
              badge="4. Lenguaje literario — Գեղարվեստական լեզու"
              spanish="Es el uso artístico y expresivo de las palabras. Su objetivo es transmitir emociones, crear belleza y llamar la atención del lector."
              armenian="Բառերի գեղարվեստական և արտահայտիչ օգտագործումն է։ Նպատակն է փոխանցել զգացմունքներ, ստեղծել գեղեցկություն և գրավել ընթերցողի ուշադրությունը։"
              explanationEs="Ejemplo: Lenguaje cotidiano: «El sol brilla mucho» vs Lenguaje literario: «El sol es una moneda de oro»."
              explanationHy="Օրինակ՝ Սովորական լեզու՝ «Արևը շատ պայծառ է լուսավորում» ընդդեմ Գեղարվեստական լեզու՝ «Արևը ոսկե մետաղադրամ է»։"
              globalMode={globalMode}
            />

            {/* 5. Verso & 6. Prosa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InteractiveBlock
                badge="5. Verso — Չափածո"
                spanish={`Es una forma de escribir que se organiza en versos. Puede tener métrica, ritmo y rima.\n\nEjemplo:\n«La luna brilla en el mar,\nlas estrellas van a bailar».`}
                armenian={`Գրական ձև է, որը կազմված է բանաստեղծական տողերից։ Կարող է ունենալ չափ, ռիթմ և հանգ։\n\nՕրինակ՝\n«Լուսինը փայլում է ծովում,\nաստղերը պատրաստվում են պարել»։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="6. Prosa — Արձակ"
                spanish={`Es una forma de escribir con oraciones y párrafos, sin seguir normalmente una métrica fija.\n\nEjemplo:\n«Una niña caminaba por el bosque cuando encontró una pequeña casa».`}
                armenian={`Գրելու ձև է՝ սովորական նախադասություններով և պարբերություններով, առանց պարտադիր բանաստեղծական չափի։\n\nՕրինակ՝\n«Մի աղջիկ քայլում էր անտառով, երբ գտավ փոքրիկ տուն»։`}
                globalMode={globalMode}
              />
            </div>

            {/* Preguntas 5-6 */}
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Preguntas de examen — Քննական հարցեր (5–6)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXAM_25_QUESTIONS.slice(4, 6).map((qa) => (
                  <InteractiveBlock
                    key={qa.num}
                    badge={`Հարց ${qa.num}`}
                    spanish={`${qa.qEs}\n\nRespuesta:\n${qa.aEs}`}
                    armenian={`${qa.qHy}\n\nՊատասխան՝\n${qa.aHy}`}
                    globalMode={globalMode}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* PARTE 3. LITERATURA POPULAR Y CULTA */}
      {/* ========================================================= */}
      {(activeSubPart === 'all' || activeSubPart === 'p3') && (
        <section id="p3" className="space-y-6 scroll-mt-24">
          <div className="border-b-2 border-indigo-500 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
              Parte 3
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              PARTE 3. LITERATURA POPULAR Y CULTA — ԺՈՂՈՎՐԴԱԿԱՆ ԵՎ ՀԵՂԻՆԱԿԱՅԻՆ ԳՐԱԿԱՆՈՒԹՅՈՒՆ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 7. Literatura popular */}
            <InteractiveBlock
              badge="7. Literatura popular — Ժողովրդական"
              spanish={`Es la literatura tradicional del pueblo. Normalmente es anónima, se transmite oralmente de generación en generación y puede sufrir modificaciones.\n\nCaracterísticas:\n* Autor anónimo\n* Transmisión oral\n* Obras generalmente breves\n* Puede cambiar con el tiempo\n* Lenguaje frecuentemente sencillo\n\nEjemplos: Romances populares, canciones tradicionales, nanas, villancicos.`}
              armenian={`Ժողովրդի ավանդական գրականությունն է։ Սովորաբար հեղինակը անհայտ է, փոխանցվում է բանավոր՝ սերնդեսերունդ, և ժամանակի ընթացքում կարող է փոփոխվել։\n\nՀատկանիշներ՝\n* Անհայտ հեղինակ\n* Բանավոր փոխանցում\n* Սովորաբար կարճ ստեղծագործություններ\n* Ժամանակի ընթացքում կարող է փոփոխվել\n* Հաճախ պարզ լեզու\n\nՕրինակներ՝ Ժողովրդական ռոմանսներ, ավանդական երգեր, օրորոցայիններ, Սուրբծննդյան երգեր։`}
              globalMode={globalMode}
            />

            {/* 8. Literatura culta */}
            <InteractiveBlock
              badge="8. Literatura culta — Հեղինակային"
              spanish={`Es la literatura creada por un autor conocido, normalmente por escrito. Sus obras tienen una elaboración artística y, por lo general, conservan un texto más estable.\n\nCaracterísticas:\n* Autor conocido\n* Transmisión escrita\n* Lenguaje elaborado\n* Texto más estable\n* Uso de recursos literarios`}
              armenian={`Հայտնի հեղինակի ստեղծած գրականությունն է, որը սովորաբար գրավոր է։ Ստեղծագործություններն ունեն գեղարվեստական մշակված լեզու, և դրանց տեքստը հիմնականում պահպանվում է ավելի կայուն ձևով։\n\nՀատկանիշներ՝\n* Հայտնի հեղինակ\n* Գրավոր փոխանցում\n* Մշակված լեզու\n* Ավելի կայուն տեքստ\n* Գեղարվեստական միջոցների օգտագործում`}
              globalMode={globalMode}
            />
          </div>

          {/* Preguntas 7-9 */}
          <div className="space-y-3 pt-2">
            <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              Preguntas de examen — Քննական հարցեր (7–9)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {EXAM_25_QUESTIONS.slice(6, 9).map((qa) => (
                <InteractiveBlock
                  key={qa.num}
                  badge={`Հարց ${qa.num}`}
                  spanish={`${qa.qEs}\n\nRespuesta:\n${qa.aEs}`}
                  armenian={`${qa.qHy}\n\nՊատասխան՝\n${qa.aHy}`}
                  globalMode={globalMode}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* PARTE 4. ROMANCE, LEYENDA, MITO Y CUENTO */}
      {/* ========================================================= */}
      {(activeSubPart === 'all' || activeSubPart === 'p4') && (
        <section id="p4" className="space-y-6 scroll-mt-24">
          <div className="border-b-2 border-indigo-500 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
              Parte 4
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              PARTE 4. ROMANCE, LEYENDA, MITO Y CUENTO
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* 9. Romance & Structure */}
            <InteractiveBlock
              badge="9. Romance — Ռոմանս"
              spanish={`Es un poema narrativo formado por un número indefinido de versos normalmente octosílabos. Los versos pares tienen rima asonante y los impares quedan libres.`}
              armenian={`Ռոմանսը պատմողական բանաստեղծություն է, որն ունի անորոշ թվով, սովորաբար ութվանկանի տողեր։ Զույգ տողերն ունեն ձայնավորային հանգ, իսկ կենտ տողերը չեն հանգավորվում։`}
              explanationEs="Rima asonante: coinciden las vocales desde la última vocal acentuada. Ejemplo: casa / rama (a-a)."
              explanationHy="Ձայնավորային հանգ (Rima asonante)՝ շեշտված վերջին ձայնավորից սկսած համընկնում են ձայնավորները։ Օրինակ՝ casa / rama (a-a)։"
              globalMode={globalMode}
            />

            {/* Estructura del Romance Visual Diagram */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-3xl p-5 sm:p-6 space-y-3">
              <h4 className="font-black text-slate-900 text-base sm:text-lg">
                Estructura del Romance — Ռոմանսի կառուցվածքային սխեմա (8− / 8a)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                <div className="bg-white p-3 rounded-2xl border border-amber-200">
                  <div className="text-2xl font-black text-slate-700">8−</div>
                  <div className="text-xs font-sans text-slate-500 mt-1">1º verso (ազատ տող)</div>
                </div>
                <div className="bg-amber-100 p-3 rounded-2xl border border-amber-400 ring-2 ring-amber-400/30">
                  <div className="text-2xl font-black text-amber-900">8a</div>
                  <div className="text-xs font-sans text-amber-800 font-bold mt-1">2º verso (ասոնանս հանգ)</div>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-amber-200">
                  <div className="text-2xl font-black text-slate-700">8−</div>
                  <div className="text-xs font-sans text-slate-500 mt-1">3º verso (ազատ տող)</div>
                </div>
                <div className="bg-amber-100 p-3 rounded-2xl border border-amber-400 ring-2 ring-amber-400/30">
                  <div className="text-2xl font-black text-amber-900">8a</div>
                  <div className="text-xs font-sans text-amber-800 font-bold mt-1">4º verso (ասոնանս հանգ)</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-sans pt-1">
                <strong>8</strong> = ocho sílabas métricas (ութ չափական վանկ) · <strong>a</strong> = rima asonante (ձայնավորային հանգ) · <strong>−</strong> = verso sin rima (անհանգ տող)։
              </p>
            </div>

            {/* 10, 11, 12: Leyenda, Mito, Cuento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InteractiveBlock
                badge="10. Leyenda — Ավանդազրույց"
                spanish={`Es un relato tradicional que mezcla elementos reales y fantásticos. Suele relacionarse con lugares, personajes o hechos conocidos.\n\nEjemplo: Una leyenda sobre un castillo antiguo donde aparece un fantasma.`}
                armenian={`Ավանդական պատմություն է, որը միավորում է իրական և երևակայական տարրերը։ Սովորաբար կապված է հայտնի վայրերի, մարդկանց կամ իրադարձությունների հետ։\n\nՕրինակ՝ Ավանդազրույց հին ամրոցի մասին, որտեղ ուրվական է հայտնվում։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="11. Mito — Առասպել"
                spanish={`Es un relato tradicional protagonizado por dioses, héroes o seres sobrenaturales. Explica el origen del mundo o de algunos fenómenos naturales.\n\nEjemplo: Un relato que explica el origen del trueno mediante un dios.`}
                armenian={`Ավանդական պատմություն է աստվածների, հերոսների կամ գերբնական էակների մասին։ Բացատրում է աշխարհի կամ բնական երևույթների ծագումը։\n\nՕրինակ՝ Պատմություն, որը կայծակի կամ ամպրոպի ծագումը բացատրում է աստծո գործողություններով։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="12. Cuento — Պատմվածք"
                spanish={`Es una narración breve, normalmente con pocos personajes y un argumento sencillo.\n\nEjemplo: Un niño encuentra una llave mágica y descubre una puerta secreta.`}
                armenian={`Կարճ պատմողական ստեղծագործություն է, որը սովորաբար ունի քիչ կերպարներ և պարզ սյուժե։\n\nՕրինակ՝ Մի տղա գտնում է կախարդական բանալի և բացահայտում գաղտնի դուռ։`}
                globalMode={globalMode}
              />
            </div>

            {/* Preguntas 10-14 */}
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Preguntas de examen — Քննական հարցեր (10–14)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {EXAM_25_QUESTIONS.slice(9, 14).map((qa) => (
                  <InteractiveBlock
                    key={qa.num}
                    badge={`Հարց ${qa.num}`}
                    spanish={`${qa.qEs}\n\nRespuesta:\n${qa.aEs}`}
                    armenian={`${qa.qHy}\n\nՊատասխան՝\n${qa.aHy}`}
                    globalMode={globalMode}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* PARTE 5. LAS FIGURAS LITERARIAS — ԳԵՂԱՐՎԵՍՏԱԿԱՆ ԱՐՏԱՀԱՅՏՉԱՄԻՋՈՑՆԵՐ */}
      {/* ========================================================= */}
      {(activeSubPart === 'all' || activeSubPart === 'p5') && (
        <section id="p5" className="space-y-6 scroll-mt-24">
          <div className="border-b-2 border-indigo-500 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
              Parte 5
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              PARTE 5. LAS FIGURAS LITERARIAS — ԳԵՂԱՐՎԵՍՏԱԿԱՆ ԱՐՏԱՀԱՅՏՉԱՄԻՋՈՑՆԵՐ
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Գեղարվեստական արտահայտչամիջոցները բաժանվում են երեք հիմնական խմբի՝ Fónico, Morfosintáctico և Semántico։
            </p>
          </div>

          {/* 3 Groups summary table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
              <span className="font-bold text-xs uppercase text-purple-800">A. Nivel Fónico</span>
              <div className="font-bold text-slate-900 mt-1">Se relaciona con los sonidos</div>
              <div className="text-xs text-purple-950 font-medium">Կապված է հնչյունների հետ։</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
              <span className="font-bold text-xs uppercase text-blue-800">B. Nivel Morfosintáctico</span>
              <div className="font-bold text-slate-900 mt-1">Se relaciona con las palabras y su orden</div>
              <div className="text-xs text-blue-950 font-medium">Կապված է բառերի կրկնության և շարադասության հետ։</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
              <span className="font-bold text-xs uppercase text-amber-800">C. Nivel Semántico</span>
              <div className="font-bold text-slate-900 mt-1">Se relaciona con el significado</div>
              <div className="text-xs text-amber-950 font-medium">Կապված է բառերի իմաստի հետ։</div>
            </div>
          </div>

          {/* A. NIVEL FÓNICO (13-16) */}
          <div className="space-y-4 pt-2">
            <h4 className="text-lg font-black text-purple-900">
              A. NIVEL FÓNICO — ՀՆՉՅՈՒՆԱԿԱՆ ՄԱԿԱՐԴԱԿ
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InteractiveBlock
                badge="13. Aliteración"
                title="Նման հնչյունների կրկնություն"
                spanish={`Repetición de sonidos iguales o parecidos en varias palabras.\n\nEjemplo: «Mi mamá me mima».\nSe repite el sonido «m».`}
                armenian={`Նույն կամ նման հնչյունների կրկնություն մի քանի բառերի մեջ։\n\nՕրինակ՝ «Mi mamá me mima»։\nԿրկնվում է m հնչյունը։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="14. Onomatopeya"
                title="Ձայնանմանություն"
                spanish={`Uso de palabras que imitan sonidos reales.\n\nEjemplo: «Miau, guau, tic-tac».`}
                armenian={`Բառերի օգտագործում, որոնք նմանակում են իրական ձայները։\n\nՕրինակ՝ «Մյաու, հաֆ-հաֆ, տիկ-տակ»։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="15. Paronomasia"
                title="Նմանահնչյուն բառերի կիրառություն"
                spanish={`Uso de palabras que suenan de manera parecida, pero tienen significados diferentes.\n\nEjemplo: «El hombre tiene hambre».\nHombre / hambre son palabras parecidas en sonido pero de significado diferente.`}
                armenian={`Նման հնչողությամբ, բայց տարբեր իմաստներով բառերի օգտագործում։\n\nՕրինակ՝ «El hombre tiene hambre» (Մարդը սոված է)։\nHombre (մարդ) / hambre (քաղց) — նման հնչողությամբ տարբեր բառեր։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="16. Epanadiplosis"
                title="Նույն բառը սկզբում և վերջում"
                spanish={`Repetición de una palabra al principio y al final del mismo verso o enunciado.\n\nEjemplo: «Verde que te quiero verde».\nLa palabra «verde» aparece al principio y al final.`}
                armenian={`Նույն բառի կրկնություն նույն տողի կամ արտահայտության սկզբում և վերջում։\n\nՕրինակ՝ «Verde que te quiero verde»։\nVerde բառը կա և՛ սկզբում, և՛ վերջում։`}
                globalMode={globalMode}
              />
            </div>
          </div>

          {/* B. NIVEL MORFOSINTÁCTICO (17-22) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="text-lg font-black text-blue-900">
              B. NIVEL MORFOSINTÁCTICO — ՔԵՐԱԿԱՆԱԿԱՆ ԿԱՌՈՒՑՎԱԾՔԻ ՄԱԿԱՐԴԱԿ
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InteractiveBlock
                badge="17. Hipérbaton"
                title="Շրջուն շարադասություն"
                spanish={`Alteración del orden habitual de las palabras.\n\nEjemplo: «Del jardín las flores recogí».\nOrden normal: «Recogí las flores del jardín».`}
                armenian={`Նախադասության բառերի սովորական հերթականության փոփոխություն։\n\nՕրինակ՝ «Del jardín las flores recogí»։\nՍովորական շարադասություն՝ «Ես այգուց հավաքեցի ծաղիկները»։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="18. Anáfora"
                title="Սկզբնային կրկնություն"
                spanish={`Repetición de una o varias palabras al comienzo de varios versos o frases.\n\nEjemplo:\n«Quiero cantar.\nQuiero bailar.\nQuiero soñar».\nLos tres versos empiezan por «Quiero».`}
                armenian={`Նույն բառի կամ բառերի կրկնություն մի քանի տողերի կամ նախադասությունների սկզբում։\n\nՕրինակ՝\n«Quiero cantar.\nQuiero bailar.\nQuiero soñar»։\nԵրեք տողերն էլ սկսվում են Quiero բառով։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="19. Asíndeton"
                title="Շաղկապների բացթողում"
                spanish={`Eliminación intencionada de conjunciones para dar rapidez o intensidad.\n\nEjemplo: «Corre, salta, canta, baila».\nNo hay conjunciones.`}
                armenian={`Շաղկապների միտումնավոր բացթողում՝ խոսքն արագացնելու կամ ուժեղացնելու համար։\n\nՕրինակ՝ «Corre, salta, canta, baila»։\nՇաղկապներ չկան (անշաղկապություն)։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="20. Polisíndeton"
                title="Շաղկապների կրկնություն"
                spanish={`Repetición intencionada de conjunciones para dar énfasis.\n\nEjemplo: «Y canta y ríe y baila y juega».\nSe repite la conjunción «y».`}
                armenian={`Շաղկապների միտումնավոր բազմակի կրկնություն՝ խոսքն ընդգծելու համար։\n\nՕրինակ՝ «Y canta y ríe y baila y juega»։\nԿրկնվում է y շաղկապը (բազմաշաղկապություն)։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="21. Enumeración"
                title="Թվարկում"
                spanish={`Presentación seguida de varios elementos, acciones o características.\n\nEjemplo: «Tengo libros, lápices, cuadernos y bolígrafos».`}
                armenian={`Մի քանի առարկաների, գործողությունների կամ հատկանիշների հաջորդական թվարկում։\n\nՕրինակ՝ «Tengo libros, lápices, cuadernos y bolígrafos» (Ես ունեմ գրքեր, մատիտներ, տետրեր և գրիչներ)։`}
                globalMode={globalMode}
              />

              <InteractiveBlock
                badge="22. Pleonasmo"
                title="Ավելորդաբանություն"
                spanish={`Uso de palabras innecesarias para el significado básico, pero que refuerzan la expresión.\n\nEjemplo: «Lo vi con mis propios ojos».\n«Con mis propios ojos» refuerza lo que ya significa «lo vi».`}
                armenian={`Իմաստային առումով ավելորդ բառերի օգտագործում՝ միտքն ավելի ուժեղ արտահայտելու համար։\n\nՕրինակ՝ «Lo vi con mis propios ojos» (Ես դա տեսա իմ սեփական աչքերով)։\n«Con mis propios ojos» արտահայտությունը ուժեղացնում է միտքը։`}
                globalMode={globalMode}
              />
            </div>
          </div>

          {/* C. NIVEL SEMÁNTICO (23 Metáfora) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="text-lg font-black text-amber-900">
              C. NIVEL SEMÁNTICO — ԻՄԱՍՏԱՅԻՆ ՄԱԿԱՐԴԱԿ
            </h4>

            <InteractiveBlock
              badge="23. Metáfora — Փոխաբերություն"
              spanish={`Identificación de un elemento real con otro imaginario por su semejanza.\n\nEjemplo: «Tus ojos son estrellas».\nLos ojos se llaman figuradamente estrellas por su brillo.`}
              armenian={`Իրական մի բանի նույնացում մեկ այլ բանի հետ՝ դրանց նմանության հիման վրա։\n\nՕրինակ՝ «Tus ojos son estrellas» (Քո աչքերը աստղեր են)։\nԱյստեղ աչքերը փոխաբերաբար կոչվում են աստղեր, որովհետև նմանեցնում ենք նրանց փայլին։`}
              globalMode={globalMode}
            />

            {/* Las tres formas de metáfora */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
              <h5 className="font-black text-slate-900 text-base sm:text-lg">
                Las tres formas de metáfora — Փոխաբերության երեք ձևերը
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1.5">
                  <span className="font-black text-amber-900 text-xs uppercase px-2 py-0.5 rounded bg-amber-200/60">
                    Forma: A es B
                  </span>
                  <div className="font-bold text-slate-900 text-sm">Tus ojos son estrellas.</div>
                  <div className="text-xs text-emerald-900 font-medium">
                    Քո աչքերը աստղեր են։ Երկու տարրերն էլ կան (A = ojos, B = estrellas)։
                  </div>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1.5">
                  <span className="font-black text-amber-900 text-xs uppercase px-2 py-0.5 rounded bg-amber-200/60">
                    Forma: B (sin A)
                  </span>
                  <div className="font-bold text-slate-900 text-sm">Dos estrellas me miran.</div>
                  <div className="text-xs text-emerald-900 font-medium">
                    Երկու աստղ նայում են ինձ։ Նկատի ունեն աչքերը, բայց «աչքեր» բառը չկա։
                  </div>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1.5">
                  <span className="font-black text-amber-900 text-xs uppercase px-2 py-0.5 rounded bg-amber-200/60">
                    Forma: B de A
                  </span>
                  <div className="font-bold text-slate-900 text-sm">Las perlas de tu boca.</div>
                  <div className="text-xs text-emerald-900 font-medium">
                    Քո բերանի մարգարիտները։ Մարգարիտներ (perlas) ասելով նկատի ունեն ատամները։
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preguntas de examen 15–25 */}
          <div className="space-y-3 pt-2">
            <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              Preguntas de examen — Figuras literarias (15–25)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {EXAM_25_QUESTIONS.slice(14, 25).map((qa) => (
                <InteractiveBlock
                  key={qa.num}
                  badge={`Հարց ${qa.num}`}
                  spanish={`${qa.qEs}\n\nRespuesta:\n${qa.aEs}`}
                  armenian={`${qa.qHy}\n\nՊատասխան՝\n${qa.aHy}`}
                  globalMode={globalMode}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* PARTE 6. DIFERENCIAS IMPORTANTES */}
      {/* ========================================================= */}
      {(activeSubPart === 'all' || activeSubPart === 'p6') && (
        <section id="p6" className="space-y-6 scroll-mt-24">
          <div className="border-b-2 border-indigo-500 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
              Parte 6
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              PARTE 6. DIFERENCIAS IMPORTANTES — ԿԱՐԵՎՈՐ ՏԱՐԲԵՐՈՒԹՅՈՒՆՆԵՐ
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Սրանք այն հասկացություններն են, որոնք աշակերտները հաճախ շփոթում են քննության ժամանակ։
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIFERENCIAS_IMPORTANTES.map((dif, idx) => (
              <InteractiveBlock
                key={idx}
                badge={`Տարբերություն #${idx + 1}`}
                title={dif.topic}
                spanish={dif.es}
                armenian={dif.hy}
                globalMode={globalMode}
                isBookmarked={bookmarks.has(`dif-${idx}`)}
                onToggleBookmark={() => onToggleBookmark(`dif-${idx}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* PARTE 7. RESUMEN FINAL — ՎԵՐՋՆԱԿԱՆ ԱՄՓՈՓՈՒՄ */}
      {/* ========================================================= */}
      {(activeSubPart === 'all' || activeSubPart === 'p7') && (
        <section id="p7" className="space-y-8 scroll-mt-24">
          <div className="border-b-2 border-indigo-500 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
              Parte 7
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              PARTE 7. RESUMEN FINAL — ՎԵՐՋՆԱԿԱՆ ԱՄՓՈՓՈՒՄ
            </h3>
          </div>

          {/* Table 1: Géneros y formas */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-sm">
            <h4 className="text-lg font-black text-slate-900">
              Géneros y formas — Գրական սեռեր և ձևեր
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {FINAL_SUMMARY_GENRES.map((g, i) => (
                <div key={i} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{g.es}</span>
                    <span className="text-xs text-slate-500 ml-1.5 font-mono">({g.keyEs})</span>
                    <div className="text-xs sm:text-sm font-semibold text-emerald-900 mt-0.5">
                      {g.hy} — <span className="font-normal text-slate-700">{g.keyHy}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => speakSpanish(g.es + '. ' + g.keyEs)}
                    className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                    title="Լսել"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Table 2: Figuras literarias */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-sm">
            <h4 className="text-lg font-black text-slate-900">
              Figuras literarias — Գեղարվեստական միջոցներ
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {FINAL_SUMMARY_FIGURES.map((f, i) => (
                <div key={i} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{f.es}</span>
                    <span className="text-xs text-amber-800 ml-1.5 font-mono">({f.keyEs})</span>
                    <div className="text-xs sm:text-sm font-semibold text-emerald-900 mt-0.5">
                      {f.hy} — <span className="font-normal text-slate-700">{f.keyHy}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => speakSpanish(f.es + '. ' + f.keyEs)}
                    className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                    title="Լսել"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Para el examen — Քննության համար */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-amber-100/60 to-orange-50 border-2 border-amber-300 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
                ★
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-amber-950">
                Para el examen — Քննության համար (Գլխավոր խորհուրդներ)
              </h4>
            </div>

            <div className="space-y-2 text-base sm:text-lg">
              <p className="text-slate-900 font-bold">
                <span className="text-amber-800 uppercase text-xs tracking-wider font-extrabold mr-1">ES:</span>
                {EXAM_FINAL_ADVICE.es}
              </p>
              <p className="text-emerald-950 font-semibold bg-white/70 p-3.5 rounded-2xl border border-amber-200">
                <span className="text-emerald-800 uppercase text-xs tracking-wider font-extrabold mr-1">Հայերեն՝</span>
                {EXAM_FINAL_ADVICE.hy}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-amber-200/80 bg-white p-4 rounded-2xl border border-amber-300">
              <div className="text-xs font-black uppercase tracking-wider text-amber-900 mb-1">
                ⚡ Առանցքային թեմաներ, որոնք պարտադիր են՝
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                {EXAM_FINAL_ADVICE.focus}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
