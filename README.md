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

**Safah Workspace** is an all-in-one personal operating hub built with **Laravel 12**, **Inertia.js**, and **React 19**. It unifies high-throughput project management, Advance Data Engineering bootcamp orchestration, spiritual habit tracking, sleep science metrics, and an automated **Public Showcase Portfolio**.

---

## ✨ Features & Architecture

### 1. 🎓 SafahFlow Orchestration Hub & ADE Bootcamp Tracker
- **36-Session Advance Data Engineer (ADE) Curriculum**: Complete tracking of curriculum topics, live class schedules, mentors, syllabi, and session attendance statuses.
- **Dynamic Category Filter Slider (`PhaseManagerModal`)**:
  - Fully customizable phase sliders: edit phase labels, add custom learning tracks, remove unused stages, or restore default configurations.
  - Real-time synchronization with dashboard sliders and session editor modal dropdowns.
- **Integrated Portfolio Target Milestones**:
  - Aligned tracking across 5 core engineering initiatives: **Telkom ETL Pipeline Bronze**, **Azure Realtime Sales**, **ADE Bootcamp Labs**, **Capstone Streaming System**, and **Kopi Kita Analytics**.
  - Target projects systematically orchestrated from Session 11 through curriculum completion.
- **Clean RESTful API Engine (`/api/safahflow/*`)**:
  - Clean controller architecture ([`SafahFlowApiController.php`](file:///c:/Users/MSI/Desktop/project-managament/app/Http/Controllers/Api/SafahFlowApiController.php)) leveraging Laravel 12 Route Model Binding, structured request validation, and uniform JSON response contracts.

### 2. 🌙 Golden Rule of Anti-Burnout & 22:00 WIB Sleep Reminder (Hard-Stop)
- **Automated 22:00 WIB Hard-Stop Modal (`SleepReminderModal`)**:
  - Automated interval timer triggers an ambient night-glow modal once the local clock reaches **22:00 WIB** (active through early dawn).
  - Enforces healthy boundary guidelines: shut down workstation/IDE, recite Surah Al-Mulk for mindfulness, and log a target of 7.5 hours of restorative sleep to recharge for Tahajud prayer and next-day engineering.
  - Features soothing anime voice audio playback (`/sounds/002_No.7 Night.wav`), official HTML5 Web Desktop Notifications, a **10-Minute Snooze** button, and rest acknowledgement.
- **Interactive Anti-Burnout Booster Card**:
  - Randomized inspirational anime voice quotes and data engineering wisdom accompanied by playful micro-animations.
  - Authentic Japanese anime audio clips featuring the **No. 07 series**: **Selamat Pagi** (`001_No7 Morning.wav`), **Belajar** (`003_No.7 Date.wav`), and **Selamat Malam** (`002_No.7 Night.wav`), with convenient Mute/Unmute controls.
  - **Custom Audio Uploader**: Allows uploading custom `.mp3`/`.wav` sounds with live preview, stored locally in the browser (`localStorage`).

### 3. 🕌 Real-Time Prayer Schedule Engine (Indonesian Ministry of Religious Affairs API)
- **Official Open API Integration**: Synchronized directly with the Bimas Islam Indonesian Ministry of Religious Affairs API (`api.myquran.com`).
- **8 Comprehensive Daily Timings**: Imsak, Fajr (Subuh), Sunrise (Terbit), Dhuha, Dhuhr (Dzuhur), Asr (Ashar), Maghrib, and Isha (Isya).
- **Next Prayer Spotlight Banner**: Real-time identification of the upcoming prayer with an active countdown timer.
- **Dynamic City / Region Search**:
  - Instant autocomplete search covering all cities and regencies across Indonesia.
  - One-click presets for major metropolitan centers (Jakarta, Bandung, Surabaya, Yogyakarta, Medan, Makassar, etc.).
  - User selection persisted automatically via browser local storage.

### 4. 🧭 Responsive Navigation & Collapsible Hamburger Sidebar
- **Mobile Slide-Out Drawer (`< md`)**:
  - Top header hamburger button opens a sleek navigation drawer (`translate-x-0`) paired with a darkened glassmorphic backdrop blur.
- **Desktop Sidebar Collapse / Expand (`>= md`)**:
  - Toggle button collapses the sidebar into a slim icon-only strip (`w-20`) to maximize screen real estate for Kanban boards and SafahFlow charts.
  - Includes interactive floating tooltip popovers for every navigation link in compact mode.

### 5. 📱 Android PWA & Animated Chisa Splash Screen
- **Full Android PWA Readiness**:
  - Web App Manifest (`public/manifest.json`) configured with `standalone` display, dark cyber theme `#0e0e12`, and high-resolution adaptive icons (192px, 512px, maskable).
  - Production-ready Service Worker (`public/sw.js`) enabling offline caching for assets, audio files, and quick launch speeds.
- **Holographic Chisa Assistant Splash Screen (`SplashScreenModal`)**:
  - Showcases `chisa.png` framed in a cyber-manga holographic portal with soft floating motion (`animate-float-soft`), scanning laser beam (`animate-scanline`), and ambient neon halo (`animate-pulse-glow`).
  - Multilingual welcome greetings in Japanese (*"お帰りなさいませ！"*) and English/Indonesian.
  - Automated rotating inspirational quotes with category pills (*DAILY BOOST*, *SYSTEM ARCHITECT*, *FOCUS & DISCIPLINE*).
  - Simulated 0–100% neural initialization progress bar with authentic anime audio chime playback and quick one-tap launch.

### 6. 🔲 Public Portfolio Showcase (`/portfolio`)
- **Monochrome Manga Cyber Aesthetic**: High-contrast Neo-Tokyo visual design styled with dot-matrix screen-tones.
- **Dynamic Tag Filtering**: Project categories extracted dynamically from verified Kanban tasks.
- **Instant Theme Switcher**: Toggle effortlessly between **Light Mode (Editorial Manga Paper)** and **Dark Mode (Midnight Cyber Manga)** with local persistence.
- **Real-Time Typewriter Engine**: Looped typewriter animation engine with an animated terminal caret.
- **Assistant Character Art Integration**: Responsive holographic frame showcasing Chisa character art.

### 6. 📋 Interactive Projects & Kanban Board
- **To Do / In Progress / Done Workflow**: Real-time status movement, multi-tier priority badges (Urgent, High, Medium, Low), and deadline tracking.
- **1-Click Portfolio Publisher**: Publish completed engineering tasks directly to the public showcase with custom tech stacks, live links, and GitHub repositories.
- **Mobile Column Switcher**: Responsive column tab switcher (`All`, `To Do`, `In Progress`, `Done`) tailored for mobile touch screens.

### 7. 📖 Daily Learning Journal
- **Specialized Documentation**: Optimized templates for Data Engineering, Cloud Architecture, and Distributed Systems research logs.
- **Fast Client-Side Search & Tag Chips**: Instant keyword search across journal titles, tags, and Markdown study summaries.

### 8. 🌙 Sleep & Wellbeing Analytics Engine
- **Algorithmic Sleep Score (0–100)**: Evaluates sleep duration, latency, wakeups, and morning recovery feelings.
- **Proportional Sleep Debt Audit**: Calculates actual deficit exclusively against active logged days.
- **Weekly Chart.js Visualizer**: Clean interactive bar charts with dynamic sleep quality color highlights.
- **Refreshing Habits Logger**: Daily checklist toggles for workouts, outdoor walking, and screen breaks.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | Laravel 12.x (PHP 8.2+) |
| **Frontend Framework** | React 19.x with Inertia.js 3.x |
| **Styling & Design System** | Tailwind CSS 4.x (Custom Gradients, Glassmorphism, Theme Tokens) |
| **Charts & Visuals** | Chart.js 4.x & React-Chartjs-2 |
| **Icons & Assets** | Phosphor Icons Web 2.1 |
| **External Integrations** | Indonesian Ministry of Religious Affairs API & HTML5 Audio/Notifications |
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

# 5. Configure user credentials (optional) in .env
# ADMIN_NAME="Your Name"
# ADMIN_EMAIL="email@domain.com"
# ADMIN_PASSWORD="your_secure_password"

# 6. Run database migrations & seeders
php artisan migrate --seed

# 7. Compile frontend assets & launch local server
npm run build
php artisan serve
```

---

## 🔒 Security & Masked Credentials (User Seeder)

To uphold strict **Security & Privacy by Design** principles:
- **Masked Default Credentials**: The user seeder [`UserSeeder.php`](file:///c:/Users/MSI/Desktop/project-managament/database/seeders/UserSeeder.php) and environment template [`.env.example`](file:///c:/Users/MSI/Desktop/project-managament/.env.example) use masked dummy placeholders by default:
  ```env
  ADMIN_NAME="Disamarkan (Admin)"
  ADMIN_EMAIL="admin_***@example.internal"
  ADMIN_PASSWORD="****************"
  ```
- **Local Environment Customization**: Administrators can configure their real personal credentials securely through local `.env` variables without risking exposure to public version control repositories.
- All local database files (`database/*.sqlite`), session files, and `.env` variables are strictly excluded via `.gitignore`.

---

## 👨‍💻 Author & Maintainer
- **Muhammad Hafizh Azzasafah (Safah)**
- **GitHub**: [@Azzasafah](https://github.com/Azzasafah)
- **Portfolio**: [Safah Portfolio](http://127.0.0.1:8000/portfolio)

---

## 📄 License
This project is open-source software licensed under the [MIT License](LICENSE).
