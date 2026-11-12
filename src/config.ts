export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export const site = {
  name: "Purush",
  domain: "purush.tech",
  url: "https://purush.tech",
  repo: "https://github.com/shyradio/Purush",
  title: "Purush — a small corner of the internet",
  description:
    "Purush is a student exploring the internet, building small things and figuring stuff out.",
  discordId: "1163514300212723777",
  status: "currently doing something interesting",
  about:
    "I'm just a student who enjoys exploring technology, experimenting with code, building random projects and spending way too much time on the internet.",
  interests: [
    "Development",
    "Gaming",
    "Music",
    "Technology",
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
      handle: "purush@purush.tech",
      href: "mailto:purush@purush.tech",
    },
  } satisfies Record<string, SocialLink>,
  achievements: [
    "Friend of ex-class monitor",
    "Former Child",
    "Personally knew someone who got full marks",
  ],
};
