export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export type Project = {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  status?: string;
};

export const site = {
  name: "Nihao",
  domain: "nihao.tech",
  url: "https://nihao.tech",
  title: "Nihao — a small corner of the internet",
  description:
    "Nihao is a student exploring the internet, building small things and figuring stuff out.",
  discordId: "1163514300212723777",
  status: "currently doing something interesting",
  about:
    "I'm just a student who enjoys exploring technology, experimenting with code, building random projects and spending way too much time on the internet.",
  interests: [
    "Development",
    "Gaming",
    "Music",
    "Technology",
    "Discord",
    "Creative experiments",
  ],
  socials: {
    discord: {
      label: "Discord",
      handle: "@8fqm",
      href: "https://discord.com/users/1163514300212723777",
    },
    github: {
      label: "GitHub",
      handle: "@shyradio",
      href: "https://github.com/shyradio",
    },
    email: {
      label: "Email",
      handle: "nihao@nihao.tech",
      href: "mailto:nihao@nihao.tech",
    },
  } satisfies Record<string, SocialLink>,
  projects: [
    {
      name: "discord music bot",
      description:
        "A bot that plays music in voice channels. The queue logic is still being rewritten every other weekend.",
      tech: ["TypeScript", "discord.js", "Node.js"],
      status: "work in progress",
    },
    {
      name: "playlist transfer",
      description:
        "Moves playlists between streaming services without losing the order. An early experiment that keeps growing.",
      tech: ["React", "TypeScript", "Spotify API"],
      status: "early experiment",
    },
    {
      name: "this website",
      description:
        "The page you're on right now. Built to be a small, personal corner of the internet.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      live: "/",
    },
  ] satisfies Project[],
};
