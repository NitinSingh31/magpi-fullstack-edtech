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

## 📁 Enterprise Folder Architecture

The project strictly follows professional industry-standard architectural principles: **Layered MVC Architecture** on the backend (Separation of Concerns: Routes ➔ Middleware ➔ Controllers ➔ Services ➔ Models/Persistence) and a **Modular Domain Structure** with an abstracted API client layer on the frontend.

```text
Magπ/
├── frontend/                          # React 18 + Vite Frontend Application
│   ├── src/
│   │   ├── services/                  # 🌐 Centralized HTTP API client (api.js)
│   │   ├── components/                # 🧩 Reusable UI Components
│   │   │   ├── Navbar.jsx & .css      # Dynamic header with navigation
│   │   │   ├── Footer.jsx & .css      # Global footer with newsletter
│   │   │   ├── DemoModal.jsx & .css   # Interactive trial booking modal
│   │   │   ├── AdminPanel.jsx & .css  # Lead management & DB status monitor
│   │   │   └── ...                    # Section components (Hero, StatsBar, etc.)
│   │   ├── pages/                     # 📄 Dedicated Multi-Page Routes
│   │   │   ├── HomePage.jsx           # Landing page
│   │   │   ├── AboutPage.jsx          # African Grey & Magpie philosophy
│   │   │   ├── OnlineTuitionPage.jsx  # Cambridge, IB, AP, CBSE details
│   │   │   ├── CodingPage.jsx         # Coding & AI sandbox
│   │   │   ├── CommunicationPage.jsx  # Public speaking & MUN
│   │   │   ├── LanguagesPage.jsx      # French, Spanish, German, Mandarin
│   │   │   ├── AptitudePage.jsx       # Vedic Math & Olympiad
│   │   │   ├── EventsPage.jsx         # Masterclasses & Webinars
│   │   │   ├── CareersPage.jsx        # Educator recruitment
│   │   │   └── ContactPage.jsx        # Global nodes & admissions form
│   │   ├── data/                      # 📦 Structured catalog & static fixtures
│   │   ├── assets/                    # 🖼️ Brand assets and vector graphics
│   │   ├── App.jsx                    # 🧭 React Router DOM configuration
│   │   ├── index.css                  # 🎨 Design tokens & CSS theme variables
│   │   └── main.jsx                   # ⚛️ Application root entrypoint
│   ├── public/                        # Static public files & favicon
│   ├── vite.config.js                 # Dev server proxy configuration
│   └── package.json                   # Frontend dependencies & scripts
│
├── backend/                           # Node.js + Express REST API Server
│   ├── config/                        # ⚙️ Configuration & Database connections
│   │   └── db.js                      # Mongoose connection manager & health checks
│   ├── controllers/                   # 🎮 Route request & response handlers
│   │   ├── bookingController.js       # Booking creation, retrieval, status updates
│   │   ├── inquiryController.js       # Contact form submissions & newsletter
│   │   └── healthController.js        # Health check & uptime telemetry
│   ├── middleware/                    # 🛡️ Express Middleware
│   │   ├── security.js                # Helmet headers, CORS policy, Rate limiting
│   │   └── errorHandler.js            # 404 handler & centralized error logging
│   ├── models/                        # 🗄️ Database Schemas (Mongoose ODM)
│   │   ├── Booking.js                 # Student booking document schema
│   │   └── Inquiry.js                 # Contact / newsletter document schema
│   ├── routes/                        # 🛣️ Express Routers (API Endpoints)
│   │   ├── index.js                   # Master router aggregator (/api)
│   │   ├── bookingRoutes.js           # /api/bookings endpoints
│   │   ├── inquiryRoutes.js           # /api/inquiries endpoints
│   │   └── healthRoutes.js            # /api/health endpoint
│   ├── services/                      # 💼 Business Logic & Storage Abstraction
│   │   └── storageService.js          # Resilient storage (MongoDB + Local JSON fallback)
│   ├── data/                          # 📁 Local persistent JSON backup store
│   │   ├── bookings.json              # Local fallback bookings storage
│   │   └── inquiries.json             # Local fallback inquiries storage
│   ├── app.js                         # 📦 Express application setup & middleware assembly
│   ├── server.js                      # 🚀 Server lifecycle, port binding & graceful shutdown
│   ├── index.js                       # 🚪 Entrypoint wrapper (npm start / node index.js)
│   ├── .env.example                   # Environment variable template
│   └── package.json                   # Backend dependencies & npm scripts
│
├── .gitignore                         # Git exclusion rules
├── package.json                       # Root workspace orchestration scripts
└── README.md                          # Platform documentation & deployment guide
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
