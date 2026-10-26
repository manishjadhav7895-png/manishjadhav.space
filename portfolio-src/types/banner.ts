export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  role: string;
  duration: string;
  viewsOrMetric: string;
  description: string;
  software: string[];
  aspectRatio: string;
  accentColor: string;
  thumbnailGradient: string;
  videoType: 'commercial' | 'documentary' | 'motion_graphics' | 'short_form';
}

export interface VerticalVideoItem {
  id: string;
  title: string;
  client: string;
  category: string;
  runtime: string;
  videoSrc: string;
  posterSrc?: string;
  badge: string;
  colorAccent: string;
}

export interface WidescreenShowcaseItem {
  id: string;
  title: string;
  category: string;
  client: string;
  runtime: string;
  videoSrc: string;
  posterSrc?: string;
  tag: string;
  description: string;
}

export const WIDESCREEN_SHOWCASE_ITEMS: WidescreenShowcaseItem[] = [
  {
    id: "wide-1",
    title: "Apex Formula — 4K Commercial Reel",
    category: "Commercial Cut · Sound Design",
    client: "Formula Velocity",
    runtime: "01:45",
    videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    posterSrc: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    tag: "Commercial Edit",
    description: "High-octane commercial edit integrating rapid rhythmic cutting, dynamic speed ramping, and custom sound design.",
  },
  {
    id: "wide-2",
    title: "Sintel: Cinematic Narrative Cut",
    category: "Story-Driven Film · Color Science",
    client: "Blender Institute",
    runtime: "00:52",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    posterSrc: "https://media.w3.org/2010/05/sintel/poster.png",
    tag: "Narrative Film",
    description: "Emotion-led pacing, rhythmic narrative cutting, and filmic warm-cool split-tone color science.",
  },
  {
    id: "wide-3",
    title: "Ocean Odyssey: Brand Documentary",
    category: "Atmospheric Grade · Rhythm Edit",
    client: "National Oceanography",
    runtime: "01:30",
    videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
    posterSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    tag: "Documentary Film",
    description: "Immersive natural history cut with precision sound design, ambient sub-bass textures, and deep cyan-orange grading.",
  },
  {
    id: "wide-4",
    title: "Big Buck: Animated Studio Reel",
    category: "3D Animation · Sound Sync",
    client: "Peach Open Movie",
    runtime: "01:10",
    videoSrc: "https://media.w3.org/2010/05/bunny/movie.mp4",
    posterSrc: "https://media.w3.org/2010/05/bunny/poster.png",
    tag: "Animation Studio",
    description: "Dynamic character cut, synchronized musical hits, and comedic pacing designed for broadcast television.",
  },
  {
    id: "wide-5",
    title: "Kinetic Velocity: Extreme Sports Film",
    category: "Aerial Cinematography · Pacing",
    client: "Redline Athletics",
    runtime: "01:15",
    videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    posterSrc: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    tag: "Brand Anthem",
    description: "Ultra-wide 4K cinematography cut with rhythmic bass pulses, optical speed ramps, and high-contrast color grading.",
  },
  {
    id: "wide-6",
    title: "Neon Odyssey: Main Title Sequence",
    category: "Kinetic Typography · 3D VFX",
    client: "Dystopia Pictures",
    runtime: "00:45",
    videoSrc: "https://media.w3.org/2010/05/video/movie_300.mp4",
    posterSrc: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    tag: "Title Sequence",
    description: "Distorted typographic glyphs, glowing laser wireframes, and synchronized optical transition design.",
  },
];

export const VERTICAL_SHOWCASE_VIDEOS: VerticalVideoItem[] = [
  {
    id: "reel-1",
    title: "NEO-RUNNER // KINETIC ANTHEM",
    client: "Volt Athletics",
    category: "Commercial Speed Ramp",
    runtime: "00:45",
    videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    posterSrc: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    badge: "Sports Reel",
    colorAccent: "#E6121D",
  },
  {
    id: "reel-2",
    title: "CYBERPULSE // TITLE SEQUENCE",
    client: "Hyperion Digital",
    category: "3D Motion Graphics & Glitch",
    runtime: "00:32",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    posterSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    badge: "Title Design",
    colorAccent: "#EF4444",
  },
  {
    id: "reel-3",
    title: "AURA NOIR // FASHION EDITORIAL",
    client: "Noir Atelier",
    category: "Color Science & Pacing",
    runtime: "00:54",
    videoSrc: "https://media.w3.org/2010/05/bunny/trailer.mp4",
    posterSrc: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    badge: "Brand Film",
    colorAccent: "#DC2626",
  },
  {
    id: "reel-4",
    title: "OCEAN HORIZON // CINEMATIC CUT",
    client: "Pacific Blue Productions",
    category: "Nature Doc & Color Science",
    runtime: "00:40",
    videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
    posterSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    badge: "Documentary",
    colorAccent: "#E6121D",
  },
  {
    id: "reel-5",
    title: "SONIC BEAT // RHYTHM FOLEY",
    client: "Bassline Studio",
    category: "Audio Sync & Sound Design",
    runtime: "00:38",
    videoSrc: "https://media.w3.org/2010/05/video/movie_300.mp4",
    posterSrc: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    badge: "Audio Sync",
    colorAccent: "#EF4444",
  },
  {
    id: "reel-6",
    title: "ALPINE HORIZON // EXTREME CUT",
    client: "Summit Velocity",
    category: "Speed Ramps & Drone VFX",
    runtime: "00:48",
    videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    posterSrc: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    badge: "Extreme Action",
    colorAccent: "#B91C1C",
  },
];

export interface BannerData {
  // Top left
  categoryLine1: string;
  categoryLine2: string;

  // Top right
  availabilityStatus: string;
  availabilitySubtext: string;

  // Background big editorial text
  backgroundTitle: string;
  showBackgroundTitle: boolean;
  backgroundTitleColorMode: 'hidden' | 'red' | 'outline' | 'subtle-white';

  // Left column
  greetingScript: string;
  firstName: string;
  lastName: string;
  roleTitle: string;
  supportingCopy: string;

  // Right column callout
  quoteLine1: string;
  quoteLine2: string;

  // Stats
  stat1Value: string;
  stat1Line1: string;
  stat1Line2: string;

  stat2Value: string;
  stat2Line1: string;
  stat2Line2: string;

  stat3Value: string;
  stat3Line1: string;
  stat3Line2: string;

  // Tools line
  toolsList: string;

  // Bottom bar
  footerLeft: string;
  footerRight: string;

  // Portrait controls
  showPerson: boolean;
  customPhotoUrl?: string;
  portraitScale: number;
  portraitYOffset: number;
  rimLightIntensity: number;
}

export const DEFAULT_BANNER_DATA: BannerData = {
  categoryLine1: "VIDEO EDITOR",
  categoryLine2: "MOTION DESIGNER",
  availabilityStatus: "OPEN TO WORK",
  availabilitySubtext: "FULL-TIME & FREELANCE",
  backgroundTitle: "EDITOR",
  showBackgroundTitle: false,
  backgroundTitleColorMode: 'hidden',
  greetingScript: "Hello, I'm",
  firstName: "MANISH",
  lastName: "JADHAV",
  roleTitle: "VIDEO EDITOR & MOTION DESIGNER",
  supportingCopy: "I create story-driven videos, motion graphics and visual experiences for brands, businesses and creators.",
  quoteLine1: "Turning ideas into",
  quoteLine2: "visual stories.",
  stat1Value: "02+",
  stat1Line1: "YEARS",
  stat1Line2: "EXPERIENCE",
  stat2Value: "30+",
  stat2Line1: "CLIENTS",
  stat2Line2: "WORKED WITH",
  stat3Value: "250+",
  stat3Line1: "PROJECTS",
  stat3Line2: "COMPLETED",
  toolsList: "PREMIERE PRO · AFTER EFFECTS · PHOTOSHOP · ILLUSTRATOR",
  footerLeft: "SELECTED WORK",
  footerRight: "VIEW ALL",
  showPerson: false,
  portraitScale: 108,
  portraitYOffset: 0,
  rimLightIntensity: 90,
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "NEO-RUNNER: KINETIC ANTHEM",
    client: "Volt Athletics",
    category: "Commercial Motion & Sound Design",
    role: "Lead Editor & Motion Graphic Designer",
    duration: "01:24",
    viewsOrMetric: "2.4M+ Impressions",
    description: "High-octane commercial campaign featuring synchronized kinetic typography, dynamic speed ramps, sound design Foley, and intense color grading.",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    aspectRatio: "16:9",
    accentColor: "#E6121D",
    thumbnailGradient: "from-red-950/70 via-black to-zinc-950",
    videoType: "commercial",
  },
  {
    id: "proj-2",
    title: "SILICON ROOTS: FOUNDER CHRONICLES",
    client: "Aura Capital",
    category: "Narrative Documentary Series",
    role: "Documentary Video Editor",
    duration: "14:18",
    viewsOrMetric: "Featured on Curated Picks",
    description: "A nuanced, emotionally resonant mini-documentary exploring the gritty early days of hardware tech founders. Focused on pacing, audio immersion, and archival restoration.",
    software: ["Premiere Pro", "Photoshop", "Audition"],
    aspectRatio: "16:9",
    accentColor: "#DC2626",
    thumbnailGradient: "from-zinc-900 via-black to-red-950/40",
    videoType: "documentary",
  },
  {
    id: "proj-3",
    title: "CYBERPULSE: MAIN TITLE SEQUENCE",
    client: "Hyperion Digital",
    category: "3D Motion Graphics & Visual Identity",
    role: "Motion Designer & Compositor",
    duration: "00:48",
    viewsOrMetric: "Motion Excellence Award",
    description: "Futuristic HUD telemetry visuals, distorted glitch shaders, chromatic aberration passes, and rhythmic vector animations.",
    software: ["After Effects", "Illustrator", "Cinema 4D"],
    aspectRatio: "16:9",
    accentColor: "#EF4444",
    thumbnailGradient: "from-red-900/50 via-zinc-950 to-black",
    videoType: "motion_graphics",
  },
];
