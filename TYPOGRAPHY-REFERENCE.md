## Font Family

**Primary Typeface:**  
`'Helvetica Neue', Helvetica, Arial, sans-serif`

---

## Navigation

**Brand Name (Desktop & Mobile)**  
`text-[24px] lg:text-[32px] leading-[1.1] tracking-tight font-normal`

**Back Button (Menu Pages)**  
`text-[24px] lg:text-[32px] leading-[1.1] tracking-tight font-normal`

**Navigation Links (Desktop)**  
`text-[32px] leading-[1.1] tracking-tight font-normal`  
*Active state:* `italic`

**Navigation Links (Mobile Drawer)**  
`text-[32px] leading-[1.1] tracking-tight font-normal`  
*Active state:* `italic`

---

## Page Titles

**Menu Page Titles (Photography, Illustration) – Desktop**  
`text-[96px] leading-[0.9] tracking-tight font-normal`

**Menu Page Titles (Photography, Illustration) – Mobile**  
`text-[96px] leading-[0.9] tracking-tight font-normal`

**Menu Inline Links (Mobile)**  
`text-[64px] leading-[0.9] tracking-tight font-normal underline`

**Gallery/Project Titles**  
`text-[32px] leading-[1.1] tracking-tight font-normal`

**Brand Design Page Titles**  
`text-[48px] md:text-[96px] leading-[1] font-medium tracking-[-0.1rem] md:tracking-[-0.2rem]`

---

## Body Text

**Standard Paragraphs**  
`text-[16px] leading-snug font-normal`

**Project Descriptions**  
`text-[16px] leading-snug whitespace-pre-line`

**Brand Design Body (Typewriter Sections)**  
`text-[20px] sm:text-[22px] md:text-[28px] lg:text-[32px] leading-[1.3] font-normal`

**Brand Design Body (Quote Sections)**  
`text-[22px] md:text-[32px] leading-[1.3] font-normal`

**Scroll Reveal Text**  
`text-[24px] md:text-[32px] leading-[1.3] font-normal`

---

## Headings

**H1 (Default)**  
`text-[32px] leading-[1.1] tracking-tight font-normal`

**H2 (Subtitles)**  
`text-[20px] leading-[1.2] font-normal`

**H3 (Section Headings)**  
`text-[32px] leading-[1.1] tracking-tight font-normal`

**Uppercase Headings (Special Sections)**  
`text-[20px] uppercase tracking-wide`

---

## Links & Interactive Elements

**Folder/Project Links (Desktop)**  
`text-[32px] leading-[1.1] tracking-tight font-normal`  
*Hover:* `translate-x-2 transition-transform duration-300`

**Folder/Project Links (Mobile)**  
`text-[24px] leading-[1.1]`

**Footer Links (Desktop & Mobile)**  
`text-[20px] font-normal`

**Button Text**  
`text-[16px] font-normal`

---

## Forms & Inputs

**Input Fields**  
`text-[16px] font-normal`

**Labels**  
`text-[16px] font-medium`

**Password Gate Title**  
`text-[20px] uppercase tracking-wide`

---

## Specialty Elements

**Services List (Brand Design)**  
`text-[16px] md:text-[20px] underline`

**Credits/Featuring**  
`text-[16px] leading-snug`

**Footer Timestamps**  
`text-[14px] opacity-60`

**"Coming Soon" Message**  
`text-[64px] uppercase tracking-wide`

**Reduce Motion Warning**  
`text-[20px] uppercase tracking-normal`

---

## Letter Spacing System

**tracking-tight** – Primary system (navigation, titles, menu pages)  
**tracking-normal** – Default spacing  
**tracking-wide** – Uppercase headings, special sections  
**tracking-[-0.1rem] / tracking-[-0.2rem]** – Ultra-tight for brand design large headlines

---

## Line Height System

**leading-[0.9]** – Extreme tight for massive display text (96px, 64px titles)  
**leading-[1.1]** – Tight for navigation and medium titles (32px)  
**leading-[1.3]** – Comfortable for body paragraphs  
**leading-snug** – CSS preset for descriptions (1.375)

---

## Font Weight System

**font-normal (400)** – Default for all body text, navigation, titles  
**font-medium (500)** – Rare, used for special headings  
**font-semibold (600)** – Very rare, used only for legacy pages

---

## Special States

**Active Navigation Links**  
Add `italic` class

**Hover Effects (Links)**  
`hover:text-gray-600` (on light backgrounds)  
`hover:text-gray-300` (on dark backgrounds)

**Active Press States**  
`active:opacity-60`

---

## Responsive Breakpoints

**Mobile → Desktop transitions:**
- `text-[24px] lg:text-[32px]` (navigation brand)
- `text-[20px] sm:text-[22px] md:text-[28px] lg:text-[32px]` (brand design body)
- `text-[48px] md:text-[96px]` (brand design titles)

---

## Design Principles

**No shadows** – All elements use `box-shadow: none !important`  
**Minimal design** – Heavy use of whitespace, no decorative elements  
**Consistent spacing** – Horizontal margins at `px-[2%]`  
**Tight tracking** – `tracking-tight` is the default for most text  
**No font-size utilities** – Avoid Tailwind font-size classes like `text-sm`, `text-lg` unless necessary  
**Custom cursor** – `cursor: none` globally (except touch devices)
