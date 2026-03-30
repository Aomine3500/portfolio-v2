import { AppContent } from '../types';

const PROFILE_IMAGE_URL = "/Portfolio.jpg";
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
      title: "AI Automation & Full-Stack Developer",
      about: "With 8+ years of IT experience, I specialize in building scalable software and intelligent automation systems. My expertise spans full-stack development (Flutter, MERN) and AI-driven automation using n8n and LLMs — enabling businesses to replace manual processes with smart, data-driven workflows. I don't just build apps; I architect systems that think.",
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
        name: "AI & Automation",
        skills: ["n8n", "Python for AI", "LLM Orchestration", "Automated Triage Systems", "Prompt Engineering"]
      },
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
        description: "A logistics transformation platform that digitizes gas distribution operations, eliminating manual errors and optimizing supply chains. Replaces paper-based tracking with real-time digital workflows — from driver mobile sales capture to executive-level inventory dashboards.",
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
        description: "An AI-driven mental health screening tool leveraging PHQ-9 and GAD-7 clinical protocols to deliver automated initial triage and intelligent medical guidance. An AI voice assistant conducts structured assessments, interprets results, and routes users to appropriate care pathways.",
        techStack: ["Flutter", "Dart", "Firebase", "AI Voice", "LLM Orchestration"],
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
        headline: "Scalable Software & Intelligent Automation for the Modern Enterprise.",
        contactBtn: "Book Your Free Solution Audit",
        downloadBtn: "Download CV",
        scroll: "Scroll",
        roles: ["AI Automation Expert", "Flutter Developer", "MERN Stack Expert", "Software Engineer"]
      },
      about: {
        title: "About Me",
        cards: {
          frontend: { title: "Frontend", desc: "ReactJS, Flutter, TypeScript" },
          backend: { title: "Backend", desc: "NodeJS, MongoDB, SQL" },
          legacy: { title: "Legacy", desc: "WinDev, Desktop Apps" },
          ai: { title: "AI & Automation", desc: "n8n, LLMs, Intelligent Workflows" },
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
        subtitle: "Ready to transform your business with scalable software and intelligent automation? Book a free 30-minute Solution Audit — we'll identify high-impact automation opportunities and map out a roadmap for your enterprise.",
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
          "Gaztrack Pro is a logistics transformation platform that digitizes end-to-end gas distribution operations, eliminating the manual errors and opacity endemic to paper-based supply chains.",
          "The platform couples a mobile app for field drivers — enabling precise, real-time sales capture on the go — with a powerful web administration dashboard that gives operations managers full visibility over driver activities, inventory levels, and delivery performance.",
          "Built by **GDH Management and Consulting**, where I served as lead developer, Gaztrack Pro replaces fragmented manual workflows with a unified digital supply chain, reducing errors and delivering actionable business intelligence at every level of the organization."
        ],
        webDashboard: "Web Dashboard",
        mobileApp: "Mobile App",
        featuresTitle: "Key Features",
        features: [
          "Real-time sales & delivery tracking for field drivers",
          "Supply chain digitization — eliminates paper-based errors",
          "Executive dashboard with inventory & performance analytics",
          "Automated stock reconciliation and alert system"
        ],
        demoBtnLabel: "Request a Demo",
        demoMessage: "I would like to request a demo of the \"Gaztrack Pro\" application."
      },
      mindSuite: {
        backBtn: "Back to Portfolio",
        tagline: "AI-Driven Mental Health Triage — Where Clinical Science Meets Intelligent Automation.",
        description: [
          "Mind Suite is an AI-driven mental health screening tool that leverages PHQ-9 and GAD-7 clinical protocols to deliver automated initial triage and intelligent medical guidance — bringing enterprise-grade decision automation to mental healthcare.",
          "Instead of cold checkbox forms, users engage in a natural spoken dialogue with an LLM-orchestrated AI voice assistant. The system conducts structured assessments, interprets results against validated clinical thresholds, and automatically routes users to appropriate care pathways — all without human intervention in the triage loop."
        ],
        comingSoon: "Coming Soon",
        inDevelopment: "In Development",
        highlightsTitle: "Why Mind Suite?",
        highlights: {
          voice: "Voice-first interface — speak naturally, the AI listens, adapts, and scores in real time.",
          ai: "LLM-orchestrated triage engine guided by PHQ-9, GAD-7, and other internationally validated clinical scales.",
          privacy: "All assessments are processed locally and confidentially — results never shared with third parties.",
          crossPlatform: "Cross-platform (Android, iOS, Web) — automated care pathway routing from day one."
        },
        assessmentsTitle: "Clinically Validated Assessments",
        assessments: {
          phq9: { domain: "Depression", desc: "Patient Health Questionnaire — the gold standard for automated depressive symptom scoring and initial triage." },
          gad7: { domain: "Anxiety", desc: "Generalized Anxiety Disorder scale — automated severity classification widely adopted across clinical settings." },
          loneliness: { scale: "UCLA", domain: "Loneliness", desc: "Evaluates perceived social connectedness and triggers automated support pathway recommendations." },
          burnout: { scale: "MBI", domain: "Burnout", desc: "Measures emotional and cognitive depletion — powers automated occupational health alerts." }
        },
        howItWorksTitle: "Automated Triage Flow",
        steps: [
          "User selects an assessment protocol (PHQ-9, GAD-7, etc.)",
          "AI voice assistant opens the session and conducts the interview",
          "LLM scores responses against clinical thresholds in real time",
          "System delivers an interpreted summary and routes to appropriate care"
        ],
        disclaimerTitle: "An Important Note",
        disclaimer: "Mind Suite is an automated screening and triage tool, not a clinical diagnostic service. When elevated risk is detected, the system automatically recommends consulting a qualified mental health professional.",
        demoBtnLabel: "Request a Demo",
        demoUnavailableHint: "Feature coming soon"
      }
    }
  },
  fr: {
    personalInfo: {
      name: "Ahmed Znouda",
      title: "Développeur IA & Full-Stack",
      about: "Avec 8+ ans d'expérience IT, je me spécialise dans la création de logiciels scalables et de systèmes d'automatisation intelligents. Mon expertise couvre le développement full-stack (Flutter, MERN) et l'automatisation pilotée par l'IA via n8n et les LLMs — permettant aux entreprises de remplacer les processus manuels par des workflows intelligents orientés données. Je ne construis pas seulement des applications ; j'architectorise des systèmes qui pensent.",
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
        name: "IA & Automatisation",
        skills: ["n8n", "Python pour l'IA", "Orchestration LLM", "Systèmes de Triage Automatisé", "Prompt Engineering"]
      },
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
        description: "Une plateforme de transformation logistique qui digitalise les opérations de distribution de gaz, éliminant les erreurs manuelles et optimisant les chaînes d'approvisionnement. Remplace le suivi papier par des workflows numériques en temps réel — de la capture mobile des ventes chauffeurs aux tableaux de bord exécutifs.",
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
        description: "Un outil de dépistage en santé mentale piloté par l'IA, utilisant les protocoles cliniques PHQ-9 et GAD-7 pour fournir un triage initial automatisé et une orientation médicale intelligente. Un assistant vocal IA conduit les évaluations structurées et oriente les utilisateurs vers les parcours de soins appropriés.",
        techStack: ["Flutter", "Dart", "Firebase", "IA Vocale", "Orchestration LLM"],
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
        headline: "Logiciels Scalables & Automatisation Intelligente pour l'Entreprise Moderne.",
        contactBtn: "Réserver Votre Audit Solution Gratuit",
        downloadBtn: "Télécharger CV",
        scroll: "Défiler",
        roles: ["Expert en Automatisation IA", "Développeur Flutter", "Expert MERN Stack", "Ingénieur Logiciel"]
      },
      about: {
        title: "À propos de moi",
        cards: {
          frontend: { title: "Frontend", desc: "ReactJS, Flutter, TypeScript" },
          backend: { title: "Backend", desc: "NodeJS, MongoDB, SQL" },
          legacy: { title: "Legacy", desc: "WinDev, App Desktop" },
          ai: { title: "IA & Automatisation", desc: "n8n, LLMs, Workflows Intelligents" },
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
        subtitle: "Prêt à transformer votre entreprise avec des logiciels scalables et une automatisation intelligente ? Réservez un Audit Solution gratuit de 30 minutes — nous identifierons ensemble les opportunités d'automatisation à fort impact et établirons une feuille de route pour votre entreprise.",
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
          "Gaztrack Pro est une plateforme de transformation logistique qui digitalise les opérations de distribution de gaz de bout en bout, éliminant les erreurs manuelles et l'opacité inhérentes aux chaînes d'approvisionnement basées sur le papier.",
          "La plateforme couple une application mobile pour les chauffeurs terrain — permettant une capture précise des ventes en temps réel — avec un puissant tableau de bord d'administration web offrant aux managers une visibilité totale sur les activités, les stocks et les performances.",
          "Développé par **GDH Management and Consulting**, dont j'étais le développeur principal, Gaztrack Pro remplace les workflows manuels fragmentés par une chaîne d'approvisionnement numérique unifiée, réduisant les erreurs et livrant une intelligence opérationnelle à chaque niveau de l'organisation."
        ],
        webDashboard: "Tableau de Bord Web",
        mobileApp: "Application Mobile",
        featuresTitle: "Fonctionnalités Clés",
        features: [
          "Suivi des ventes & livraisons en temps réel pour les chauffeurs terrain",
          "Digitalisation de la chaîne logistique — élimination des erreurs papier",
          "Tableau de bord exécutif avec analytics stocks & performances",
          "Réconciliation automatique des stocks et système d'alertes"
        ],
        demoBtnLabel: "Demander une Démo",
        demoMessage: "Je souhaite demander une démo de l'application \"Gaztrack Pro\"."
      },
      mindSuite: {
        backBtn: "Retour au Portfolio",
        tagline: "Triage en Santé Mentale Piloté par l'IA — La Science Clinique Rencontre l'Automatisation Intelligente.",
        description: [
          "Mind Suite est un outil de dépistage en santé mentale piloté par l'IA qui s'appuie sur les protocoles cliniques PHQ-9 et GAD-7 pour fournir un triage initial automatisé et une orientation médicale intelligente — apportant l'automatisation de décision enterprise au domaine de la santé mentale.",
          "Au lieu de formulaires impersonnels, l'utilisateur engage un dialogue naturel avec un assistant vocal IA orchestré par LLM. Le système conduit des évaluations structurées, interprète les résultats par rapport aux seuils cliniques validés, et oriente automatiquement les utilisateurs vers les parcours de soins appropriés — sans intervention humaine dans la boucle de triage."
        ],
        comingSoon: "Bientôt disponible",
        inDevelopment: "En développement",
        highlightsTitle: "Pourquoi Mind Suite ?",
        highlights: {
          voice: "Interface vocale — parlez naturellement, l'IA écoute, s'adapte et score en temps réel.",
          ai: "Moteur de triage orchestré par LLM, guidé par PHQ-9, GAD-7 et d'autres échelles cliniques validées.",
          privacy: "Toutes les évaluations sont traitées localement et confidentiellement — résultats jamais partagés.",
          crossPlatform: "Multiplateforme (Android, iOS, Web) — orientation automatique vers les parcours de soins dès le départ."
        },
        assessmentsTitle: "Évaluations Validées Cliniquement",
        assessments: {
          phq9: { domain: "Dépression", desc: "Patient Health Questionnaire — la référence pour le scoring automatisé des symptômes dépressifs et le triage initial." },
          gad7: { domain: "Anxiété", desc: "Échelle des troubles anxieux généralisés — classification automatisée de la sévérité adoptée en milieu clinique." },
          loneliness: { scale: "UCLA", domain: "Solitude", desc: "Évalue le sentiment de connexion sociale et déclenche des recommandations automatisées de parcours de soutien." },
          burnout: { scale: "MBI", domain: "Burnout", desc: "Mesure l'épuisement émotionnel et cognitif — alimente des alertes automatisées de santé au travail." }
        },
        howItWorksTitle: "Flux de Triage Automatisé",
        steps: [
          "L'utilisateur sélectionne un protocole d'évaluation (PHQ-9, GAD-7, etc.)",
          "L'assistant vocal IA ouvre la session et conduit l'entretien",
          "Le LLM score les réponses par rapport aux seuils cliniques en temps réel",
          "Le système délivre un résumé interprété et oriente vers les soins appropriés"
        ],
        disclaimerTitle: "Note Importante",
        disclaimer: "Mind Suite est un outil de dépistage et de triage automatisé, pas un service de diagnostic clinique. Lorsqu'un risque élevé est détecté, le système recommande automatiquement de consulter un professionnel de santé mentale qualifié.",
        demoBtnLabel: "Demander une Démo",
        demoUnavailableHint: "Fonctionnalité bientôt disponible"
      }
    }
  }
};
