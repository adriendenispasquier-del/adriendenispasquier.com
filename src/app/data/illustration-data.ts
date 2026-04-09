// Illustration data now uses Cloudinary CDN
// Cloud name: df2kod03a | Folder: Home

import { getCloudinaryUrlFromTitle } from "../utils/cloudinary";

export interface Illustration {
  src: string;
  width: number;
  height: number;
}

export interface IllustrationProject {
  title: string;
  subtitle?: string;
  description: string;
  displayType: "random" | "grid";
  illustrations: Illustration[];
  cover?: string; // explicit grid thumbnail; falls back to illustrations[0] if omitted
}

export const illustrationData: Record<string, IllustrationProject> = {
  archipel: {
    cover: "https://res.cloudinary.com/df2kod03a/image/upload/v1771322314/Image_18_niuhvc.gif",
    title: "Archipel",
    subtitle: "The Archipel Doodles | Website, Social Media Content | 2019-2026",
    description:
      "Archipel’s visual identity gradually became inseparable from the doodles I created over the years.\n\nWhat began as carefully rendered drawings slowly evolved into something more instinctive and distilled. The lines became freer, more essential, sometimes drawn in a single gesture — frame after frame — embracing spontaneity over precision.\n\nThese animations were conceived as playful visual anchors, both on Instagram and online. They carry a deliberate sense of naivety and warmth, echoing something tender and familiar in all of us. Beyond decoration, they became a subtle emotional layer within the brand, bringing rhythm, personality and quiet cosiness to the experience.",
    displayType: "random",
    illustrations: [
      { src: getCloudinaryUrlFromTitle("Archipel 1"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 2"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 3"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 4"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 5"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 6"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 7"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 8"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 9"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 15"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 16"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 17"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 18"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 19"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 20"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 21"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 22"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 23"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 24"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 25"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 26"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 27"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 28"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 29"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 30"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 31"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 32"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 33"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 34"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 35"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Archipel 36"), width: 1200, height: 1600 },
    ],
  },
  cyberleaders: {
    cover: "https://res.cloudinary.com/df2kod03a/image/upload/v1771322557/Image_9_llc1h0.jpg",
    title: "Cyberleaders (2021 - 2025)",
    subtitle: "Editorial Illustrations Since 2021 - Issues #1, #2, #3, #4",
    description:
      "Cyberleaders is an annual publication exploring the evolving landscape of cybersecurity and digital leadership. I have contributed to every issue, designing the cover and creating two interior illustrations for each edition.\n\nWorking closely with Marie-Laurence Bickel, Creative Director of the project, and collaborating with the team at Avizia Partners, each year presented a new challenge. Responding to detailed briefs and mood boards required precision and adaptability, while allowing space for exploration.\n\nEach edition became an opportunity to experiment with different techniques and visual languages, balancing clarity with stylistic evolution. It has been a pleasure to contribute to the identity of the magazine year after year.",
    displayType: "grid",
    illustrations: [
      { src: getCloudinaryUrlFromTitle("Cyberleader 1"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 2"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 3"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 4"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 5"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 6"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 7"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 8"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 9"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 10"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 11"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 12"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 13"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Cyberleader 14"), width: 1200, height: 1600 },
    ],
  },
  "rocket-wine": {
    cover: "https://res.cloudinary.com/df2kod03a/image/upload/v1771322598/Image_3_unyb8o.jpg",
    title: "Rocket Wine (2024 - 2025",
    subtitle: "Event Posters for Wine Rush, Pop-ups",
    description:
      "I have been collaborating with Jeff, co-founder of Rocket Wine, for several years. This ongoing exchange led to the creation of multiple projects together, notably for the Wine Rush festival.\n\nFor this series, I explored a new graphic direction inspired by painting techniques and layered color application. The visual language was built through successive layers, allowing depth and vibration to emerge rather than relying on flat construction.\n\nThis approach introduced a more expressive and textured aesthetic, expanding the identity of the festival while maintaining clarity and impact.",
    displayType: "grid",
    illustrations: [
      { src: getCloudinaryUrlFromTitle("Rocket Wine 1"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Rocket Wine 2"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Rocket Wine 3"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Rocket Wine 4"), width: 1200, height: 1600 },
      { src: getCloudinaryUrlFromTitle("Rocket Wine 6"), width: 1200, height: 1600 },
    ],
  },
};