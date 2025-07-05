

# 🎬 Movie Website

A full-stack movie streaming and discovery web app where users can browse trending content, view trailers, search for movies and TV shows, and manage watch history — all powered by **TMDB API** and built with **React**, **Node.js**, and **MongoDB**.

---

## 🌟 Key Features

### 👤 Authentication

* User signup and login (`SignupPage.jsx`, `LoginPage.jsx`)
* Token-based session handling (via JWT)
* Auth route protection with middleware (`protectRoute.js`)

### 🏠 Home & Discovery

* Trending movie & TV show slider (`TrendingContent.jsx`, `MovieSlider.jsx`, `TrailerSlider.jsx`)
* Featured categories (`Categories.jsx`)
* Recommendations (`SimilarContent.jsx`)
* Loading shimmer while content loads (`HeroShimmer.jsx`)

### 🔍 Search & Watch

* Search content from TMDB API (`SearchPage.jsx`, `search.routes.js`)
* View detailed info (`Details.jsx`)
* Watch selected content trailers (`WatchPage.jsx`)
* Track search history (`SearchHistory.jsx`)

### 📱 Responsive UI

* Fully responsive, Tailwind CSS-powered UI
* Scroll restoration and user-friendly navigation (`ScrollToTop.jsx`, `Navbar.jsx`, `Footer.jsx`)

---

## 🧰 Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* Zustand (for global state)
* Axios (for API requests)
* React Router

### Backend

* Node.js + Express
* MongoDB (Mongoose)
* TMDB API Integration
* JWT-based Auth

---

## 📁 Project Structure

```
movie-website/
├── client/            # React frontend with Tailwind CSS
│   ├── src/
│   │   ├── components/  # UI Components like Navbar, Sliders, etc.
│   │   ├── pages/       # All major screen components
│   │   ├── hooks/       # Custom hooks (e.g. trending fetcher)
│   │   ├── store/       # Zustand-based global state
│   │   ├── tools/       # Reusable UI helpers
│   │   └── utils/       # Utility functions
└── server/            # Node.js backend
    ├── controllers/     # Auth, Movie, TV, Search logic
    ├── routes/          # Express route handlers
    ├── models/          # Mongoose models
    ├── services/        # TMDB API wrapper
    └── utils/           # JWT token generation
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js and npm
* MongoDB Atlas or local instance
* TMDB API key

### 1. Clone the Repo

```bash
git clone https://github.com/keerthiks16/movie-website.git
cd movie-website
```

### 2. Set up the Backend

```bash
cd server
npm install
```

#### Create `.env` inside `server/`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```

```bash
npm start
```

### 3. Set up the Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 🔐 Environment Variables (Backend)

| Variable       | Description                   |
| -------------- | ----------------------------- |
| `MONGO_URI`    | MongoDB connection string     |
| `JWT_SECRET`   | Secret for signing JWT tokens |
| `TMDB_API_KEY` | Your API key from TMDB        |

---

