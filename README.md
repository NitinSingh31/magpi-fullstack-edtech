# 🦅 Magπ (Mag-Pi) — Next-Gen 1-on-1 Tuition & Future Skill Labs

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20Ready-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A modern, production-grade EdTech platform providing personalized 1-on-1 online tutoring for international curricula (**Cambridge IGCSE**, **IB DP/MYP**, **Cambridge AS/A-Levels**, **SABIS Choueifat**, **US AP**, and **CBSE**) and specialized Future Skill Academies (**Coding & AI**, **Public Speaking & MUN**, **Global Languages**, and **Vedic Math Olympiad**). Inspired by [Psittacus Lab](https://psittacuslab.com/).

---

## 🚀 Key Features

* **🎨 Brand Design System**: Tailored directly to the official Magπ script logo featuring deep Royal Navy (`#0A3678`), Vibrant Azure Blue (`#0072CE`), and clean glassmorphism accents.
* **🧭 Dedicated Multi-Page Routing**: Complete client-side routing using `react-router-dom`:
  * **Home (`/`)**: Main landing experience with Pi-Mentor mascot, benefits strip, counters, course explorer, comparison table, and testimonials.
  * **About Us (`/about-us`)**: Story of Magπ and the African Grey / Magpie cognitive philosophy, mission, vision, STEAM pedagogy, core values, and faculty spotlight.
  * **Online Tuition (`/online-tuition`)**: Deep dive into Cambridge CAIE, Edexcel, IB DP/MYP, SABIS, AP, and CBSE syllabuses.
  * **Future Skill Academies**:
    * **Communication Skills (`/communication`)**: Public speaking, Harvard Model UN diplomacy, parliamentary debate, and student anthology publishing.
    * **Coding & AI Lab (`/coding-and-programming`)**: Scratch for kids, Python, fullstack web development, and computer vision with live browser code sandbox.
    * **Global Languages (`/language-classes`)**: Native-speaker conversational immersion in French, Spanish, German, and Mandarin (CEFR DELF/DELE prep).
    * **Reasoning & Aptitude (`/reasoning-and-aptitude`)**: Rapid Vedic mental calculation, International Math Olympiad (IMO/AMC) training, and cognitive puzzles.
  * **Events & Masterclasses (`/events`)**: Live webinar listings, interactive category filters, and instant free seat reservation modal.
  * **Careers & Faculty Recruitment (`/careers`)**: Global remote teaching perks, open roles, and interactive educator application portal.
  * **Contact Us (`/contact-us`)**: Regional admissions nodes across Dubai, London, Singapore, and Mumbai, inquiry form, and WhatsApp integration.
* **⚡ Free Trial Booking Modal**: 45-minute baseline diagnostic class booking with instant calendar slot picker and confetti animations.
* **🛡️ Resilient Dual-Layer Database Architecture**:
  * **Primary**: Connects seamlessly to free MongoDB Atlas clusters via Mongoose.
  * **Fallback**: Automatic local JSON file persistence (`backend/data/bookings.json`) so the application never crashes even without internet or database credentials.
* **📊 Admin Leads Portal**: Built-in dashboard to monitor bookings, filter leads by curriculum, view contact messages, and inspect database state.

---

## 📁 Project Architecture

The codebase is cleanly separated into frontend and backend directories:

```text
Magπ/
├── frontend/                   # React 18 + Vite Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Footer, Hero, DemoModal, AdminPanel...)
│   │   ├── pages/              # Dedicated route pages (HomePage, AboutPage, OnlineTuitionPage, SkillPages...)
│   │   ├── data/               # Course catalogs, board syllabuses, upcoming events data
│   │   ├── App.jsx             # Main router configuration
│   │   ├── index.css           # Global design system tokens and utilities
│   │   └── main.jsx            # React root mount
│   ├── public/                 # Static assets and brand logos
│   ├── vite.config.js          # Vite config with API proxy to port 5001
│   └── package.json            # Frontend dependencies
│
├── backend/                    # Node.js + Express Backend Server
│   ├── models/                 # Mongoose schemas (Booking.js, Inquiry.js)
│   ├── data/                   # Local persistent fallback data storage (bookings.json)
│   ├── index.js                # Express REST API server, CORS, and MongoDB connection
│   ├── .env.example            # Environment variables template
│   └── package.json            # Backend dependencies
│
├── .gitignore                  # Comprehensive git ignore rules
├── package.json                # Root workspace orchestrator
└── README.md                   # Project documentation
```

---

## 🛠️ Quick Start Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/NitinSingh31/magpi-fullstack-edtech.git
cd magpi-fullstack-edtech
```

### 2. Install Dependencies
```bash
# Install root, backend, and frontend dependencies
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 3. Environment Setup (Optional)
The backend runs automatically out of the box using local JSON persistence! To connect your free MongoDB Atlas database:
1. Navigate to `backend/`
2. Create a `.env` file based on `.env.example`:
```env
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/magpi?retryWrites=true&w=majority
```

### 4. Run the Fullstack Application
In the project root directory, run:
```bash
# Start backend server (port 5001)
npm run server

# In a separate terminal, start frontend dev server (port 5173 or 5174)
npm run dev
```

Visit **`http://localhost:5174`** (or the port displayed in your terminal) to experience Magπ.

---

## 📦 Production Build

To test and compile the production bundle:
```bash
npm --prefix frontend run build
```

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
