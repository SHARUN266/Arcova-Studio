# 🏛️ Arcova Studio: The Owner's Manual (Architect's Guide)

Welcome, Owner. This isn't just a README—it's the **Source of Truth** for Arcova Studio. Whether you're looking at this today or 50 years from now, this document explains exactly how this machine was built, why it works, and how to keep it running at peak performance.

---

## 💎 The Vision
Arcova Studio is built to be **"Calm yet Premium"**. Every line of code follows a strict modular philosophy: 
1. **Minimalism:** No clutter, only what matters.
2. **Premium Feel:** Glassmorphism, subtle HSL gradients, and high-end animations.
3. **Local Identity:** Deeply rooted in Agra's business landscape.

---

## 🛠️ The Engine (How it Works)

### 1. The Hero (3D Particles)
- **Location:** `components/sections/hero.tsx`
- **Tech:** Three.js + React Three Fiber.
- **Logic:** It uses a particle system that reacts to mouse movements to create depth.
- **Tip:** If you want to change the "vibe," look for the particle count and noise variables in the code.

### 2. The Portfolio (The Iframe Scaling Trick)
- **Location:** `components/sections/portfolio.tsx`
- **The Secret:** Modern browsers often break `calc()` in specific ways. To fix the "black screen" issue, I implemented a **Dynamic Scaling Logic**.
- **How it works:** A `ResizeObserver` measures the container's width, compares it to the 1200px design width of the project, and applies a `transform: scale()` in real-time. This ensures the preview always looks perfect on any screen size.
- **Geolocation:** The `allow="geolocation"` attribute is critical to prevent console errors from third-party sites inside the cards.

### 3. The Testimonials (The Organic Grid)
- **Location:** `components/sections/testimonials.tsx`
- **Philosophy:** We moved from a "robotic" marquee to a **Grounded Grid**. 
- **The Logic:** It's a clean React map over local data. The visuals use `MapPin` icons and HSL color tokens to maintain a high-end agency look without looking "fake."

### 4. Animations (The GSAP & Framer Motion Mix)
- **GSAP:** Used for high-performance, complex scroll-based triggers (ScrollTrigger).
- **Framer Motion:** Used for the "easy" stuff: hover effects, simple entry animations, and layout transitions.

---

## 📂 The "Brains" (System Folders)

- `app/`: The **Skeleton**. Layouts, routing, and global settings.
- `components/sections/`: The **Body**. Every section of the homepage is its own module.
- `components/ui/`: The **Tools**. Buttons, cards, and reusable styles.
- `public/`: The **Skin**. All images, avatars, and icons live here.
- `styles/global.css`: The **Soul**. This is where the Design System (HSL colors, glassmorphism, fonts) is defined.

---

## 🛠️ How to Perform Common Tasks

### Adding a New Project
1. Open `components/sections/portfolio.tsx`.
2. Find the `projects` array at the top.
3. Add a new object with `title`, `url`, and `category`.
4. The system will automatically handle the iframe loading and scaling.

### Updating a Testimonial
1. Open `components/sections/testimonials.tsx`.
2. Update the `testimonials` list.
3. Use `/public/images/testimonials/` for avatars to keep things fast and local.

### Changing the Google Analytics
1. Go to `.env.local`.
2. Change `NEXT_PUBLIC_GA_ID` to your new G-XXXXX ID.

---

## 🎨 The Design System (Cheat Sheet)

- **Main Background:** Deep Matte Black (`#0A0908`).
- **Accent Color:** Warm Luxury Gold (HSL based for smoothness).
- **Typography:** 
  - **Headings:** `Syne` / `Outfit` (Bold, high-fashion feel).
  - **UI/Code:** `JetBrains Mono` (The "Architect" look).
- **Glassmorphism:** Use the `glass` class in Tailwind for that blurred, premium background effect.

---

## 📜 Final Owner's Note
This website uses **Tailwind CSS 4** and **Next.js 15**. It is future-proofed for the modern web. If you ever fee like it's slowing down, check the asset sizes in the `public` folder—always compress your images!

Built with precision for **Arcova Studio**. Stay premium. 🥂
