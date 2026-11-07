import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Award, Volume2, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from './literatureData';
import { speakSpanish } from './SpeechUtil';

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C'>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [filterIncorrectOnly, setFilterIncorrectOnly] = useState<boolean>(false);

  const handleSelect = (questionId: number, optionKey: 'A' | 'B' | 'C') => {
    if (submitted) return; // locked after submission unless reset
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Calculate score
  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / totalQuestions) * 100);

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
    setFilterIncorrectOnly(false);
  };

  const filteredQuestions = filterIncorrectOnly
    ? QUIZ_QUESTIONS.filter((q) => userAnswers[q.id] !== q.correctAnswer)
    : QUIZ_QUESTIONS;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2">
            Թեմա 7 · Ինտերակտիվ թեստ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Examen de práctica — Քննության փորձնական առաջադրանքներ
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            20 preguntas · Իսպաներեն հարցեր, հայերեն թարգմանություններ և հիմնավորված բացատրություններով պատասխաններ։
          </p>
        </div>

        {/* Status card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shrink-0">
          <div className="text-center">
            <div className="text-2xl font-black text-slate-800">
              {answeredCount}/{totalQuestions}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Պատասխանված
            </div>
          </div>

          <div className="h-8 w-px bg-slate-300"></div>

          {submitted ? (
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-600">
                {score} / 20 ({percentage}%)
              </div>
              <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                Գնահատական
              </div>
            </div>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              disabled={answeredCount === 0}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                answeredCount > 0
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 hover:scale-[1.02]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Corregir el examen
              <span className="block text-[11px] font-normal opacity-90">Ստուգել</span>
            </button>
          )}
        </div>
      </div>

      {/* Results banner if submitted */}
      {submitted && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-emerald-200 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-500/30">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {score >= 17
                    ? '🎉 Գերազանց արդյունք! ¡Excelente!'
                    : score >= 12
                    ? '👍 Լավ արդյունք, բայց կա վերանայելու տեղ! ¡Buen trabajo!'
                    : '📖 Խորհուրդ է տրվում նորից կրկնել տեսությունը! ¡Sigue practicando!'}
                </h3>
                <p className="text-sm text-slate-600">
                  Դուք ճիշտ եք պատասխանել <span className="font-bold text-emerald-700">{score}</span> հարցի 20-ից ({percentage}%):
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {score < 20 && (
                <button
                  onClick={() => setFilterIncorrectOnly(!filterIncorrectOnly)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    filterIncorrectOnly
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'
                  }`}
                >
                  {filterIncorrectOnly ? 'Ցույց տալ բոլորը' : 'Ցույց տալ միայն սխալները'}
                </button>
              )}

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Նորից փորձել
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question List */}
      <div className="space-y-6">
        {filteredQuestions.map((q: QuizQuestion) => {
          const userAnswer = userAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-rose-50/40 border-rose-300'
                  : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question text */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-black flex items-center justify-center">
                      {q.id}
                    </span>
                    <button
                      onClick={() => speakSpanish(q.questionEs)}
                      className="p-1 text-slate-400 hover:text-amber-600 rounded transition-colors"
                      title="Լսել հարցի իսպաներեն արտասանությունը"
                    >
                      <Volume2 className="w-4 h-4 text-amber-600" />
                    </button>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {q.questionEs}
                  </h4>
                  <p className="text-base sm:text-lg font-medium text-emerald-900">
                    {q.questionHy}
                  </p>
                </div>

                {submitted && (
                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        Ճիշտ է
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        <XCircle className="w-5 h-5 text-rose-600" />
                        Սխալ է
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {q.options.map((opt) => {
                  const isSelected = userAnswer === opt.key;
                  const isRightOption = opt.key === q.correctAnswer;

                  let optionStyle = 'bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800';

                  if (submitted) {
                    if (isRightOption) {
                      optionStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                    } else if (isSelected && !isRightOption) {
                      optionStyle = 'bg-rose-100 border-rose-300 text-rose-950 line-through opacity-75';
                    } else {
                      optionStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-amber-100 border-amber-400 text-amber-950 font-semibold ring-2 ring-amber-400/40';
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelect(q.id, opt.key)}
                      disabled={submitted}
                      className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${optionStyle}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center shrink-0 ${
                          submitted && isRightOption
                            ? 'bg-emerald-600 text-white'
                            : isSelected
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-base font-medium leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {submitted && (
                <div className="mt-5 pt-4 border-t border-slate-200 space-y-2 text-sm sm:text-base bg-white/80 p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <HelpCircle className="w-5 h-5 text-amber-600" />
                    <span>Բացատրություն (Explicación):</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    <span className="font-bold text-slate-950">ES:</span> {q.explanationEs}
                  </p>
                  <p className="text-emerald-950 font-medium leading-relaxed">
                    <span className="font-bold text-slate-950">Հայերեն՝</span> {q.explanationHy}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom submit button */}
      {!submitted && (
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setSubmitted(true)}
            disabled={answeredCount === 0}
            className={`px-8 py-3.5 rounded-2xl font-bold text-base transition-all shadow-md ${
              answeredCount > 0
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30 hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Corregir el examen — Ստուգել պատասխանները ({answeredCount}/20)
          </button>
        </div>
      )}
    </div>
  );
};
