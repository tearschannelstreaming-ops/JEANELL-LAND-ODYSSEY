export type SupportedLanguageCode =
  | 'en'
  | 'es'
  | 'fr'
  | 'ar'
  | 'zh'
  | 'sw'
  | 'pt'
  | 'hi'
  | 'yo'
  | 'tl';

export interface LanguageOption {
  code: SupportedLanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  bcp47: string;
  regionLabel: string;
  welcomeGreeting: string;
  voiceSampleText: string;
  ui: {
    helloStudent: string;
    kidsHeroSubtitle: string;
    hearFriendlyVoice: string;
    playSplashMovie: string;
    chooseActivity: string;
    touchAndPlay: string;
    levelUpButton: string;
    languageAndAvatarBtn: string;
    missionHistoryBtn: string;
    askMentorBtn: string;
    pwaLiveLinksBtn: string;
    kidsHubBtn: string;
    standardModeBtn: string;
    hubs: {
      academy: string;
      steam: string;
      detroit: string;
      wealth: string;
    };
    kidsCards: {
      abcTitle: string;
      abcSubtitle: string;
      abcAction: string;
      abcPrompt: string;
      tvTitle: string;
      tvSubtitle: string;
      tvAction: string;
      tvPrompt: string;
      workbookTitle: string;
      workbookSubtitle: string;
      workbookAction: string;
      workbookPrompt: string;
      magicTitle: string;
      magicSubtitle: string;
      magicAction: string;
      magicPrompt: string;
      planeTitle: string;
      planeSubtitle: string;
      planeAction: string;
      planePrompt: string;
      mapTitle: string;
      mapSubtitle: string;
      mapAction: string;
      mapPrompt: string;
    };
  };
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    bcp47: 'en-US',
    regionLabel: 'United States & Global',
    welcomeGreeting: 'Welcome to S.T.E.A.Reality: The Jeanell Land Odyssey!',
    voiceSampleText:
      'Hello! Welcome to S.T.E.A.Reality and the ABCs of Financial Literacy Academy. Complete levels to unlock new outfits, facial features, and personal emojis!',
    ui: {
      helloStudent: 'Hello',
      kidsHeroSubtitle:
        'Touch any big colorful button below to play, hear voice stories, earn outfits & emojis, and learn your ABCs of Financial Literacy!',
      hearFriendlyVoice: 'Hear Friendly Voice',
      playSplashMovie: 'Play Splash Movie 🎬',
      chooseActivity: 'Choose Your Fun Activity:',
      touchAndPlay: 'Touch & Play! 🎈',
      levelUpButton: 'Complete Level & Unlock Outfit 🎁',
      languageAndAvatarBtn: 'Language, Voice & Avatar',
      missionHistoryBtn: 'Mission History (7d)',
      askMentorBtn: 'Ask Mentor',
      pwaLiveLinksBtn: 'Live PWA Links & Install',
      kidsHubBtn: 'Kids Hub (Ages 6) 🎈',
      standardModeBtn: 'Standard Mode (8+)',
      hubs: {
        academy: 'Academy & Diplomas',
        steam: 'S.T.E.A.M. Labs',
        detroit: 'Detroit & Safe',
        wealth: 'Mindset & Wealth',
      },
      kidsCards: {
        abcTitle: 'ABC Phonics & Stars',
        abcSubtitle: 'A is for Airfoil · B is for Budget',
        abcAction: 'Play Letters!',
        abcPrompt: "Let's learn the ABCs of Financial Literacy and earn shiny gold stars!",
        tvTitle: 'T.E.A.R.S. Kids TV',
        tvSubtitle: 'Watch Fun Splash Video & Cartoons',
        tvAction: 'Watch Movie!',
        tvPrompt: 'Watch T.E.A.R.S. Channel television and cartoons with Jeanell!',
        workbookTitle: 'Big Picture Workbook',
        workbookSubtitle: 'Money, Savings & Coloring Fun',
        workbookAction: 'Open Workbook!',
        workbookPrompt: "Open your big colorful ABC's of Financial Literacy workbook!",
        magicTitle: 'Magic Happy Words',
        magicSubtitle: 'Affirmations: “I Am Smart & Kind”',
        magicAction: 'Say Words!',
        magicPrompt: 'Say happy words with Jeanell: I am brave, I am smart, and I can do anything!',
        planeTitle: 'Fly Toy Airplanes',
        planeSubtitle: 'Aero Wind Tunnel Flying Lab',
        planeAction: 'Fly Now!',
        planePrompt: 'Fly a toy airplane in the wind tunnel and see it soar!',
        mapTitle: 'Detroit City Map',
        mapSubtitle: 'Explore Parks, Centers & Toy Shops',
        mapAction: 'Explore Map!',
        mapPrompt: 'Explore Detroit parks, schools, and friendly community centers!',
      },
    },
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    bcp47: 'es-ES',
    regionLabel: 'América Latina & España',
    welcomeGreeting: '¡Bienvenido a S.T.E.A.Reality: La Odisea de Jeanell Land!',
    voiceSampleText:
      '¡Hola! Bienvenido a la Academia de Educación Financiera ABC. ¡Completa niveles para ganar ropa nueva, rasgos faciales y tus propios emojis!',
    ui: {
      helloStudent: '¡Hola',
      kidsHeroSubtitle:
        '¡Toca cualquier botón grande para jugar, escuchar historias con voz, ganar ropa y emojis, y aprender el ABC de las finanzas!',
      hearFriendlyVoice: 'Escuchar Voz Amigable',
      playSplashMovie: 'Ver Película 🎬',
      chooseActivity: 'Elige Tu Actividad Divertida:',
      touchAndPlay: '¡Toca y Juega! 🎈',
      levelUpButton: 'Completar Nivel y Ganar Ropa 🎁',
      languageAndAvatarBtn: 'Idioma, Voz y Avatar',
      missionHistoryBtn: 'Historial (7 días)',
      askMentorBtn: 'Preguntar a Mentora',
      pwaLiveLinksBtn: 'Enlaces PWA en Vivo',
      kidsHubBtn: 'Modo Niños (6 Años) 🎈',
      standardModeBtn: 'Modo Estándar (8+)',
      hubs: {
        academy: 'Academia y Diplomas',
        steam: 'Laboratorios S.T.E.A.M.',
        detroit: 'Detroit y Seguridad',
        wealth: 'Mentalidad y Riqueza',
      },
      kidsCards: {
        abcTitle: 'Fonética ABC y Estrellas',
        abcSubtitle: 'A de Avión · B de Banco y Ahorro',
        abcAction: '¡Jugar Letras!',
        abcPrompt: '¡Vamos a aprender el ABC de las finanzas y ganar estrellas de oro!',
        tvTitle: 'T.E.A.R.S. TV Infantil',
        tvSubtitle: 'Videos Divertidos y Dibujos',
        tvAction: '¡Ver Video!',
        tvPrompt: '¡Mira el canal T.E.A.R.S. y videos educativos con Jeanell!',
        workbookTitle: 'Libro de Actividades ABC',
        workbookSubtitle: 'Ahorro, Dinero y Colores',
        workbookAction: '¡Abrir Libro!',
        workbookPrompt: '¡Abre tu gran libro colorido del ABC de Educación Financiera!',
        magicTitle: 'Palabras Mágicas Felices',
        magicSubtitle: 'Afirmaciones: “Soy Inteligente y Amable”',
        magicAction: '¡Decir Palabras!',
        magicPrompt: 'Di palabras felices: ¡Soy valiente, soy inteligente y puedo lograrlo todo!',
        planeTitle: 'Volar Aviones',
        planeSubtitle: 'Laboratorio de Túnel de Viento',
        planeAction: '¡Volar Ahora!',
        planePrompt: '¡Vuela un avión en el túnel de viento y míralo subir alto!',
        mapTitle: 'Mapa de Detroit',
        mapSubtitle: 'Explora Parques, Escuelas y Tiendas',
        mapAction: '¡Explorar Mapa!',
        mapPrompt: '¡Explora los parques, escuelas y centros comunitarios de Detroit!',
      },
    },
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    bcp47: 'fr-FR',
    regionLabel: 'France, Afrique & Canada',
    welcomeGreeting: "Bienvenue dans S.T.E.A.Reality : L'Odyssée de Jeanell Land !",
    voiceSampleText:
      "Bonjour ! Bienvenue à l'Académie financière ABC. Terminez les niveaux pour débloquer des tenues, des traits du visage et des émojis personnels !",
    ui: {
      helloStudent: 'Bonjour',
      kidsHeroSubtitle:
        'Touchez un grand bouton coloré pour jouer, écouter des histoires vocales, gagner des tenues et apprendre les finances ABC !',
      hearFriendlyVoice: 'Écouter la Voix',
      playSplashMovie: 'Voir le Film 🎬',
      chooseActivity: 'Choisis Ton Activité Amusante :',
      touchAndPlay: 'Touche et Joue ! 🎈',
      levelUpButton: 'Niveau Suivant & Tenue 🎁',
      languageAndAvatarBtn: 'Langue, Voix & Avatar',
      missionHistoryBtn: 'Historique (7j)',
      askMentorBtn: 'Mentor IA',
      pwaLiveLinksBtn: 'Liens PWA Directs',
      kidsHubBtn: 'Mode Enfants (6 ans) 🎈',
      standardModeBtn: 'Mode Standard (8+)',
      hubs: {
        academy: 'Académie & Diplômes',
        steam: 'Labos S.T.E.A.M.',
        detroit: 'Detroit & Sécurité',
        wealth: 'Esprit & Richesse',
      },
      kidsCards: {
        abcTitle: 'Alphabet ABC & Étoiles',
        abcSubtitle: 'A comme Avion · B comme Budget',
        abcAction: 'Jouer aux Lettres !',
        abcPrompt: "Apprenons l'alphabet de l'éducation financière et gagnons des étoiles !",
        tvTitle: 'Télé T.E.A.R.S. Enfants',
        tvSubtitle: 'Vidéos et Dessins Animés',
        tvAction: 'Regarder !',
        tvPrompt: 'Regardez la chaîne T.E.A.R.S. avec Jeanell !',
        workbookTitle: 'Grand Cahier Illustré',
        workbookSubtitle: 'Argent, Épargne et Coloriage',
        workbookAction: 'Ouvrir le Cahier !',
        workbookPrompt: "Ouvre ton grand cahier illustré de l'éducation financière !",
        magicTitle: 'Mots Magiques Joyeux',
        magicSubtitle: 'Affirmations : « Je suis intelligent »',
        magicAction: 'Dire les Mots !',
        magicPrompt: 'Dis des mots joyeux : Je suis courageux, intelligent et capable de tout !',
        planeTitle: 'Faire Voler des Avions',
        planeSubtitle: 'Soufflerie Aérodynamique',
        planeAction: 'Voler Maintenant !',
        planePrompt: 'Fais voler un avion dans la soufflerie !',
        mapTitle: 'Carte de Detroit',
        mapSubtitle: 'Parcs, Écoles et Boutiques',
        mapAction: 'Explorer la Carte !',
        mapPrompt: 'Explore les parcs et les centres communautaires de Detroit !',
      },
    },
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    bcp47: 'ar-SA',
    regionLabel: 'الشرق الأوسط وشمال أفريقيا',
    welcomeGreeting: 'مرحباً بكم في أكاديمية جينيل لاند للتعليم المالي والعلوم!',
    voiceSampleText:
      'مرحباً بك! اختر لغتك وصوتك المفضل، وأكمل المراحل لربح ملابس جديدة، ملامح وجه، ورموز تعبيرية خاصة بك!',
    ui: {
      helloStudent: 'مرحباً',
      kidsHeroSubtitle:
        'اضغط على أي زر ملون للعب، وسماع القصص الصوتية، وربح الملابس والرموز التعبيرية، وتعلم أساسيات المال!',
      hearFriendlyVoice: 'استمع للصوت الودود',
      playSplashMovie: 'تشغيل الفيديو 🎬',
      chooseActivity: 'اختر نشاطك الممتع:',
      touchAndPlay: 'المس والعب! 🎈',
      levelUpButton: 'إكمال المرحلة وربح زي 🎁',
      languageAndAvatarBtn: 'اللغة والصوت والشخصية',
      missionHistoryBtn: 'سجل المهام (7 أيام)',
      askMentorBtn: 'اسأل المرشدة',
      pwaLiveLinksBtn: 'روابط التطبيق المباشرة',
      kidsHubBtn: 'وضع الأطفال (6 سنوات) 🎈',
      standardModeBtn: 'الوضع الكامل (8+)',
      hubs: {
        academy: 'الأكاديمية والشهادات',
        steam: 'مختبرات العلوم S.T.E.A.M.',
        detroit: 'ديترويت والأمان',
        wealth: 'العقلية والثروة',
      },
      kidsCards: {
        abcTitle: 'حروف ABC والنجوم',
        abcSubtitle: 'تعلم الحروف والادخار الذكي',
        abcAction: 'العب بالحروف!',
        abcPrompt: 'هيا نتعلم حروف الثقافة المالية ونربح النجوم الذهبية!',
        tvTitle: 'تلفزيون الأطفال T.E.A.R.S.',
        tvSubtitle: 'شاهد الفيديو والرسوم المتحركة',
        tvAction: 'شاهد الفيلم!',
        tvPrompt: 'شاهد قناة T.E.A.R.S. التعليمية مع جينيل!',
        workbookTitle: 'كتاب الأنشطة المصور',
        workbookSubtitle: 'المال والادخار والتلوين',
        workbookAction: 'افتح الكتاب!',
        workbookPrompt: 'افتح كتاب الثقافة المالية الملون الكبير!',
        magicTitle: 'الكلمات السعيدة',
        magicSubtitle: 'أنا ذكي، شجاع ولطيف',
        magicAction: 'قل الكلمات!',
        magicPrompt: 'ردد الكلمات الإيجابية: أنا شجاع، أنا ذكي، وأستطيع النجاح!',
        planeTitle: 'طيران الطائرات',
        planeSubtitle: 'مختبر نفق الرياح للطيران',
        planeAction: 'حلّق الآن!',
        planePrompt: 'جرب طيران الطائرة في نفق الرياح!',
        mapTitle: 'خريطة مدينة ديترويت',
        mapSubtitle: 'استكشف الحدائق والمراكز والمتاجر',
        mapAction: 'استكشف الخريطة!',
        mapPrompt: 'استكشف حدائق ومدارس مدينة ديترويت الجميلة!',
      },
    },
  },
  {
    code: 'zh',
    name: 'Mandarin Chinese',
    nativeName: '中文 (普通话)',
    flag: '🇨🇳',
    bcp47: 'zh-CN',
    regionLabel: '中国及全球华人社区',
    welcomeGreeting: '欢迎来到 S.T.E.A.Reality：珍妮尔·兰德金融与科学学院！',
    voiceSampleText:
      '你好！欢迎来到ABC金融素养学院。完成关卡即可解锁全新服装、面部特征和专属表情符号！',
    ui: {
      helloStudent: '你好',
      kidsHeroSubtitle:
        '点击下方彩色大按钮即可开始游戏、收听语音故事、赢取专属服装与表情，快乐学习ABC金融知识！',
      hearFriendlyVoice: '收听语音导览',
      playSplashMovie: '播放动画短片 🎬',
      chooseActivity: '选择你喜欢的趣味活动：',
      touchAndPlay: '点按即玩！🎈',
      levelUpButton: '完成关卡解锁新服装 🎁',
      languageAndAvatarBtn: '语言、语音与形象',
      missionHistoryBtn: '7天任务记录',
      askMentorBtn: '请教导师',
      pwaLiveLinksBtn: 'PWA直达链接与安装',
      kidsHubBtn: '儿童乐园 (6岁) 🎈',
      standardModeBtn: '标准模式 (8岁+)',
      hubs: {
        academy: '学院与文凭',
        steam: 'S.T.E.A.M. 实验室',
        detroit: '底特律与安全',
        wealth: '思维与财富',
      },
      kidsCards: {
        abcTitle: 'ABC自然拼读与星星',
        abcSubtitle: 'A代表机翼 · B代表预算',
        abcAction: '开始学字母！',
        abcPrompt: '让我们一起学习ABC金融知识，赢取闪亮的金星！',
        tvTitle: 'T.E.A.R.S. 少儿电视',
        tvSubtitle: '观看趣味视频与动画',
        abcPrompt2: '',
        tvAction: '观看影片！',
        tvPrompt: '和Jeanell一起观看T.E.A.R.S.频道节目！',
        workbookTitle: '趣味图画练习册',
        workbookSubtitle: '储蓄、理财与涂色乐园',
        workbookAction: '打开练习册！',
        workbookPrompt: '打开你色彩缤纷的ABC金融素养练习册！',
        magicTitle: '快乐自信魔法语',
        magicSubtitle: '每日肯定：“我聪明又善良”',
        magicAction: '大声说出来！',
        magicPrompt: '每天对自己说：我很勇敢，我很聪明，我能做到！',
        planeTitle: '驾驶玩具飞机',
        planeSubtitle: '空气动力风洞飞行实验室',
        planeAction: '立即起飞！',
        planePrompt: '在风洞实验室里放飞小飞机！',
        mapTitle: '底特律城市地图',
        mapSubtitle: '探索公园、学校与商店',
        mapAction: '探索地图！',
        mapPrompt: '探索底特律的社区中心、公园和学校！',
      } as any,
    },
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    flag: '🇰🇪',
    bcp47: 'sw-KE',
    regionLabel: 'Afrika Mashariki na Kati',
    welcomeGreeting: 'Karibu S.T.E.A.Reality: Chuo cha Fedha na Sayansi cha Jeanell Land!',
    voiceSampleText:
      'Hujambo! Karibu kwenye Chuo cha Elimu ya Fedha cha ABC. Kamilisha hatua ili kupata mavazi mapya, sura na emoji zako!',
    ui: {
      helloStudent: 'Hujambo',
      kidsHeroSubtitle:
        'Gusa kitufe chochote kikubwa ili kucheza, kusikiliza hadithi, kupata mavazi mapya na kujifunza ABC za Fedha!',
      hearFriendlyVoice: 'Sikiliza Sauti Rafiki',
      playSplashMovie: 'Tazama Video 🎬',
      chooseActivity: 'Chagua Mchezo Wako:',
      touchAndPlay: 'Gusa na Ucheze! 🎈',
      levelUpButton: 'Kamilisha Hatua & Vazi 🎁',
      languageAndAvatarBtn: 'Lugha, Sauti na Umbo',
      missionHistoryBtn: 'Historia ya Siku 7',
      askMentorBtn: 'Uliza Mwalimu',
      pwaLiveLinksBtn: 'Viungo vya PWA Moja kwa Moja',
      kidsHubBtn: 'Watoto (Miaka 6) 🎈',
      standardModeBtn: 'Kawaida (8+)',
      hubs: {
        academy: 'Chuo na Vyeti',
        steam: 'Maabara ya S.T.E.A.M.',
        detroit: 'Detroit na Usalama',
        wealth: 'Mawazo na Utajiri',
      },
      kidsCards: {
        abcTitle: 'Herufi za ABC na Nyota',
        abcSubtitle: 'Jifunze Herufi na Akiba',
        abcAction: 'Cheza Herufi!',
        abcPrompt: 'Tujifunze ABC za elimu ya fedha na tupate nyota za dhahabu!',
        tvTitle: 'Runinga ya T.E.A.R.S.',
        tvSubtitle: 'Tazama Video na Katuni',
        tvAction: 'Tazama Sasa!',
        tvPrompt: 'Tazama vipindi vya T.E.A.R.S. Channel pamoja na Jeanell!',
        workbookTitle: 'Kitabu cha Picha ABC',
        workbookSubtitle: 'Pesa, Akiba na Rangi',
        workbookAction: 'Fungua Kitabu!',
        workbookPrompt: 'Fungua kitabu chako cha ABC za Elimu ya Fedha!',
        magicTitle: 'Maneno ya Furaha',
        magicSubtitle: '“Mimi ni Mwerevu na Mwema”',
        magicAction: 'Sema Maneno!',
        magicPrompt: 'Sema maneno ya ushindi: Mimi ni jasiri na mwerevu!',
        planeTitle: 'Rusha Ndege Ndogo',
        planeSubtitle: 'Maabara ya Upepo na Ndege',
        planeAction: 'Ruka Sasa!',
        planePrompt: 'Rusha ndege kwenye maabara ya upepo!',
        mapTitle: 'Ramani ya Detroit',
        mapSubtitle: 'Tembelea Bustani na Maduka',
        mapAction: 'Chunguza Ramani!',
        mapPrompt: 'Tembelea bustani na vituo vya jamii vya Detroit!',
      },
    },
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    bcp47: 'pt-BR',
    regionLabel: 'Brasil, Portugal & Lusofonia',
    welcomeGreeting: 'Bem-vindo ao S.T.E.A.Reality: A Odisseia de Jeanell Land!',
    voiceSampleText:
      'Olá! Bem-vindo à Academia de Educação Financeira ABC. Complete os níveis para ganhar novas roupas, traços faciais e emojis pessoais!',
    ui: {
      helloStudent: 'Olá',
      kidsHeroSubtitle:
        'Toque em qualquer botão colorido para jogar, ouvir histórias com voz, ganhar roupas e aprender o ABC das Finanças!',
      hearFriendlyVoice: 'Ouvir Voz Amigável',
      playSplashMovie: 'Assistir Filme 🎬',
      chooseActivity: 'Escolha Sua Atividade Divertida:',
      touchAndPlay: 'Toque e Brinque! 🎈',
      levelUpButton: 'Completar Nível e Ganhar Roupa 🎁',
      languageAndAvatarBtn: 'Idioma, Voz e Avatar',
      missionHistoryBtn: 'Histórico (7 dias)',
      askMentorBtn: 'Falar com Mentora',
      pwaLiveLinksBtn: 'Links PWA ao Vivo',
      kidsHubBtn: 'Modo Crianças (6 Anos) 🎈',
      standardModeBtn: 'Modo Padrão (8+)',
      hubs: {
        academy: 'Academia e Diplomas',
        steam: 'Laboratórios S.T.E.A.M.',
        detroit: 'Detroit e Segurança',
        wealth: 'Mentalidade e Riqueza',
      },
      kidsCards: {
        abcTitle: 'ABC Fonética e Estrelas',
        abcSubtitle: 'A de Avião · B de Banco',
        abcAction: 'Jogar Letras!',
        abcPrompt: 'Vamos aprender o ABC da Educação Financeira e ganhar estrelas douradas!',
        tvTitle: 'TV Infantil T.E.A.R.S.',
        tvSubtitle: 'Vídeos Divertidos e Desenhos',
        tvAction: 'Assistir Vídeo!',
        tvPrompt: 'Assista ao canal T.E.A.R.S. com Jeanell!',
        workbookTitle: 'Grande Apostila Ilustrada',
        workbookSubtitle: 'Dinheiro, Poupança e Pintura',
        workbookAction: 'Abrir Apostila!',
        workbookPrompt: 'Abra sua apostila colorida do ABC da Educação Financeira!',
        magicTitle: 'Palavras Mágicas Felizes',
        magicSubtitle: 'Afirmações: “Sou Inteligente e Gentil”',
        magicAction: 'Dizer Palavras!',
        magicPrompt: 'Diga palavras felizes: Sou corajoso, inteligente e capaz!',
        planeTitle: 'Voar Aviões',
        planeSubtitle: 'Laboratório de Túnel de Vento',
        planeAction: 'Voar Agora!',
        planePrompt: 'Faça o avião voar alto no túnel de vento!',
        mapTitle: 'Mapa de Detroit',
        mapSubtitle: 'Explore Parques, Escolas e Lojas',
        mapAction: 'Explorar Mapa!',
        mapPrompt: 'Explore os parques e centros comunitários de Detroit!',
      },
    },
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    bcp47: 'hi-IN',
    regionLabel: 'भारत और वैश्विक समुदाय',
    welcomeGreeting: 'S.T.E.A.Reality: जीनेल लैंड फाइनेंशियल और विज्ञान अकादमी में आपका स्वागत है!',
    voiceSampleText:
      'नमस्ते! एबीसी फाइनेंशियल लिटरेसी अकादमी में आपका स्वागत है। लेवल पूरा करें और नए कपड़े, चेहरे के फीचर्स और इमोजी जीतें!',
    ui: {
      helloStudent: 'नमस्ते',
      kidsHeroSubtitle:
        'खेलने, आवाज़ में कहानियाँ सुनने, नए कपड़े और इमोजी जीतने और वित्तीय साक्षरता सीखने के लिए किसी भी बड़े बटन को छुएं!',
      hearFriendlyVoice: 'मित्रवत आवाज़ सुनें',
      playSplashMovie: 'मूवी देखें 🎬',
      chooseActivity: 'अपनी मज़ेदार गतिविधि चुनें:',
      touchAndPlay: 'छुएं और खेलें! 🎈',
      levelUpButton: 'लेवल पूरा करें और पोशाक पाएं 🎁',
      languageAndAvatarBtn: 'भाषा, आवाज़ और अवतार',
      missionHistoryBtn: '7-दिन का इतिहास',
      askMentorBtn: 'मेंटर से पूछें',
      pwaLiveLinksBtn: 'लाइव PWA लिंक',
      kidsHubBtn: 'बच्चों का मोड (6 वर्ष) 🎈',
      standardModeBtn: 'स्टैंडर्ड मोड (8+)',
      hubs: {
        academy: 'अकादमी और डिप्लोमा',
        steam: 'S.T.E.A.M. प्रयोगशालाएं',
        detroit: 'डेट्रॉइट और सुरक्षा',
        wealth: 'मानसिकता और संपत्ति',
      },
      kidsCards: {
        abcTitle: 'ABC अक्षर और सितारे',
        abcSubtitle: 'बचत और वित्त के अक्षर सीखें',
        abcAction: 'अक्षर खेलें!',
        abcPrompt: 'आइए वित्तीय साक्षरता के एबीसी सीखें और सुनहरे सितारे जीतें!',
        tvTitle: 'T.E.A.R.S. किड्स टीवी',
        tvSubtitle: 'मज़ेदार वीडियो और कार्टून देखें',
        tvAction: 'वीडियो देखें!',
        tvPrompt: 'जीनेल के साथ T.E.A.R.S. चैनल देखें!',
        workbookTitle: 'बड़ी चित्र कार्यपुस्तिका',
        workbookSubtitle: 'पैसा, बचत और रंग भरना',
        workbookAction: 'पुस्तिका खोलें!',
        workbookPrompt: 'अपनी रंगीन एबीसी वित्तीय कार्यपुस्तिका खोलें!',
        magicTitle: 'जादुई खुशहाल शब्द',
        magicSubtitle: '“मैं समझदार और दयालु हूँ”',
        magicAction: 'शब्द बोलें!',
        magicPrompt: 'खुशहाल शब्द बोलें: मैं बहादुर हूँ, मैं समझदार हूँ!',
        planeTitle: 'खिलौना विमान उड़ाएं',
        planeSubtitle: 'पवन सुरंग उड़ान प्रयोगशाला',
        planeAction: 'अभी उड़ान भरें!',
        planePrompt: 'पवन सुरंग में विमान उड़ाएं!',
        mapTitle: 'डेट्रॉइट शहर का नक्शा',
        mapSubtitle: 'पार्क, स्कूल और दुकानें देखें',
        mapAction: 'नक्शा देखें!',
        mapPrompt: 'डेट्रॉइट के पार्कों और सामुदायिक केंद्रों की सैर करें!',
      },
    },
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Èdè Yorùbá',
    flag: '🇳🇬',
    bcp47: 'yo-NG',
    regionLabel: 'Nàìjíríà & Àgbáyé',
    welcomeGreeting: 'Ẹ káàbọ̀ sí S.T.E.A.Reality: Ilé-Ẹ̀kọ́ Jeanell Land!',
    voiceSampleText:
      'Ẹ káàbọ̀! Kọ́ ẹ̀kọ́ ìṣúná ABC, parí ìpele kọ̀ọ̀kan láti gba aṣọ tuntun, ẹwà ojú àti àmì emoji tirẹ!',
    ui: {
      helloStudent: 'Báwo ni',
      kidsHeroSubtitle:
        'Tẹ bọ́tìnì ńlá kan láti ṣeré, gbọ́ ìtàn ohùn, gba aṣọ tuntun àti emoji, kí o sì kọ́ ABC ìṣúná!',
      hearFriendlyVoice: 'Gbọ́ Ohùn Ọ̀rẹ́',
      playSplashMovie: 'Wo Fídíò 🎬',
      chooseActivity: 'Yan Eré Rẹ:',
      touchAndPlay: 'Tẹ̀ Ẹ́ Kí O Ṣeré! 🎈',
      levelUpButton: 'Parí Ìpele & Gba Aṣọ 🎁',
      languageAndAvatarBtn: 'Èdè, Ohùn & Àwòrán',
      missionHistoryBtn: 'Ìtàn Ọjọ́ 7',
      askMentorBtn: 'Bèèrè Olùkọ́',
      pwaLiveLinksBtn: 'Àwọn Ìjápọ̀ PWA',
      kidsHubBtn: 'Ọmọdé (Ọdún 6) 🎈',
      standardModeBtn: 'Àgbà (8+)',
      hubs: {
        academy: 'Ilé-Ẹ̀kọ́ & Іwé-Ẹ̀rí',
        steam: 'gbọ̀ngàn S.T.E.A.M.',
        detroit: 'Detroit & Ààbò',
        wealth: 'Ọgbọ́n & Ọrọ̀',
      },
      kidsCards: {
        abcTitle: 'Lẹ́tà ABC & Àwọn Ìràwọ̀',
        abcSubtitle: 'Kọ́ Lẹ́tà àtiÌfowópamọ́',
        abcAction: 'Ṣeré Lẹ́tà!',
        abcPrompt: 'Ẹ jẹ́ ká kọ́ ABC ètò ìṣúná ká sì gba ìràwọ̀ wúrà!',
        tvTitle: 'Tẹlifíṣọ̀n T.E.A.R.S.',
        tvSubtitle: 'Wo Fídíò àti Àwòrán',
        tvAction: 'Wo Fídíò!',
        tvPrompt: 'Wo ìkànnì T.E.A.R.S. pẹ̀lú Jeanell!',
        workbookTitle: 'Ìwé Àwòrán Ńlá ABC',
        workbookSubtitle: 'Owó, Ìfowópamọ́ & Àwọ̀',
        workbookAction: 'Ṣí Ìwé!',
        workbookPrompt: 'Ṣí ìwé ẹ̀kọ́ ìṣúná ABC rẹ!',
        magicTitle: 'Ọ̀rọ̀ Ayọ̀ Alágbára',
        magicSubtitle: '“Mo Gbọ́n, Mo sì Dára”',
        magicAction: 'Sọ Ọ̀rọ̀!',
        magicPrompt: 'Sọ ọ̀rọ̀ ayọ̀: Mo ní ìgboyà, mo sì gbọ́n!',
        planeTitle: 'Fo Ọkọ̀ Òfurufú',
        planeSubtitle: 'Gbọ̀ngàn Afẹ́fẹ́ Ọkọ̀ Òfurufú',
        planeAction: 'Fò Báyìí!',
        planePrompt: 'Fo ọkọ̀ òfurufú kékeré nínú gbọ̀ngàn afẹ́fẹ́!',
        mapTitle: 'Máàpù Ìlú Detroit',
        mapSubtitle: 'ṢàwáríỌgbà àti Ilé-Ìwé',
        mapAction: 'Wo Máàpù!',
        mapPrompt: 'Ṣàwárí ìlú Detroit àti àwọn ilé-ẹ̀kọ́!',
      },
    },
  },
  {
    code: 'tl',
    name: 'Tagalog / Filipino',
    nativeName: 'Tagalog',
    flag: '🇵🇭',
    bcp47: 'fil-PH',
    regionLabel: 'Pilipinas at Buong Mundo',
    welcomeGreeting: 'Maligayang pagdating sa S.T.E.A.Reality: Ang Odisea ni Jeanell Land!',
    voiceSampleText:
      'Kumusta! Maligayang pagdating sa ABC Financial Literacy Academy. Tapusin ang mga level para makuha ang mga bagong damit, mukha, at sariling emojis!',
    ui: {
      helloStudent: 'Kumusta',
      kidsHeroSubtitle:
        'Pindutin ang malalaking makukulay na button para maglaro, makinig sa boses, kumita ng damit at emojis, at matuto ng ABC ng Pananalapi!',
      hearFriendlyVoice: 'Pakinggan ang Boses',
      playSplashMovie: 'Panoorin ang Pelikula 🎬',
      chooseActivity: 'Piliin ang Masayang Gawain:',
      touchAndPlay: 'Pindutin at Maglaro! 🎈',
      levelUpButton: 'Tapusin ang Level & Damit 🎁',
      languageAndAvatarBtn: 'Wika, Boses at Avatar',
      missionHistoryBtn: 'Kasaysayan (7 Araw)',
      askMentorBtn: 'Tanungin si Mentor',
      pwaLiveLinksBtn: 'Live na Links ng PWA',
      kidsHubBtn: 'Para sa Bata (Edad 6) 🎈',
      standardModeBtn: 'Standard Mode (8+)',
      hubs: {
        academy: 'Akademya at Diploma',
        steam: 'S.T.E.A.M. Labs',
        detroit: 'Detroit at Kaligtasan',
        wealth: 'Kaisipan at Yaman',
      },
      kidsCards: {
        abcTitle: 'ABC Palabigkasan at Bituin',
        abcSubtitle: 'A para sa Airfoil · B para sa Badyet',
        abcAction: 'Maglaro ng Letra!',
        abcPrompt: 'Pag-aralan natin ang ABC ng Financial Literacy at manalo ng gintong bituin!',
        tvTitle: 'T.E.A.R.S. Kids TV',
        tvSubtitle: 'Manood ng Masayang Video',
        tvAction: 'Manood Ngayon!',
        tvPrompt: 'Manood ng T.E.A.R.S. Channel kasama si Jeanell!',
        workbookTitle: 'Makulay na Workbook',
        workbookSubtitle: 'Pera, Ipon at Pagkukulay',
        workbookAction: 'Buksan ang Aklat!',
        workbookPrompt: 'Buksan ang iyong makulay na ABC Financial Literacy workbook!',
        magicTitle: 'Masasayang Salita',
        magicSubtitle: '“Ako ay Matalino at Mabait”',
        magicAction: 'Sabihin Ito!',
        magicPrompt: 'Sabihin: Ako ay matapang, matalino, at kaya kong magtagumpay!',
        planeTitle: 'Magpalipad ng Eroplano',
        planeSubtitle: 'Aero Wind Tunnel Lab',
        planeAction: 'Lumipad Na!',
        planePrompt: 'Magpalipad ng eroplano sa wind tunnel!',
        mapTitle: 'Mapa ng Lungsod ng Detroit',
        mapSubtitle: 'Tuklasin ang mga Parke at Tindahan',
        mapAction: 'Tingnan ang Mapa!',
        mapPrompt: 'Tuklasin ang mga parke at paaralan sa Detroit!',
      },
    },
  },
];

export type VoicePersonaId = 'jeanell_mentor' | 'captain_marcus' | 'goldie_star' | 'professor_aura';

export interface VoicePersona {
  id: VoicePersonaId;
  name: string;
  role: string;
  emoji: string;
  pitch: number;
  rate: number;
  preferredGender: 'female' | 'male';
  description: string;
}

export const VOICE_PERSONAS: VoicePersona[] = [
  {
    id: 'jeanell_mentor',
    name: 'Founder Jeanell Land',
    role: 'Warm Aeronautical & Financial Mentor',
    emoji: '👩🏾‍✈️',
    pitch: 1.08,
    rate: 0.96,
    preferredGender: 'female',
    description: 'Encouraging, clear mentor voice ideal for guided reading and financial coaching.',
  },
  {
    id: 'goldie_star',
    name: 'Goldie Star',
    role: 'Cheerful Kids & Phonics Coach',
    emoji: '🌟',
    pitch: 1.24,
    rate: 0.94,
    preferredGender: 'female',
    description: 'Bright, joyful storytelling voice designed for 6-year-old phonics and affirmations.',
  },
  {
    id: 'captain_marcus',
    name: 'Captain Marcus Vance',
    role: 'S.T.E.A.M. Flight Commander',
    emoji: '🧑🏾‍🚀',
    pitch: 0.88,
    rate: 1.0,
    preferredGender: 'male',
    description: 'Confident mission control voice for Wind Tunnel, Rocket Propulsion, and Trade Labs.',
  },
  {
    id: 'professor_aura',
    name: 'Professor AURA',
    role: 'Multilingual Global Scholar',
    emoji: '🎓',
    pitch: 1.0,
    rate: 0.92,
    preferredGender: 'female',
    description: 'Calm, articulate academic narrator for World History, Law Library, and Contracts.',
  },
];

export interface AvatarOutfit {
  id: string;
  name: string;
  unlockLevel: number;
  emoji: string;
  primaryColor: string;
  secondaryColor: string;
  accentLabel: string;
  description: string;
}

export const AVATAR_OUTFITS: AvatarOutfit[] = [
  {
    id: 'outfit_scholar_hoodie',
    name: 'Detroit Academy Hoodie',
    unlockLevel: 1,
    emoji: '🧥',
    primaryColor: '#0284c7',
    secondaryColor: '#38bdf8',
    accentLabel: 'ABC ACADEMY',
    description: 'Starter academy hoodie with embroidered ABC Financial Literacy crest.',
  },
  {
    id: 'outfit_kids_star',
    name: 'Star Explorer Jumper',
    unlockLevel: 1,
    emoji: '🌟',
    primaryColor: '#f59e0b',
    secondaryColor: '#fde047',
    accentLabel: 'STAR KID',
    description: 'Bright golden star jumper unlocked at Level 1.',
  },
  {
    id: 'outfit_aero_flight',
    name: 'NACA Wind Tunnel Flight Suit',
    unlockLevel: 2,
    emoji: '🛩️',
    primaryColor: '#0f766e',
    secondaryColor: '#2dd4bf',
    accentLabel: 'AERO PILOT',
    description: 'Earned upon completing Level 2! High-altitude aeronautical test pilot flight suit.',
  },
  {
    id: 'outfit_realty_broker',
    name: 'All Your Needs Reality Broker Blazer',
    unlockLevel: 3,
    emoji: '🏢',
    primaryColor: '#1e1b4b',
    secondaryColor: '#fbbf24',
    accentLabel: 'BROKER LLC',
    description: 'Earned upon completing Level 3! Executive navy & gold Principal Broker blazer.',
  },
  {
    id: 'outfit_tears_anchor',
    name: 'T.E.A.R.S. Channel Broadcast Suit',
    unlockLevel: 4,
    emoji: '📺',
    primaryColor: '#881337',
    secondaryColor: '#fb7185',
    accentLabel: 'TEARS TV',
    description: 'Earned upon completing Level 4! Silver-trimmed television producer & anchor suit.',
  },
  {
    id: 'outfit_goldie_couture',
    name: "Goldie's Unique Beauty Royal Couture",
    unlockLevel: 5,
    emoji: '👑',
    primaryColor: '#581c87',
    secondaryColor: '#e879f9',
    accentLabel: 'GOLDIE VIP',
    description: 'Earned upon completing Level 5! Runway couture with sovereign gold trim.',
  },
  {
    id: 'outfit_sovereign_astronaut',
    name: 'Sovereign Diamond Astronaut Armor',
    unlockLevel: 6,
    emoji: '💎',
    primaryColor: '#0f172a',
    secondaryColor: '#22d3ee',
    accentLabel: 'SOVEREIGN',
    description: 'Earned upon completing Level 6! Commander space-flight & wealth sovereignty suit.',
  },
];

export interface FacialFeatureOption {
  id: string;
  category: 'hair' | 'eyes' | 'eyewear' | 'smile';
  name: string;
  unlockLevel: number;
  emoji: string;
}

export const FACIAL_FEATURES: FacialFeatureOption[] = [
  // Hair & Crowns
  { id: 'hair_curls', category: 'hair', name: 'Natural Curls', unlockLevel: 1, emoji: '🦱' },
  { id: 'hair_braids', category: 'hair', name: 'Royal Box Braids', unlockLevel: 1, emoji: '💁🏾‍♀️' },
  { id: 'hair_fade', category: 'hair', name: 'Clean Detroit Fade', unlockLevel: 1, emoji: '💇🏾‍♂️' },
  { id: 'hair_puffs', category: 'hair', name: 'Double Star Puffs', unlockLevel: 2, emoji: '🎀' },
  { id: 'hair_locs', category: 'hair', name: 'Sovereign Locs', unlockLevel: 3, emoji: '🦁' },
  { id: 'hair_gold_crown', category: 'hair', name: 'Golden Sovereign Crown', unlockLevel: 5, emoji: '👑' },

  // Eyes
  { id: 'eyes_bright', category: 'eyes', name: 'Bright Curious Eyes', unlockLevel: 1, emoji: '👀' },
  { id: 'eyes_confident', category: 'eyes', name: 'Confident Leader Gaze', unlockLevel: 1, emoji: '✨' },
  { id: 'eyes_starry', category: 'eyes', name: 'Starlight Dreamer Eyes', unlockLevel: 2, emoji: '🤩' },
  { id: 'eyes_wink', category: 'eyes', name: 'Clever Sovereign Wink', unlockLevel: 4, emoji: '😉' },

  // Eyewear & Accessories
  { id: 'eyewear_none', category: 'eyewear', name: 'No Eyewear', unlockLevel: 1, emoji: '😊' },
  { id: 'eyewear_scholar', category: 'eyewear', name: 'Scholar Reading Frames', unlockLevel: 1, emoji: '👓' },
  { id: 'eyewear_aviator', category: 'eyewear', name: 'Wind Tunnel Pilot Goggles', unlockLevel: 2, emoji: '🥽' },
  { id: 'eyewear_broker_gold', category: 'eyewear', name: 'Broker Gold-Rim Glasses', unlockLevel: 3, emoji: '🕶️' },
  { id: 'eyewear_holo_visor', category: 'eyewear', name: 'S.T.E.A.R.S. Cyber Holo-Visor', unlockLevel: 6, emoji: '⚡' },

  // Smiles & Expressions
  { id: 'smile_warm', category: 'smile', name: 'Warm Friendly Smile', unlockLevel: 1, emoji: '🙂' },
  { id: 'smile_joyful', category: 'smile', name: 'Big Joyful Grin', unlockLevel: 1, emoji: '😄' },
  { id: 'smile_determined', category: 'smile', name: 'Focused Engineer Smile', unlockLevel: 2, emoji: '😤' },
  { id: 'smile_royal', category: 'smile', name: 'Radiant Winner Beam', unlockLevel: 4, emoji: '😁' },
];

export interface PersonalEmojiOption {
  emoji: string;
  label: string;
  unlockLevel: number;
}

export const PERSONAL_EMOJIS: PersonalEmojiOption[] = [
  { emoji: '🌟', label: 'Shining Star', unlockLevel: 1 },
  { emoji: '🎈', label: 'Balloon Joy', unlockLevel: 1 },
  { emoji: '🦋', label: 'Butterfly Growth', unlockLevel: 1 },
  { emoji: '🦁', label: 'Detroit Lion Heart', unlockLevel: 1 },
  { emoji: '🚀', label: 'Rocket Pioneer', unlockLevel: 2 },
  { emoji: '🛩️', label: 'Aero Flyer', unlockLevel: 2 },
  { emoji: '🏡', label: 'Realty Broker', unlockLevel: 3 },
  { emoji: '🎙️', label: 'TEARS Anchor', unlockLevel: 4 },
  { emoji: '👑', label: 'Goldie Royalty', unlockLevel: 5 },
  { emoji: '💎', label: 'Sovereign Diamond', unlockLevel: 6 },
];

export const SKIN_TONES = [
  { id: 'tone_1', color: '#F7D7C4', label: 'Warm Ivory' },
  { id: 'tone_2', color: '#E8B89A', label: 'Golden Honey' },
  { id: 'tone_3', color: '#C68642', label: 'Amber Bronze' },
  { id: 'tone_4', color: '#8D5524', label: 'Rich Chestnut' },
  { id: 'tone_5', color: '#5C3317', label: 'Deep Espresso' },
  { id: 'tone_6', color: '#3B1E0E', label: 'Obsidian Cocoa' },
];

export interface UserPreferencesAndAvatarState {
  hasCompletedInitialSetup: boolean;
  language: SupportedLanguageCode;
  voicePersona: VoicePersonaId;
  personalEmoji: string;
  skinTone: string;
  hairId: string;
  eyesId: string;
  eyewearId: string;
  smileId: string;
  outfitId: string;
}

const PREFS_STORAGE_KEY = 'steareality_user_lang_avatar_v1';

export function loadUserPreferences(): UserPreferencesAndAvatarState {
  try {
    const raw = localStorage.getItem(PREFS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return {
    hasCompletedInitialSetup: false,
    language: 'en',
    voicePersona: 'jeanell_mentor',
    personalEmoji: '🌟',
    skinTone: '#8D5524',
    hairId: 'hair_braids',
    eyesId: 'eyes_bright',
    eyewearId: 'eyewear_scholar',
    smileId: 'smile_joyful',
    outfitId: 'outfit_scholar_hoodie',
  };
}

export function saveUserPreferences(state: UserPreferencesAndAvatarState): void {
  try {
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function speakWithPersona(
  text: string,
  langCode: SupportedLanguageCode,
  personaId: VoicePersonaId
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const langObj =
      SUPPORTED_LANGUAGES.find((l) => l.code === langCode) || SUPPORTED_LANGUAGES[0];
    const persona =
      VOICE_PERSONAS.find((v) => v.id === personaId) || VOICE_PERSONAS[0];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langObj.bcp47;
    utterance.pitch = persona.pitch;
    utterance.rate = persona.rate;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const langPrefix = langObj.bcp47.split('-')[0].toLowerCase();
      const matchingLangVoices = voices.filter((v) =>
        v.lang.toLowerCase().startsWith(langPrefix)
      );
      if (matchingLangVoices.length > 0) {
        utterance.voice = matchingLangVoices[0];
      }
    }

    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech synthesis errors on unsupported browsers
  }
}
