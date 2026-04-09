// Photography data now uses Cloudinary CDN for optimized image delivery
// All images are automatically optimized (format, quality) via Cloudinary
// Cloud name: df2kod03a | Folder: Home

import { getCloudinaryUrlFromTitle } from "../utils/cloudinary";

export interface Photo {
  src: string;
  title?: string;
}

export interface PhotographyFolder {
  title: string;
  subtitle?: string;
  description: string;
  credits?: {
    featuring?: string;
    products?: string | Array<{ name: string; url: string }>;
  };
  photos: Photo[];
    cover?: string; // explicit grid thumbnail; falls back to illustrations[0] if omitted

}

export const photographyData: Record<string, PhotographyFolder> = {
  "fat-cat": {
    cover: "https://res.cloudinary.com/df2kod03a/image/upload/v1774781570/FatCat_by_Adrien_Denis-Pasquier_20_znpet7.jpg",
    title: "Fat Cat",
    subtitle: "Product Photography - Set Design 2018-2020",
    description: "The [Fat Cat](https://www.instagram.com/fatcatbar/) is one of the first cocktail-focused bars in Toulouse. Founded in 2015 by Quentin Pierre-Antoine and Emmy Jeannin, it quickly became known for its precise mixology and intimate atmosphere.\n\n The challenge was to constantly reinvent the visual approach: isolating a single ingredient, exploring new angles and perspectives, and working with minimal sets to emphasise shape, colour and materiality. Through careful composition, light and texture, each ingredient was transformed into a singular, striking visual — not just documenting the cocktail, but distilling its character into an expressive image.",
    credits: {
      featuring: "Quentin Pierre-Antoine, Emmy Jeannin",
    },
    photos: [
      { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_1_dvdizt"), title: "FatCat_by_Adrien_Denis-Pasquier" },
      { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_2_rovfi6"), title: "FatCat_by_Adrien_Denis-Pasquier" }, 
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_3_mbkyja"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_4_wamxye"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_5_hbr4ih"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_6_dali5j"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_7_xpnpdm"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_8_p8yh9n"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_9_wyu0oe"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_10_inbrt9"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_11_jf6jtk"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_12_bdqqd4"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_13_cjonzo"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_14_fu3cle"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_15_uptzug"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_16_jd5nmq"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_17_apbblg"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_18_yy6hap"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_19_np3ktt"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_20_znpet7"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_21_rde3wx"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_22_btl5z3"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_23_s5mwiy"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_24_nyieyy"), title: "FatCat_by_Adrien_Denis-Pasquier" },
        { src: getCloudinaryUrlFromTitle("FatCat_by_Adrien_Denis-Pasquier_diqcri"), title: "FatCat_by_Adrien_Denis-Pasquier" },
      
    ],
  },
  "archipel-berlin": {
    cover: "https://res.cloudinary.com/df2kod03a/image/upload/v1774632202/Archipel_by_Adrien_Denis-Pasquier_5_vspwuw.jpg",
    title: "Archipel Berlin",
    subtitle: "Product Photography - Set Design 2019-2026",
    description:"",
    credits: {
      featuring: "Finbar Laverty, Luca Caputo Viglione, Štěpán Batelka",
      products: [
        { name: "Albatross Bakery", url: "https://www.albatrossberlin.com" },
        { name: "Coolattin Cheddar", url: "https://www.coolattincheddar.ie" },
        { name: "Puro", url: "https://puro-import.com/" },
        { name: "Rocket Wine", url: "https://www.rocketwineberlin.com/" },
        { name: "Olatu", url: "https://olatu-paysbasque.com/fr/" },
        { name: "Pirate Cannery", url: "https://www.pirate-cannerie.fr/" },
        { name: "Kolo Coffee", url: "https://kolocoffee.eu/" },
        { name: "I Contadini", url: "https://icontadini.it/" },
        { name: "Honest Toil", url: "https://honest-toil.eu/" },
        { name: "Urstrom Käse", url: "https://www.urstromkaese.de" },
        { name: "Bouche Kombucha", url: "https://www.drinkbouche.com/" },
        { name: "Companion Tea", url: "https://retail.companiontea.com/de" },
        { name: "ROY Kombucha", url: "https://roykombucha.com" },
        { name: "Caseificio Rosola", url: "https://www.caseificiorosola.it" },
      ],
    },
photos: [
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_10_yhnozg"), title: "Archipel_by_Adrien_Denis-Pasquier_10_yhnozg" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_7_klxtu2"), title: "Archipel_by_Adrien_Denis-Pasquier_7_klxtu2" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_6_gfwz8s"), title: "Archipel_by_Adrien_Denis-Pasquier_6_gfwz8s" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_2_g8vy5l"), title: "Archipel_by_Adrien_Denis-Pasquier_2_g8vy5l" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_8_hppvfr"), title: "Archipel_by_Adrien_Denis-Pasquier_8_hppvfr" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_9_iumu2t"), title: "Archipel_by_Adrien_Denis-Pasquier_9_iumu2t" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_3_ubijmx"), title: "Archipel_by_Adrien_Denis-Pasquier_3_ubijmx" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_4_czzka4"), title: "Archipel_by_Adrien_Denis-Pasquier_4_czzka4" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_11_hd7wg7"), title: "Archipel_by_Adrien_Denis-Pasquier_11_hd7wg7" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_5_vspwuw"), title: "Archipel_by_Adrien_Denis-Pasquier_5_vspwuw" },
  { src: getCloudinaryUrlFromTitle("Archipel_by_Adrien_Denis-Pasquier_12_hyb7td"), title: "Archipel_by_Adrien_Denis-Pasquier_12_hyb7td" },
],

  },
};