# 🏔️ Dhruv — Cinematic Scroll-Driven Personal Portfolio

A cinematic, scroll-driven personal portfolio website designed for **Dhruv (Dhruv Mahadik)**, early-career **Data Analyst** based in Mumbai, India.

Inspired by the visual atmosphere, inertia scrolling mechanics, and design language of [EverSwap](https://everswap.com/), this project delivers a smooth multi-plane WebGL 3D camera fly-through across painterly nature scenes (Alpine Peaks &rarr; Aerial River Canyon &rarr; Emerald Forest Canopy &rarr; Glacial Lake &rarr; Sunset Ridgeline) with synchronized diamond navigation, stop-point reveals, and deep-dive glassmorphic modals.

---

## 🚀 Live Demo & Features

- **Cinematic WebGL & Three.js Engine**: 3D multi-plane camera fly-through mapped directly to scroll progress with ambient floating particles, fog, and interactive cursor parallax.
- **Buttery-Smooth Inertia Scrolling**: Powered by [Lenis](https://github.com/darkroomengineering/lenis) for smooth, jerk-free scrubbing across all 8 scroll stops.
- **EverSwap Design Language**:
  - Thin elegant serif typography (*Instrument Serif* / *Cormorant Garamond*).
  - Glassmorphic translucent pill buttons with rotating circular arrow icons on hover.
  - Geometric Diamond motifs (Header Logo, Preloader, Section Icons, Left Navigation Tracker).
- **Interactive Left Diamond Navigation**: Fixed vertical navigation tracking active stops with filled inner dots, hover tooltips, and click-to-scroll jumping.
- **Deep-Dive Glassmorphic Modals**: Dedicated interactive detail sheets for:
  - **About Me**: Bio, analytics philosophy, GATE DA focus, location, and stats.
  - **Projects**: Filterable grid of glass cards (Chess Engine in Python, NoteHive, LeetCode Companion, Churn Predictor, E-Commerce EDA) with metrics and code links.
  - **Experience**: Career timeline (Freelance Web Development, Analytics projects).
  - **Skills**: Categorized technical matrix with interactive progress indicators.
  - **Education**: Milestones (10th, 12th, Graduation, and active GATE DA preparation).
  - **Resume**: Executive summary and direct PDF download (`/resume.pdf`).
  - **Contact**: Direct channels (Email, LinkedIn, GitHub) and a functional message form.
- **Centralized Data File**: All personal details, projects, skills, and links live in `src/data/portfolioData.ts` for quick updates.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphism Utilities
- **3D & Canvas Graphics**: [Three.js](https://threejs.org/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
This produces an optimized production bundle inside the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## ⚙️ How to Customize Your Content

All data is decoupled from the UI and stored in **`src/data/portfolioData.ts`**. You can update your content in seconds:

1. **Personal Details & Social Links**:
   ```ts
   // src/data/portfolioData.ts
   personal: {
     name: "Dhruv Mahadik",
     title: "Data Analyst",
     location: "Mumbai, India",
     email: "dhruvmahadik51@gmail.com",
     github: "https://github.com/dnm124421",
     linkedin: "https://linkedin.com/in/dhruv-mahadik-51",
     // ...
   }
   ```

2. **Projects**:
   Add or modify items in `portfolioData.projects`.

3. **Experience & Education**:
   Update timeline entries in `portfolioData.experience` and `portfolioData.education`.

4. **Skills Matrix**:
   Adjust proficiency percentages and tags in `portfolioData.skillsData`.

5. **Resume PDF**:
   Replace `public/resume.pdf` with your updated resume PDF file.

---

## 🚀 Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **"New Project"**.
3. Import your GitHub repository.
4. Framework preset: **Vite**.
5. Build Command: `npm run build`. Output Directory: `dist`.
6. Click **Deploy**.

### Deploying to Netlify
1. Push your repository to GitHub.
2. Go to [Netlify](https://netlify.com/) and choose **"Import from Git"**.
3. Set Build command: `npm run build` and Publish directory: `dist`.
4. Click **Deploy Site**.

---

## 📄 License
MIT License. Built for Dhruv Mahadik.
