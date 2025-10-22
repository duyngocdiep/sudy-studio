import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
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
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

// --- CONTEXT ---
type Language = 'en' | 'vi';
interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
  t: (key: keyof typeof translations.en) => string;
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}
const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');

  const t = useCallback((key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  }, [language]);

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };
  
  const login = (user: string, pass: string): boolean => {
    if (user === 'Sudy' && pass === '12345') {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    projects,
    updateProjects,
    t,
    isAuthenticated,
    login,
    logout,
  }), [language, projects, t, isAuthenticated]);

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
  isCompact?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPlayVideo, isCompact }) => {
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
            <div className="relative overflow-hidden bg-zinc-800 shadow-lg" style={{ aspectRatio: '16 / 9' }}>
                <img src={project.thumbnailUrl} alt={projectText.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {project.vimeoId && (
                     <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                            onClick={handlePlayClick}
                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-pink-500/50"
                            aria-label={`Play trailer for ${projectText.title}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            <div className={isCompact ? "pt-2" : "pt-4"}>
                <p className={`text-xs uppercase tracking-widest text-pink-400 font-semibold ${isCompact ? 'truncate' : ''}`}>{projectText.category}</p>
                <h3 className={`font-bold mt-1 text-gray-200 group-hover:text-white transition-colors ${isCompact ? 'text-base truncate' : 'text-lg'}`}>{projectText.title}</h3>
            </div>
        </Link>
    );
};


const Sidebar: React.FC = () => {
  const { t, isAuthenticated, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: "/", icon: <HomeIcon />, label: t('navHome') },
    { to: "/projects", icon: <ProjectIcon />, label: t('navProjects') },
    { to: "/about", icon: <AboutIcon />, label: t('navAbout') },
    { to: "/contact", icon: <ContactIcon />, label: t('navContact') },
  ];
  return (
    <aside className="fixed top-0 left-0 h-full w-20 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-between py-8 z-30">
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
        <div className="flex flex-col space-y-8">
            <NavLink 
                to={isAuthenticated ? "/admin" : "/login"}
                className={({ isActive }) => `relative group text-gray-400 hover:text-pink-400 transition-colors duration-300 ${isActive ? 'text-pink-500' : ''}`}
                title={t('admin')}
            >
                <CogIcon />
                <span className="absolute left-full ml-4 w-auto min-w-max px-3 py-1 bg-gray-800 text-white text-xs rounded-md scale-0 group-hover:scale-100 transition-transform origin-left">
                    {t('admin')}
                </span>
            </NavLink>
            {isAuthenticated && (
                 <button
                    onClick={handleLogout}
                    className="relative group text-gray-400 hover:text-pink-400 transition-colors duration-300"
                    title="Logout"
                >
                    <LogoutIcon />
                     <span className="absolute left-full ml-4 w-auto min-w-max px-3 py-1 bg-gray-800 text-white text-xs rounded-md scale-0 group-hover:scale-100 transition-transform origin-left">
                        Logout
                    </span>
                </button>
            )}
        </div>
    </aside>
  );
};


// --- PAGES ---

const Home: React.FC<{ onPlayVideo: (vimeoId: string, title: string) => void }> = ({ onPlayVideo }) => {
  const { projects, language, t } = useAppContext();
  const mainProject = projects[0];
  const [currentSlide, setCurrentSlide] = useState(0);
  const visibleSlides = 4;

  const nextSlide = () => {
    if (currentSlide < projects.length - visibleSlides) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section 
        className="h-full w-full flex items-center justify-start text-white bg-cover bg-center"
        style={{ backgroundImage: `url('https://i.postimg.cc/J7DtzZ0m/Generated-Image-October-23-2025-1-34AM.png')` }}
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
      
      {/* Gallery Slider Section */}
      <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-black via-black/90 to-transparent z-20 flex items-end pb-8">
        <div className="w-full relative">
            <div className="w-[90%] max-w-7xl mx-auto overflow-hidden">
               <div className="flex -mx-3 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)` }}>
                    {projects.map((p) => (
                       <div key={p.id} className="px-3 flex-shrink-0" style={{ width: `${100 / visibleSlides}%` }}>
                         <ProjectCard project={p} onPlayVideo={onPlayVideo} isCompact={true} />
                       </div>
                    ))}
               </div>
            </div>

            <button onClick={prevSlide} disabled={currentSlide === 0} className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} disabled={currentSlide >= projects.length - visibleSlides} className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
      </div>
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
                <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">{projectText.pitch}</p>
                <h2 className="text-3xl font-bold mt-8 mb-4">Description</h2>
                <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">{projectText.description}</p>
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
    const { language, t } = useAppContext();
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
                    <div className="space-y-2 text-xl">
                        <p>
                            Email: <a href={`mailto:${t('contactEmail')}`} className="font-semibold hover:text-pink-400 transition-colors">{t('contactEmail')}</a>
                        </p>
                        <p>
                            Phone: <a href={`tel:${t('contactPhone').replace(/\s/g, '')}`} className="font-semibold hover:text-pink-400 transition-colors">{t('contactPhone')}</a>
                        </p>
                    </div>
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

// --- ADMIN & AUTH COMPONENTS ---

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-zinc-900 rounded-lg shadow-2xl shadow-pink-500/10">
        <div className="text-center">
          <h1 className="text-4xl font-brand font-black">Admin Login</h1>
          <p className="text-gray-400">Access your dashboard</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button type="submit" className="w-full px-6 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition-colors">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const emptyProject: Project = {
  id: '',
  en: { title: '', category: '', description: '', pitch: '' },
  vi: { title: '', category: '', description: '', pitch: '' },
  thumbnailUrl: '',
  images: [],
  vimeoId: '',
};

const RichTextInput: React.FC<{
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}> = ({ id, name, value, onChange, rows = 8 }) => {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-md focus-within:ring-1 focus-within:ring-pink-500 focus-within:border-pink-500 transition-shadow duration-200">
      <div className="p-2 border-b border-zinc-700 flex items-center space-x-3 text-gray-400">
        {/* Placeholder toolbar */}
        <button type="button" className="font-bold w-6 h-6 hover:bg-zinc-700 rounded">B</button>
        <button type="button" className="italic w-6 h-6 hover:bg-zinc-700 rounded">I</button>
        <button type="button" className="underline w-6 h-6 hover:bg-zinc-700 rounded">U</button>
        <div className="border-l border-zinc-600 h-5"></div>
        <button type="button" title="Insert Image" className="flex items-center justify-center w-6 h-6 hover:bg-zinc-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </button>
      </div>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full bg-zinc-800 p-3 text-white placeholder-zinc-500 focus:outline-none resize-y"
        style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
      />
    </div>
  );
};


const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSave }) => {
  const [formData, setFormData] = useState<Project>(project ? { ...project, images: [...project.images] } : emptyProject);
  const [activeTab, setActiveTab] = useState<'en' | 'vi'>('en');

  useEffect(() => {
    setFormData(project ? { ...project, images: [...project.images] } : { ...emptyProject, id: `new-project-${Date.now()}` });
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang?: 'en' | 'vi') => {
    const { name, value } = e.target;
    if (lang) {
      setFormData(prev => ({
        ...prev,
        [lang]: { ...prev[lang], [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, images: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const FormField: React.FC<{ name: string, label: string, value: string, isTextarea?: boolean, lang?: 'en' | 'vi' }> = ({ name, label, value, isTextarea, lang }) => (
    <div>
        <label htmlFor={`${name}-${lang || ''}`} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        {isTextarea ? (
             <RichTextInput
                id={`${name}-${lang || ''}`}
                name={name}
                value={value}
                onChange={(e) => handleChange(e, lang)}
                rows={name === 'pitch' ? 10 : 4}
            />
        ) : (
            <input type="text" id={`${name}-${lang || ''}`} name={name} value={value} onChange={(e) => handleChange(e, lang)} className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:ring-pink-500 focus:border-pink-500" />
        )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 fade-in" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-zinc-900 shadow-2xl shadow-pink-500/20 rounded-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-zinc-900 p-6 border-b border-zinc-800 z-10 flex justify-between items-center">
          <h2 className="text-2xl font-brand">{project ? 'Edit Project' : 'Add New Project'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="id" label="Project ID (slug)" value={formData.id} />
                <FormField name="thumbnailUrl" label="Thumbnail URL" value={formData.thumbnailUrl} />
            </div>
             <FormField name="vimeoId" label="Vimeo ID (optional)" value={formData.vimeoId || ''} />
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-300 mb-1">Images (comma-separated URLs)</label>
              <textarea id="images" name="images" value={formData.images.join(', ')} onChange={handleImageChange} rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:ring-pink-500 focus:border-pink-500" />
            </div>

            <div className="border-t border-zinc-800 pt-6">
                <div className="flex border-b border-zinc-700 mb-4">
                    <button type="button" onClick={() => setActiveTab('en')} className={`px-4 py-2 text-lg ${activeTab === 'en' ? 'border-b-2 border-pink-500 text-white' : 'text-gray-400'}`}>English</button>
                    <button type="button" onClick={() => setActiveTab('vi')} className={`px-4 py-2 text-lg ${activeTab === 'vi' ? 'border-b-2 border-pink-500 text-white' : 'text-gray-400'}`}>Vietnamese</button>
                </div>

                <div className="space-y-4">
                    {activeTab === 'en' && (
                        <div className="space-y-4 fade-in">
                            <FormField name="title" label="Title (EN)" value={formData.en.title} lang="en" />
                            <FormField name="category" label="Category (EN)" value={formData.en.category} lang="en" />
                            <FormField name="pitch" label="Pitch (EN)" value={formData.en.pitch} isTextarea lang="en" />
                            <FormField name="description" label="Description (EN)" value={formData.en.description} isTextarea lang="en" />
                        </div>
                    )}
                    {activeTab === 'vi' && (
                        <div className="space-y-4 fade-in">
                            <FormField name="title" label="Title (VI)" value={formData.vi.title} lang="vi" />
                            <FormField name="category" label="Category (VI)" value={formData.vi.category} lang="vi" />
                            <FormField name="pitch" label="Pitch (VI)" value={formData.vi.pitch} isTextarea lang="vi" />
                            <FormField name="description" label="Description (VI)" value={formData.vi.description} isTextarea lang="vi" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-zinc-800">
                <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-white bg-zinc-700 hover:bg-zinc-600 transition">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-md text-white bg-pink-600 hover:bg-pink-700 transition ml-4">Save Project</button>
            </div>
        </form>
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { projects, updateProjects, t } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };
  
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
        const newProjects = projects.filter(p => p.id !== projectId);
        updateProjects(newProjects);
    }
  };

  const handleSave = (projectToSave: Project) => {
    let newProjects;
    const isEditing = editingProject && projects.some(p => p.id === editingProject.id);

    if (isEditing && editingProject) {
        newProjects = projects.map(p => p.id === editingProject.id ? projectToSave : p);
    } else {
        if (projects.some(p => p.id === projectToSave.id)) {
            alert('Error: Project ID already exists. Please use a unique ID.');
            return;
        }
        newProjects = [...projects, projectToSave];
    }
    updateProjects(newProjects);
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-brand font-black">{t('admin')}</h1>
          <button onClick={handleAddNew} className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition-colors">
              Add New Project
          </button>
        </div>

        <div className="bg-zinc-900 rounded-lg shadow-lg">
          <ul className="divide-y divide-zinc-800">
            {projects.map(project => (
              <li key={project.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg text-white">{project.en.title}</p>
                  <p className="text-sm text-gray-400">{project.id}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => handleEdit(project)} className="text-blue-400 hover:text-blue-300">Edit</button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-400">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <ProjectModal project={editingProject} onClose={handleCloseModal} onSave={handleSave} />
      )}
    </div>
  );
};


// --- LAYOUT & MAIN APP ---

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t, language, setLanguage } = useAppContext();
    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            <header className="fixed top-0 left-20 right-0 h-28 flex items-center justify-center px-8 z-40 bg-gradient-to-b from-black/70 to-transparent">
                 <Link to="/" className="flex items-center justify-center group">
                    <img src="https://i.postimg.cc/G2b6tZvS/Generated-image-1-22.png" alt="SUDY FILM STUDIO Logo" className="h-20 group-hover:opacity-90 transition-opacity duration-300" />
                 </Link>
                 <div className="absolute top-1/2 right-8 -translate-y-1/2">
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
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
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