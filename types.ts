
export interface ProjectText {
  title: string;
  category: string;
  description: string;
  pitch: string;
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
}