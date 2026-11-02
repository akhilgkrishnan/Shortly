# Shortly ⚡

A modern, fast, and responsive URL shortener web application built with **Ruby on Rails 6.1** and **React 17**, styled with **Tailwind CSS**, and containerized for instant deployment.

[![Live Demo](https://img.shields.io/badge/Demo-Shortly_Live-6366f1?style=for-the-badge&logo=render&logoColor=white)](https://shortly-44br.onrender.com)
[![GitHub CI](https://img.shields.io/github/actions/workflow/status/sreedevrajendran/Shortly/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/sreedevrajendran/Shortly/actions)
[![Ruby](https://img.shields.io/badge/Ruby-3.2-CC342D?style=for-the-badge&logo=ruby&logoColor=white)](https://www.ruby-lang.org/)
[![Rails](https://img.shields.io/badge/Rails-6.1-CC0000?style=for-the-badge&logo=rubyonrails&logoColor=white)](https://rubyonrails.org/)
[![React](https://img.shields.io/badge/React-17-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)

---

## 🌐 Live Demo

Visit the live deployment on Render:
👉 **[https://shortly-44br.onrender.com](https://shortly-44br.onrender.com)**

---

## ✨ Features

- **⚡ Instant URL Shortening**: Paste any URL, auto-sanitizes missing protocols (auto-prepends `https://`), and generates short, clean links.
- **📱 QR Code Generation**: Instant SVG/PNG QR code preview and download for any shortened link with one click.
- **📊 Real-Time Analytics**: Tracks **Total Clicks** as well as **Unique Visitors** (deduplicated over a 24-hour window using secure HTTP-only cookies).
- **🔒 Visitor Session Isolation**: Permanent cookie token (`visitor_token`) keeps your links private to your browser while supporting a toggle to view all public links.
- **📌 Pinning System**: Pin your most frequently accessed links to the top of your dashboard.
- **🔍 Live Search & Filter**: Real-time filtering by original URL or short slug.
- **🎨 Modern Responsive UI**: Clean cards, aligned Remixicon badges, high-contrast typography, and smooth transitions built with Tailwind CSS.
- **🐳 Production Ready**: Fully containerized with multi-stage `Dockerfile`, `docker-compose.yml`, and `render.yaml` Blueprint.

---

## 🛠️ Tech Stack

- **Backend**: Ruby 3.2, Rails 6.1 (API + MVC), Puma Server
- **Database**: 
  - SQLite3 (Development / Testing)
  - PostgreSQL (Production / Render)
- **Frontend**: React 17, React Router, Axios, Tailwind CSS, Remixicon
- **Asset Pipeline**: Webpacker (Webpack 4)
- **DevOps**: Docker, Podman, GitHub Actions CI, Render Blueprint

---

## 🚀 Getting Started Locally

### Option 1: Running with Docker / Podman (Recommended)

```bash
# Clone the repository
git clone https://github.com/sreedevrajendran/Shortly.git
cd Shortly

# Start with Docker Compose
docker compose up --build
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

### Option 2: Running Natively

#### Prerequisites
- Ruby 3.2+
- Bundler (`gem install bundler`)
- Node.js 18+ and Yarn

#### Setup
```bash
# Install Ruby dependencies
bundle install

# Install JavaScript dependencies
yarn install

# Setup database and migrations
bin/rails db:prepare

# Build frontend assets
npm run build:dev

# Start Rails server
bin/rails server
```
Visit **[http://localhost:3000](http://localhost:3000)**.

---

## 🧪 Running Tests

```bash
bundle exec rails test
```

Run linter:
```bash
bundle exec rubocop
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
