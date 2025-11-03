

// Fix: Corrected the import statement for React and its hooks.
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import type { Project } from './types';
import { initialProjects, translations, aiTools, sponsors } from './data';
import Vimeo from '@vimeo/player';

// --- ICONS ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ProjectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>;
const AboutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ContactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

// --- CONTEXT ---
type Language = 'en' | 'vi';
interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
  t: (key: keyof (typeof translations.en | typeof translations.vi)) => any;
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
    const videoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fix: The type for a Vimeo Player instance is `Vimeo`, not `Vimeo.Player`.
        let player: Vimeo | null = null;
        let videoAspectRatio = 16 / 9;

        const setupPlayer = async () => {
            if (playerRef.current) {
                player = new Vimeo(playerRef.current, {
                    id: parseInt(vimeoId, 10),
                    autoplay: true,
                    responsive: true, // Use Vimeo's responsive parameter
                });

                try {
                    const width = await player.getVideoWidth();
                    const height = await player.getVideoHeight();
                    if (width > 0 && height > 0) {
                        videoAspectRatio = width / height;
                    }
                } catch (error) {
                    console.warn('Could not get Vimeo video dimensions, defaulting to 16:9.', error);
                }

                // Set max-width and max-height based on aspect ratio to constrain the video
                if (videoContainerRef.current) {
                    videoContainerRef.current.style.aspectRatio = `${videoAspectRatio}`;
                }
            }
        };

        setupPlayer();

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            player?.destroy();
        };
    }, [vimeoId, onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 fade-in" onClick={onClose}>
            <div
                ref={videoContainerRef}
                className="relative w-full max-w-6xl h-auto max-h-full bg-black shadow-2xl shadow-pink-500/20 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full h-full" ref={playerRef} />
                <div className="flex-shrink-0">
                   <h3 className="text-center p-2 sm:p-4 bg-black text-base sm:text-lg">{title}</h3>
                </div>
                 <button onClick={onClose} className="absolute -top-4 -right-4 sm:top-0 sm:right-0 sm:-translate-y-full sm:translate-x-full bg-black/50 rounded-full p-1 text-white text-3xl z-10">&times;</button>
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
                <p className={`text-xs uppercase tracking-widest text-pink-400 font-semibold`}>{projectText.category}</p>
                <h3 className={`font-bold mt-1 text-gray-200 group-hover:text-white transition-colors whitespace-normal ${isCompact ? 'text-base' : 'text-lg'}`}>{projectText.title}</h3>
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
    { to: "/crowdfunding", icon: <HeartIcon />, label: t('navCrowdfunding') },
    { to: "/about", icon: <AboutIcon />, label: t('navAbout') },
    { to: "/contact", icon: <ContactIcon />, label: t('navContact') },
  ];
  return (
    <aside className="fixed top-0 left-0 h-full w-20 bg-black/50 backdrop-blur-sm hidden md:flex flex-col items-center justify-between py-8 z-30">
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
  
  // --- Hero State ---
  const [heroProject, setHeroProject] = useState(projects[0]);

  // --- Background State ---
  const [bg1, setBg1] = useState(heroProject.heroBackgroundUrl || heroProject.thumbnailUrl);
  const [bg2, setBg2] = useState<string | null>(null);
  const [isBg1Active, setIsBg1Active] = useState(true);
  
  // --- Slider State ---
  const visibleSlides = 4;
  const transitionDuration = 500;
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const wheelTimeoutRef = useRef<number | null>(null);
  const touchStartXRef = useRef(0);
  const mobileGridRef = useRef<HTMLDivElement>(null);

  const displayProjects = useMemo(() => {
    if (projects.length <= visibleSlides) return projects;
    const before = projects.slice(projects.length - visibleSlides);
    const after = projects.slice(0, visibleSlides);
    return [...before, ...projects, ...after];
  }, [projects]);

  const [currentIndex, setCurrentIndex] = useState(visibleSlides);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  // --- Mobile Grid Pagination ---
  const [mobilePage, setMobilePage] = useState(0);
  const numMobilePages = useMemo(() => Math.ceil(projects.length / 4), [projects.length]);
  const mobileGridProjects = useMemo(() => {
    const start = mobilePage * 4;
    return projects.slice(start, start + 4);
  }, [mobilePage, projects]);

  const changeSlide = useCallback((direction: number) => {
    if (!isTransitioning) return;
    setCurrentIndex(prev => prev + direction);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => changeSlide(1), [changeSlide]);
  const prevSlide = useCallback(() => changeSlide(-1), [changeSlide]);
  
  const handlePrev = useCallback(() => {
    if (mobileGridRef.current && mobileGridRef.current.offsetParent !== null) {
      setMobilePage(p => (p - 1 + numMobilePages) % numMobilePages);
    } else {
      prevSlide();
    }
  }, [numMobilePages, prevSlide]);

  const handleNext = useCallback(() => {
    if (mobileGridRef.current && mobileGridRef.current.offsetParent !== null) {
      setMobilePage(p => (p + 1) % numMobilePages);
    } else {
      nextSlide();
    }
  }, [numMobilePages, nextSlide]);

  // Effect for infinite loop jump
  useEffect(() => {
    if (currentIndex === projects.length + visibleSlides || currentIndex === visibleSlides - 1) {
      transitionTimeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        const newIndex = currentIndex === projects.length + visibleSlides
          ? visibleSlides
          : projects.length + visibleSlides - 1;
        setCurrentIndex(newIndex);
      }, transitionDuration);
    }
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [currentIndex, projects.length]);

  // Effect to re-enable transitions after a jump
  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => setIsTransitioning(true), 50);
    }
  }, [isTransitioning]);
  
  // Effect for dynamic hero content based on scroll/swipe
  useEffect(() => {
    if (displayProjects.length > 0) {
      const activeProject = displayProjects[currentIndex];
      if (activeProject) {
        setHeroProject(activeProject);
      }
    }
  }, [currentIndex, displayProjects]);

  // Effect for dynamic background based on heroProject
  useEffect(() => {
    if (heroProject) {
        const newBg = heroProject.heroBackgroundUrl || heroProject.thumbnailUrl;
        if ((isBg1Active && newBg !== bg1) || (!isBg1Active && newBg !== bg2)) {
            if (isBg1Active) {
                setBg2(newBg);
            } else {
                setBg1(newBg);
            }
            setIsBg1Active(prev => !prev);
        }
    }
  }, [heroProject, bg1, bg2, isBg1Active]);
  
  // Effect for wheel and touch events
  useEffect(() => {
    const sliderEl = sliderContainerRef.current;
    if (!sliderEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelTimeoutRef.current) return;
      if (e.deltaY < -10) handlePrev();
      else if (e.deltaY > 10) handleNext();
      wheelTimeoutRef.current = window.setTimeout(() => {
        wheelTimeoutRef.current = null;
      }, 300);
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartXRef.current - touchEndX;
      if (Math.abs(diff) > 40) { // Swipe threshold
        if (diff > 0) handleNext();
        else handlePrev();
      }
    };

    sliderEl.addEventListener('wheel', handleWheel, { passive: false });
    sliderEl.addEventListener('touchstart', handleTouchStart);
    sliderEl.addEventListener('touchend', handleTouchEnd);

    return () => {
      sliderEl.removeEventListener('wheel', handleWheel);
      sliderEl.removeEventListener('touchstart', handleTouchStart);
      sliderEl.removeEventListener('touchend', handleTouchEnd);
      if(wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [handleNext, handlePrev]);

  const handleMouseLeaveSlider = () => {
    const activeProjectFromIndex = displayProjects[currentIndex];
    if (activeProjectFromIndex) {
      setHeroProject(activeProjectFromIndex);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="h-full w-full flex items-start sm:items-center justify-start text-white">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" style={{ backgroundImage: `url('${bg1}')`, opacity: isBg1Active ? 1 : 0 }}/>
            {bg2 && <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" style={{ backgroundImage: `url('${bg2}')`, opacity: !isBg1Active ? 1 : 0 }}/>}
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-4 sm:px-12 md:px-24 max-w-3xl pt-24 sm:pt-0">
          <div key={heroProject.id} className="fade-in">
            <h1 className="text-2xl leading-tight sm:text-4xl md:text-6xl font-brand font-black uppercase tracking-wider text-shadow-lg">{heroProject[language].title}</h1>
            <p className="text-lg sm:text-xl md:text-2xl mt-4 text-pink-300">{heroProject[language].category}</p>
            <Link to={`/project/${heroProject.id}`} className="mt-6 inline-block border-2 border-white px-6 py-2 text-base sm:px-8 sm:py-3 sm:text-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300">
              {t('heroButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Slider Section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-auto pt-32 pb-8 sm:pt-0 sm:pb-4 sm:h-64 bg-gradient-to-t from-black via-black/90 to-transparent z-20 flex items-end" 
        ref={sliderContainerRef}
        onMouseLeave={handleMouseLeaveSlider}
      >
        <div className="w-full relative">
            {/* Mobile 2x2 Grid */}
            <div ref={mobileGridRef} className="w-[90%] max-w-md mx-auto sm:hidden">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {mobileGridProjects.map(p => (
                  <div key={p.id} onMouseEnter={() => setHeroProject(p)}>
                    <ProjectCard project={p} onPlayVideo={onPlayVideo} isCompact={false} />
                  </div>
                ))}
              </div>
            </div>

            {/* Original Slider for sm+ screens */}
            <div className="w-[90%] max-w-7xl mx-auto overflow-hidden hidden sm:block">
               <div className="flex -mx-3" style={{ 
                    width: `${(displayProjects.length / visibleSlides) * 100}%`,
                    transform: `translateX(-${(currentIndex / displayProjects.length) * 100}%)`,
                    transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none',
                }}>
                    {displayProjects.map((p, index) => (
                       <div 
                        key={`${p.id}-${index}`} 
                        className="px-3 flex-shrink-0" 
                        style={{ width: `${100 / displayProjects.length}%` }}
                        onMouseEnter={() => setHeroProject(p)}
                       >
                         <ProjectCard project={p} onPlayVideo={onPlayVideo} isCompact={true} />
                       </div>
                    ))}
               </div>
            </div>

            <button onClick={handlePrev} className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-2 bg-white/10 p-3 rounded-full text-white hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed z-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-2 bg-white/10 p-3 rounded-full text-white hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed z-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
      </div>
    </div>
  );
};


const ProjectsPage: React.FC<{ onPlayVideo: (vimeoId: string, title: string) => void }> = ({ onPlayVideo }) => {
    const { projects, t } = useAppContext();
    return (
        <div className="pt-20 sm:pt-24 pb-12 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-brand font-black text-center mb-16">{t('navProjects')}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {projects.map(p => <ProjectCard key={p.id} project={p} onPlayVideo={onPlayVideo} />)}
                </div>
            </div>
        </div>
    );
};

const DonationModal: React.FC<{ isOpen: boolean; onClose: () => void; projectTitle: string }> = ({ isOpen, onClose, projectTitle }) => {
    const { t } = useAppContext();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Donation for project: ${projectTitle}`;
        const body = `Hello, I have made a donation for the project "${projectTitle}".\n\nMy email is: ${email}\n\nMessage:\n${message}`;
        window.location.href = `mailto:syduy.pc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 fade-in" onClick={onClose} aria-modal="true" role="dialog">
            <div className="relative w-full max-w-2xl bg-zinc-900 shadow-2xl shadow-pink-500/20 rounded-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 text-center">
                    <h2 className="text-2xl font-brand mb-2">{t('donationModalTitle')}</h2>
                    <p className="text-gray-400 mb-6">{t('donationModalDesc')}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                            <img src="https://i.postimg.cc/ncFzZp16/image.png" alt="QR Code for donation" className="mx-auto w-48 h-48 rounded-lg" />
                             <div>
                                <h3 className="font-bold text-lg text-pink-400">{t('donationBankInfo')}</h3>
                                <p>{t('donationAccountName')}</p>
                                <p>{t('donationBankName')}</p>
                            </div>
                        </div>
                        <div className="text-left space-y-4">
                            <p className="text-gray-300 text-sm">{t('donationContactPrompt')}</p>
                             <form onSubmit={handleSendEmail} className="space-y-4">
                                <div>
                                    <label htmlFor="donor-email" className="block text-sm font-medium text-gray-300 mb-1">{t('donationEmailLabel')}</label>
                                    <input type="email" id="donor-email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:ring-pink-500 focus:border-pink-500" />
                                </div>
                                <div>
                                    <label htmlFor="donor-message" className="block text-sm font-medium text-gray-300 mb-1">{t('donationMessageLabel')}</label>
                                    <textarea id="donor-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:ring-pink-500 focus:border-pink-500"></textarea>
                                </div>
                                <button type="submit" className="w-full px-6 py-2 rounded-md text-white bg-pink-600 hover:bg-pink-700 transition">
                                    {t('donationSendButton')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl" aria-label={t('donationClose')}>&times;</button>
            </div>
        </div>
    );
};

const CrowdfundingSection: React.FC<{ onDonate: () => void }> = ({ onDonate }) => {
    const { t, language } = useAppContext();
    const goal = 100000; // USD
    const raised = 13872.55; // ~13.87%
    const progress = (raised / goal) * 100;

    const currencyFormatter = useMemo(() => {
        const locale = language === 'vi' ? 'vi-VN' : 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'USD',
        });
    }, [language]);

    return (
        <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-2xl font-bold mb-4">{t('crowdfundingTitle')}</h2>
            <div className="mb-4">
                <div className="flex justify-between items-end mb-1 text-sm">
                    <span className="font-semibold text-pink-400">{t('crowdfundingRaised')}: {currencyFormatter.format(raised)}</span>
                    <span>{t('crowdfundingGoal')}: {currencyFormatter.format(goal)}</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-4 overflow-hidden">
                    <div className="bg-pink-500 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <button onClick={onDonate} className="w-full my-4 px-8 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition-colors">
                {t('crowdfundingDonate')}
            </button>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t('crowdfundingPerksTitle')}</h3>
            <ul className="space-y-2 text-gray-300 list-inside">
                {(t('crowdfundingPerks') as string[]).map((perk, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-pink-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{perk}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const ProjectDetail: React.FC<{ onPlayVideo: (vimeoId: string, title: string) => void }> = ({ onPlayVideo }) => {
  const { projects, language, t } = useAppContext();
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  
  const [fontLevel, setFontLevel] = useState(0); // 0: sm, 1: base, 2: lg, 3: xl
  const fontClasses = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
  const changeFontSize = (delta: number) => {
    setFontLevel(prev => Math.max(0, Math.min(fontClasses.length - 1, prev + delta)));
  };
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  if (!project) {
    return <div className="pt-20 text-center">Project not found.</div>;
  }

  const projectText = project[language];

  return (
    <>
      <div className="min-h-screen pt-20 sm:pt-24 pb-12 fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
              <p className="text-pink-400 uppercase tracking-widest">{projectText.category}</p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-brand font-black my-2">{projectText.title}</h1>
               {projectText.director && (
                    <p className="mt-2 text-lg text-gray-300">
                        {t('directorProducer')}: <a href={projectText.director.link} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">{projectText.director.name}</a>
                    </p>
                )}

              <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
                {project.vimeoId && (
                  <button 
                    onClick={() => onPlayVideo(project.vimeoId!, projectText.title)}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>{t('watchTrailer')}</span>
                  </button>
                )}
                {projectText.scriptLink && (
                  <a
                    href={projectText.scriptLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-700 text-white font-semibold rounded-md hover:bg-zinc-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span>{projectText.scriptLink.text}</span>
                  </a>
                )}
              </div>
              
             {project.teasers && project.teasers.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-center mb-4">{t('teasersTitle')}</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {project.teasers.map((teaser, index) => (
                            <button
                                key={index}
                                onClick={() => onPlayVideo(teaser.vimeoId, teaser[language].title)}
                                className="inline-flex items-center gap-2 px-5 py-2 bg-zinc-800 text-white font-semibold rounded-md hover:bg-zinc-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                <span>{teaser[language].title}</span>
                            </button>
                        ))}
                    </div>
                </div>
              )}
          </div>
          
          {project.id === 'pink-isle' && (
            <div className="max-w-4xl mx-auto my-12">
              <CrowdfundingSection onDonate={() => setIsDonationModalOpen(true)} />
            </div>
          )}

          <div className="max-w-4xl mx-auto">
              <div className="flex justify-end items-center gap-2 mb-4">
                  <span className="text-sm text-gray-400">Font Size:</span>
                  <button 
                      onClick={() => changeFontSize(-1)} 
                      disabled={fontLevel === 0}
                      className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                      aria-label="Decrease font size"
                  >
                      A-
                  </button>
                  <button 
                      onClick={() => changeFontSize(1)}
                      disabled={fontLevel === fontClasses.length - 1}
                      className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                      aria-label="Increase font size"
                  >
                      A+
                  </button>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-2 gap-12 items-start">
                  <div>
                      <h2 className="text-3xl font-bold mb-4">Pitch</h2>
                      <p className={`leading-relaxed text-gray-300 whitespace-pre-line ${fontClasses[fontLevel]}`}>{projectText.pitch}</p>
                      <h2 className="text-3xl font-bold mt-8 mb-4">Description</h2>
                      <p className={`leading-relaxed text-gray-300 whitespace-pre-line ${fontClasses[fontLevel]}`}>{projectText.description}</p>
                  </div>
                  <div className="flex flex-col gap-8">
                      {project.images.map((img, index) => (
                          <img key={index} src={img} alt={`${projectText.title} scene ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-2xl shadow-black/50" />
                      ))}
                  </div>
              </div>
              
              {/* Mobile Layout */}
              <div className="block lg:hidden space-y-8">
                {project.images[0] && <img src={project.images[0]} alt={`${projectText.title} scene 1`} className="w-full h-auto object-cover rounded-lg shadow-2xl shadow-black/50" />}
                <div>
                  <h2 className="text-3xl font-bold mb-4">Pitch</h2>
                  <p className={`leading-relaxed text-gray-300 whitespace-pre-line ${fontClasses[fontLevel]}`}>{projectText.pitch}</p>
                </div>
                {project.images[1] && <img src={project.images[1]} alt={`${projectText.title} scene 2`} className="w-full h-auto object-cover rounded-lg shadow-2xl shadow-black/50" />}
                <div>
                  <h2 className="text-3xl font-bold mb-4">Description</h2>
                  <p className={`leading-relaxed text-gray-300 whitespace-pre-line ${fontClasses[fontLevel]}`}>{projectText.description}</p>
                </div>
                {project.images.slice(2).map((img, index) => (
                  <img key={index + 2} src={img} alt={`${projectText.title} scene ${index + 3}`} className="w-full h-auto object-cover rounded-lg shadow-2xl shadow-black/50" />
                ))}
              </div>
          </div>

        </div>
      </div>
      {project.id === 'pink-isle' && <DonationModal isOpen={isDonationModalOpen} onClose={() => setIsDonationModalOpen(false)} projectTitle={projectText.title} />}
    </>
  );
};


const About: React.FC = () => {
    const { language } = useAppContext();
    return (
        <div className="min-h-screen pt-20 sm:pt-24 pb-12 flex items-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <img 
                    src="https://i.postimg.cc/65170K31/logo-white.png" 
                    alt="SUDY FILM STUDIO Logo Background" 
                    className="w-2/3 md:w-1/2 max-w-lg h-auto object-contain opacity-5 pointer-events-none" 
                />
            </div>
            <div className="container mx-auto px-4 text-center relative">
                <h1 className="text-4xl md:text-6xl font-brand font-black mb-4">SUDY FILM STUDIO</h1>
                <p className="text-xl md:text-2xl text-pink-400 mb-8">Redefining Cinema with Artificial Intelligence</p>
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

    return (
        <div className="min-h-screen pt-20 sm:pt-24 pb-12 flex items-center relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center z-0">
                <img 
                    src="https://i.postimg.cc/65170K31/logo-white.png" 
                    alt="SUDY FILM STUDIO Logo Background" 
                    className="w-2/3 md:w-1/2 max-w-lg h-auto object-contain opacity-5 pointer-events-none" 
                />
            </div>
            <div className="container mx-auto px-4 relative">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-brand font-black mb-4">{language === 'vi' ? 'Liên Hệ' : 'Contact Us'}</h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-8">{language === 'vi' ? 'Kết nối với chúng tôi hoặc khám phá các công cụ AI của chúng tôi.' : 'Get in touch or explore our suite of AI tools.'}</p>
                    <div className="space-y-2 text-lg md:text-xl">
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
                        {aiTools.map(tool => (
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

const CrowdfundingPage: React.FC<{ onPlayVideo: (vimeoId: string, title: string) => void }> = ({ onPlayVideo }) => {
    const { projects, t } = useAppContext();
    const crowdfundingProjects = projects.filter(p => p.isCrowdfunding);

    return (
        <div className="pt-20 sm:pt-24 pb-12 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-5xl font-brand font-black mb-4">{t('crowdfundingPageTitle')}</h1>
                    <p className="text-lg text-gray-400">{t('crowdfundingPageDesc')}</p>
                </div>
                
                <div className="my-16">
                    <h2 className="text-3xl font-bold text-center mb-8">{t('crowdfundingProjectsTitle')}</h2>
                    {crowdfundingProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-7xl mx-auto">
                            {crowdfundingProjects.map(p => <ProjectCard key={p.id} project={p} onPlayVideo={onPlayVideo} />)}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">There are currently no projects seeking funding. Check back soon!</p>
                    )}
                </div>

                <div className="w-full h-px bg-zinc-800 max-w-5xl mx-auto my-16"></div>

                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">{t('crowdfundingSponsorsTitle')}</h2>
                    <p className="text-gray-400 mb-12">{t('crowdfundingThanks')}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                        <div>
                            <h3 className="text-2xl font-semibold text-pink-400 mb-4 border-b-2 border-pink-500/30 pb-2">{t('sponsorsOrganizations')}</h3>
                            <ul className="space-y-3">
                                {sponsors.organizations.map(sponsor => (
                                    <li key={sponsor.name} className="text-lg text-gray-300">{sponsor.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-pink-400 mb-4 border-b-2 border-pink-500/30 pb-2">{t('sponsorsIndividuals')}</h3>
                             <ul className="space-y-3">
                                {sponsors.individuals.map(sponsor => (
                                    <li key={sponsor.name} className="text-lg text-gray-300">{sponsor.name}</li>
                                ))}
                            </ul>
                        </div>
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
    <div className="min-h-screen flex items-center justify-center p-4">
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
  isCrowdfunding: false,
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
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({...prev, [name]: checked }));
        return;
    }

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
  
  const FormField: React.FC<{ name: string, label: string, value: string | boolean, type?: string, isTextarea?: boolean, lang?: 'en' | 'vi' }> = ({ name, label, value, type = 'text', isTextarea, lang }) => (
    <div>
        <label htmlFor={`${name}-${lang || ''}`} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        {isTextarea ? (
             <RichTextInput
                id={`${name}-${lang || ''}`}
                name={name}
                value={value as string}
                onChange={(e) => handleChange(e, lang)}
                rows={name === 'pitch' ? 10 : 4}
            />
        ) : type === 'checkbox' ? (
            <div className="flex items-center h-10">
                 <input type="checkbox" id={`${name}-${lang || ''}`} name={name} checked={!!value} onChange={handleChange} className="h-5 w-5 rounded border-zinc-600 bg-zinc-800 text-pink-600 focus:ring-pink-500" />
            </div>
        ) : (
            <input type="text" id={`${name}-${lang || ''}`} name={name} value={value as string} onChange={(e) => handleChange(e, lang)} className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:ring-pink-500 focus:border-pink-500" />
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
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="vimeoId" label="Vimeo ID (optional)" value={formData.vimeoId || ''} />
                <FormField name="isCrowdfunding" label="Is Crowdfunding Project?" value={!!formData.isCrowdfunding} type="checkbox" />
             </div>
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
    <div className="pt-20 sm:pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-brand font-black">{t('admin')}</h1>
          <button onClick={handleAddNew} className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition-colors">
              Add New Project
          </button>
        </div>

        <div className="bg-zinc-900 rounded-lg shadow-lg">
          <ul className="divide-y divide-zinc-800">
            {projects.map(project => (
              <li key={project.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <p className="font-bold text-lg text-white">{project.en.title}</p>
                  <p className="text-sm text-gray-400">{project.id}</p>
                </div>
                <div className="flex items-center space-x-4 flex-shrink-0">
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
const SnowfallCanvas = () => {
      const canvasRef = React.useRef<HTMLCanvasElement>(null);

      React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const DUST_PARTICLE_COUNT = 250;
        const MIN_FLAKES = 8;
        const NUM_TEXTS = 2;
        const MOUSE_INFLUENCE_RADIUS = 200;
        const MOUSE_WIND_STRENGTH = 0.02;
        const MOUSE_SMOOTHING_FACTOR = 0.08;
        const CLICK_BURST_RADIUS = 150;
        const CLICK_BURST_STRENGTH = 8;
        const DAMPING_FACTOR = 0.03;
        const TURBULENCE_STRENGTH = 0.004;
        const PARALLAX_FACTOR = 0.05;

        let particles: any[] = [];
        let mouse = { 
            x: null as number | null, y: null as number | null, 
            lastX: 0, lastY: 0, 
            vx: 0, vy: 0,
            smoothVx: 0, smoothVy: 0
        };
        let animationFrameId: number;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle(options: any = {}) {
            const depth = options.depth !== undefined ? options.depth : Math.random();
            const type = options.type || 'dust';
            const baseSpeedY = (depth * 0.4 + 0.1);
            const baseSpeedX = (Math.random() - 0.5) * 0.1;
            return {
                type: type, x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                depth: depth, vx: baseSpeedX, vy: baseSpeedY,
                baseSpeedX: baseSpeedX, baseSpeedY: baseSpeedY,
                size: (type === 'text') ? (depth * 10 + 8) : 
                      (type === 'flake') ? (depth * 12 + 8) : (depth * 1.2 + 0.5),
                opacity: depth * 0.7 + 0.3, text: 'SUDY AI', char: '❄',
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
            };
        }

        function initializeScene() {
            particles = [];
            for (let i = 0; i < DUST_PARTICLE_COUNT; i++) particles.push(createParticle({ type: 'dust' }));
            for (let i = 0; i < MIN_FLAKES; i++) particles.push(createParticle({ type: 'flake' }));
            for (let i = 0; i < NUM_TEXTS; i++) particles.push(createParticle({ type: 'text' }));
        }
        
        const handleResize = () => { resizeCanvas(); initializeScene(); };

        const handleMouseMove = (e: MouseEvent) => {
            if (mouse.x === null) { mouse.lastX = e.clientX; mouse.lastY = e.clientY; }
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseDown = (e: MouseEvent) => {
            for (const p of particles) {
                const dx = p.x - e.clientX;
                const dy = p.y - e.clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CLICK_BURST_RADIUS) {
                    const force = (1 - distance / CLICK_BURST_RADIUS) * CLICK_BURST_STRENGTH;
                    p.vx += (dx / distance) * force * (1 + Math.random() * 0.5);
                    p.vy += (dy / distance) * force * (1 + Math.random() * 0.5);
                }
            }
        };

        const handleMouseOut = () => { mouse.x = null; mouse.y = null; };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseout', handleMouseOut);

        function update() {
            let rawVx = 0, rawVy = 0;
            if (mouse.x !== null && mouse.y !== null) {
                rawVx = mouse.x - mouse.lastX;
                rawVy = mouse.y - mouse.lastY;
                mouse.lastX = mouse.x;
                mouse.lastY = mouse.y;
            }
            mouse.smoothVx += (rawVx - mouse.smoothVx) * MOUSE_SMOOTHING_FACTOR;
            mouse.smoothVy += (rawVy - mouse.smoothVy) * MOUSE_SMOOTHING_FACTOR;

            for (const p of particles) {
                let accX = 0, accY = 0;
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < MOUSE_INFLUENCE_RADIUS) {
                        const influence = (1 - distance / MOUSE_INFLUENCE_RADIUS);
                        accX += mouse.smoothVx * MOUSE_WIND_STRENGTH * influence;
                        accY += mouse.smoothVy * MOUSE_WIND_STRENGTH * influence;
                    }
                }
                
                accX += (Math.random() - 0.5) * TURBULENCE_STRENGTH;
                accY += (Math.random() - 0.5) * TURBULENCE_STRENGTH;
                
                p.vx += accX;
                p.vy += accY;
                p.vx -= (p.vx - p.baseSpeedX) * DAMPING_FACTOR;
                p.vy -= (p.vy - p.baseSpeedY) * DAMPING_FACTOR;
                
                p.x += p.vx;
                p.y += p.vy;
                if (p.type !== 'dust') p.rotation += p.rotationSpeed;

                if (p.y > canvas.height + p.size) {
                    p.y = -p.size; p.x = Math.random() * canvas.width;
                    p.vx = p.baseSpeedX; p.vy = p.baseSpeedY;
                }
                if (p.x > canvas.width + p.size) p.x = -p.size;
                else if (p.x < -p.size) p.x = canvas.width + p.size;
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2, centerY = canvas.height / 2;
            const parallaxX = mouse.x ? (mouse.x - centerX) * PARALLAX_FACTOR : 0;
            const parallaxY = mouse.y ? (mouse.y - centerY) * PARALLAX_FACTOR : 0;

            for (const p of particles) {
                const drawX = p.x + parallaxX * p.depth, drawY = p.y + parallaxY * p.depth;
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                switch (p.type) {
                    case 'dust':
                        ctx.beginPath(); ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2); ctx.fill();
                        break;
                    case 'flake': case 'text':
                        ctx.save(); ctx.translate(drawX, drawY); ctx.rotate(p.rotation);
                        const fontSize = p.type === 'text' ? 'bold' : '';
                        ctx.font = `${fontSize} ${p.size}px 'Helvetica Neue', Arial`;
                        const content = p.type === 'text' ? p.text : p.char;
                        ctx.fillText(content, -ctx.measureText(content).width / 2, p.size / 2);
                        ctx.restore();
                        break;
                }
            }
        }
        
        function animationLoop() { 
          update(); 
          draw(); 
          animationFrameId = requestAnimationFrame(animationLoop); 
        }

        resizeCanvas(); 
        initializeScene(); 
        animationLoop();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
      }, []);

      return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 49 }} />;
    };

const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { t, language, setLanguage, isAuthenticated, logout } = useAppContext();
    const navigate = useNavigate();

    const handleNav = (to: string) => {
        navigate(to);
        onClose();
    };

    const handleLogout = () => {
        logout();
        handleNav('/');
    };
    
    const navItems = [
        { to: "/projects", label: t('navProjects') },
        { to: "/crowdfunding", label: t('navCrowdfunding') },
        { to: "/about", label: t('navAbout') },
        { to: "/contact", label: t('navContact') },
    ];
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-zinc-900 z-50 p-6 flex flex-col fade-in md:hidden" role="dialog" aria-modal="true">
            <div className="flex justify-between items-center mb-12">
                <Link to="/" onClick={onClose}>
                    <img src="https://i.postimg.cc/65170K31/logo-white.png" alt="SUDY FILM STUDIO Logo" className="h-20" />
                </Link>
                <button onClick={onClose} aria-label="Close menu">
                    <CloseIcon />
                </button>
            </div>

            <nav className="flex-grow">
                <ul className="flex flex-col items-center justify-center space-y-6 text-2xl font-semibold">
                    {navItems.map(item => (
                        <li key={item.to}>
                           <NavLink to={item.to} onClick={onClose} className={({isActive}) => `py-2 ${isActive ? 'text-pink-400' : 'text-white'}`}>{item.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="text-center space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-pink-400 mb-3">{t('aiToolSuite')}</h3>
                    <div className="flex flex-col space-y-2">
                        {aiTools.map(tool => (
                            <a href={tool.link} key={tool.name} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                {tool.name}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="h-px w-24 bg-white/20 mx-auto" />

                <div className="flex-shrink-0">
                    <button onClick={() => { setLanguage('en'); onClose(); }} className={`px-4 py-2 text-sm rounded ${language === 'en' ? 'bg-pink-500 text-white' : 'bg-gray-700'}`}>English</button>
                    <button onClick={() => { setLanguage('vi'); onClose(); }} className={`px-4 py-2 text-sm rounded ml-2 ${language === 'vi' ? 'bg-pink-500 text-white' : 'bg-gray-700'}`}>Vietnamese</button>
                </div>

                <div className="h-px w-24 bg-white/20 mx-auto" />

                <div>
                    <button onClick={() => handleNav(isAuthenticated ? "/admin" : "/login")} className="text-lg font-semibold py-2">
                        {t('admin')}
                    </button>
                    {isAuthenticated && (
                        <button onClick={handleLogout} className="text-lg font-semibold py-2 ml-6 text-red-400">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t, language, setLanguage } = useAppContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return (
        <div className="text-white min-h-screen">
            <SnowfallCanvas />
            <header className="fixed top-0 left-0 md:left-20 right-0 h-20 sm:h-24 flex items-center justify-between px-4 sm:px-8 z-40 bg-gradient-to-b from-black/70 to-transparent">
                 <Link to="/" className="flex items-center gap-2 sm:gap-6 group">
                    <img src="https://i.postimg.cc/65170K31/logo-white.png" alt="SUDY FILM STUDIO Logo" className="h-12 sm:h-20 group-hover:opacity-90 transition-opacity duration-300" />
                    <span className="text-lg sm:text-xl lg:text-3xl font-brand font-bold tracking-widest text-white uppercase sm:inline-block">SUDY FILM STUDIO</span>
                 </Link>
                 <div className="hidden md:flex items-center gap-6">
                    <nav aria-label={t('aiToolSuite')}>
                        <ul className="flex items-center gap-6">
                            {aiTools.map(tool => (
                                <li key={tool.name}>
                                    <a
                                        href={tool.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-gray-300 hover:text-pink-400 transition-colors duration-200 uppercase tracking-wider"
                                        title={language === 'vi' ? tool.desc_vi : tool.desc_en}
                                    >
                                        {tool.name.replace("SUDY ", "")}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="h-6 w-px bg-white/20" />
                    <div className="flex-shrink-0">
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded ${language === 'en' ? 'bg-pink-500 text-white' : 'bg-gray-700'}`}>EN</button>
                        <button onClick={() => setLanguage('vi')} className={`px-3 py-1 text-sm rounded ml-2 ${language === 'vi' ? 'bg-pink-500 text-white' : 'bg-gray-700'}`}>VI</button>
                    </div>
                 </div>
                 <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 md:hidden" aria-label="Open menu">
                    <MenuIcon />
                 </button>
            </header>
            <Sidebar />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <main className="md:ml-20">
                {children}
            </main>
            <footer className="md:ml-20 py-4 px-4 text-center text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} SUDY FILM STUDIO | {t('founder')}: Trương Điền Duy
            </footer>
        </div>
    );
};

const HomePageOrRedirect: React.FC<{ onPlayVideo: (vimeoId: string, title: string) => void }> = ({ onPlayVideo }) => {
    // Check screen width once on initial render to determine layout.
    // useRef ensures this check is not re-evaluated on re-renders (e.g., from parent state changes).
    const isMobile = useRef(window.innerWidth < 768).current;

    // On mobile, redirect to the projects page. For larger screens, show the Home page.
    return isMobile ? <Navigate to="/projects" replace /> : <Home onPlayVideo={onPlayVideo} />;
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
            <Route path="/" element={<HomePageOrRedirect onPlayVideo={handlePlayVideo} />} />
            <Route path="/projects" element={<ProjectsPage onPlayVideo={handlePlayVideo} />} />
            <Route path="/project/:id" element={<ProjectDetail onPlayVideo={handlePlayVideo} />} />
            <Route path="/crowdfunding" element={<CrowdfundingPage onPlayVideo={handlePlayVideo} />} />
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