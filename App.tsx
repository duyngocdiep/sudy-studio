
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';
import type { Project } from './types';
import { initialProjects, translations } from './data';
import Vimeo from '@vimeo/player';

// --- ICONS ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ProjectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>;
const AboutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ContactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

// --- CONTEXT ---
type Language = 'en' | 'vi';
interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
  t: (key: keyof typeof translations.en) => string;
}
const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const t = useCallback((key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  }, [language]);

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    projects,
    updateProjects,
    t
  }), [language, projects, t]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// --- COMPONENTS ---

const VideoModal: React.FC<{ vimeoId: string; title: string; onClose: () => void }> = ({ vimeoId, title, onClose }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const vimeoPlayer = useRef<Vimeo.Player | null>(null);

  useEffect(() => {
    if (playerRef.current) {
      vimeoPlayer.current = new Vimeo(playerRef.current, {
        id: parseInt(vimeoId, 10),
        width: 1280,
        height: 720,
        autoplay: true,
        responsive: true,
      });
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      vimeoPlayer.current?.destroy();
    };
  }, [vimeoId, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 fade-in" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-black shadow-2xl shadow-pink-500/20" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 -right-0 text-white text-3xl z-10">&times;</button>
        <div ref={playerRef} className="w-full aspect-video" />
        <h3 className="text-center p-4 bg-black text-lg">{title}</h3>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  onPlayVideo: (vimeoId: string, title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPlayVideo }) => {
    const { language } = useAppContext();
    const projectText = project[language];

    const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (project.vimeoId) {
            onPlayVideo(project.vimeoId, projectText.title);
        }
    };

    return (
        <Link to={`/project/${project.id}`} className="group block text-left fade-in">
            <div className="relative overflow-hidden bg-zinc-800 shadow-lg" style={{ aspectRatio: '4 / 3' }}>
                <img src={project.thumbnailUrl} alt={projectText.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {project.vimeoId && (
                     <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                            onClick={handlePlayClick}
                            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-pink-500/50"
                            aria-label={`Play trailer for ${projectText.title}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            <div className="pt-4">
                <p className="text-xs uppercase tracking-widest text-pink-400 font-semibold">{projectText.category}</p>
                <h3 className="text-lg font-bold mt-1 text-gray-200 group-hover:text-white transition-colors">{projectText.title}</h3>
            </div>
        </Link>
    );
};


const Sidebar: React.FC = () => {
  const { t } = useAppContext();
  const navItems = [
    { to: "/", icon: <HomeIcon />, label: t('navHome') },
    { to: "/projects", icon: <ProjectIcon />, label: t('navProjects') },
    { to: "/about", icon: <AboutIcon />, label: t('navAbout') },
    { to: "/contact", icon: <ContactIcon />, label: t('navContact') },
  ];
  return (
    <aside className="fixed top-0 left-0 h-full w-20 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-30">
        <nav className="flex flex-col space-y-8">
            {navItems.map(item => (
                <NavLink 
                    key={item.to}
                    to={item.to} 
                    className={({ isActive }) => `relative group text-gray-400 hover:text-pink-400 transition-colors duration-300 ${isActive ? 'text-pink-500' : ''}`}
                    title={item.label}
                >
                    {item.icon}
                    <span className="absolute left-full ml-4 w-auto min-w-max px-3 py-1 bg-gray-800 text-white text-xs rounded-md scale-0 group-hover:scale-100 transition-transform origin-left">
                        {item.label}
                    </span>
                </NavLink>
            ))}
        </nav>
    </aside>
  );
};


// --- PAGES ---

const Home: React.FC<{ onPlayVideo: (vimeoId: string, title: string) => void }> = ({ onPlayVideo }) => {
  const { projects, language, t } = useAppContext();
  const mainProject = projects[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="h-screen flex items-center justify-start text-white bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-12 md:px-24 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-brand font-black uppercase tracking-wider text-shadow-lg">{mainProject[language].title}</h1>
          <p className="text-xl md:text-2xl mt-4 text-pink-300">{t('heroSubtitle')}</p>
          <Link to="/projects" className="mt-8 inline-block border-2 border-white px-8 py-3 text-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300">
            {t('heroButton')}
          </Link>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 font-brand">{t('galleryTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {projects.map(p => <ProjectCard key={p.id} project={p} onPlayVideo={onPlayVideo} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectsPage: React.FC<{ onPlayVideo: (vimeoId: string, title: string) => void }> = ({ onPlayVideo }) => {
    const { projects, t } = useAppContext();
    return (
        <div className="pt-24 pb-12 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-brand font-black text-center mb-16">{t('navProjects')}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {projects.map(p => <ProjectCard key={p.id} project={p} onPlayVideo={onPlayVideo} />)}
                </div>
            </div>
        </div>
    );
};

const ProjectDetail: React.FC = () => {
  const { projects, language } = useAppContext();
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div className="pt-20 text-center">Project not found.</div>;
  }

  const projectText = project[language];

  return (
    <div className="min-h-screen pt-24 pb-12 fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <p className="text-pink-400 uppercase tracking-widest">{projectText.category}</p>
            <h1 className="text-6xl font-brand font-black my-4">{projectText.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
                <h2 className="text-3xl font-bold mb-4">Pitch</h2>
                <p className="text-lg leading-relaxed text-gray-300">{projectText.pitch}</p>
                <h2 className="text-3xl font-bold mt-8 mb-4">Description</h2>
                <p className="text-lg leading-relaxed text-gray-300">{projectText.description}</p>
            </div>
            <div className="flex flex-col gap-8">
                {project.images.map((img, index) => (
                    <img key={index} src={img} alt={`${projectText.title} scene ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-2xl shadow-black/50" />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
    const { language } = useAppContext();
    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-6xl font-brand font-black mb-4">SUDY FILM STUDIO</h1>
                <p className="text-2xl text-pink-400 mb-8">Redefining Cinema with Artificial Intelligence</p>
                <div className="max-w-3xl mx-auto text-lg text-gray-300 leading-loose">
                    {language === 'vi' ? (
                        <>
                            <p>SUDY FILM STUDIO đi tiên phong trong kỷ nguyên làm phim mới, nơi công nghệ AI tiên tiến kết hợp với tầm nhìn nghệ thuật táo bạo để tạo ra những trải nghiệm điện ảnh bom tấn chưa từng có.</p>
                            <p className="mt-4">Được thành lập bởi Trương Điền Duy, studio của chúng tôi chuyên tâm vào việc phá vỡ các ranh giới của việc kể chuyện bằng hình ảnh. Chúng tôi tận dụng AI không chỉ như một công cụ, mà như một đối tác sáng tạo, cho phép chúng tôi xây dựng những thế giới phức tạp, tạo ra những hiệu ứng hình ảnh ngoạn mục và kể những câu chuyện gây tiếng vang sâu sắc ở cấp độ con người.</p>
                        </>
                    ) : (
                        <>
                            <p>SUDY FILM STUDIO pioneers a new era of filmmaking, where cutting-edge AI technology merges with bold artistic vision to create unparalleled blockbuster cinematic experiences.</p>
                            <p className="mt-4">Founded by Trương Điền Duy, our studio is dedicated to pushing the boundaries of visual storytelling. We leverage AI not just as a tool, but as a creative partner, enabling us to build intricate worlds, generate breathtaking visual effects, and tell stories that resonate deeply on a human level.</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const Contact: React.FC = () => {
    const { language } = useAppContext();
    const tools = [
        { name: "SUDY MASTER SCRIPT", desc_en: "AI tool for film production support.", desc_vi: "Công cụ AI hỗ trợ làm phim.", link: "https://ai.studio/apps/drive/1z5RKYHiB0doSbniRRSk-oOCeB8fTDhLJ" },
        { name: "SUDY MAGIC TOOL", desc_en: "AI-powered tool for professional photography.", desc_vi: "Công cụ AI cho nhiếp ảnh chuyên nghiệp.", link: "https://ai.studio/apps/drive/1fvOVAddGw7G5ZdRFs_8cgTNbTD4wRsB1" },
        { name: "SUDY ARCHITECTURE", desc_en: "AI assistant for architecture and interior design.", desc_vi: "Trợ lý AI cho kiến trúc và nội thất.", link: "https://ai.studio/apps/drive/1uPpUx0cK1Ck7JxOoEQ_hqYI1dsITzDxg" }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h1 className="text-6xl font-brand font-black mb-4">{language === 'vi' ? 'Liên Hệ' : 'Contact Us'}</h1>
                    <p className="text-xl text-gray-400 mb-8">{language === 'vi' ? 'Kết nối với chúng tôi hoặc khám phá các công cụ AI của chúng tôi.' : 'Get in touch or explore our suite of AI tools.'}</p>
                    <p className="text-2xl font-semibold">contact@sudyfilm.studio</p>
                </div>

                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8">{language === 'vi' ? 'Bộ Công Cụ AI' : 'AI Tool Suite'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {tools.map(tool => (
                            <a href={tool.link} key={tool.name} target="_blank" rel="noopener noreferrer" className="bg-zinc-900 p-6 rounded-lg text-center hover:bg-pink-900/50 hover:scale-105 transition-all duration-300">
                                <h3 className="text-xl font-bold text-pink-400">{tool.name}</h3>
                                <p className="mt-2 text-gray-300">{language === 'vi' ? tool.desc_vi : tool.desc_en}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- LAYOUT & MAIN APP ---

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t, language, setLanguage } = useAppContext();
    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            <header className="fixed top-0 left-20 right-0 h-24 flex items-center justify-between px-8 z-40 bg-gradient-to-b from-black/70 to-transparent">
                 <Link to="/" className="text-2xl font-brand font-bold tracking-widest text-white hover:text-pink-400 transition-colors duration-300">
                    SUDY FILM STUDIO
                 </Link>
                 <div>
                    <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded ${language === 'en' ? 'bg-pink-500 text-white' : 'bg-gray-700'}`}>EN</button>
                    <button onClick={() => setLanguage('vi')} className={`px-3 py-1 text-sm rounded ml-2 ${language === 'vi' ? 'bg-pink-500 text-white' : 'bg-gray-700'}`}>VI</button>
                 </div>
            </header>
            <Sidebar />
            <main className="ml-20">
                {children}
            </main>
            <footer className="ml-20 py-6 text-center text-gray-500">
                &copy; {new Date().getFullYear()} SUDY FILM STUDIO | {t('founder')}: Trương Điền Duy
            </footer>
        </div>
    );
};

export default function App() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  const handlePlayVideo = (id: string, title: string) => {
    setActiveVideo({ id, title });
  };
  
  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <AppProvider>
      <HashRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home onPlayVideo={handlePlayVideo} />} />
            <Route path="/projects" element={<ProjectsPage onPlayVideo={handlePlayVideo} />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </MainLayout>
        {activeVideo && (
          <VideoModal 
            vimeoId={activeVideo.id} 
            title={activeVideo.title}
            onClose={handleCloseVideo} 
          />
        )}
      </HashRouter>
    </AppProvider>
  );
}
