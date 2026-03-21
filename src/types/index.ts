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
  type: 'Mobile' | 'Web' | 'Desktop';
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
