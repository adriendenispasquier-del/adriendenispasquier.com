export interface BrandImage {
  src: string;
  title?: string;
}

export interface BrandIdentityFolder {
  title: string;
  subtitle?: string;
  description: string;
  secondaryDescription?: string;
  secondaryVideo?: string;
  services?: string[];
  backgroundColor?: string;
  images: BrandImage[];
  protected?: boolean;
  cover?: string; // explicit grid thumbnail; falls back to images[0] if omitted
}

export const brandIdentityData: Record<string, BrandIdentityFolder> = {
  "archipel": {
    title: "Archipel Berlin",
    subtitle: "Brand Identity | Web Design | 2019-2026",
    description: "\"Archipel Berlin is an online delicatessen launched in 2020 during the COVID lockdown. \nOriginally conceived as an emergency solution to support independent producers, cafés, cheesemongers and restaurants, it rapidly evolved into a fully developed digital platform, placing transparency and storytelling at the center of its identity.\" \n\n\n\n",
    secondaryDescription: "\"Products were treated as sculptural forms. Light was constructed carefully, warm, directional, suggestive, allowing viewers to sense an environment beyond the frame: a Mediterranean terrace, a quiet Sunday kitchen, a summer afternoon filtered through linen curtains.\"",
    secondaryVideo: "PLACEHOLDER_VIDEO_URL",
    services: ["Brand Design", "Web Design", "Shopify Development", "Photography", "Illustration"],
    protected: false,
    backgroundColor: "#F3EEDF",
    images: [
      { src: "https://res.cloudinary.com/df2kod03a/image/upload/v1774535107/Archipel_Billboard_by_Adrien_Denis-Pasquier_xa1ocv.jpg" },
      { src: "https://res.cloudinary.com/df2kod03a/image/upload/v1774276283/Archipel_by_Adrien_Denis-Pasquier_book_yhjllp.jpg" },
      { src: "https://res.cloudinary.com/df2kod03a/image/upload/v1774535905/posters_wwsq9m.jpg" },
      { src: "https://res.cloudinary.com/df2kod03a/image/upload/v1774270286/phones_copie_udq4rq.jpg" },
      { src: "https://res.cloudinary.com/df2kod03a/image/upload/v1774536517/Large_Fence_Banner_Archipel_by_Adrien_Denis-Pasquier_olv994.jpg" },
      { src: "https://res.cloudinary.com/df2kod03a/image/upload/v1774426105/Bookb_biadhp.gif" },
      { src: "https://res.cloudinary.com/df2kod03a/video/upload/v1774527159/Archipel_logo_by_Adrien_Denis-Pasquier4_lcp5gb.mp4" },
      { src: "https://res.cloudinary.com/df2kod03a/video/upload/v1774431517/MacBook_Archipel_by_Adrien_Denis-Pasquier_tpu1hv.mp4" },
      { src: "https://res.cloudinary.com/df2kod03a/video/upload/v1774426403/phones_illus_by_Adrien_Denis-Pasquier3_peufyl.mp4" },
      { src: "https://res.cloudinary.com/df2kod03a/video/upload/v1774780131/Linen_bag_ybryd5.mp4" },
    ],
  },
  "naya-films": {
    title: "Naya Films",
    subtitle: "Brand Identity | 2025",
    description: "Coming soon.",
    services: ["Brand Design"],
    protected: false,
    backgroundColor: "#F5F5F5",
    images: [],
  },
  "albatross-og-venner": {
    title: "Albatross og Venner",
    subtitle: "Brand Identity | 2025",
    description: "Coming soon.",
    services: ["Brand Design"],
    protected: false,
    backgroundColor: "#F5F5F5",
    images: [],
  },
  "albatross-bakery": {
    title: "Albatross Bakery",
    subtitle: "Brand Identity | 2025",
    description: "Coming soon.",
    services: ["Brand Design"],
    protected: false,
    backgroundColor: "#F5F5F5",
    images: [],
  },
  "worldesters": {
    title: "Worldesters",
    subtitle: "Brand Identity | 2025",
    description: "Coming soon.",
    services: ["Brand Design"],
    protected: false,
    backgroundColor: "#F5F5F5",
    images: [],
  },
};