import { useEffect, useState } from "react";

const sections = ["home", "about", "achievements", "find-me"] as const;

export function useActiveSection() {
  const [active, setActive] = useState<string>(sections[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current: string = sections[0];

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= marker) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) current = sections[sections.length - 1];
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}
