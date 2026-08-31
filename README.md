# ⚡ Safah Workspace & Personal Portfolio

<p align="center">
  <img src="public/favicon.svg" width="90" height="90" alt="Safah Workspace Logo" />
</p>

<p align="center">
  <strong>Personal Operating Hub, Data Engineering Tracker & Showcase Portfolio</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 12" />
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Inertia.js-3.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Phosphor_Icons-2.1-22C55E?style=for-the-badge" alt="Phosphor Icons" />
  <img src="https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
</p>

---

## 🌟 Overview

**Safah Workspace** is a custom personal operating hub built with **Laravel 12**, **Inertia.js**, and **React 19**. It unifies high-throughput project management, Data Engineering & Cloud study journals, spiritual habits tracking, sleep science metrics, and an automated **Public Showcase Portfolio**.

---

## ✨ Features & Architecture

### 1. 🔲 Public Portfolio Showcase (`/portfolio`)
- **Monochrome Manga Cyber Aesthetic**: High-contrast neo-tokyo visual design with subtle dot-matrix screen-tones.
- **Dynamic Tag Filter**: Project categories extracted in real-time from verified Kanban tasks.
- **Theme Switcher**: Instant **Light Mode (Editorial Manga Paper)** & **Dark Mode (Midnight Cyber Manga)** with local storage persistence.
- **Real-Time Typewriter Engine**: Smooth looped typing animations featuring an animated glowing terminal caret.
- **Assistant Character Art Integration**: Responsive holographic frame featuring Chisa character visuals.

### 2. 📋 Interactive Projects & Kanban Board
- **To Do / In Progress / Done Workflow**: Real-time status toggle, priority badges (Urgent, High, Medium, Low), and deadline tracking.
- **1-Click Portfolio Publisher**: Push completed tasks directly to the public portfolio with custom tech stacks, live links, and GitHub URLs.
- **Mobile Column Switcher**: Responsive tabs (`Semua`, `To Do`, `In Progress`, `Done`) optimized for smartphone touch navigation.

### 3. 📖 Daily Learning Journal
- **Specialized Documentation**: Formatted for Data Engineering, Cloud Computing, and Backend Architecture notes.
- **Fast Search & Category Chips**: Instant client-side search across titles, tags, and rich Markdown-styled study snippets.

### 4. 🕌 Spiritual & Kajian Tracker
- **Majelis Ilmu Schedule**: Upcoming kajian events with speaker, time, and location info.
- **Archive Notes & Bookmarks**: Deep searchable study notes with modal reading view.

### 5. 🌙 Sleep & Wellbeing Analytics Engine
- **Algorithmic Sleep Score (0–100)**: Evaluates sleep duration, latency, wakeups, and morning recovery feelings.
- **Proportional Sleep Debt Audit**: Computes real deficit only against active logged days.
- **Weekly Chart.js Visualizer**: Clean interactive bar analytics with dynamic quality color indicators.
- **Refreshing Habits Logger**: Daily toggle checklist for physical workout, outdoor walking, and screen breaks.

### 6. 📱 100% Mobile-Friendly & Touch-Optimized
- Glassmorphism bottom navigation bar with active indicator pills.
- Mobile quick header with one-tap portfolio access and quick task modal trigger.
- Full viewport responsive modal dialogs with smooth custom scrolling.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | Laravel 12.x (PHP 8.2+) |
| **Frontend Framework** | React 19.x with Inertia.js 3.x |
| **Styling & Design System** | Tailwind CSS 4.x (Custom Gradients, Glassmorphism, Theme Tokens) |
| **Charts & Visuals** | Chart.js 4.x & React-Chartjs-2 |
| **Icons & Assets** | Phosphor Icons Web 2.1 |
| **Database** | SQLite (Production & Local Development Ready) |

---

## 🚀 Quick Start & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Azzasafah/project-managament.git
cd project-managament

# 2. Install PHP dependencies
composer install

# 3. Install JavaScript dependencies
npm install

# 4. Environment setup
cp .env.example .env
php artisan key:generate

# 5. Run database migrations & seeders
php artisan migrate --seed

# 6. Build assets & run server
npm run build
php artisan serve
```

---

## 👨‍💻 Author & Maintainer
- **Muhammad Hafizh Azzasafah (Safah)**
- **GitHub**: [@Azzasafah](https://github.com/Azzasafah)
- **Portfolio**: [Safah Portfolio](http://127.0.0.1:8000/portfolio)

---

## 🔒 Security & Privacy Notice
- All local environment variables (`.env`), database instances (`database/*.sqlite`), session files, and API secrets are strictly ignored via `.gitignore` to prevent any credential leakage.

---

## 📄 License
This project is open-sourced software licensed under the [MIT license](LICENSE).
