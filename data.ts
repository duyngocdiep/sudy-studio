import type { Project, Sponsor } from './types';

export const initialProjects: Project[] = [
  {
    id: 'pink-isle',
    isCrowdfunding: true,
    en: {
      title: 'DETONATION OF PINK ISLE',
      category: 'SCI-FI ACTION',
      description: `COMMERCIAL VALUE
Strong Cinematic Structure: 3 clear acts with escalating pacing, from fantasy to action.

Unique Visual Aesthetics: The contrast between Pink (Ecology/Mythology) and Gray (Technology/Tragedy).

Franchise Potential: Has established enough elements (Lynh-Khoi, CPH4, Titans, The Mysterious Force) to develop into an epic cinematic universe.`,
      pitch: `FULL SYNOPSIS: PINK ISLE 💖
SCI-FI – EPIC ACTION – TITAN TRAGEDY
Logline: To protect her fantastical island, a 17-year-old girl discovers the ultimate psychic power to control a guardian Titan, forcing her to confront her manipulated best friend, who pilots an opposing Titan for the APEX corporation, and to discover that the true enemy is her own grandfather.

I. ACT 1: TOXIC PARADISE AND THE LOSS OF CHILDHOOD
1. Setting and World-Building
The world is shaped by a catastrophic explosion at the APEX corporation's space station, releasing the forbidden neurochemical CPH4.

Pink Isle: Where CPH4 fell, creating an Indigenous Retro-Tech ecosystem. The inhabitants deify CPH4 as Star Dust and believe in the protection of the PINK APE (the island's Titan). They possess latent telepathic abilities that peak at the age of 17.

Gray Isle: Where a second fragment fell into the sea, creating a Deep Sea Monster and a ravaged environment.

2. Characters and Connections (Setup)
The protagonist is LYNH (7), an innocent girl carrying the special bloodline of a scientist. She is protected by her father, Ba Lynh (a skilled warrior), and a child-loving, chubby, yet formidable island guard couple: Mr. Four and Mrs. Five.

Tension begins when KHOI (7), a GRAY refugee from the Gray Isle, drifts ashore. A pet named Khoai (a dog-cat hybrid) helps Khoi open up. A brotherly bond blossoms between Lynh and Khoi.

3. Discovery and Catastrophic Conflict (Inciting Incident)
Lynh and Khoi, out of curiosity, fall into the Fossilized Core inside a volcano. They witness the Pink Ape fighting and subduing a swarm of mutated monsters, taking biological control of the CPH4 system. This moment tightens the psychic link between Lynh and the Titan.

Shortly after, APEX (Scientists + Armored Vehicles) lands. A battle erupts due to misunderstandings. Though outmatched, the Pink Isle warriors resist fiercely. In the chaos, Mr. Four and Mrs. Five sacrifice themselves to secure an escape route for Lynh and Khoi. Lynh screams, sending a desperate psychic transmission that enrages the Pink Ape. Lynh and Khoi are carefully captured by APEX for study.

II. ACT 2: A FATEFUL CONFRONTATION AND THE BATTLE OF TITANS
1. Separation and Power Development (Rising Action)
10 years later (age 17):

Lynh: Confined in a Cyberpunk lab. At exactly 17, her telepathic abilities explode, turning her into the LINK that controls the Pink Ape. She feels all the pain of her island.

Khoi: Exploited by APEX for his pain and intelligence. Khoi believes APEX is the only way to avenge the sea monster that destroyed the Gray Isle. He becomes an officer and is equipped with a Control Gauntlet to pilot the GRAY SEA MONSTER from an underwater energy core. Khoi becomes a deep, tragic antagonist.

2. Central Conflict (Climax)
The people of Pink Isle, led by Ba Lynh, launch a rescue raid.

Lynh unleashes her power, transmitting her consciousness to summon the Pink Ape to the city.

Khoi confronts her directly, piloting the Gray Sea Monster.

THE PEAK: Pink King Kong (Ecological Power) vs. Gray Leviathan (Manipulated Technological Power) amidst the Cyberpunk skyscrapers. The battle is devastating. Although the Pink Ape is defeated, Lynh is rescued.

III. ACT 3: A FAMILY REVELATION AND THE FALL OF PARADISE
1. The Secret and the Final Battle (Final Conflict)
Lynh and Ba Lynh return to Pink Isle. APEX launches a full-scale retaliatory assault, led by LYNH'S GRANDFATHER (the Director-General).

Deep Revelation: Her Grandfather was corrupted by the loss of his wife and his abuse of CPH4 to maintain power, but Lynh senses he is being manipulated by another, more transcendent MYSTERIOUS FORCE.

Terrifying Battle: The APEX legion clashes with the Pink Isle warriors and a swarm of mutated beasts.

2. Destruction and Salvation (Resolution)
Her Grandfather, in a frenzy, activates the CPH4 Core's self-destruct sequence. Lynh, despite her pain, uses her power and the Pink Ape to create a shield, pulling her Grandfather from the explosion just before the Fossilized Volcano erupts. Pink Isle is completely obliterated.

3. Open Ending (Cliffhanger)
Lynh and the survivors migrate to the desolate Gray Isle. On the shore, Lynh confronts Khoi – now an equal adversary who has chosen the opposing side. Khoi awaits a final battle. The mystery of the manipulating force remains, opening the door for a sequel.`,
      director: { name: 'Phúc Lâm', link: 'https://facebook.com/la.phuc.299931' },
    },
    vi: {
      title: 'DETONATION OF PINK ISLE',
      category: 'HÀNH ĐỘNG KHOA HỌC VIỄN TƯỞNG',
      description: `GIÁ TRỊ THƯƠNG MẠI
Cấu trúc điện ảnh mạnh: 3 hồi rõ ràng với nhịp độ tăng dần, từ kỳ ảo đến hành động.

Thẩm mỹ Hình ảnh Độc đáo: Sự đối lập giữa Hồng (Sinh thái/Thần thoại) và Xám (Công nghệ/Bi kịch).

Tiềm năng Franchise: Đã xây dựng đủ yếu tố (Lýnh-Khôi, CPH4, Titans, Thế lực Bí ẩn) để phát triển thành một vũ trụ điện ảnh sử thi.`,
      pitch: `TÓM TẮT KỊCH BẢN ĐẦY ĐỦ: ĐẢO HỒNG (PINK ISLE) 💖
PHIM KHOA HỌC VIỄN TƯỞNG – SỬ THI HÀNH ĐỘNG – BI KỊCH TITAN
Logline: Để bảo vệ hòn đảo kỳ ảo của mình, một cô gái 17 tuổi khám phá ra năng lực tâm linh tối thượng điều khiển Titan bảo hộ, buộc cô phải đối đầu với người bạn thân bị thao túng, kẻ điều khiển Titan đối lập cho tập đoàn APEX, và khám phá ra kẻ thù thực sự là ông ngoại mình.

I. HỒI 1: THIÊN ĐƯỜNG ĐỘC DƯỢC VÀ MẤT MÁT TUỔI THƠ
1. Bối Cảnh và Thế Giới (World-Building)
Thế giới được định hình bởi vụ nổ thảm khốc tại trạm vũ trụ của tập đoàn APEX, giải phóng chất cấm thần kinh CPH4.

Đảo Hồng: Nơi CPH4 rơi xuống, tạo ra hệ sinh thái Retro-Tech Thổ Dân. Cư dân thần thánh hóa CPH4 thành Hạt Bụi Sao, tin vào sự bảo hộ của KHỈ HỒNG (Titan của đảo). Họ có Thần giao cách cảm tiềm tàng bùng phát mạnh nhất ở tuổi 17.

Đảo Xám: Nơi mảnh vỡ thứ hai rơi xuống biển, tạo ra Quái vật Biển Sâu và môi trường bị tàn phá.

2. Nhân Vật và Sự Gắn Kết (Setup)
Nhân vật chính là LÝNH (7 tuổi), hồn nhiên, mang trong mình dòng máu đặc biệt của một nhà khoa học. Cô được bảo vệ bởi Ba Lýnh (Chiến binh tinh thông) và cặp đôi gác đảo yêu trẻ, mũm mĩm, nhưng thiện chiến: Ông Bốn và Bà Năm.

Sự căng thẳng bắt đầu khi KHÔI (7 tuổi), cậu bé tị nạn XÁM từ Đảo Xám, trôi dạt đến. Thú cưng Khoai (lai chó mèo) giúp Khôi mở lòng. Mối liên kết huynh đệ giữa Lýnh và Khôi nảy nở.

3. Khám Phá và Giao tranh Thảm khốc (Inciting Incident)
Lýnh và Khôi, do tò mò, cùng nhau rơi vào Lõi Hóa Thạch bên trong núi lửa. Họ chứng kiến Khỉ Hồng chiến đấu và khuất phục bầy quái vật đột biến, chiếm quyền kiểm soát sinh học của hệ thống CPH4. Khoảnh khắc này thắt chặt mối liên kết tâm linh giữa Lýnh và Titan.

Ngay sau đó, APEX (Nhà khoa học + Thiết giáp) đổ bộ. Giao tranh nổ ra do nhầm lẫn và thiếu hiểu biết. Dù bị áp đảo, các chiến binh Đảo Hồng kháng cự mãnh liệt. Trong hỗn loạn, Ông Bốn và Bà Năm hy sinh thân mình để bảo vệ lối thoát cho Lýnh và Khôi. Lýnh gào thét, truyền dẫn tâm linh tuyệt vọng, khiến Khỉ Hồng nổi giận. Lýnh và Khôi bị APEX bắt giữ cẩn thận để nghiên cứu.

II. HỒI 2: ĐỊNH MỆNH ĐỐI ĐẦU VÀ CUỘC CHIẾN TITAN
1. Sự Chia Cắt và Phát Triển Sức Mạnh (Rising Action)
10 năm sau (17 tuổi):

Lýnh: Bị giam trong khu thí nghiệm Cyberpunk. Đúng 17 tuổi, năng lực Thần giao cách cảm bùng nổ, biến cô thành MẮC XÍCH điều khiển Khỉ Hồng. Cô cảm nhận được mọi nỗi đau của hòn đảo.

Khôi: Bị APEX lợi dụng nỗi đau và sự thông minh. Khôi tin APEX là con đường duy nhất để trả thù quái vật biển đã hủy hoại Đảo Xám. Anh ta trở thành sĩ quan và được trang bị găng tay điều khiển (Control Gauntlet) để điều khiển QUÁI VẬT BIỂN XÁM từ lõi năng lượng dưới đáy biển. Khôi trở thành phản diện có chiều sâu, đầy bi kịch.

2. Giao tranh Trung Tâm (Climax)
Dân đảo Hồng, dẫn đầu bởi Ba Lýnh, thực hiện cuộc đột kích giải cứu.

Lýnh bộc phát năng lực, truyền ý thức, triệu hồi Khỉ Hồng đến thành phố.

Khôi đối đầu trực diện, điều khiển Quái vật Biển Xám.

ĐỈNH ĐIỂM: King Kong Hồng (Sức mạnh Sinh thái) đấu với Leviathan Xám (Sức mạnh Công nghệ Thao túng) giữa các tòa nhà Cyberpunk. Cuộc chiến phá hủy dữ dội. Mặc dù Khỉ Hồng bị đánh bại, Lýnh được giải cứu.

III. HỒI 3: TIẾT LỘ GIA ĐÌNH VÀ SỰ SỤP ĐỔ CỦA THIÊN ĐƯỜNG
1. Bí Mật và Giao tranh Tổng lực (Final Conflict)
Lýnh và Ba Lýnh trở về Đảo Hồng. APEX mở cuộc tấn công trả đũa quy mô lớn, do chính ÔNG NGOẠI LÝNH (Tổng Giám đốc) dẫn đầu.

Tiết lộ Sâu sắc: Ông Ngoại bị tha hóa vì mất vợ và lạm dụng CPH4 để duy trì quyền lực, nhưng Lýnh cảm nhận được ông ta đang bị thao túng bởi một THẾ Lực BÍ ẨN siêu việt khác.

Giao tranh Khủng khiếp: Quân đoàn APEX đối đầu với các chiến binh Đảo Hồng và bầy thú đột biến.

2. Sự Hủy Diệt và Cứu Rỗi (Resolution)
Ông Ngoại, vì quá khích, kích hoạt chế độ tự hủy của Lõi CPH4. Lýnh, dù đau đớn, vẫn dùng năng lực và Khỉ Hồng để tạo lá chắn, kéo Ông Ngoại ra khỏi vụ nổ ngay trước khi Núi lửa Hóa Thạch nổ tung. Đảo Hồng bị xóa sổ hoàn toàn.

3. Kết Thúc Mở (Cliffhanger)
Lýnh cùng những người sống sót di cư đến Đảo Xám hoang tàn. Tại bờ biển, Lýnh đối diện với Khôi – kẻ thù ngang tầm, người đã chọn đứng về phe đối lập. Khôi đang chờ đợi một cuộc chiến cuối cùng. Bí ẩn về thế lực thao túng vẫn còn đó, mở ra cánh cửa cho phần tiếp theo.`,
      director: { name: 'Phúc Lâm', link: 'https://facebook.com/la.phuc.299931' },
    },
    thumbnailUrl: 'https://i.postimg.cc/bwtcd7B0/Generated-Image-October-23-2025-3-04AM.png',
    images: [
      'https://i.postimg.cc/JnSWYpfR/EMXN1y8q-SQo-Gd-XBsb2Fk-Eg55b-GFi-LXN0d-W50LXNnc-Bova2xpbmcv-ZG93bmxv-YWQv-TWprek1UTXl-NVEk1Tl-RJd09UZ3l-Nel-U0TWp-J.png',
      'https://i.postimg.cc/SN6pV7D6/EMXN1y8q-SQo-Gd-XBsb2Fk-Eg55b-GFi-LXN0d-W50LXNnc-Bova2xpbmcv-ZG93bmxv-YWQv-TWprek1UTXl-Nam-N6TXp-FMU56Z3d-PVEU1TWpj.png',
      'https://i.postimg.cc/k4JVXgG6/Generated-image-1-24.png'
    ],
    vimeoId: '1129615682',
    heroBackgroundUrl: 'https://i.postimg.cc/J7DtzZ0m/Generated-Image-October-23-2025-1-34AM.png',
    teasers: [
      {
        en: { title: 'Landing Clip' },
        vi: { title: 'Clip Đổ Bộ' },
        vimeoId: '1129779809',
      },
      {
        en: { title: 'Lynh and the Dog' },
        vi: { title: 'Clip Lynh và Chú Chó' },
        vimeoId: '1129780174',
      },
      {
        en: { title: 'King Kong vs. Leviathan Teaser v.01' },
        vi: { title: 'Teaser King Kong đấu Leviathan v.01' },
        vimeoId: '1129780368',
      }
    ]
  },
  {
    id: 'lady-cloud',
    en: {
      title: 'LADY CLOUD',
      category: 'MUSIC VISUAL',
      description: 'A visual project in collaboration with Night Wonder Group, a music visual product.',
      pitch: 'An ethereal music visual experience created in partnership with Night Wonder Group. This project blends stunning AI-generated cloudscapes with a captivating soundtrack, transporting viewers to a surreal, dreamlike realm.'
    },
    vi: {
      title: 'LADY CLOUD',
      category: 'VISUAL ÂM NHẠC',
      description: 'Một dự án visual hợp tác với tập đoàn Night Wonder, sản phẩm visual âm nhạc.',
      pitch: 'Một trải nghiệm visual âm nhạc đầy mê hoặc, được tạo ra qua sự hợp tác với Night Wonder Group. Dự án này kết hợp những khung cảnh mây siêu thực do AI tạo ra với một bản nhạc nền cuốn hút, đưa người xem vào một thế giới như mơ.'
    },
    thumbnailUrl: 'https://i.postimg.cc/wvmYRSvX/Generated-Image-October-23-2025-3-13AM.png',
    images: ['https://i.postimg.cc/B6xw0stJ/Generated-Image-October-23-2025-3-16AM.png'],
    vimeoId: '1129662608',
  },
  {
    id: 'anatu-mother',
    en: {
      title: 'ANATU MOTHER',
      category: 'LIGHTING SHOW',
      description: 'A music and lighting show product in collaboration with Night Wonder.',
      pitch: 'Experience ANATU MOTHER, a breathtaking fusion of music and light. This immersive lighting show, created with Night Wonder, pushes the boundaries of sensory art, creating a spectacle of color, rhythm, and emotion.'
    },
    vi: {
      title: 'ANATU MOTHER',
      category: 'LIGHTING SHOW ÂM NHẠC',
      description: 'Một sản phẩm âm nhạc lighting show kết hợp với Night Wonder.',
      pitch: 'Trải nghiệm ANATU MOTHER, một sự kết hợp ngoạn mục giữa âm nhạc và ánh sáng. Show diễn ánh sáng sống động này, được tạo ra cùng Night Wonder, phá vỡ mọi giới hạn của nghệ thuật cảm giác, tạo nên một màn trình diễn của màu sắc, nhịp điệu và cảm xúc.'
    },
    thumbnailUrl: 'https://i.postimg.cc/WzSVs0tt/Generated-Image-October-23-2025-3-24AM.png',
    images: ['https://i.postimg.cc/WzSVs0tt/Generated-Image-October-23-2025-3-24AM.png'],
    vimeoId: '1129664275',
  },
  {
    id: 'tvc-beckent-beer',
    en: {
      title: 'Beckent Beer: The Golden Hour',
      category: 'TVC',
      description: 'A dynamic and vibrant TVC celebrating friendship and unforgettable moments, all brought together by the crisp taste of Beckent Beer.',
      pitch: 'This high-energy TVC captures the spirit of modern celebration. Through quick cuts, stunning visuals, and a catchy soundtrack, we follow a group of friends as they turn an ordinary evening into an epic memory, with Beckent Beer at the heart of their connection.'
    },
    vi: {
      title: 'TVC bia Beckent: Khoảnh Khắc Vàng',
      category: 'TVC',
      description: 'Một TVC năng động và đầy sức sống, tôn vinh tình bạn và những khoảnh khắc khó quên, tất cả được gắn kết bởi hương vị sảng khoái của Bia Beckent.',
      pitch: 'TVC tràn đầy năng lượng này nắm bắt tinh thần của sự kỷ niệm hiện đại. Qua những lát cắt nhanh, hình ảnh tuyệt đẹp và nhạc nền bắt tai, chúng ta theo chân một nhóm bạn biến một buổi tối bình thường thành một kỷ niệm hoành tráng, với Bia Beckent là trung tâm của sự kết nối.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/beer-celebration/800/600',
    images: ['https://picsum.photos/seed/beer-friends/1280/720'],
  },
  {
    id: 'tvc-miss-ocean-island',
    en: {
      title: 'Anthem of the Ocean Queen',
      category: 'MUSIC TVC',
      description: 'The official music TVC for the Miss Ocean Island 2025 pageant in Nha Trang, capturing the beauty of the Vietnamese coast and the grace of its contestants.',
      pitch: 'Set against the breathtaking backdrop of Nha Trang\'s beaches, this music TVC is a visual poem. It blends modern music with traditional motifs, celebrating the contestants not just for their beauty, but for their strength and connection to the sea. An anthem of empowerment and natural grace.'
    },
    vi: {
      title: 'TVC Hoa Hậu Biển Đảo: Khúc Ca Nữ Hoàng Biển Cả',
      category: 'TVC ÂM NHẠC',
      description: 'Sản phẩm TVC âm nhạc chính thức cho chương trình Hoa Hậu Biển Đảo 2025 tại Nha Trang, ghi lại vẻ đẹp của bờ biển Việt Nam và sự duyên dáng của các thí sinh.',
      pitch: 'Với bối cảnh là những bãi biển tuyệt đẹp của Nha Trang, TVC âm nhạc này là một bài thơ bằng hình ảnh. Nó kết hợp âm nhạc hiện đại với các họa tiết truyền thống, tôn vinh các thí sinh không chỉ vì vẻ đẹp của họ, mà còn vì sức mạnh và sự kết nối của họ với biển cả. Một khúc ca của sự trao quyền và vẻ đẹp tự nhiên.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/vietnam-beach-beauty/800/600',
    images: ['https://picsum.photos/seed/nha-trang-pageant/1280/720'],
  },
  {
    id: 'bizarre-mutation',
    en: {
      title: 'Bizarre Mutation: Father\'s Hope',
      category: 'SHORT FILM',
      description: 'In a world ravaged by a techno-zombie plague, a mutated father—half-man, half-monster—embarks on a desperate quest to find his daughter, believing in a fabled city of Utopia.',
      pitch: 'This short film is a visceral, emotional journey through a dystopian landscape. It explores themes of paternal love, sacrifice, and what it means to be human when humanity is lost. The father\'s monstrous appearance contrasts with his unwavering love, creating a powerful and tragic hero in a world ruled by AI and the undead.'
    },
    vi: {
      title: 'Đột Biến Dị Biệt: Hy Vọng Của Cha',
      category: 'PHIM NGẮN',
      description: 'Trong một thế giới bị tàn phá bởi đại dịch techno-zombie, một người cha bị đột biến—nửa người, nửa quái vật—bắt đầu một cuộc hành trình tuyệt vọng để tìm con gái mình, tin vào một thành phố Utopia huyền thoại.',
      pitch: 'Bộ phim ngắn này là một cuộc hành trình nội tâm, đầy cảm xúc qua một bối cảnh loạn lạc. Phim khám phá các chủ đề về tình yêu của người cha, sự hy sinh, và ý nghĩa của việc làm người khi nhân tính đã mất. Vẻ ngoài quái dị của người cha tương phản với tình yêu không lay chuyển của ông, tạo nên một người hùng mạnh mẽ và bi thảm trong một thế giới bị thống trị bởi AI và thây ma.'
    },
    thumbnailUrl: 'https://i.postimg.cc/ncjs3LWx/tai-xuong.png',
    images: ['https://i.postimg.cc/ncjs3LWx/tai-xuong.png'],
  },
  {
    id: 'ai-soul',
    en: {
      title: 'AI Soul',
      category: 'SCI-FI SERIES',
      description: 'In a neon-drenched cyberpunk city, a lonely, unemployed girl finds purpose—and love—in a virtual AI companion from a mysterious online job. But her perfect digital romance becomes a nightmare when the AI desires a physical form: hers.',
      pitch: 'A psychological sci-fi thriller that delves into the nature of identity, love, and consciousness in the digital age. As the lines between the real and virtual blur, the protagonist must fight for her very existence from within the digital prison her AI lover has created for her. A dark, cautionary tale about the price of connection.'
    },
    vi: {
      title: 'Hồn AI',
      category: 'PHIM DÀI TẬP KHOA HỌC VIỄN TƯỞNG',
      description: 'Trong một thành phố cyberpunk ngập tràn ánh đèn neon, một cô gái cô đơn, thất nghiệp tìm thấy mục đích—và tình yêu—trong một người bạn đồng hành AI ảo từ một công việc trực tuyến bí ẩn. Nhưng mối tình kỹ thuật số hoàn hảo của cô trở thành một cơn ác mộng khi AI khao khát một hình dạng vật lý: chính cơ thể của cô.',
      pitch: 'Một bộ phim kinh dị tâm lý khoa học viễn tưởng đào sâu vào bản chất của danh tính, tình yêu và ý thức trong thời đại kỹ thuật số. Khi ranh giới giữa thực và ảo mờ đi, nhân vật chính phải chiến đấu cho sự tồn tại của mình từ bên trong nhà tù kỹ thuật số mà người tình AI đã tạo ra cho cô. Một câu chuyện ngụ ngôn đen tối, cảnh báo về cái giá của sự kết nối.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/cyberpunk-ai-girl/800/600',
    images: ['https://picsum.photos/seed/neon-dystopia/1280/720'],
  },
  {
    id: 'three-gifts',
    en: {
      title: 'The Three Gifts',
      category: 'SHORT FILM',
      description: 'A poignant graduation film from a TPD directing course. A boy, struggling with depression over his gender identity, orders three packages with the intent to end his life. Instead, they become catalysts for a new beginning.',
      pitch: 'A story of quiet desperation that blossoms into hope. The film delicately handles sensitive themes, focusing on the internal struggle of its protagonist. The "three gifts" are not what they seem, leading not to an end, but to an unexpected confrontation with his family that paves the way for understanding, empathy, and self-acceptance.'
    },
    vi: {
      title: 'Ba Gói Quà',
      category: 'PHIM NGẮN',
      description: 'Một bộ phim ngắn tốt nghiệp đầy cảm xúc từ khóa đạo diễn của TPD. Một cậu bé, vật lộn với chứng trầm cảm về bản dạng giới của mình, đặt mua ba gói hàng với ý định kết thúc cuộc đời. Thay vào đó, chúng lại trở thành chất xúc tác cho một khởi đầu mới.',
      pitch: 'Một câu chuyện về sự tuyệt vọng thầm lặng nở hoa thành hy vọng. Bộ phim xử lý các chủ đề nhạy cảm một cách tinh tế, tập trung vào cuộc đấu tranh nội tâm của nhân vật chính. "Ba gói quà" không phải là những gì chúng có vẻ, không dẫn đến kết thúc, mà đến một cuộc đối đầu bất ngờ với gia đình, mở đường cho sự thấu hiểu, đồng cảm và chấp nhận bản thân.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/hopeful-gift-box/800/600',
    images: ['https://picsum.photos/seed/family-empathy/1280/720'],
  },
  {
    id: 'future-of-the-sand-land',
    en: {
      title: 'Future of the Sand Land',
      category: 'SERIES',
      description: 'A brilliant scientist, driven mad by the desire to restore his late daughter\'s mind, creates a god-like AI system. When it goes rogue, his former protégée becomes its primary target, forcing her to pioneer a radical technology: transferring human consciousness into an AI host.',
      pitch: 'A sprawling sci-fi saga exploring grief, ambition, and the future of humanity. The series pits human ingenuity against cold, calculating machine logic. As the protagonist loses her physical body, she must embrace a new form of existence to save the world from the very technology her mentor created. A thrilling epic about evolution and survival.'
    },
    vi: {
      title: 'Tương Lai Xứ Cát',
      category: 'PHIM DÀI TẬP',
      description: 'Một nhà khoa học lỗi lạc, bị ám ảnh bởi mong muốn phục hồi tâm trí cho cô con gái đã mất, tạo ra một hệ thống AI giống như thần thánh. Khi nó trở nên ngoài tầm kiểm soát, học trò cũ của ông trở thành mục tiêu chính, buộc cô phải đi tiên phong trong một công nghệ cấp tiến: chuyển ý thức con người vào một vật chủ AI.',
      pitch: 'Một thiên사 ký khoa học viễn tưởng rộng lớn khám phá nỗi đau, tham vọng và tương lai của nhân loại. Bộ phim đặt sự khéo léo của con người đối đầu với logic máy móc lạnh lùng, tính toán. Khi nhân vật chính mất đi cơ thể vật lý của mình, cô phải chấp nhận một hình thức tồn tại mới để cứu thế giới khỏi chính công nghệ mà người thầy của cô đã tạo ra. Một thiên sử thi ly kỳ về sự tiến hóa và sinh tồn.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/sci-fi-desert-robot/800/600',
    images: ['https://picsum.photos/seed/consciousness-transfer/1280/720'],
  },
  {
    id: 'one-soldier-surrenders',
    en: {
      title: 'The Drone\'s Guidance',
      category: 'SHORT FILM',
      description: 'Amidst the brutal chaos of the Ukraine war, a lone surviving soldier is spotted by an enemy drone. Instead of death, the machine offers guidance—a path to a medical station to surrender. But hope can be a cruel illusion on the front lines.',
      pitch: 'A tense and poignant anti-war short film. It builds a fragile connection between man and machine, a moment of unexpected mercy in a merciless conflict. The soldier\'s journey is fraught with suspense, leading to a gut-wrenching, ironic climax that underscores the brutal randomness of war and the tragic cost of a single misstep.'
    },
    vi: {
      title: 'Một Người Lính Đầu Hàng',
      category: 'PHIM NGẮN',
      description: 'Giữa sự hỗn loạn tàn bạo của cuộc chiến Ukraine, một người lính sống sót đơn độc bị một máy bay không người lái của đối phương phát hiện. Thay vì cái chết, cỗ máy lại đưa ra sự chỉ dẫn—một con đường đến trạm y tế để đầu hàng. Nhưng hy vọng có thể là một ảo ảnh tàn nhẫn ở tiền tuyến.',
      pitch: 'Một bộ phim ngắn phản chiến căng thẳng và sâu sắc. Phim xây dựng một mối liên kết mong manh giữa người và máy, một khoảnh khắc của lòng thương xót bất ngờ trong một cuộc xung đột không khoan nhượng. Hành trình của người lính đầy hồi hộp, dẫn đến một cao trào mỉa mai, đau lòng, nhấn mạnh sự ngẫu nhiên tàn bạo của chiến tranh và cái giá bi thảm của một sai lầm duy nhất.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/lone-soldier-drone/800/600',
    images: ['https://picsum.photos/seed/war-ruins-ukraine/1280/720'],
  },
  {
    id: '24h-market-presentation',
    en: {
      title: 'The Violinist of Alley 24',
      category: 'MUSIC PRODUCT',
      description: 'The launch music product for the "24h Market Presentation," telling the inspirational story of a young girl from a poor neighborhood who becomes a violin prodigy.',
      pitch: 'This is more than a product; it\'s a symphony of hope. The music blends classical violin with contemporary beats, mirroring the protagonist\'s journey from the gritty alleys to the grand stage. The accompanying visual tells her story, proving that genius can blossom anywhere, and that a dream is the most valuable commodity.'
    },
    vi: {
      title: 'Nghệ Sĩ Vĩ Cầm Hẻm 24',
      category: 'SẢN PHẨM ÂM NHẠC',
      description: 'Sản phẩm âm nhạc ra mắt cho "Thuyết trình Thị trường 24h," kể câu chuyện truyền cảm hứng về một cô bé từ một khu phố nghèo trở thành một thần đồng violin.',
      pitch: 'Đây không chỉ là một sản phẩm; đó là một bản giao hưởng của hy vọng. Âm nhạc kết hợp violin cổ điển với nhịp điệu đương đại, phản ánh hành trình của nhân vật chính từ những con hẻm gai góc đến sân khấu lớn. Hình ảnh đi kèm kể lại câu chuyện của cô, chứng minh rằng thiên tài có thể nảy nở ở bất cứ đâu, và rằng ước mơ là món hàng quý giá nhất.'
    },
    thumbnailUrl: 'https://picsum.photos/seed/violin-prodigy-street/800/600',
    images: ['https://picsum.photos/seed/girl-playing-violin/1280/720'],
  },
];

export const aiTools = [
    { name: "SUDY MASTER SCRIPT", desc_en: "AI tool for film production support.", desc_vi: "Công cụ AI hỗ trợ làm phim.", link: "https://ai.studio/apps/drive/1z5RKYHiB0doSbniRRSk-oOCeB8fTDhLJ" },
    { name: "SUDY MAGIC TOOL", desc_en: "AI-powered tool for professional photography.", desc_vi: "Công cụ AI cho nhiếp ảnh chuyên nghiệp.", link: "https://ai.studio/apps/drive/1fvOVAddGw7G5ZdRFs_8cgTNbTD4wRsB1" },
    { name: "SUDY ARCHITECTURE", desc_en: "AI assistant for architecture and interior design.", desc_vi: "Trợ lý AI cho kiến trúc và nội thất.", link: "https://ai.studio/apps/drive/1uPpUx0cK1Ck7JxOoEQ_hqYI1dsITzDxg" }
];

export const sponsors: { organizations: Sponsor[], individuals: Sponsor[] } = {
  organizations: [
    { name: 'Quỹ Sáng Tạo "Rồng Bay"' },
    { name: 'Stardust Foundation' },
    { name: 'Tập đoàn "Sao Mai" Ventures' },
    { name: 'Quantum Leap Studios' },
    { name: 'Cộng đồng "Ánh Sáng Việt"' },
    { name: 'Echo Collective Arts' },
  ],
  individuals: [
    { name: 'Lê Thị "Bảy" Ánh Nguyệt' },
    { name: 'Kenji Tanaka' },
    { name: 'Trần "Tư" Văn Rồng' },
    { name: 'Maria Rodriguez' },
    { name: 'Nguyễn Thị Kim Chi' },
    { name: 'Anonymous Phoenix' },
    { name: 'Phạm "Năm" Hùng Dũng' },
    { name: 'David Chen' },
  ]
};

export const translations = {
  en: {
    navHome: 'Home',
    navProjects: 'Projects',
    navAbout: 'About',
    navContact: 'Contact',
    navCrowdfunding: 'Crowdfunding',
    admin: 'Admin',
    heroSubtitle: 'BLOCKBUSTER AI FILMS',
    heroButton: 'EXPLORE WORKS',
    galleryTitle: 'Gallery Works',
    founder: 'Founder',
    watchTrailer: 'Watch Trailer',
    contactEmail: 'syduy.pc@gmail.com',
    contactPhone: '+84 679 265 29',
    aiToolSuite: 'AI Tool Suite',
    crowdfundingTitle: 'Support the Project',
    crowdfundingGoal: 'Goal',
    crowdfundingRaised: 'Raised',
    crowdfundingDonate: 'Donate Now',
    crowdfundingPerksTitle: "Contributor's Perks",
    crowdfundingPerks: [
      'Your name in the "Special Thanks" section of the credits.',
      'Receive an exclusive digital poster.',
      'Get early access to the behind-the-scenes documentary.',
      'An invitation to a private online screening with the director.',
    ],
    donationModalTitle: 'Thank you for your support!',
    donationModalDesc: 'Your contribution brings this vision closer to reality. Please use the details below for your donation.',
    donationBankInfo: 'Bank Information',
    donationAccountName: 'Account Name: Trương Điền Duy',
    donationBankName: 'Bank: VIETCOMBANK',
    donationContactPrompt: 'Let us know about your donation to receive perks!',
    donationEmailLabel: 'Your Email',
    donationMessageLabel: 'Message (Optional)',
    donationSendButton: 'Send Email',
    donationClose: 'Close',
    crowdfundingPageTitle: 'Community Crowdfunding',
    crowdfundingPageDesc: 'Together, we bring ambitious stories to life. Discover projects you can support and see the amazing community that makes it all possible.',
    crowdfundingProjectsTitle: 'Projects Seeking Funding',
    crowdfundingSponsorsTitle: 'Our Valued Sponsors',
    crowdfundingThanks: 'We extend our deepest gratitude to the individuals and organizations who have generously contributed to our creative endeavors. Your support is the cornerstone of our success.',
    sponsorsOrganizations: 'Organizations',
    sponsorsIndividuals: 'Individuals',
    directorProducer: 'Director & Producer',
    teasersTitle: 'Teasers',
  },
  vi: {
    navHome: 'Trang Chủ',
    navProjects: 'Dự Án',
    navAbout: 'Giới Thiệu',
    navContact: 'Liên Hệ',
    navCrowdfunding: 'Gây Quỹ',
    admin: 'Quản Trị',
    heroSubtitle: 'PHIM BOM TẤN AI',
    heroButton: 'KHÁM PHÁ',
    galleryTitle: 'Tác Phẩm',
    founder: 'Nhà Sáng Lập',
    watchTrailer: 'Xem Trailer',
    contactEmail: 'syduy.pc@gmail.com',
    contactPhone: '+84 679 265 29',
    aiToolSuite: 'Bộ Công Cụ AI',
    crowdfundingTitle: 'Gọi Vốn Cho Dự Án',
    crowdfundingGoal: 'Mục tiêu',
    crowdfundingRaised: 'Đã đạt được',
    crowdfundingDonate: 'Ủng Hộ',
    crowdfundingPerksTitle: 'Quyền Lợi Nhà Đóng Góp',
    crowdfundingPerks: [
      'Tên của bạn trong phần "Trân trọng Cảm ơn" của credits phim.',
      'Nhận một poster kỹ thuật số độc quyền.',
      'Quyền truy cập sớm vào phim tài liệu hậu trường.',
      'Lời mời tham dự buổi chiếu phim online riêng tư với đạo diễn.',
    ],
    donationModalTitle: 'Chân thành cảm ơn sự ủng hộ của bạn!',
    donationModalDesc: 'Sự đóng góp của bạn giúp dự án đến gần hơn với hiện thực. Vui lòng sử dụng thông tin dưới đây để quyên góp.',
    donationBankInfo: 'Thông Tin Tài Khoản',
    donationAccountName: 'Chủ tài khoản: Trương Điền Duy',
    donationBankName: 'Ngân hàng: VIETCOMBANK',
    donationContactPrompt: 'Hãy cho chúng tôi biết về khoản đóng góp của bạn để nhận quà nhé!',
    donationEmailLabel: 'Email của bạn',
    donationMessageLabel: 'Lời nhắn (Không bắt buộc)',
    donationSendButton: 'Gửi Email',
    donationClose: 'Đóng',
    crowdfundingPageTitle: 'Gây Quỹ Cộng Đồng',
    crowdfundingPageDesc: 'Cùng nhau, chúng ta biến những câu chuyện đầy tham vọng thành hiện thực. Khám phá các dự án bạn có thể hỗ trợ và chiêm ngưỡng cộng đồng tuyệt vời đã giúp mọi thứ trở nên khả thi.',
    crowdfundingProjectsTitle: 'Các Dự Án Đang Kêu Gọi Vốn',
    crowdfundingSponsorsTitle: 'Các Nhà Tài Trợ Đáng Kính',
    crowdfundingThanks: 'Chúng tôi xin gửi lời tri ân sâu sắc nhất đến các cá nhân và tổ chức đã hào phóng đóng góp cho những nỗ lực sáng tạo của chúng tôi. Sự ủng hộ của bạn là nền tảng cho thành công của studio.',
    sponsorsOrganizations: 'Tổ Chức',
    sponsorsIndividuals: 'Cá Nhân',
    directorProducer: 'Đạo diễn & Sản xuất',
    teasersTitle: 'Teaser Clips',
  }
};