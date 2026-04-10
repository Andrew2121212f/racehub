// Статичные данные для лендингов

export interface Horse {
  id: string;
  name: string;
  country: string;
  description: string;
  why: string;
  event: string;
  eventLink: string;
  image: string;
}

export interface RaceEvent {
  id: string;
  name: string;
  date: string;
  month: string;
  description: string;
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
    country: "Франция",
    description:
      "Iroko — это типичный «тихий убийца» на дистанции: он не бросается в глаза, но стабильно оказывается среди лидеров.",
    why: "Это выбор для тех, кто хочет минимизировать риск и играть на стабильности. Лёгкий вес и опытный жокей делают его особенно опасным на длинной дистанции.",
    event: "Grand National Festival 2026",
    eventLink: "/races#grand-national",
    image: "/horses/iroko.jpg",
  },
  {
    id: "commandment",
    name: "Commandment",
    country: "США",
    description:
      "Commandment — это взрывная скорость и давление с первых секунд. Победа в Risen Star Stakes сделала его одним из самых обсуждаемых молодых претендентов.",
    why: "Идеален для тех, кто хочет почувствовать адреналин: ставка на него — это всегда «всё или ничего». В паре с сильным жокеем он может задать темп, который просто «сломает» гонку.",
    event: "Kentucky Derby 2026",
    eventLink: "/races#kentucky-derby",
    image: "/horses/commandment.jpg",
  },
  {
    id: "barnes",
    name: "Barnes",
    country: "США",
    description:
      "Barnes — символ надёжности: после Kentucky Derby он доказал, что умеет держать форму и не теряться под давлением топ-соперников.",
    why: "Это идеальный «умный выбор» — не самый хайповый, но часто самый выгодный. В руках одного из лучших жокеев США он становится ещё более опасным.",
    event: "Preakness Stakes 2026",
    eventLink: "/races#preakness",
    image: "/horses/barnes.jpg",
  },
  {
    id: "minnie-hauk",
    name: "Minnie Hauk",
    country: "Франция",
    description:
      "Minnie Hauk — воплощение класса и родословной. Её уже называют будущей звездой уровня Prix de l'Arc de Triomphe.",
    why: "Ставка на неё — это выбор в пользу очевидного таланта. А опытный жокей мирового уровня усиливает ощущение, что всё «под контролем».",
    event: "Prix de l'Arc de Triomphe 2026",
    eventLink: "/races#arc",
    image: "/horses/minnie-hauk.jpg",
  },
  {
    id: "senor-buscador",
    name: "Senor Buscador",
    country: "США",
    description:
      "Senor Buscador — это ветеран с характером, который не раз возвращался в борьбу, когда его уже списывали. Опыт на уровне G1 делает его опасным против любого состава.",
    why: "Это история про возвращение, за которое хочется болеть. С таким жокеем он способен выжать максимум даже в самых сложных гонках.",
    event: "Breeders' Cup 2026",
    eventLink: "/races#breeders-cup",
    image: "/horses/senor-buscador.jpg",
  },
];

// Главные события сезона 2026 (фото скачек с Unsplash)
export const raceEvents: RaceEvent[] = [
  {
    id: "grand-national",
    name: "Grand National Festival",
    date: "Апрель 2026",
    month: "АПР",
    description:
      "Grand National — это испытание на выживание, где фавориты часто уступают тем, кто просто выдержал дистанцию. Каждая секунда наполнена напряжением, а финиш — это почти всегда история вопреки ожиданиям.",
    image: "/races/grand-national.jpg",
  },
  {
    id: "kentucky-derby",
    name: "Kentucky Derby",
    date: "Май 2026",
    month: "МАЙ",
    description:
      "Kentucky Derby — это момент, когда рождаются звёзды. Молодые лошади выходят на старт с шансом войти в историю.",
    image: "/races/kentucky-derby.jpg",
  },
  {
    id: "preakness",
    name: "Preakness Stakes",
    date: "Май 2026",
    month: "МАЙ",
    description:
      "После Derby именно здесь решается, есть ли у чемпиона настоящий запас прочности. Preakness — это гонка, где стратегия выходит на первый план, а ошибки стоят слишком дорого.",
    image: "/races/preakness.jpg",
  },
  {
    id: "arc",
    name: "Prix de l'Arc de Triomphe",
    date: "Октябрь 2026",
    month: "ОКТ",
    description:
      "Arc — это главная гонка Европы, где сходятся лучшие из лучших.",
    image: "/races/prix-arc.jpg",
  },
  {
    id: "breeders-cup",
    name: "Breeders' Cup",
    date: "Октябрь 2026",
    month: "ОКТ",
    description:
      "Breeders' Cup — это финальный аккорд сезона, фактически «чемпионат мира», который собирает лучших со всех континентов.",
    image: "/races/breeders-cup.jpg",
  },
];
