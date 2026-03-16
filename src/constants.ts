export interface Game {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  appImageUrl: string;
  thumbnail: string;
  category: string;
}

export const GAMES: Game[] = [
  {
    id: "pacman",
    title: "Pac-Man",
    description: "The classic arcade game where you eat dots and avoid ghosts.",
    iframeUrl: "https://www.google.com/logos/2010/pacman10-i.html",
    appImageUrl: "https://github.com/mamedev/mame/releases/download/mame0251/mame0251_linux.AppImage", // Placeholder for actual AppImage
    thumbnail: "https://picsum.photos/seed/pacman/400/250",
    category: "Arcade"
  },
  {
    id: "2048",
    title: "2048",
    description: "Join the numbers and get to the 2048 tile!",
    iframeUrl: "https://play2048.co/",
    appImageUrl: "https://github.com/gabrielecirulli/2048/releases/download/v1.0.0/2048.AppImage", // Placeholder
    thumbnail: "https://picsum.photos/seed/2048/400/250",
    category: "Puzzle"
  },
  {
    id: "hextris",
    title: "Hextris",
    description: "Fast-paced puzzle game inspired by Tetris but on a hexagon.",
    iframeUrl: "https://hextris.io/",
    appImageUrl: "https://github.com/Hextris/hextris/releases/download/v1.0/hextris.AppImage", // Placeholder
    thumbnail: "https://picsum.photos/seed/hextris/400/250",
    category: "Puzzle"
  },
  {
    id: "sinuous",
    title: "Sinuous",
    description: "Avoid the red dots and stay alive as long as possible.",
    iframeUrl: "https://sinuousgame.com/",
    appImageUrl: "https://github.com/hakimel/sinuous/releases/download/v1.0/sinuous.AppImage", // Placeholder
    thumbnail: "https://picsum.photos/seed/sinuous/400/250",
    category: "Action"
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    description: "Flap your wings to fly through the pipes.",
    iframeUrl: "https://flappybird.io/",
    appImageUrl: "https://github.com/nebez/floppybird/releases/download/v1.0/flappy.AppImage", // Placeholder
    thumbnail: "https://picsum.photos/seed/flappy/400/250",
    category: "Arcade"
  }
];
