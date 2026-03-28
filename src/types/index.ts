import { LucideIcon } from "lucide-react";

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  isCurrent?: boolean;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  demoUrl?: string;
  sourceUrl?: string;
  type: 'Mobile' | 'Web' | 'Desktop' | 'Mobile & Web';
  types?: string[];
}

export interface ContactInfo {
  phone: string[];
  email: string[];
  address: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
  twitter?: string;
  threads?: string;
}

export interface UIContent {
  nav: { name: string; href: string; id: string }[];
  hero: {
    contactBtn: string;
    downloadBtn: string;
    scroll: string;
    roles: string[];
  };
  about: {
    title: string;
    cards: {
      frontend: { title: string; desc: string };
      backend: { title: string; desc: string };
      legacy: { title: string; desc: string };
    }
  };
  experience: {
    title: string;
    subtitle: string;
    currentBadge: string;
  };
  skills: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
  };
  projects: {
    title: string;
    subtitle: string;
    sourceBtn: string;
    demoBtn: string;
    filters: {
      all: string;
      mobile: string;
      web: string;
      desktop: string;
    }
  };
  education: {
    title: string;
    subtitle: string;
    badge: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phoneLabel: string;
    emailLabel: string;
    locationLabel: string;
    formTitle: string;
    nameLabel: string;
    emailInputLabel: string;
    messageLabel: string;
    sendBtn: string;
    sendingBtn: string;
    sentBtn: string;
    footer: string;
  };
  gaztrackPro: {
    backBtn: string;
    description: string[];
    webDashboard: string;
    mobileApp: string;
    featuresTitle: string;
    features: string[];
    demoBtnLabel: string;
    demoMessage: string;
  };
  mindSuite: {
    backBtn: string;
    tagline: string;
    description: string[];
    comingSoon: string;
    inDevelopment: string;
    highlightsTitle: string;
    highlights: {
      voice: string;
      ai: string;
      privacy: string;
      crossPlatform: string;
    };
    assessmentsTitle: string;
    assessments: {
      phq9: { domain: string; desc: string };
      gad7: { domain: string; desc: string };
      loneliness: { scale: string; domain: string; desc: string };
      burnout: { scale: string; domain: string; desc: string };
    };
    howItWorksTitle: string;
    steps: string[];
    disclaimerTitle: string;
    disclaimer: string;
    demoBtnLabel: string;
    demoUnavailableHint: string;
  };
}

export interface AppContent {
  personalInfo: {
    name: string;
    title: string;
    about: string;
    heroImage: string;
  };
  contactInfo: ContactInfo;
  experiences: Experience[];
  education: Education[];
  skillCategories: SkillCategory[];
  projects: Project[];
  ui: UIContent;
}
