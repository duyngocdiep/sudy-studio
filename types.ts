
export interface ProjectText {
  title: string;
  category: string;
  description: string;
  pitch: string;
  director?: {
    name: string;
    link?: string;
  };
  scriptLink?: {
    text: string;
    url: string;
  };
}

export interface Project {
  id: string;
  en: ProjectText;
  vi: ProjectText;
  thumbnailUrl: string;
  images: string[];
  videoUrl?: string;
  vimeoId?: string;
  heroBackgroundUrl?: string;
  isCrowdfunding?: boolean;
  teasers?: {
    en: { title: string };
    vi: { title: string };
    vimeoId: string;
  }[];
}

export interface Sponsor {
  name: string;
}