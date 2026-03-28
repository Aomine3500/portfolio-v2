import { AppContent } from '../types';

const PROFILE_IMAGE_URL = "https://i.imgur.com/OzNgKWc.jpeg"; 
const GAZTRACK_IMAGE_URL = "/gaztrack/gaztrack-pro-card.jpg";

const contactInfoBase = {
  phone: ["+216 92 258 245", "+216 55 318 929"],
  email: ["ahmed.znouda@gmail.com", "ahmedznouda@outlook.fr"],
  linkedin: "https://www.linkedin.com/in/ahmedznouda/",
  github: "https://github.com/Aomine3500",
  facebook: "https://www.facebook.com/ahmadZNOUDA",
  twitter: "https://x.com/AhmedZnouda",
  threads: "https://www.threads.com/@ahmadznouda"
};

export const content: { en: AppContent; fr: AppContent } = {
  en: {
    personalInfo: {
      name: "Ahmed Znouda",
      title: "Software Developer",
      about: "I have more than 8 years of experience in the IT field, varying between technical assistance and full-stack development. My journey spans from legacy desktop applications (WinDev) to modern web (MERN Stack) and mobile solutions (Flutter). I am passionate about building robust cross-platform applications and solving complex technical challenges.",
      heroImage: PROFILE_IMAGE_URL,
    },
    contactInfo: {
      ...contactInfoBase,
      address: "82 Wahran St. 8020 Soliman - Nabeul, Tunisia",
    },
    experiences: [
      {
        id: 1,
        role: "Flutter Developer",
        company: "Freelance / Personal Project",
        location: "Remote, Tunisia",
        period: "Aug 2024 - Present",
        description: [
          "Designed and developed 'Gaztrack Pro', a comprehensive cross-platform application (Web & Mobile) for managing gas bottle distribution.",
          "Implemented real-time tracking features and inventory management.",
          "Utilized Dart and Flutter ecosystem for a seamless UI/UX."
        ],
        isCurrent: true
      },
      {
        id: 2,
        role: "Freelancer Developer",
        company: "Self-Employed",
        location: "Remote Work, Tunisia",
        period: "Sep 2020 - Present",
        description: [
          "Develop web and desktop applications using PCSoft WinDev and WebDev platforms.",
          "Provide custom software solutions for small to medium businesses.",
          "Maintain and upgrade legacy systems for clients."
        ],
        isCurrent: true
      },
      {
        id: 3,
        role: "Developer and Technical Assistant",
        company: "Business News Consulting",
        location: "Hammam-Lif, Tunisia",
        period: "Sep 2018 - June 2022",
        description: [
          "Developed and implemented 'Balance Management' application for the company 'BONNA Tunisia'.",
          "Managed and maintained company applications including Payroll, Accounting, and Commercial Management (GestComprod, Immo).",
          "Provided hardware and software maintenance for internal infrastructure."
        ]
      },
      {
        id: 4,
        role: "Technical Back Office",
        company: "YM Call Center",
        location: "Tunis, Tunisia",
        period: "Nov 2016 - Jun 2018",
        description: [
          "Responsible for software deployment, installation, and configuration.",
          "Handled incident analysis and follow-up requiring advanced technical expertise.",
          "Ensured operational continuity for call center agents."
        ]
      },
      {
        id: 5,
        role: "Freelancer",
        company: "Remote",
        location: "Tunisia",
        period: "Feb 2016 - Jun 2018",
        description: [
          "Provided freelance services for document handling (Word, PowerPoint) and simple modeling.",
          "Member of a freelance development team working on various web and mobile specifications."
        ]
      },
      {
        id: 6,
        role: "Help Desk Analyst",
        company: "Ivocall Center",
        location: "Hammam-Lif, Tunisia",
        period: "Feb 2016 - Nov 2016",
        description: [
          "Remote intervention using Citrix/TeamViewer.",
          "Outlook configuration and troubleshooting.",
          "Active Directory account management and creation."
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: "Full Stack JS Developer (MERN)",
        institution: "GoMyCode",
        location: "Tunis, Tunisia",
        period: "Jan 2021 - Jun 2021",
        details: "Obtained Full Stack JS Developer Certification."
      },
      {
        id: 2,
        degree: "Master's Degree in Pervasive Systems",
        institution: "FST (Faculty of Sciences of Tunis)",
        location: "Tunis, Tunisia",
        period: "Sept 2013 - Oct 2015",
        details: "Completed 1st year, interrupted in 2nd year."
      },
      {
        id: 3,
        degree: "Computer Sciences Licence",
        institution: "FST (Faculty of Sciences of Tunis)",
        location: "Tunis, Tunisia",
        period: "Sep 2010 - Jun 2013",
        details: "Obtained the Licence in Computer Sciences."
      },
      {
        id: 4,
        degree: "English B1 Certification",
        institution: "AMIDEAST",
        location: "Tunis, Tunisia",
        period: "Mar 2013 - Jun 2013",
        details: "Level 5 (B1) Certification."
      },
      {
        id: 5,
        degree: "Bachelor's Degree",
        institution: "Secondary School",
        location: "Tunisia",
        period: "Sep 2009 - Jun 2010",
        details: "Computer Sciences major."
      }
    ],
    skillCategories: [
      {
        name: "Development Stack",
        skills: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "TypeScript", "Flutter", "Dart", "Tailwind CSS"]
      },
      {
        name: "Legacy & Desktop",
        skills: ["WinDev", "WebDev", "C# (Basic)", "Java (Basic)"]
      },
      {
        name: "Database",
        skills: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "Firebase"]
      },
      {
        name: "IT Support & Tools",
        skills: ["Active Directory", "Citrix", "TeamViewer", "Windows Server", "Office Suite"]
      },
      {
        name: "Languages",
        skills: ["Arabic (Native)", "French (Fluent)", "English (B1 - Good)"]
      }
    ],
    projects: [
      {
        id: 1,
        title: "Gaztrack Pro",
        description: "A modern cross-platform application (Web & Mobile) designed to streamline the distribution and management of gas bottles. Features include inventory tracking, delivery management, and reporting.",
        techStack: ["Flutter", "Dart", "Firebase", "Google Maps API"],
        type: "Mobile & Web",
        types: ["Mobile", "Web"],
        image: GAZTRACK_IMAGE_URL
      },
      {
        id: 2,
        title: "Balance Management System",
        description: "An industrial application developed for BONNA Tunisia to manage weighing scales and integration with the central ERP system.",
        techStack: ["WinDev", "SQL Server", "Serial Port Comm"],
        type: "Desktop",
        image: "https://picsum.photos/id/2/600/400"
      },
      {
        id: 3,
        title: "Mind Suite",
        description: "A voice-powered mental wellness app using AI to guide users through clinically validated psychological self-assessments (PHQ-9, GAD-7, Burnout, Loneliness). Coming soon on Android & iOS.",
        techStack: ["Flutter", "Dart", "Firebase", "AI Voice"],
        type: "Mobile",
        types: ["Mobile"],
        image: "/mindsuite/logo.png",
        sourceUrl: "https://github.com/Aomine3500/mind_suite"
      }
    ],
    ui: {
      nav: [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Experience', href: '#experience', id: 'experience' },
        { name: 'Skills', href: '#skills', id: 'skills' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Education', href: '#education', id: 'education' },
        { name: 'Contact', href: '#contact', id: 'contact' },
      ],
      hero: {
        contactBtn: "Contact Me",
        downloadBtn: "Download CV",
        scroll: "Scroll",
        roles: ["Flutter Developer", "MERN Stack Expert", "Software Engineer"]
      },
      about: {
        title: "About Me",
        cards: {
          frontend: { title: "Frontend", desc: "ReactJS, Flutter, TypeScript" },
          backend: { title: "Backend", desc: "NodeJS, MongoDB, SQL" },
          legacy: { title: "Legacy", desc: "WinDev, Desktop Apps" },
        }
      },
      experience: {
        title: "Work Experience",
        subtitle: "My professional journey and career milestones",
        currentBadge: "Current"
      },
      skills: {
        title: "Technical Skills",
        subtitle: "Technologies and tools I work with",
        searchPlaceholder: "Search a skill (e.g., React, SQL)..."
      },
      projects: {
        title: "Featured Projects",
        subtitle: "Highlights from my development portfolio",
        sourceBtn: "Source",
        demoBtn: "Demo",
        filters: {
          all: "All Projects",
          mobile: "Mobile",
          web: "Web",
          desktop: "Desktop"
        }
      },
      education: {
        title: "Education & Certifications",
        subtitle: "Academic background and professional development",
        badge: "Academic Path"
      },
      contact: {
        title: "Let's Work Together",
        subtitle: "I am currently available for freelance projects or full-time opportunities. Whether you have a question about Flutter, MERN stack, or just want to say hi, I'll try my best to get back to you!",
        phoneLabel: "Phone",
        emailLabel: "Email",
        locationLabel: "Location",
        formTitle: "Send a Message",
        nameLabel: "Name",
        emailInputLabel: "Email",
        messageLabel: "Message",
        sendBtn: "Send Message",
        sendingBtn: "Sending...",
        sentBtn: "Message Sent!",
        footer: "All rights reserved."
      },
      gaztrackPro: {
        backBtn: "Back to Portfolio",
        description: [
          "Gaztrack Pro is a comprehensive platform designed to streamline the distribution and management of domestic gas bottles.",
          "It features a mobile application that helps gas truck drivers accurately record their sales on the go, and a powerful web administration dashboard to track driver activities, monitor inventory, and manage overall sales operations.",
          "This project was developed within **GDH Management and Consulting** company, where I served as the lead developer."
        ],
        webDashboard: "Web Dashboard",
        mobileApp: "Mobile App",
        featuresTitle: "Key Features",
        features: [
          "Real-time sales tracking for drivers",
          "Comprehensive web dashboard for administrators",
          "Inventory and delivery management",
          "Detailed reporting and analytics"
        ],
        demoBtnLabel: "Request a Demo",
        demoMessage: "I would like to request a demo of the \"Gaztrack Pro\" application."
      },
      mindSuite: {
        backBtn: "Back to Portfolio",
        tagline: "Where clinical science meets the warmth of conversation.",
        description: [
          "Mind Suite is a voice-powered mental wellness application that guides users through structured psychological self-assessments using an intelligent AI voice assistant.",
          "Instead of cold checkbox forms, users engage in a natural spoken dialogue — the AI listens, asks questions gently, and adapts the conversation to the selected assessment. The result is a more human, comfortable experience without compromising on scientific rigor."
        ],
        comingSoon: "Coming Soon",
        inDevelopment: "In Development",
        highlightsTitle: "Why Mind Suite?",
        highlights: {
          voice: "Voice-first experience — speak naturally, the AI listens and adapts, no forms to fill.",
          ai: "AI-powered conversational engine guided by internationally recognized clinical scales.",
          privacy: "Your conversations and results are fully confidential and never shared with third parties.",
          crossPlatform: "Cross-platform (Android, iOS, Web) — coming soon on Android & iOS stores."
        },
        assessmentsTitle: "Clinically Validated Assessments",
        assessments: {
          phq9: { domain: "Depression", desc: "Patient Health Questionnaire — the gold standard for measuring depressive symptom severity." },
          gad7: { domain: "Anxiety", desc: "Generalized Anxiety Disorder scale — widely adopted across clinical and research settings." },
          loneliness: { scale: "UCLA", domain: "Loneliness", desc: "Evaluates perceived social connectedness and feelings of isolation in daily life." },
          burnout: { scale: "MBI", domain: "Burnout", desc: "Measures emotional, physical, and cognitive depletion related to occupational stress." }
        },
        howItWorksTitle: "How It Works",
        steps: [
          "Choose an assessment to explore",
          "The AI opens the session calmly",
          "Speak naturally — AI adapts to you",
          "Receive a clear interpreted summary"
        ],
        disclaimerTitle: "An Important Note",
        disclaimer: "Mind Suite is a self-awareness and screening tool, not a clinical diagnostic service. If your results suggest elevated concern, we warmly encourage you to seek support from a qualified mental health professional.",
        demoBtnLabel: "Request a Demo",
        demoUnavailableHint: "Feature coming soon"
      }
    }
  },
  fr: {
    personalInfo: {
      name: "Ahmed Znouda",
      title: "Développeur Logiciel",
      about: "J'ai plus de 8 ans d'expérience dans le domaine de l'informatique, variant entre l'assistance technique et le développement d'applications Web et Desktop. Mon parcours s'étend des applications desktop héritées (WinDev) aux solutions modernes web (MERN Stack) et mobiles (Flutter). Je suis passionné par la création d'applications multiplateformes robustes et la résolution de défis techniques complexes.",
      heroImage: PROFILE_IMAGE_URL,
    },
    contactInfo: {
      ...contactInfoBase,
      address: "82 Rue Wahran, 8020 Soliman - Nabeul, Tunisie",
    },
    experiences: [
      {
        id: 1,
        role: "Développeur Flutter",
        company: "Freelance / Projet Personnel",
        location: "Télétravail, Tunisie",
        period: "Août 2024 - Présent",
        description: [
          "Conception et développement de 'Gaztrack Pro', une application multiplateforme (Web & Mobile) pour la gestion de la distribution de bouteilles de gaz.",
          "Mise en œuvre de fonctionnalités de suivi en temps réel et de gestion des stocks.",
          "Utilisation de Dart et de l'écosystème Flutter pour une UI/UX fluide."
        ],
        isCurrent: true
      },
      {
        id: 2,
        role: "Développeur Freelance",
        company: "Indépendant",
        location: "Télétravail, Tunisie",
        period: "Sep 2020 - Présent",
        description: [
          "Développement d'applications web et desktop sur les plateformes PCSoft WinDev et WebDev.",
          "Fourniture de solutions logicielles sur mesure pour les petites et moyennes entreprises.",
          "Maintenance et mise à niveau des systèmes existants pour les clients."
        ],
        isCurrent: true
      },
      {
        id: 3,
        role: "Développeur et Assistant Technique",
        company: "Business News Consulting",
        location: "Hammam-Lif, Tunisie",
        period: "Sep 2018 - Juin 2022",
        description: [
          "Développement et mise en œuvre de l'application 'Gestion Balance' pour la société 'BONNA Tunisie'.",
          "Gestion et maintenance des applications de l'entreprise (Paie, Comptabilité, GestComprod, Immo).",
          "Maintenance matérielle et logicielle de l'infrastructure interne."
        ]
      },
      {
        id: 4,
        role: "Back Office Technique",
        company: "YM Call Center",
        location: "Tunis, Tunisie",
        period: "Nov 2016 - Juin 2018",
        description: [
          "Responsable du déploiement, de l'installation et de la configuration des logiciels.",
          "Traitement et suivi des incidents nécessitant une expertise technique avancée.",
          "Assurer la continuité opérationnelle pour les agents du centre d'appels."
        ]
      },
      {
        id: 5,
        role: "Freelance",
        company: "À distance",
        location: "Tunisie",
        period: "Fév 2016 - Juin 2018",
        description: [
          "Services freelance pour la gestion de documents (Word, PowerPoint) et la modélisation simple.",
          "Membre d'une équipe de développement freelance travaillant sur diverses spécifications web et mobiles."
        ]
      },
      {
        id: 6,
        role: "Analyste Help Desk",
        company: "Centre Ivocall",
        location: "Hammam-Lif, Tunisie",
        period: "Fév 2016 - Nov 2016",
        description: [
          "Intervention à distance via Citrix/TeamViewer.",
          "Configuration et dépannage Outlook.",
          "Gestion et création de comptes Active Directory."
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: "Développeur Full Stack JS (MERN)",
        institution: "GoMyCode",
        location: "Tunis, Tunisie",
        period: "Jan 2021 - Juin 2021",
        details: "Obtention de la certification Développeur Full Stack JS."
      },
      {
        id: 2,
        degree: "Master en Systèmes Pervasifs",
        institution: "FST (Faculté des Sciences de Tunis)",
        location: "Tunis, Tunisia",
        period: "Sept 2013 - Oct 2015",
        details: "1ère année complétée, interrompue en 2ème année."
      },
      {
        id: 3,
        degree: "Licence en Informatique",
        institution: "FST (Faculté des Sciences de Tunis)",
        location: "Tunis, Tunisie",
        period: "Sep 2010 - Juin 2013",
        details: "Obtention de la Licence en Informatique."
      },
      {
        id: 4,
        degree: "Certification Anglais B1",
        institution: "AMIDEAST",
        location: "Tunis, Tunisie",
        period: "Mar 2013 - Juin 2013",
        details: "Certification Niveau 5 (B1)."
      },
      {
        id: 5,
        degree: "Baccalauréat",
        institution: "Lycée Secondaire",
        location: "Tunisie",
        period: "Sep 2009 - Juin 2010",
        details: "Spécialité Sciences de l'Informatique."
      }
    ],
    skillCategories: [
      {
        name: "Stack de Développement",
        skills: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "TypeScript", "Flutter", "Dart", "Tailwind CSS"]
      },
      {
        name: "Legacy & Desktop",
        skills: ["WinDev", "WebDev", "C# (Basique)", "Java (Basique)"]
      },
      {
        name: "Base de Données",
        skills: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "Firebase"]
      },
      {
        name: "Support IT & Outils",
        skills: ["Active Directory", "Citrix", "TeamViewer", "Windows Server", "Suite Office"]
      },
      {
        name: "Langues",
        skills: ["Arabe (Natif)", "Français (Courant)", "Anglais (B1 - Bon)"]
      }
    ],
    projects: [
      {
        id: 1,
        title: "Gaztrack Pro",
        description: "Une application multiplateforme moderne (Web & Mobile) conçue pour rationaliser la distribution et la gestion des bouteilles de gaz. Fonctionnalités incluant le suivi des stocks, la gestion des livraisons et le reporting.",
        techStack: ["Flutter", "Dart", "Firebase", "API Google Maps"],
        type: "Mobile & Web",
        types: ["Mobile", "Web"],
        image: GAZTRACK_IMAGE_URL
      },
      {
        id: 2,
        title: "Système de Gestion de Balance",
        description: "Une application industrielle développée pour BONNA Tunisia afin de gérer les ponts-bascules et l'intégration avec le système ERP central.",
        techStack: ["WinDev", "SQL Server", "Comm Port Série"],
        type: "Desktop",
        image: "https://picsum.photos/id/2/600/400"
      },
      {
        id: 3,
        title: "Mind Suite",
        description: "Une application mobile de bien-être mental utilisant l'IA vocale pour guider les utilisateurs à travers des auto-évaluations psychologiques validées cliniquement (PHQ-9, GAD-7, Burnout, Solitude). Bientôt disponible sur Android & iOS.",
        techStack: ["Flutter", "Dart", "Firebase", "IA Vocale"],
        type: "Mobile",
        types: ["Mobile"],
        image: "/mindsuite/logo.png",
        sourceUrl: "https://github.com/Aomine3500/mind_suite"
      }
    ],
    ui: {
      nav: [
        { name: 'À propos', href: '#about', id: 'about' },
        { name: 'Expérience', href: '#experience', id: 'experience' },
        { name: 'Compétences', href: '#skills', id: 'skills' },
        { name: 'Projets', href: '#projects', id: 'projects' },
        { name: 'Éducation', href: '#education', id: 'education' },
        { name: 'Contact', href: '#contact', id: 'contact' },
      ],
      hero: {
        contactBtn: "Me Contacter",
        downloadBtn: "Télécharger CV",
        scroll: "Défiler",
        roles: ["Développeur Flutter", "Expert MERN Stack", "Ingénieur Logiciel"]
      },
      about: {
        title: "À propos de moi",
        cards: {
          frontend: { title: "Frontend", desc: "ReactJS, Flutter, TypeScript" },
          backend: { title: "Backend", desc: "NodeJS, MongoDB, SQL" },
          legacy: { title: "Legacy", desc: "WinDev, App Desktop" },
        }
      },
      experience: {
        title: "Expérience Professionnelle",
        subtitle: "Mon parcours professionnel et mes étapes clés",
        currentBadge: "Actuel"
      },
      skills: {
        title: "Compétences Techniques",
        subtitle: "Technologies et outils que je maîtrise",
        searchPlaceholder: "Rechercher une compétence (ex: React, SQL)..."
      },
      projects: {
        title: "Projets Réalisés",
        subtitle: "Points forts de mon portfolio de développement",
        sourceBtn: "Code",
        demoBtn: "Démo",
        filters: {
          all: "Tous",
          mobile: "Mobile",
          web: "Web",
          desktop: "Desktop"
        }
      },
      education: {
        title: "Éducation & Certifications",
        subtitle: "Parcours académique et développement professionnel",
        badge: "Parcours Académique"
      },
      contact: {
        title: "Travaillons Ensemble",
        subtitle: "Je suis actuellement disponible pour des projets freelance ou des opportunités à temps plein. Que vous ayez une question sur Flutter, la stack MERN, ou simplement pour dire bonjour, je ferai de mon mieux pour vous répondre !",
        phoneLabel: "Téléphone",
        emailLabel: "Email",
        locationLabel: "Localisation",
        formTitle: "Envoyer un message",
        nameLabel: "Nom",
        emailInputLabel: "Email",
        messageLabel: "Message",
        sendBtn: "Envoyer",
        sendingBtn: "Envoi...",
        sentBtn: "Envoyé !",
        footer: "Tous droits réservés."
      },
      gaztrackPro: {
        backBtn: "Retour au Portfolio",
        description: [
          "Gaztrack Pro est une plateforme complète conçue pour rationaliser la distribution et la gestion des bouteilles de gaz domestiques.",
          "Elle intègre une application mobile qui aide les chauffeurs de camions de gaz à enregistrer précisément leurs ventes en déplacement, ainsi qu'un puissant tableau de bord d'administration web pour suivre les activités des chauffeurs, contrôler les stocks et gérer l'ensemble des opérations de vente.",
          "Ce projet a été développé au sein de la société **GDH Management and Consulting**, dont j'étais le développeur principal."
        ],
        webDashboard: "Tableau de Bord Web",
        mobileApp: "Application Mobile",
        featuresTitle: "Fonctionnalités Clés",
        features: [
          "Suivi des ventes en temps réel pour les chauffeurs",
          "Tableau de bord web complet pour les administrateurs",
          "Gestion des stocks et des livraisons",
          "Rapports détaillés et analyses"
        ],
        demoBtnLabel: "Demander une Démo",
        demoMessage: "Je souhaite demander une démo de l'application \"Gaztrack Pro\"."
      },
      mindSuite: {
        backBtn: "Retour au Portfolio",
        tagline: "Là où la science clinique rencontre la chaleur de la conversation.",
        description: [
          "Mind Suite est une application de bien-être mental par voix qui guide les utilisateurs à travers des auto-évaluations psychologiques structurées, menées par un assistant IA vocal intelligent.",
          "Au lieu de formulaires impersonnels, l'utilisateur engage un dialogue parlé naturel avec l'IA qui écoute, pose des questions doucement et adapte la conversation à l'évaluation choisie. Le résultat est une expérience plus humaine et confortable, sans compromettre la rigueur scientifique."
        ],
        comingSoon: "Bientôt disponible",
        inDevelopment: "En développement",
        highlightsTitle: "Pourquoi Mind Suite ?",
        highlights: {
          voice: "Experience vocale — parlez naturellement, l'IA écoute et s'adapte, pas de formulaires.",
          ai: "Moteur conversationnel IA guidé par des échelles cliniques internationalement reconnues.",
          privacy: "Vos conversations et résultats sont entièrement confidentiels et jamais partagés.",
          crossPlatform: "Multiplateforme (Android, iOS, Web) — bientôt sur les stores Android & iOS."
        },
        assessmentsTitle: "Évaluations Validées Cliniquement",
        assessments: {
          phq9: { domain: "Dépression", desc: "Patient Health Questionnaire — la référence pour mesurer la sévérité des symptômes dépressifs." },
          gad7: { domain: "Anxieté", desc: "Échelle des troubles anxieux généralisés — largement utilisée en milieu clinique et de recherche." },
          loneliness: { scale: "UCLA", domain: "Solitude", desc: "Evalue le sentiment de connexion sociale et d'isolement perçu dans la vie quotidienne." },
          burnout: { scale: "MBI", domain: "Burnout", desc: "Mesure l'épuisement émotionnel, physique et cognitif lié au stress professionnel." }
        },
        howItWorksTitle: "Comment ça marche",
        steps: [
          "Choisissez une évaluation à explorer",
          "L'IA ouvre la session calmement",
          "Parlez naturellement — l'IA s'adapte",
          "Recevez un résumé clair et interprété"
        ],
        disclaimerTitle: "Note Importante",
        disclaimer: "Mind Suite est un outil de sensibilisation et de dépistage, pas un service de diagnostic clinique. Si vos résultats indiquent une préoccupation élevée, nous vous encourageons vivement à consulter un professionnel de santé mentale qualifié.",
        demoBtnLabel: "Demander une Démo",
        demoUnavailableHint: "Fonctionnalité bientôt disponible"
      }
    }
  }
};
