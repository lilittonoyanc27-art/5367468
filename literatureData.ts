export interface VocabItem {
  id: string;
  es: string;
  hy: string;
  example?: string;
  note?: string;
}

export interface InteractiveItem {
  id: string;
  title?: string;
  badge?: string;
  es: string;
  hy: string;
  whyEs?: string;
  whyHy?: string;
  noteEs?: string;
  noteHy?: string;
  tags?: string[];
}

export interface QuizQuestion {
  id: number;
  questionEs: string;
  questionHy: string;
  options: {
    key: 'A' | 'B' | 'C';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C';
  explanationEs: string;
  explanationHy: string;
}

export interface SectionContent {
  id: string;
  num: string;
  titleEs: string;
  titleHy: string;
  descEs?: string;
  descHy?: string;
}

export const EXAM_INFO = {
  headerTitle: "📚 LITERATURA — ԳՐԱԿԱՆՈՒԹՅՈՒՆ",
  subtitle: "7.º de ESO · Preparación para el examen · Քննության ամբողջական պատրաստություն",
  introEs: "En cada tema encontrarás la definición en español, su traducción al armenio, una explicación, ejemplos y las diferencias que debes reconocer en el examen.",
  introHy: "Այստեղ ներկայացված են տետրի բոլոր թեմաները՝ իսպաներեն և հայերեն։ Յուրաքանչյուր թեմայի համար կտամ իսպաներեն սահմանումը, հայերեն թարգմանությունը, բացատրությունը, օրինակները և այն պատճառը, թե ինչու է տվյալ տեքստը պատկանում այդ տեսակին։"
};

// Vocabulary items extracted from all sections
export const VOCABULARY_LIST: VocabItem[] = [
  // 1.1 Lírica
  { id: 'v1', es: 'Lírica', hy: 'Քնարերգություն', note: 'Զգացմունքներ և հույզեր արտահայտող գրական սեռ' },
  { id: 'v2', es: 'Discurso subjetivo', hy: 'Սուբյեկտիվ խոսք', note: 'Հիմնված անձնական ապրումների և տեսակետի վրա' },
  { id: 'v3', es: 'Preferencia', hy: 'Նախապատվություն', note: 'Հաճախակի գործածվող, բայց ոչ պարտադիր' },
  { id: 'v4', es: 'Verso', hy: 'Բանաստեղծական տող, չափածո', note: 'Տող, որն ունի ռիթմ, երաժշտականություն' },
  { id: 'v5', es: 'Aunque', hy: 'Թեև, չնայած' },
  { id: 'v6', es: 'Prosa poética', hy: 'Բանաստեղծական արձակ', note: 'Արձակ ձևով գրված, բայց քնարական բովանդակությամբ' },
  { id: 'v7', es: 'Ritmo', hy: 'Ռիթմ' },
  { id: 'v8', es: 'Musicalidad', hy: 'Երաժշտականություն' },
  { id: 'v9', es: 'Recursos retóricos', hy: 'Հռետորական / գրական արտահայտչամիջոցներ' },

  // 1.2 Narrativa
  { id: 'v10', es: 'Narrativa', hy: 'Պատմողական գրականություն', note: 'Պատմություն է պատմում' },
  { id: 'v11', es: 'Narrador', hy: 'Պատմող' },
  { id: 'v12', es: 'Primera persona', hy: 'Առաջին դեմք (Yo)', note: 'Պատմողը խոսում է իր մասին' },
  { id: 'v13', es: 'Tercera persona', hy: 'Երրորդ դեմք (Él / Ella)', note: 'Պատմում է ուրիշների հետ կատարվածը' },
  { id: 'v14', es: 'Cuenta una historia', hy: 'Պատմում է պատմություն' },
  { id: 'v15', es: 'Personajes', hy: 'Կերպարներ' },
  { id: 'v16', es: 'Acontecimientos', hy: 'Իրադարձություններ' },
  { id: 'v17', es: 'Ficción', hy: 'Հորինվածք, երևակայություն' },
  { id: 'v18', es: 'Sin embargo', hy: 'Սակայն, այնուամենայնիվ' },
  { id: 'v19', es: 'Incorporar', hy: 'Ներառել' },
  { id: 'v20', es: 'Realidad', hy: 'Իրականություն' },
  { id: 'v21', es: 'Elementos extraídos de la realidad', hy: 'Իրականությունից վերցված տարրեր' },

  // 1.3 Teatro
  { id: 'v22', es: 'Teatro', hy: 'Թատրոն', note: 'Բեմականացման համար նախատեսված' },
  { id: 'v23', es: 'Acción', hy: 'Գործողություն' },
  { id: 'v24', es: 'Destinada', hy: 'Նախատեսված' },
  { id: 'v25', es: 'Representada', hy: 'Ներկայացված' },
  { id: 'v26', es: 'Escenario', hy: 'Բեմ' },
  { id: 'v27', es: 'Público', hy: 'Հանդիսատես' },
  { id: 'v28', es: 'Acotación', hy: 'Բեմական ցուցում (փակագծերում)', example: '(Marta empieza a llorar.)' },
  { id: 'v29', es: 'Atrezo', hy: 'Բեմական պարագաներ', example: 'Una mesa — սեղան' },
  { id: 'v30', es: 'Decorado', hy: 'Բեմի ձևավորում, դեկորացիա', example: 'Un bosque pintado — անտառի պատկեր' },
  { id: 'v31', es: 'Vestuario', hy: 'Բեմական հագուստ', example: 'El traje del rey — թագավորի հագուստ' },

  // Popular & Culta
  { id: 'v32', es: 'Literatura popular', hy: 'Ժողովրդական գրականություն', note: 'Անհայտ հեղինակ, բանավոր փոխանցում' },
  { id: 'v33', es: 'Literatura culta', hy: 'Հեղինակային, մշակված գրականություն', note: 'Հայտնի հեղինակ, գրավոր փոխանցում' },
  { id: 'v34', es: 'Obras anónimas', hy: 'Անհայտ հեղինակով ստեղծագործություններ' },
  { id: 'v35', es: 'Transmisión oral', hy: 'Բանավոր փոխանցում' },
  { id: 'v36', es: 'Transmisión escrita', hy: 'Գրավոր փոխանցում' },
  { id: 'v37', es: 'Estribillo', hy: 'Կրկներգ', example: 'Vamos a cantar, vamos a bailar' },
  { id: 'v38', es: 'Villancicos', hy: 'Սուրբծննդյան երգեր' },
  { id: 'v39', es: 'Nanas', hy: 'Օրորոցայիններ' },
  { id: 'v40', es: 'Coplas', hy: 'Ժողովրդական կարճ բանաստեղծական տներ' },

  // Formas narrativas
  { id: 'v41', es: 'Romance', hy: 'Պատմողական բանաստեղծություն', note: 'Ութվանկ տողեր, ասոնանսային հանգ զույգ տողերում' },
  { id: 'v42', es: 'Octosílabo', hy: 'Ութվանկ տող (8 sílabas métricas)' },
  { id: 'v43', es: 'Rima asonante', hy: 'Ասոնանսային հանգ (համընկնում են միայն ձայնավորները)', example: 'cielo / viento' },
  { id: 'v44', es: 'Rima consonante', hy: 'Լիակատար հանգ (համընկնում են ձայնավորներն ու բաղաձայնները)', example: 'canción / ilusión' },
  { id: 'v45', es: 'Versos pares / impares', hy: 'Զույգ համարներով / կենտ համարներով տողեր' },
  { id: 'v46', es: 'Versos sueltos', hy: 'Առանց պարտադիր հանգի տողեր' },
  { id: 'v47', es: 'Leyenda', hy: 'Ավանդազրույց (իրական վայր + երևակայական տարր)' },
  { id: 'v48', es: 'Mito', hy: 'Առասպել (աստվածներ, հերոսներ, աշխարհի ծագում)' },
  { id: 'v49', es: 'Cuento', hy: 'Պատմվածք կամ հեքիաթ (կարճ, քիչ կերպարներ, պարզ սյուժե)' },

  // Figuras literarias
  { id: 'v50', es: 'Aliteración', hy: 'Ալիտերացիա (հնչյունների կրկնություն)', example: 'Susana susurra suavemente' },
  { id: 'v51', es: 'Onomatopeya', hy: 'Ձայնանմանություն (բնական ձայների նմանակում)', example: '¡Tic, tac! ¡Guau!' },
  { id: 'v52', es: 'Paronomasia', hy: 'Պարոնոմազիա (նմանահունչ բառեր, տարբեր իմաստ)', example: 'hombre / nombre' },
  { id: 'v53', es: 'Epanadiplosis', hy: 'Էպանադիպլոսիս (նույն բառը տողի սկզբում և վերջում)', example: 'Verde que te quiero verde' },
  { id: 'v54', es: 'Hipérbaton', hy: 'Հիպերբատոն (շարադասության փոփոխություն)', example: 'De tus ojos la luz quiero' },
  { id: 'v55', es: 'Anáfora', hy: 'Անաֆորա (նույն բառը տողերի սկզբում)', example: 'Quiero cantar. Quiero bailar.' },
  { id: 'v56', es: 'Asíndeton', hy: 'Ասինդետոն (առանց շաղկապների թվարկում)', example: 'Corre, salta, ríe, grita' },
  { id: 'v57', es: 'Polisíndeton', hy: 'Պոլիսինդետոն (շաղկապների բազմակի կրկնություն)', example: 'Y corre y salta y ríe y grita' },
  { id: 'v58', es: 'Enumeración', hy: 'Թվարկում (հաջորդական տարրեր)', example: 'Compré pan, leche, queso y fruta' },
  { id: 'v59', es: 'Pleonasmo', hy: 'Պլեոնազմ (ավելորդաբանություն, իմաստի ուժեղացում)', example: 'Lo vi con mis propios ojos' },
  { id: 'v60', es: 'Metáfora', hy: 'Փոխաբերություն (նմանության վրա հիմնված նույնացում)', example: 'Tus ojos son estrellas' }
];

export const ALL_FIGURES = [
  {
    nameEs: "Aliteración",
    nameHy: "Ալիտերացիա (Հնչյունների կրկնություն)",
    level: "Nivel fónico",
    levelHy: "Հնչյունական մակարդակ",
    defEs: "Es la repetición de sonidos iguales o parecidos en palabras cercanas.",
    defHy: "Նույն կամ նման հնչյունների կրկնությունն է իրար մոտ գտնվող բառերում։",
    exampleEs: "Susana susurra suavemente.",
    exampleHy: "Սուսանան մեղմ շշնջում է։",
    whyEs: "Porque se repite el sonido «s» en varias palabras.",
    whyHy: "Որովհետև մի քանի բառերում կրկնվում է «s» հնչյունը։",
    formula: "Repite sonidos"
  },
  {
    nameEs: "Onomatopeya",
    nameHy: "Ձայնանմանություն",
    level: "Nivel fónico",
    levelHy: "Հնչյունական մակարդակ",
    defEs: "Consiste en utilizar palabras que imitan sonidos reales.",
    defHy: "Ձայնանմանությունը իրական ձայները նմանակող բառերի գործածությունն է։",
    exampleEs: "¡Miau! (gato), ¡Guau! (perro), ¡Tic, tac! (reloj), ¡Pum! (golpe)",
    exampleHy: "¡Miau! (կատվի մլավոց), ¡Guau! (շան հաչոց), ¡Tic, tac! (ժամացույց), ¡Pum! (հարված)",
    whyEs: "Porque las palabras imitan sonidos que podemos escuchar.",
    whyHy: "Որովհետև բառերը նմանակում են իրականում լսվող ձայները։",
    formula: "Imita sonidos reales"
  },
  {
    nameEs: "Paronomasia",
    nameHy: "Պարոնոմազիա (Նմանահունչ բառեր)",
    level: "Nivel fónico",
    levelHy: "Հնչյունական մակարդակ",
    defEs: "Es el uso de palabras que tienen sonidos parecidos, pero significados diferentes.",
    defHy: "Նմանահունչ, բայց տարբեր իմաստներ ունեցող բառերի գործածությունն է։",
    exampleEs: "El hombre tiene un nombre.",
    exampleHy: "Մարդն անուն ունի։ (Hombre = մարդ, Nombre = անուն)",
    whyEs: "Porque «hombre» y «nombre» tienen sonidos parecidos, pero significados diferentes.",
    whyHy: "Որովհետև «hombre» և «nombre» բառերը նման են հնչում, բայց տարբեր իմաստներ ունեն։",
    formula: "Usa palabras de sonidos parecidos"
  },
  {
    nameEs: "Epanadiplosis",
    nameHy: "Էպանադիպլոսիս (Սկզբում և վերջում)",
    level: "Nivel fónico / sintáctico",
    levelHy: "Հնչյունա-շարահյուսական",
    defEs: "Consiste en repetir una misma palabra al principio y al final de un mismo verso o enunciado.",
    defHy: "Միևնույն բառի կրկնությունն է նույն տողի կամ արտահայտության սկզբում և վերջում։",
    exampleEs: "Verde que te quiero verde.",
    exampleHy: "Կանաչ, որքա՜ն եմ քեզ սիրում կանաչ։",
    whyEs: "Porque la palabra «verde» aparece al principio y al final del mismo verso.",
    whyHy: "Որովհետև «verde» բառը գտնվում է նույն բանաստեղծական տողի սկզբում և վերջում։",
    formula: "Repite una palabra al principio y al final"
  },
  {
    nameEs: "Hipérbaton",
    nameHy: "Հիպերբատոն (Շարադասության փոփոխություն)",
    level: "Nivel morfosintáctico",
    levelHy: "Ձևաբանական և շարահյուսական",
    defEs: "Consiste en alterar el orden habitual de las palabras en una oración.",
    defHy: "Բառերի սովորական շարադասության փոփոխությունն է։",
    exampleEs: "De tus ojos la luz quiero. (Orden normal: Quiero la luz de tus ojos)",
    exampleHy: "Քո աչքերի լույսն եմ ուզում։ (Սովորական շարադասություն՝ Ես ուզում եմ քո աչքերի լույսը)",
    whyEs: "Porque se cambia el orden normal de las palabras sin cambiar la idea principal.",
    whyHy: "Որովհետև բառերի սովորական հերթականությունը փոխված է, բայց հիմնական միտքը պահպանված է։",
    formula: "Cambia el orden de las palabras"
  },
  {
    nameEs: "Anáfora",
    nameHy: "Անաֆորա (Սկզբնակրկնություն)",
    level: "Nivel morfosintáctico",
    levelHy: "Ձևաբանական և շարահյուսական",
    defEs: "Consiste en repetir una o varias palabras al comienzo de varios versos o enunciados consecutivos.",
    defHy: "Նույն բառի կամ բառակապակցության կրկնությունն է մի քանի հաջորդական տողերի կամ արտահայտությունների սկզբում։",
    exampleEs: "Quiero cantar.\nQuiero bailar.\nQuiero vivir.",
    exampleHy: "Ուզում եմ երգել։\nՈւզում եմ պարել։\nՈւզում եմ ապրել։",
    whyEs: "Porque «quiero» se repite al principio de cada verso.",
    whyHy: "Որովհետև «quiero» բառը կրկնվում է յուրաքանչյուր տողի սկզբում։",
    formula: "Repite palabras al inicio de varios versos"
  },
  {
    nameEs: "Asíndeton",
    nameHy: "Ասինդետոն (Անշաղկապություն)",
    level: "Nivel morfosintáctico",
    levelHy: "Ձևաբանական և շարահյուսական",
    defEs: "Consiste en eliminar las conjunciones que normalmente unirían las palabras o expresiones.",
    defHy: "Շաղկապների բացթողումն է այնպիսի բառերի կամ արտահայտությունների միջև, որոնք սովորաբար կարող էին կապակցվել շաղկապներով։",
    exampleEs: "Corre, salta, ríe, grita.",
    exampleHy: "Վազում է, ցատկում, ծիծաղում, գոռում։",
    whyEs: "Porque se enumeran acciones sin utilizar conjunciones.",
    whyHy: "Որովհետև գործողությունները թվարկվում են առանց շաղկապների։",
    formula: "Omite conjunciones (sin conjunciones)"
  },
  {
    nameEs: "Polisíndeton",
    nameHy: "Պոլիսինդետոն (Բազմաշաղկապություն)",
    level: "Nivel morfosintáctico",
    levelHy: "Ձևաբանական և շարահյուսական",
    defEs: "Consiste en repetir conjunciones de manera expresiva más veces de lo habitual.",
    defHy: "Շաղկապների դիտավորյալ և արտահայտիչ կրկնությունն է՝ սովորականից ավելի հաճախ։",
    exampleEs: "Y corre y salta y ríe y grita.",
    exampleHy: "Ե՛վ վազում է, և՛ ցատկում, և՛ ծիծաղում, և՛ գոռում։",
    whyEs: "Porque se repite muchas veces la conjunción «y».",
    whyHy: "Որովհետև բազմիցս կրկնվում է «y» շաղկապը։",
    formula: "Repite conjunciones"
  },
  {
    nameEs: "Enumeración",
    nameHy: "Թվարկում",
    level: "Nivel morfosintáctico",
    levelHy: "Ձևաբանական և շարահյուսական",
    defEs: "Consiste en mencionar de manera sucesiva varios elementos, características o acciones.",
    defHy: "Մի քանի առարկաների, հատկանիշների կամ գործողությունների հաջորդական թվարկումն է։",
    exampleEs: "Compré pan, leche, queso y fruta.",
    exampleHy: "Ես գնեցի հաց, կաթ, պանիր և միրգ։",
    whyEs: "Porque se presentan varios productos uno detrás de otro.",
    whyHy: "Որովհետև մի քանի մթերքներ ներկայացվում են հաջորդաբար։",
    formula: "Presenta varios elementos sucesivos"
  },
  {
    nameEs: "Pleonasmo",
    nameHy: "Պլեոնազմ (Ավելորդաբանություն)",
    level: "Nivel morfosintáctico / semántico",
    levelHy: "Ձևաբանական և իմաստային",
    defEs: "Consiste en utilizar palabras que repiten o refuerzan una idea, aunque no sean estrictamente necesarias.",
    defHy: "Իմաստով ավելորդ կամ կրկնվող բառերի գործածությունն է՝ միտքն ավելի ուժեղ արտահայտելու համար։",
    exampleEs: "Lo vi con mis propios ojos.",
    exampleHy: "Ես դա տեսա իմ սեփական աչքերով։",
    whyEs: "Porque la expresión «con mis propios ojos» refuerza algo que ya está implícito en «lo vi».",
    whyHy: "Որովհետև «իմ սեփական աչքերով» արտահայտությունը ուժեղացնում է այն միտքը, որն արդեն արտահայտված է «ես տեսա» բառերով։",
    formula: "Repite o refuerza el significado"
  },
  {
    nameEs: "Metáfora",
    nameHy: "Փոխաբերություն",
    level: "Nivel semántico",
    levelHy: "Իմաստային մակարդակ",
    defEs: "La metáfora consiste en identificar una realidad con otra con la que guarda alguna semejanza.",
    defHy: "Փոխաբերությունը մի առարկայի, երևույթի կամ մարդու ներկայացումն է մեկ այլ բանի միջոցով՝ նրանց միջև եղած նմանության հիման վրա։",
    exampleEs: "Tus ojos son estrellas.",
    exampleHy: "Քո աչքերը աստղեր են։",
    whyEs: "Porque los ojos se identifican con estrellas para destacar su brillo o belleza.",
    whyHy: "Որովհետև աչքերը ներկայացվում են որպես աստղեր՝ դրանց փայլը կամ գեղեցկությունն ընդգծելու համար։",
    formula: "Identifica una cosa con otra"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionEs: "¿Qué género literario expresa principalmente sentimientos y emociones?",
    questionHy: "Ո՞ր գրական սեռն է հիմնականում արտահայտում զգացմունքներ և հույզեր։",
    options: [
      { key: 'A', text: 'Lírica' },
      { key: 'B', text: 'Narrativa' },
      { key: 'C', text: 'Teatro' }
    ],
    correctAnswer: 'A',
    explanationEs: "La lírica es el género que expresa el mundo subjetivo, las emociones y los sentimientos del autor o de la voz poética.",
    explanationHy: "Քնարերգությունը (Lírica) հեղինակի կամ բանաստեղծական խոսողի զգացմունքներն ու հույզերը արտահայտող գրական սեռն է։"
  },
  {
    id: 2,
    questionEs: "¿Qué género literario suele utilizar un narrador para contar acontecimientos?",
    questionHy: "Ո՞ր գրական սեռում է պատմողը ներկայացնում իրադարձությունները։",
    options: [
      { key: 'A', text: 'Teatro' },
      { key: 'B', text: 'Narrativa' },
      { key: 'C', text: 'Lírica' }
    ],
    correctAnswer: 'B',
    explanationEs: "La narrativa cuenta una historia con acontecimientos y personajes, habitualmente a través de un narrador (en 1.ª o 3.ª persona).",
    explanationHy: "Պատմողական գրականության (Narrativa) մեջ դեպքերը պատմում է պատմողը՝ առաջին կամ երրորդ դեմքով։"
  },
  {
    id: 3,
    questionEs: "¿Qué género está destinado a la representación ante un público?",
    questionHy: "Ո՞ր գրական սեռն է նախատեսված հանդիսատեսի առջև ներկայացվելու համար։",
    options: [
      { key: 'A', text: 'Narrativa' },
      { key: 'B', text: 'Lírica' },
      { key: 'C', text: 'Teatro' }
    ],
    correctAnswer: 'C',
    explanationEs: "El teatro es el género dramático creado específicamente para ser representado por actores en un escenario ante un público.",
    explanationHy: "Թատրոնը (Teatro) նախատեսված է բեմում դերասանների կողմից հանդիսատեսի առջև ներկայացվելու համար։"
  },
  {
    id: 4,
    questionEs: "¿Qué significa «preferencia por el uso del verso»?",
    questionHy: "Ի՞նչ է նշանակում «preferencia por el uso del verso»։",
    options: [
      { key: 'A', text: 'Es obligatorio escribir en verso' },
      { key: 'B', text: 'Se utiliza el verso con frecuencia, pero no siempre' },
      { key: 'C', text: 'Nunca se utiliza la prosa' }
    ],
    correctAnswer: 'B',
    explanationEs: "«Preferencia» significa que se elige habitualmente el verso por su ritmo y musicalidad, pero no es obligatorio porque también existe la prosa poética.",
    explanationHy: "Preferencia նշանակում է նախապատվություն․ չափածոն հաճախ է օգտագործվում, բայց պարտադիր չէ, քանի որ կա նաև բանաստեղծական արձակ։"
  },
  {
    id: 5,
    questionEs: "¿Qué significa «cuenta una historia»?",
    questionHy: "Ի՞նչ է նշանակում «cuenta una historia»։",
    options: [
      { key: 'A', text: 'Պատմվածքի անունն է' },
      { key: 'B', text: 'Պատմում է պատմություն' },
      { key: 'C', text: 'Չափածո է գրում' }
    ],
    correctAnswer: 'B',
    explanationEs: "«Cuenta» es una forma del verbo contar (él/ella cuenta), por lo que «cuenta una historia» significa 'նա պատմում է պատմություն'։",
    explanationHy: "Cuenta բայը գալիս է contar (պատմել) բայից և նշանակում է «պատմում է պատմություն»։"
  },
  {
    id: 6,
    questionEs: "¿Qué caracteriza generalmente a la literatura popular?",
    questionHy: "Ո՞րն է սովորաբար ժողովրդական գրականության հատկանիշը։",
    options: [
      { key: 'A', text: 'Transmisión oral y autor anónimo' },
      { key: 'B', text: 'Autor siempre conocido' },
      { key: 'C', text: 'Ausencia de tradición' }
    ],
    correctAnswer: 'A',
    explanationEs: "La literatura popular pertenece al pueblo, suele ser anónima y se transmite oralmente de generación en generación.",
    explanationHy: "Ժողովրդական գրականությունը բնորոշվում է բանավոր փոխանցմամբ (transmisión oral) և անհայտ հեղինակով (autor anónimo)։"
  },
  {
    id: 7,
    questionEs: "¿Qué caracteriza generalmente a la literatura culta?",
    questionHy: "Ո՞րն է սովորաբար հեղինակային գրականության հատկանիշը։",
    options: [
      { key: 'A', text: 'Autor desconocido' },
      { key: 'B', text: 'Autor conocido y lenguaje elaborado' },
      { key: 'C', text: 'Transmisión exclusivamente oral' }
    ],
    correctAnswer: 'B',
    explanationEs: "La literatura culta tiene un autor conocido, se transmite por escrito y utiliza un lenguaje cuidado y conscientemente artístico.",
    explanationHy: "Հեղինակային գրականությունն ունի հայտնի հեղինակ (autor conocido), տարածվում է գրավոր և ունի մշակված լեզու (lenguaje elaborado)։"
  },
  {
    id: 8,
    questionEs: "Un poema narrativo de versos octosílabos y rima asonante en los pares es...",
    questionHy: "Ութվանկ տողերով և զույգ տողերում ասոնանսային հանգով պատմողական բանաստեղծությունը ի՞նչ է։",
    options: [
      { key: 'A', text: 'Romance' },
      { key: 'B', text: 'Cuento' },
      { key: 'C', text: 'Teatro' }
    ],
    correctAnswer: 'A',
    explanationEs: "Esta es la definición exacta del romance: poema narrativo de versos octosílabos con rima asonante en los pares y versos impares sueltos.",
    explanationHy: "Սա ռոմանսի (Romance) ճշգրիտ սահմանումն է՝ ութվանկ տողեր (octosílabos) և զույգ տողերում ասոնանսային հանգ (rima asonante en los pares)։"
  },
  {
    id: 9,
    questionEs: "Un dios crea el mar y las montañas. ¿Qué tipo de relato es?",
    questionHy: "Աստվածը ստեղծում է ծովն ու լեռները։ Ի՞նչ պատմություն է։",
    options: [
      { key: 'A', text: 'Cuento cotidiano' },
      { key: 'B', text: 'Mito' },
      { key: 'C', text: 'Romance' }
    ],
    correctAnswer: 'B',
    explanationEs: "Es un mito porque aparecen dioses o seres sobrenaturales y se explica el origen de elementos del mundo o de la naturaleza.",
    explanationHy: "Սա առասպել է (Mito), որովհետև հանդես է գալիս աստված և բացատրվում է բնության կամ աշխարհի ծագումը։"
  },
  {
    id: 10,
    questionEs: "En un castillo antiguo aparece un fantasma, según cuenta la tradición. ¿Qué es?",
    questionHy: "Ավանդության համաձայն՝ հին ամրոցում ուրվական է հայտնվում։ Ի՞նչ է սա։",
    options: [
      { key: 'A', text: 'Leyenda' },
      { key: 'B', text: 'Mito de creación' },
      { key: 'C', text: 'Romance necesariamente' }
    ],
    correctAnswer: 'A',
    explanationEs: "Es una leyenda porque se vincula con un lugar real (castillo) y la tradición popular, pero incluye elementos fantásticos o sobrenaturales (fantasma).",
    explanationHy: "Սա ավանդազրույց է (Leyenda), քանի որ կապված է իրական վայրի հետ և պարունակում է գերբնական տարր (ուրվական)։"
  },
  {
    id: 11,
    questionEs: "«Susana susurra suavemente». ¿Qué figura aparece?",
    questionHy: "Ո՞ր արտահայտչամիջոցն է գործածված։",
    options: [
      { key: 'A', text: 'Metáfora' },
      { key: 'B', text: 'Aliteración' },
      { key: 'C', text: 'Hipérbaton' }
    ],
    correctAnswer: 'B',
    explanationEs: "Es aliteración porque se repite el sonido consonántico «s» en palabras contiguas o cercanas.",
    explanationHy: "Ալիտերացիա է (Aliteración), քանի որ կրկնվում է «s» հնչյունը։"
  },
  {
    id: 12,
    questionEs: "«¡Tic, tac!» ¿Qué figura aparece?",
    questionHy: "Ո՞ր արտահայտչամիջոցն է գործածված։",
    options: [
      { key: 'A', text: 'Onomatopeya' },
      { key: 'B', text: 'Pleonasmo' },
      { key: 'C', text: 'Anáfora' }
    ],
    correctAnswer: 'A',
    explanationEs: "Es una onomatopeya porque imita el sonido real del reloj.",
    explanationHy: "Ձայնանմանություն է (Onomatopeya), քանի որ նմանակում է ժամացույցի իրական ձայնը։"
  },
  {
    id: 13,
    questionEs: "«El hombre tiene un nombre». ¿Qué figura aparece?",
    questionHy: "Ո՞ր արտահայտչամիջոցն է գործածված։",
    options: [
      { key: 'A', text: 'Asíndeton' },
      { key: 'B', text: 'Paronomasia' },
      { key: 'C', text: 'Metáfora' }
    ],
    correctAnswer: 'B',
    explanationEs: "Es paronomasia porque utiliza dos palabras con pronunciación muy parecida («hombre» y «nombre»), pero significados diferentes.",
    explanationHy: "Պարոնոմազիա է (Paronomasia), քանի որ օգտագործված են նմանահունչ, բայց տարբեր իմաստ ունեցող բառեր (hombre / nombre)։"
  },
  {
    id: 14,
    questionEs: "«Quiero cantar. Quiero vivir. Quiero soñar». ¿Qué figura aparece?",
    questionHy: "Ո՞ր արտահայտչամիջոցն է գործածված։",
    options: [
      { key: 'A', text: 'Anáfora' },
      { key: 'B', text: 'Epanadiplosis' },
      { key: 'C', text: 'Onomatopeya' }
    ],
    correctAnswer: 'A',
    explanationEs: "Es una anáfora porque la palabra «Quiero» se repite al comienzo de varios enunciados o versos consecutivos.",
    explanationHy: "Անաֆորա է (Anáfora), քանի որ «Quiero» բառը կրկնվում է մի քանի տողերի սկզբում։"
  },
  {
    id: 15,
    questionEs: "«Verde que te quiero verde». ¿Qué figura aparece?",
    questionHy: "Ո՞ր արտահայտչամիջոցն է գործածված։",
    options: [
      { key: 'A', text: 'Enumeración' },
      { key: 'B', text: 'Epanadiplosis' },
      { key: 'C', text: 'Pleonasmo' }
    ],
    correctAnswer: 'B',
    explanationEs: "Es una epanadiplosis porque la palabra «verde» empieza y termina el mismo verso.",
    explanationHy: "Էպանադիպլոսիս է (Epanadiplosis), քանի որ «verde» բառը կրկնվում է նույն տողի սկզբում և վերջում։"
  },
  {
    id: 16,
    questionEs: "«Corre, salta, ríe, grita». ¿Qué figura relacionada con las conjunciones aparece?",
    questionHy: "Շաղկապների գործածության հետ կապված ո՞ր միջոցն է այստեղ։",
    options: [
      { key: 'A', text: 'Polisíndeton' },
      { key: 'B', text: 'Asíndeton' },
      { key: 'C', text: 'Hipérbaton' }
    ],
    correctAnswer: 'B',
    explanationEs: "Es asíndeton porque se suprimen totalmente las conjunciones entre las palabras enumeradas.",
    explanationHy: "Ասինդետոն է (Asíndeton), քանի որ բառերը թվարկված են առանց որևէ շաղկապի (անշաղկապություն)։"
  },
  {
    id: 17,
    questionEs: "«Y corre y salta y ríe». ¿Qué figura aparece?",
    questionHy: "Ո՞ր արտահայտչամիջոցն է գործածված։",
    options: [
      { key: 'A', text: 'Polisíndeton' },
      { key: 'B', text: 'Asíndeton' },
      { key: 'C', text: 'Pleonasmo' }
    ],
    correctAnswer: 'A',
    explanationEs: "Es polisíndeton porque se repite enfáticamente la conjunción «y» muchas veces.",
    explanationHy: "Պոլիսինդետոն է (Polisíndeton), քանի որ բազմիցս կրկնվում է «y» (և) շաղկապը (բազմաշաղկապություն)։"
  },
  {
    id: 18,
    questionEs: "«De tus ojos la luz quiero». ¿Qué figura aparece?",
    questionHy: "Ո՞ր արտահայտչամիջոցն է գործածված։",
    options: [
      { key: 'A', text: 'Paronomasia' },
      { key: 'B', text: 'Hipérbaton' },
      { key: 'C', text: 'Onomatopeya' }
    ],
    correctAnswer: 'B',
    explanationEs: "Es hipérbaton porque se altera el orden habitual sintáctico (sujeto + verbo + complemento -> De tus ojos la luz quiero en lugar de Quiero la luz de tus ojos).",
    explanationHy: "Հիպերբատոն է (Hipérbaton), որովհետև փոխված է նախադասության սովորական շարադասությունը։"
  },
  {
    id: 19,
    questionEs: "«Lo vi con mis propios ojos». ¿Qué figura aparece?",
    questionHy: "Ո՞ր արտահայտչամիջոցն է գործածված։",
    options: [
      { key: 'A', text: 'Pleonasmo' },
      { key: 'B', text: 'Aliteración' },
      { key: 'C', text: 'Anáfora' }
    ],
    correctAnswer: 'A',
    explanationEs: "Es un pleonasmo porque «con mis propios ojos» añade palabras redundantes para dar mayor fuerza y énfasis a lo ya expresado en «lo vi».",
    explanationHy: "Պլեոնազմ է (Pleonasmo)՝ ավելորդաբանություն, որն ուժեղացնում է «ես տեսա» միտքը։"
  },
  {
    id: 20,
    questionEs: "«Tus ojos son estrellas». ¿Qué figura aparece?",
    questionHy: "Ո՞ր արտահայտչամիջոցն է գործածված։",
    options: [
      { key: 'A', text: 'Enumeración' },
      { key: 'B', text: 'Metáfora' },
      { key: 'C', text: 'Polisíndeton' }
    ],
    correctAnswer: 'B',
    explanationEs: "Es una metáfora porque identifica directamente un término real (ojos) con uno imaginario (estrellas) basándose en una semejanza (brillo, belleza).",
    explanationHy: "Փոխաբերություն է (Metáfora), քանի որ աչքերը ուղղակիորեն նույնացվում են աստղերի հետ (փայլ, գեղեցկություն)։"
  }
];

export const EXAM_RECOGNITION_GUIDE = [
  {
    questionEs: "¿Qué género literario es?",
    questionHy: "Ո՞ր գրական սեռն է։",
    toLookFor: "Lírica (sentimientos) / Narrativa (historia, narrador) / Teatro (diálogo, representación)"
  },
  {
    questionEs: "¿Qué tipo de narración es?",
    questionHy: "Պատմության ի՞նչ տեսակ է։",
    toLookFor: "Mito (dioses, origen) / Leyenda (lugar real + fantasía) / Cuento (breve, sencillo) / Romance (poema octosílabo)"
  },
  {
    questionEs: "¿Es literatura popular o culta?",
    questionHy: "Ժողովրդակա՞ն, թե՞ հեղինակային գրականություն է։",
    toLookFor: "Ծագումը, հեղինակը (anónimo vs conocido), փոխանցման ձևը (oral vs escrito)"
  },
  {
    questionEs: "¿Está escrito en verso o prosa?",
    questionHy: "Չափածո՞ է, թե՞ արձակ։",
    toLookFor: "Տեքստի գրության ձևը (versos métricos vs párrafos continuos)"
  },
  {
    questionEs: "¿Qué figura literaria aparece?",
    questionHy: "Ի՞նչ արտահայտչամիջոց կա։",
    toLookFor: "Հնչյուն (fónico), բառ/շաղկապ/դասավորություն (morfosintáctico) կամ իմաստ (semántico)"
  },
  {
    questionEs: "¿Por qué?",
    questionHy: "Ինչո՞ւ։",
    toLookFor: "Պետք է հիմնավորել՝ օրինակ բերելով տեքստից և նշելով համապատասխան հատկանիշը։"
  }
];

export const FINAL_EXAMPLE = {
  poem: "Mi corazón es un mar.\nMi corazón quiere soñar.\nMi corazón busca la luz.",
  questions: [
    {
      num: "1",
      qEs: "¿Qué género literario es?",
      qHy: "Ո՞ր գրական սեռն է։",
      aEs: "Es lírica porque expresa sentimientos de una manera subjetiva.",
      aHy: "Սա քնարերգություն է, որովհետև սուբյեկտիվ ձևով արտահայտում է զգացմունքներ։"
    },
    {
      num: "2",
      qEs: "¿Está escrito en verso o en prosa?",
      qHy: "Չափածո՞ է, թե՞ արձակ։",
      aEs: "Está escrito en verso porque el texto está dividido en líneas poéticas.",
      aHy: "Չափածո է, որովհետև բաժանված է բանաստեղծական տողերի։"
    },
    {
      num: "3",
      qEs: "¿Hay anáfora?",
      qHy: "Կա՞ անաֆորա։",
      aEs: "Sí, porque «mi corazón» se repite al principio de los tres versos.",
      aHy: "Այո՛, որովհետև «mi corazón» կրկնվում է երեք տողերի սկզբում։"
    },
    {
      num: "4",
      qEs: "¿Hay metáfora?",
      qHy: "Կա՞ փոխաբերություն։",
      aEs: "Sí. «Mi corazón es un mar» es una metáfora porque el corazón se identifica con el mar.",
      aHy: "Այո՛։ «Mi corazón es un mar» արտահայտությունը փոխաբերություն է, որովհետև սիրտը ներկայացվում է որպես ծով։"
    }
  ],
  conclusionEs: "Un mismo texto puede pertenecer a un género literario, estar escrito en verso o en prosa y contener varias figuras literarias al mismo tiempo. Siempre debemos justificar la respuesta con una característica del texto.",
  conclusionHy: "Նույն տեքստը կարող է պատկանել որոշակի գրական սեռի, գրված լինել չափածոյով կամ արձակով և միաժամանակ պարունակել մի քանի արտահայտչամիջոց։ Քննության ժամանակ պետք է ոչ միայն նշել ճիշտ պատասխանը, այլև հիմնավորել այն՝ ցույց տալով տեքստի համապատասխան հատկանիշը։"
};

// ==========================================
// 6-PAGE EXAM PREPARATION GUIDE DATA (7.º CURSO)
// ==========================================

export interface ExamQA {
  num: number;
  qEs: string;
  qHy: string;
  aEs: string;
  aHy: string;
}

export const EXAM_GUIDE_HEADER = {
  title: "📚 LITERATURA — PREPARACIÓN PARA EL EXAMEN (7.º CURSO)",
  badge: "Քննական ամփոփ ուղեցույց · 6 էջ",
  subtitle: "Español + Հայերեն | Բացատրություններ, օրինակներ և քննական հարցեր՝ պատասխաններով",
  intro: "Քո ուղարկած 6 էջերի բոլոր թեմաները բացատրված են և՛ իսպաներեն, և՛ հայերեն։ Բացատրությունները կարճ են, բայց ամբողջական, որպեսզի աշակերտը կարողանա հասկանալ, տարբերել և պատասխանել քննության ժամանակ։"
};

export const ELEMENTOS_TEATRO = [
  { es: "Diálogo — Conversación entre personajes", hy: "Երկխոսություն — Կերպարների զրույց" },
  { es: "Escenario — Lugar donde actúan", hy: "Բեմ — Վայր, որտեղ խաղում են դերասանները" },
  { es: "Acotaciones — Indicaciones del autor", hy: "Բեմական ցուցումներ — Հեղինակի նշումները (փակագծերում)" },
  { es: "Decorado — Elementos que representan el lugar", hy: "Դեկորացիաներ — Միջավայրը պատկերող առարկաներ" },
  { es: "Vestuario — Ropa de los personajes", hy: "Հագուստ — Կերպարների հագուստը" },
  { es: "Atrezzo — Objetos usados en escena", hy: "Բեմական պարագաներ — Ներկայացման ժամանակ օգտագործվող առարկաները" }
];

export const DIFERENCIAS_IMPORTANTES = [
  {
    topic: "Lírica vs. Narrativa",
    es: "Lírica: expresa sentimientos. Narrativa: cuenta historias.",
    hy: "Քնարերգությունն արտահայտում է զգացմունքներ, պատմողականը՝ պատմում դեպքեր։"
  },
  {
    topic: "Narrativa vs. Teatro",
    es: "Narrativa: hay narrador. Teatro: predominan los diálogos y la representación.",
    hy: "Պատմողականում կա պատմող, թատրոնում՝ երկխոսություններ և բեմական գործողություններ։"
  },
  {
    topic: "Popular vs. Culta",
    es: "Popular: tradición oral y autor frecuentemente anónimo. Culta: autor conocido y transmisión escrita.",
    hy: "Ժողովրդականը հաճախ բանավոր է և անհայտ հեղինակով, հեղինակայինը՝ հայտնի հեղինակով և գրավոր։"
  },
  {
    topic: "Romance vs. Cuento",
    es: "Romance: poema narrativo. Cuento: narración breve, normalmente en prosa.",
    hy: "Ռոմանսը չափածո պատմություն է, պատմվածքը՝ սովորաբար կարճ արձակ։"
  },
  {
    topic: "Mito vs. Leyenda",
    es: "Mito: explica orígenes. Leyenda: combina tradición, realidad y fantasía.",
    hy: "Առասպելը բացատրում է ծագումը, ավանդազրույցը միավորում է իրականն ու երևակայականը։"
  },
  {
    topic: "Anáfora vs. Epanadiplosis",
    es: "Anáfora: repetición al comienzo de varios versos. Epanadiplosis: repetición al inicio y al final del mismo verso.",
    hy: "Անաֆորան կրկնություն է մի քանի տողերի սկզբում, էպանադիպլոսիսը՝ նույն տողի սկզբում և վերջում։"
  },
  {
    topic: "Asíndeton vs. Polisíndeton",
    es: "Asíndeton: elimina conjunciones. Polisíndeton: repite conjunciones.",
    hy: "Ասինդետոնը բաց է թողնում շաղկապները, պոլիսինդետոնը՝ կրկնում։"
  },
  {
    topic: "Aliteración vs. Paronomasia",
    es: "Aliteración: repite sonidos. Paronomasia: emplea palabras de sonido parecido.",
    hy: "Ալիտերացիան կրկնում է հնչյուններ, պարոնոմազիան՝ նմանահնչյուն տարբեր բառեր։"
  },
  {
    topic: "Enumeración vs. Pleonasmo",
    es: "Enumeración: presenta una lista. Pleonasmo: usa palabras redundantes.",
    hy: "Թվարկումը մի քանի տարրերի շարան է, ավելորդաբանությունը՝ իմաստով ավելորդ բառերի կիրառություն։"
  },
  {
    topic: "Metáfora vs. Comparación",
    es: "Metáfora: «Tus ojos son estrellas». Comparación: «Tus ojos son como estrellas».",
    hy: "Փոխաբերությունում չկա «como» համեմատական բառը, իսկ համեմատության մեջ այն կարող է լինել։"
  }
];

export const EXAM_25_QUESTIONS: ExamQA[] = [
  // Parte 1 (1-4)
  {
    num: 1,
    qEs: "¿Cuáles son los tres grandes géneros literarios?",
    qHy: "Որո՞նք են գրականության երեք հիմնական սեռերը։",
    aEs: "La lírica, la narrativa y el teatro.",
    aHy: "Քնարերգություն, պատմողական գրականություն և թատերգություն։"
  },
  {
    num: 2,
    qEs: "¿Qué expresa la lírica?",
    qHy: "Ի՞նչ է արտահայտում քնարերգությունը։",
    aEs: "Expresa sentimientos y emociones.",
    aHy: "Արտահայտում է զգացմունքներ և հույզեր։"
  },
  {
    num: 3,
    qEs: "¿Qué caracteriza a la narrativa?",
    qHy: "Ի՞նչն է բնորոշ պատմողական գրականությանը։",
    aEs: "La presencia de un narrador que cuenta una historia.",
    aHy: "Պատմողի առկայությունը, որը ներկայացնում է պատմությունը։"
  },
  {
    num: 4,
    qEs: "¿Qué caracteriza al teatro?",
    qHy: "Ի՞նչն է բնորոշ թատերգությանը։",
    aEs: "Los diálogos y las acciones representadas en un escenario.",
    aHy: "Բեմում ներկայացվող երկխոսություններն ու գործողությունները։"
  },

  // Parte 2 (5-6)
  {
    num: 5,
    qEs: "¿Qué es el lenguaje literario?",
    qHy: "Ի՞նչ է գեղարվեստական լեզուն։",
    aEs: "Es el uso artístico y expresivo del lenguaje.",
    aHy: "Լեզվի գեղարվեստական և արտահայտիչ օգտագործումն է։"
  },
  {
    num: 6,
    qEs: "¿Qué diferencia hay entre verso y prosa?",
    qHy: "Ի՞նչ տարբերություն կա չափածոյի և արձակի միջև։",
    aEs: "El verso tiene una organización poética; la prosa se escribe en oraciones y párrafos.",
    aHy: "Չափածոն ունի բանաստեղծական կառուցվածք, իսկ արձակը գրվում է նախադասություններով և պարբերություններով։"
  },

  // Parte 3 (7-9)
  {
    num: 7,
    qEs: "¿Qué es la literatura popular?",
    qHy: "Ի՞նչ է ժողովրդական գրականությունը։",
    aEs: "Es la literatura tradicional, generalmente anónima y transmitida oralmente.",
    aHy: "Ավանդական գրականություն է, որի հեղինակը սովորաբար անհայտ է, և որը փոխանցվում է բանավոր։"
  },
  {
    num: 8,
    qEs: "¿Qué es la literatura culta?",
    qHy: "Ի՞նչ է հեղինակային գրականությունը։",
    aEs: "Es la literatura creada por un autor conocido y normalmente transmitida por escrito.",
    aHy: "Հայտնի հեղինակի ստեղծած գրականությունն է, որը սովորաբար փոխանցվում է գրավոր։"
  },
  {
    num: 9,
    qEs: "¿Qué es un estribillo?",
    qHy: "Ի՞նչ է կրկներգը։",
    aEs: "Es un verso o grupo de versos que se repite.",
    aHy: "Կրկնվող բանաստեղծական տող կամ տողերի խումբ է։"
  },

  // Parte 4 (10-14)
  {
    num: 10,
    qEs: "¿Qué es un romance?",
    qHy: "Ի՞նչ է ռոմանսը։",
    aEs: "Un poema narrativo de versos normalmente octosílabos, con rima asonante en los pares.",
    aHy: "Պատմողական բանաստեղծություն է՝ սովորաբար ութվանկանի տողերով և զույգ տողերի ձայնավորային հանգով։"
  },
  {
    num: 11,
    qEs: "¿Qué significa octosílabo?",
    qHy: "Ի՞նչ է նշանակում ութվանկանի։",
    aEs: "Un verso de ocho sílabas métricas.",
    aHy: "Ութ չափական վանկ ունեցող բանաստեղծական տող։"
  },
  {
    num: 12,
    qEs: "¿Qué es una leyenda?",
    qHy: "Ի՞նչ է ավանդազրույցը։",
    aEs: "Un relato tradicional que mezcla realidad y fantasía.",
    aHy: "Ավանդական պատմություն, որը միավորում է իրականությունն ու երևակայությունը։"
  },
  {
    num: 13,
    qEs: "¿Qué es un mito?",
    qHy: "Ի՞նչ է առասպելը։",
    aEs: "Un relato tradicional que explica orígenes mediante dioses o seres sobrenaturales.",
    aHy: "Ավանդական պատմություն, որը աստվածների կամ գերբնական էակների միջոցով բացատրում է ծագումը։"
  },
  {
    num: 14,
    qEs: "¿Qué es un cuento?",
    qHy: "Ի՞նչ է պատմվածքը կամ հեքիաթը։",
    aEs: "Una narración breve con pocos personajes y un argumento sencillo.",
    aHy: "Կարճ պատմողական ստեղծագործություն՝ քիչ կերպարներով և պարզ սյուժեով։"
  },

  // Parte 5 (15-25)
  {
    num: 15,
    qEs: "¿Qué es la aliteración?",
    qHy: "Ի՞նչ է ալիտերացիան։",
    aEs: "Repetición de sonidos iguales o parecidos.",
    aHy: "Նույն կամ նման հնչյունների կրկնություն։"
  },
  {
    num: 16,
    qEs: "¿Qué es la onomatopeya?",
    qHy: "Ի՞նչ է ձայնանմանությունը։",
    aEs: "Imitación de sonidos reales mediante palabras.",
    aHy: "Իրական ձայների նմանակում բառերի միջոցով։"
  },
  {
    num: 17,
    qEs: "¿Qué es la paronomasia?",
    qHy: "Ի՞նչ է պարոնոմազիան։",
    aEs: "Uso de palabras de sonido parecido y significado diferente.",
    aHy: "Նման հնչողությամբ, բայց տարբեր իմաստով բառերի օգտագործում։"
  },
  {
    num: 18,
    qEs: "¿Qué es la epanadiplosis?",
    qHy: "Ի՞նչ է էպանադիպլոսիսը։",
    aEs: "Repetición de una palabra al principio y al final del mismo verso.",
    aHy: "Նույն բառի կրկնություն նույն տողի սկզբում և վերջում։"
  },
  {
    num: 19,
    qEs: "¿Qué es el hipérbaton?",
    qHy: "Ի՞նչ է հիպերբատոնը։",
    aEs: "Alteración del orden habitual de las palabras.",
    aHy: "Բառերի սովորական հերթականության փոփոխություն։"
  },
  {
    num: 20,
    qEs: "¿Qué es la anáfora?",
    qHy: "Ի՞նչ է անաֆորան։",
    aEs: "Repetición de palabras al comienzo de varios versos.",
    aHy: "Մի քանի տողերի սկզբում նույն բառերի կրկնություն։"
  },
  {
    num: 21,
    qEs: "¿Qué es el asíndeton?",
    qHy: "Ի՞նչ է ասինդետոնը։",
    aEs: "Eliminación intencionada de conjunciones.",
    aHy: "Շաղկապների միտումնավոր բացթողում։"
  },
  {
    num: 22,
    qEs: "¿Qué es el polisíndeton?",
    qHy: "Ի՞նչ է պոլիսինդետոնը։",
    aEs: "Repetición intencionada de conjunciones.",
    aHy: "Շաղկապների միտումնավոր կրկնություն։"
  },
  {
    num: 23,
    qEs: "¿Qué es la enumeración?",
    qHy: "Ի՞նչ է թվարկումը։",
    aEs: "Presentación seguida de varios elementos.",
    aHy: "Մի քանի տարրերի հաջորդական թվարկում։"
  },
  {
    num: 24,
    qEs: "¿Qué es el pleonasmo?",
    qHy: "Ի՞նչ է ավելորդաբանությունը։",
    aEs: "Uso de palabras redundantes para reforzar una idea.",
    aHy: "Ավելորդ բառերի օգտագործում՝ միտքն ընդգծելու համար։"
  },
  {
    num: 25,
    qEs: "¿Qué es una metáfora?",
    qHy: "Ի՞նչ է փոխաբերությունը։",
    aEs: "Identificación figurada de dos elementos por su semejanza.",
    aHy: "Երկու տարրերի փոխաբերական նույնացում՝ դրանց նմանության հիման վրա։"
  }
];

export const FINAL_SUMMARY_GENRES = [
  { es: "Lírica", hy: "Քնարերգություն", keyEs: "sentimientos", keyHy: "զգացմունքներ" },
  { es: "Narrativa", hy: "Պատմողական", keyEs: "narrador e historia", keyHy: "պատմող և պատմություն" },
  { es: "Teatro", hy: "Թատրոն", keyEs: "diálogos y escena", keyHy: "երկխոսություն և բեմ" },
  { es: "Popular", hy: "Ժողովրդական", keyEs: "tradición oral", keyHy: "բանավոր ավանդույթ" },
  { es: "Culta", hy: "Հեղինակային", keyEs: "autor conocido", keyHy: "հայտնի հեղինակ" },
  { es: "Romance", hy: "Ռոմանս", keyEs: "versos octosílabos", keyHy: "ութվանկանի տողեր" },
  { es: "Leyenda", hy: "Ավանդազրույց", keyEs: "realidad y fantasía", keyHy: "իրական և երևակայական" },
  { es: "Mito", hy: "Առասպել", keyEs: "dioses y orígenes", keyHy: "աստվածներ և ծագում" },
  { es: "Cuento", hy: "Պատմվածք", keyEs: "narración breve", keyHy: "կարճ պատմություն" }
];

export const FINAL_SUMMARY_FIGURES = [
  { es: "Aliteración", hy: "Ալիտերացիա", keyEs: "sonidos repetidos", keyHy: "հնչյունների կրկնություն" },
  { es: "Onomatopeya", hy: "Ձայնանմանություն", keyEs: "imitación de sonidos", keyHy: "ձայնանմանություն" },
  { es: "Paronomasia", hy: "Պարոնոմազիա", keyEs: "palabras parecidas", keyHy: "նմանահնչյուն բառեր" },
  { es: "Epanadiplosis", hy: "Էպանադիպլոսիս", keyEs: "inicio y final", keyHy: "կրկնություն սկզբում և վերջում" },
  { es: "Hipérbaton", hy: "Հիպերբատոն", keyEs: "orden alterado", keyHy: "շարադասության փոփոխություն" },
  { es: "Anáfora", hy: "Անաֆորա", keyEs: "repetición inicial", keyHy: "սկզբնային կրկնություն" },
  { es: "Asíndeton", hy: "Ասինդետոն", keyEs: "sin conjunciones", keyHy: "առանց շաղկապների" },
  { es: "Polisíndeton", hy: "Պոլիսինդետոն", keyEs: "conjunciones repetidas", keyHy: "շաղկապների կրկնություն" },
  { es: "Enumeración", hy: "Թվարկում", keyEs: "lista", keyHy: "թվարկում" },
  { es: "Pleonasmo", hy: "Պլեոնազմ", keyEs: "redundancia", keyHy: "ավելորդաբանություն" },
  { es: "Metáfora", hy: "Փոխաբերություն", keyEs: "sentido figurado", keyHy: "փոխաբերություն" }
];

export const EXAM_FINAL_ADVICE = {
  es: "El alumno debe saber definir cada concepto, reconocerlo en un texto y explicar por qué pertenece a ese género o figura literaria.",
  hy: "Աշակերտը պետք է կարողանա սահմանել յուրաքանչյուր հասկացություն, ճանաչել այն տեքստում և բացատրել, թե ինչու է տվյալ օրինակը պատկանում այդ գրական սեռին կամ արտահայտչամիջոցին։",
  focus: "Հատկապես պետք է լավ սովորել՝ Romance 8−/8a, Mito/Leyenda, Lírica/Narrativa/Teatro, Anáfora/Epanadiplosis, Asíndeton/Polisíndeton և Metáfora։"
};

