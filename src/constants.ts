export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  thumbnail: string;
  category: "Residential" | "Commercial" | "Retail" | "Bespoke";
  tags: string[];
  year: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  appImageUrl: string;
  thumbnail: string;
  category: string;
  cover: string;
}

export const PROJECTS: Project[] = [
  {
    id: "elysian-residence",
    title: "Elysian Residence",
    description:
      "A calm city home built around raw concrete walls and large windows that flood every room with natural light.",
    details:
      "Located in central Phnom Penh, this three-bedroom residence uses exposed concrete and warm timber accents to create a quiet retreat from the city. The client wanted a home that felt open but private, and every room was planned to balance those two needs.",
    thumbnail: "/src/assets/elysian.png",
    category: "Residential",
    tags: ["Minimalism", "Concrete", "Urban"],
    year: "2024",
  },
  {
    id: "obsidian-lounge",
    title: "Obsidian Lounge",
    description:
      "A commercial lounge designed around dark materials and focused lighting to create an intimate, dramatic atmosphere.",
    details:
      "The client wanted a space that felt different from typical bars and lounges — quieter, more refined. We used deep charcoal stone, dark velvet seating, and a ceiling of directional pendant lights to create distinct pockets of warmth throughout the room.",
    thumbnail: "/src/assets/obsidian.png",
    category: "Commercial",
    tags: ["Atmospheric", "Luxury", "Retail"],
    year: "2023",
  },
  {
    id: "ivory-atelier",
    title: "Ivory Atelier",
    description:
      "A bright, multi-level studio space designed for a fashion label that needed room to create, meet, and display.",
    details:
      "The brief called for a flexible workspace that could shift between showroom, workshop, and meeting space without feeling cluttered. We used a mezzanine layout, clean white plaster walls, and modular rails to keep the space adaptable and easy to rearrange.",
    thumbnail: "/src/assets/ivory.png",
    category: "Commercial",
    tags: ["Bright", "Modular", "Studio"],
    year: "2023",
  },
  {
    id: "verdant-villa",
    title: "Verdant Villa",
    description:
      "A tropical villa that opens fully to the surrounding garden, using local stone and bamboo throughout.",
    details:
      "Built on a hillside outside of Siem Reap, this home was designed to stay cool naturally and feel connected to the outdoors. Local volcanic stone forms the base structure, while bamboo screens filter the light and provide privacy without closing the space off.",
    thumbnail: "/src/assets/verdant.png",
    category: "Residential",
    tags: ["Tropical", "Sustainable", "Architecture"],
    year: "2024",
  },
];

export const GAMES: Game[] = [
  {
    id: "TypingCode",
    title: "Typing Code",
    description:
      "The classic typing code game. Type the code correctly to keep the game going!",
    iframeUrl: "https://typing-code-game.vercel.app",
    appImageUrl:
      "https://drive.google.com/file/d/1l1rA29APscP38-PhAwd84miuwOQCI2-K/view?usp=sharing",
    cover: "../public/game-cover/inside-game/inside-typing-code.png",
    thumbnail: "../public/game-cover/typing-code.png",
    category: "typing",
  },
  {
    id: "TypingMath",
    title: "Typing Math",
    description:
      "The classic typing math game. Thinking fast and typing the number correctly to keep the game going!",
    iframeUrl: "https://typing-math-game.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1crkVv9NvpqEmCwA10r-k2Bwr6ouEcj_-/view?usp=sharing",
    cover: "../public/game-cover/inside-game/inside-typing-math.png",
    thumbnail: "../public/game-cover/typing-math.png",
    category: "typing",
  },
  {
    id: "dragon-drop",
    title: "Dragon Drop",
    description:
      "A fun and addictive game where you control a dragon to catch falling objects. Test your reflexes and see how long you can survive!",
    iframeUrl: "https://dragon-drop-iota.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1DHNe44e70h0XjSHZemLClLWw0A2l88uh/view?usp=sharing",
    cover: "../public/game-cover/inside-game/inside-dragon-drop.png",
    thumbnail: "../public/game-cover/dragon-drop.png",
    category: "mouse",
  },
  {
    id: "RobotBrainiac",
    title: "Robot Brainiac",
    description:
      "An action-packed puzzle game where you guide a brilliant robot through challenging brain-teasing challenges. Solve puzzles, navigate obstacles, and push your strategy skills to the limit!",
    iframeUrl: "https://robot-brainiac.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1fnc-RCf242B9dC5a516VlFERCZ_HVJzi/view?usp=sharing",
    cover: "../public/game-cover/inside-game/inside-robot-brainiac.png",
    thumbnail: "../public/game-cover/robot-brainiac.png",
    category: "Action",
  },
  {
    id: "MasterMouse",
    title: "Master Mouse",
    description:
      "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    iframeUrl: "https://master-mouse-v1-1-0.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1lwv8tyf_UsuwLATV6OxoJW1Tewy9GLEg/view?usp=drive_link",
    cover: "../public/game-cover/inside-game/inside-master-mouse.png",
    thumbnail: "../public/game-cover/master-mouse.png",
    category: "mouse",
  },
  {
    id: "LinkNumber",
    title: "Link Number",
    description: "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    iframeUrl: "https://link-number.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/162FfIfjRK249uDLKwHkaBS-JfbwFXwZI/view?usp=sharing",
    thumbnail: "../public/game-cover/link-number.png",
    cover: "../public/game-cover/inside-game/inside-link-number.png",
    category: "puzzle",
  },
];

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string;
  logo: string;
  gradient: string;
  level: string;
  lessons: Lesson[];
}

export const TOPICS: Topic[] = [
  {
    id: "html",
    title: "HTML",
    description: "The standard markup language for documents designed to be displayed in a web browser.",
    iconName: "LayoutTemplate",
    logo: "../public/program-logo/html.png",
    gradient: "from-orange-500/20 to-orange-200/5",
    level: "Beginner",
    lessons: [
      { id: "html-1", title: "Introduction to HTML", description: "Learn the basic structure of an HTML document.", duration: "30 mins" },
      { id: "html-2", title: "HTML Elements and Tags", description: "Deep dive into paragraphs, headings, and formatting.", duration: "45 mins" },
      { id: "html-3", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-4", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-5", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-6", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-7", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-8", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-9", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-10", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-11", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-12", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-13", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" },
      { id: "html-14", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" }
    ]
  },
  {
    id: "css",
    title: "CSS",
    description: "Style sheet language used for describing the presentation of a document written in HTML.",
    iconName: "Paintbrush",
    logo: "../public/program-logo/css.png",
    gradient: "from-blue-500/20 to-blue-200/5",
    level: "Beginner",
    lessons: [
      { id: "css-1", title: "CSS Fundamentals", description: "Understanding selectors, properties, and values.", duration: "45 mins" },
      { id: "css-2", title: "Flexbox & Grid", description: "Mastering modern layout techniques.", duration: "1.5 hrs" },
      { id: "css-3", title: "Animations", description: "Creating smooth transitions and keyframe animations.", duration: "1 hr" }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "High-level, often just-in-time compiled language that conforms to the ECMAScript standard.",
    iconName: "Code2",
    logo: "../public/program-logo/javascript.png",
    gradient: "from-yellow-400/20 to-yellow-100/5",
    level: "Intermediate",
    lessons: [
      { id: "js-1", title: "Variables & Data Types", description: "Understanding let, const, strings, arrays, and objects.", duration: "1 hr" },
      { id: "js-2", title: "Functions & Scope", description: "Learn about arrow functions, closures, and lexical scope.", duration: "1.5 hrs" },
      { id: "js-3", title: "DOM Manipulation", description: "Interacting with the browser and handling events.", duration: "2 hrs" }
    ]
  },
  {
    id: "react",
    title: "React",
    description: "A free and open-source front-end JavaScript library for building user interfaces based on components.",
    iconName: "AppWindow",
    logo: "../public/program-logo/react.png",
    gradient: "from-cyan-500/20 to-cyan-200/5",
    level: "Advanced",
    lessons: [
      { id: "react-1", title: "Components & Props", description: "Building reusable UI components.", duration: "1 hr" },
      { id: "react-2", title: "State & Hooks", description: "Managing state with useState and useEffect.", duration: "2 hrs" },
      { id: "react-3", title: "Routing", description: "Client-side routing with React Router.", duration: "1.5 hrs" }
    ]
  }
];

export const categories = [
  {
    name: "All Team",
    moments: [
      { title: "Rithy THOUL", role: "Promoter && Connection", description: "CEO of KOOMPI", image: "../public/team/rithy-thul.png" },
      { title: "Brilliant PHAL", role: "OS Lead", description: "OS Lead", image: "../public/team/brilliant.jpg" },
      { title: "Vuthy SAN", role: "Developer", description: "Web Apps Dev Lead", image: "../public/team/vuthy.jpg" },
      { title: "Raksme VEN", role: "Bussiness ", description: "Finance & Vendor Relation", image: "../public/team/raksme.jpg" },
      { title: "Sukunthy CHAN", role: "Bussiness ", description: "Finance & Vendor Relation", image: "../public/team/sukunthy.png" },
      { title: "Sela THOL", role: "Bussiness", description: "Media and Communicaiton Manager", image: "../public/team/sela.jpg" },
      { title: "Theara THEN", role: "Developer & Bussiness", description: "Developer & Social Marketing & Sales", image: "../public/team/theara.jpg" },
      { title: "Thith THIN", role: "Developer", description: "Fulll Stack Developer", image: "../public/team/thith.jpg" },
      { title: "Hangsea HONG", role: "DevOps", description: "OS Developer", image: "../public/team/hangsea.jpg" },
      { title: "Sokunsamnang SAM AN", role: "Developer", description: "Network Devs & Mobile Application ", image: "../public/team/samnang.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
    ]
  },
  {
    name: "Developers",
    moments: [
      { title: "Sivchheng Kheang", role: "Technical Lead", description: "Architecting the technical core and high-performance visions.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
      { title: "Long Sei", role: "DevOps Engineer", description: "Optimizing cloud orchestration and system deployment cycles.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
    ]
  },
  {
    name: "Designers",
    moments: [
      { title: "Dara Som", role: "UI/UX Engineer", description: "Refining visual optics and interactive design protocols.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    ]
  },
  {
    name: "Apprentice",
    moments: [
      { title: "Sivchheng Kheang", role: "Apprentice", description: "Developer & Learning Full Stack Developer", image: "../public/team/sivchheng.jpg" },
      { title: "Keochheang THON", role: "Apprentice", description: "Designer", image: "../public/team/keochheang.jpg" },
      { title: "Narith CHOM", role: "Apprentice", description: "Developer", image: "../public/team/narith.jpg" },
      { title: "Sisuykong Sao ", role: "Apprentice", description: "Developer", image: "../public/team/sisuykong.jpg" },
    ]
  }
];