
import type { Project } from './types';

export const initialProjects: Project[] = [
  {
    id: 'pink-isle',
    en: {
      title: 'DETONATION OF PINK ISLE',
      category: 'SCI-FI ACTION',
      description: 'A team of explorers discovers a volatile island that defies the laws of physics, leading to a race against time to prevent a global catastrophe.',
      pitch: 'PINK ISLE is a high-concept sci-fi thriller exploring themes of discovery, sacrifice, and the unknown. Using cutting-edge AI-driven visual effects, we bring a world to life where reality itself is at stake.'
    },
    vi: {
      title: 'DETONATION OF PINK ISLE',
      category: 'HÀNH ĐỘNG KHOA HỌC VIỄN TƯỞNG',
      description: 'Một nhóm thám hiểm khám phá ra một hòn đảo bất ổn thách thức các định luật vật lý, dẫn đến một cuộc chạy đua với thời gian để ngăn chặn một thảm họa toàn cầu.',
      pitch: 'PINK ISLE là một bộ phim kinh dị khoa học viễn tưởng có ý tưởng cao, khám phá các chủ đề về khám phá, hy sinh và những điều chưa biết. Sử dụng hiệu ứng hình ảnh tiên tiến do AI điều khiển, chúng tôi mang một thế giới vào cuộc sống nơi chính thực tại đang bị đe dọa.'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=870&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=871&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1032&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617094541573-2179a61320ae?q=80&w=735&auto=format&fit=crop'
    ],
    vimeoId: '1129615682',
  },
  {
    id: 'lady-of-indochina',
    en: {
      title: 'LADY OF INDOCHINA',
      category: 'HISTORICAL DRAMA',
      description: 'The sweeping saga of a woman\'s journey through love, war, and revolution in colonial Indochina, fighting for her family and her country\'s freedom.',
      pitch: 'A visually stunning period piece that uses AI to recreate historical landscapes with unparalleled accuracy, telling a deeply human story against a backdrop of epic change.'
    },
    vi: {
      title: 'LADY OF INDOCHINA',
      category: 'PHIM CHÍNH KỊCH LỊCH SỬ',
      description: 'Bản hùng ca sâu rộng về hành trình của một người phụ nữ qua tình yêu, chiến tranh và cách mạng ở Đông Dương thời thuộc địa, chiến đấu vì gia đình và tự do của đất nước.',
      pitch: 'Một tác phẩm cổ trang trực quan tuyệt đẹp sử dụng AI để tái tạo các cảnh quan lịch sử với độ chính xác vô song, kể một câu chuyện sâu sắc về con người trong bối cảnh thay đổi hoành tráng.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/lady/800/600',
    images: ['https://picsum.photos/seed/indochina1/1280/720', 'https://picsum.photos/seed/indochina2/1280/720'],
  },
  {
    id: 'dracula',
    en: {
      title: 'CODE NAME: DRACULA',
      category: 'NEO-NOIR THRILLER',
      description: 'A modern reimagining of the classic tale, where "Dracula" is a shadowy bio-hacker threatening to unleash a digital plague upon the world.',
      pitch: 'This isn\'t your ancestor\'s vampire. CODE NAME: DRACULA combines gothic horror with cyberpunk aesthetics, powered by AI-generated dreamscapes and nightmarish visuals.'
    },
    vi: {
      title: 'MẬT DANH: DRACULA',
      category: 'PHIM KINH DỊ NEO-NOIR',
      description: 'Một sự tái hiện hiện đại của câu chuyện kinh điển, trong đó "Dracula" là một hacker sinh học mờ ám đe dọa giải phóng một bệnh dịch kỹ thuật số ra thế giới.',
      pitch: 'Đây không phải là ma cà rồng của tổ tiên bạn. MẬT DANH: DRACULA kết hợp kinh dị gothic với thẩm mỹ cyberpunk, được hỗ trợ bởi các cảnh mơ và hình ảnh ác mộng do AI tạo ra.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/dracula/800/600',
    images: ['https://picsum.photos/seed/dracula1/1280/720', 'https://picsum.photos/seed/dracula2/1280/720'],
  },
  {
    id: 'under-the-shadow-of-ashes',
    en: {
      title: 'UNDER THE SHADOW OF ASHES',
      category: 'HISTORICAL FICTION',
      description: 'Two souls find each other amidst the ruins of a forgotten war, struggling to rebuild their lives and find hope in a world turned to ash.',
      pitch: 'A poignant and artistic film that leverages AI to create surreal, memory-like visuals of the past, focusing on the resilience of the human spirit.'
    },
    vi: {
      title: 'DƯỚI BÓNG TRO TÀN',
      category: 'PHIM GIẢ SỬ',
      description: 'Hai tâm hồn tìm thấy nhau giữa đống tro tàn của một cuộc chiến bị lãng quên, vật lộn để xây dựng lại cuộc sống và tìm thấy hy vọng trong một thế giới đã hóa thành tro bụi.',
      pitch: 'Một bộ phim sâu sắc và nghệ thuật, tận dụng AI để tạo ra những hình ảnh siêu thực, giống như ký ức về quá khứ, tập trung vào sự kiên cường của tinh thần con người.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/ashes/800/600',
    images: ['https://picsum.photos/seed/ashes1/1280/720', 'https://picsum.photos/seed/ashes2/1280/720'],
  },
];

export const translations = {
  en: {
    navHome: 'Home',
    navProjects: 'Projects',
    navAbout: 'About',
    navContact: 'Contact',
    heroSubtitle: 'BLOCKBUSTER AI FILMS',
    heroButton: 'EXPLORE WORKS',
    galleryTitle: 'Gallery Works',
    founder: 'Founder',
    watchTrailer: 'Watch Trailer',
    // ... add more as needed
  },
  vi: {
    navHome: 'Trang Chủ',
    navProjects: 'Dự Án',
    navAbout: 'Giới Thiệu',
    navContact: 'Liên Hệ',
    heroSubtitle: 'PHIM BOM TẤN AI',
    heroButton: 'KHÁM PHÁ',
    galleryTitle: 'Tác Phẩm',
    founder: 'Nhà Sáng Lập',
    watchTrailer: 'Xem Trailer',
    // ... add more as needed
  }
};
