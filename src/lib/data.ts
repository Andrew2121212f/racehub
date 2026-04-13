// Статичные данные для лендингов

export interface Horse {
  id: string;
  name: string;
  image: string;
  eventLink: string;
  event: string;
}

export interface RaceEvent {
  id: string;
  name: string;
  image: string;
}

// Видео для hero-секций (Mixkit — бесплатные, без водяных знаков)
export const heroVideos = {
  beginners: "https://assets.mixkit.co/videos/49317/49317-720.mp4",
  races: "https://assets.mixkit.co/videos/14899/14899-720.mp4",
};

// Звёзды скачек 2026
export const horses: Horse[] = [
  {
    id: "iroko",
    name: "Iroko",
    image: "/horses/iroko.jpg",
    event: "Grand National Festival 2026",
    eventLink: "/races#grand-national",
  },
  {
    id: "commandment",
    name: "Commandment",
    image: "/horses/commandment.jpg",
    event: "Kentucky Derby 2026",
    eventLink: "/races#kentucky-derby",
  },
  {
    id: "barnes",
    name: "Barnes",
    image: "/horses/barnes.jpg",
    event: "Preakness Stakes 2026",
    eventLink: "/races#preakness",
  },
  {
    id: "minnie-hauk",
    name: "Minnie Hauk",
    image: "/horses/minnie-hauk.jpg",
    event: "Prix de l'Arc de Triomphe 2026",
    eventLink: "/races#arc",
  },
  {
    id: "senor-buscador",
    name: "Senor Buscador",
    image: "/horses/senor-buscador.jpg",
    event: "Breeders' Cup 2026",
    eventLink: "/races#breeders-cup",
  },
];

// Главные события сезона 2026
export const raceEvents: RaceEvent[] = [
  {
    id: "grand-national",
    name: "Grand National Festival",
    image: "/races/grand-national.jpg",
  },
  {
    id: "kentucky-derby",
    name: "Kentucky Derby",
    image: "/races/kentucky-derby.jpg",
  },
  {
    id: "preakness",
    name: "Preakness Stakes",
    image: "/races/preakness.jpg",
  },
  {
    id: "arc",
    name: "Prix de l'Arc de Triomphe",
    image: "/races/prix-arc.jpg",
  },
  {
    id: "breeders-cup",
    name: "Breeders' Cup",
    image: "/races/breeders-cup.jpg",
  },
];
