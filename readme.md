# 🎬 CineSphere

**CineSphere** is a sleek, React-powered movie discovery web app that lets users search for films, browse by genre, view detailed movie pages, cast & crew bios, and explore complete actor/actress filmographies — all powered by the TMDB API.

## 🚀 Features

* 🔍 **Instant Movie Search** — Real-time search powered by TMDB
* 🧭 **Genre Browsing** — Explore movies by genre in a responsive card layout
* 📽️ **Movie Details** — Includes poster, synopsis, ratings, reviews, and full cast
* 🎭 **Cast & Crew Profiles** — View biographies, known works, and more
* 🧠 **Filmography Explorer** — Browse an actor's complete film history
* 🎨 **Animated UI** — Built with Framer Motion + Bootstrap 5
* 💻 **Responsive Design** — Fully mobile-ready and accessible
* ☁️ **Deployable** — Easily hosted on Vercel or your preferred platform

## 🛠️ Tech Stack

| Tech | Usage |
|------|--------|
| **React.js** | Frontend framework |
| **React Router DOM** | Client-side routing |
| **Bootstrap 5** | UI layout & responsive design |
| **Framer Motion** | Smooth animations and transitions |
| **TMDB API** | Movie, genre, cast & crew data |
| **Vercel** *(optional)* | Deployment & hosting |

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cinesphere.git
cd client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your TMDB API key:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

### 4. Start the Development Server

```bash
npm start
```

The app will be running locally at `http://localhost:3000`

## 🧭 App Structure & Routing

* `/` — Home with featured movies and search
* `/genre/:id` — Movies by genre
* `/movie/:id` — Detailed movie view
* `/person/:id` — Actor or crew bio and filmography

## 🌐 Live Demo

Check out the live app: [CineSphere](https://cine-sphere-pi.vercel.app/)

## 🙏 Acknowledgments

* TMDB for their powerful and free API
* Design inspiration from Netflix, Letterboxd, and TMDB's own UI
