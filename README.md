# 📈 Stock Search & Portfolio Web Application

A full-stack stock search and portfolio management web application that allows users to explore real-time market data, analyze historical trends, track financial news, manage watchlists, and simulate stock trading using a wallet-based system.

This project is designed to resemble a real-world financial product with a strong focus on **product usability, backend reliability, and secure data handling**.

---

## 🎯 Project Motivation

I built this project to go beyond a basic stock lookup tool and instead create a **production-style financial dashboard**. The goal was to combine:

- A clean and responsive user interface  
- Real-time market data and analytics  
- Secure backend API design  
- Persistent user state (watchlist, portfolio, wallet)

This project reflects how modern web applications integrate frontend experiences with backend systems and third-party APIs in a secure and scalable way.

---

## 🚀 Features

### 🔍 Stock Search & Autocomplete
- Search stocks by ticker symbol
- Autocomplete suggestions for faster discovery
- Input validation and user-friendly error handling

### 📈 Real-Time Stock Data
- Live stock prices
- Price change and percentage change
- Market open/close status

### 📰 Top News
- Displays recent news articles related to the selected stock
- Modal view for detailed article information
- External links to full articles

### 📊 Charts & Insights
- Historical price and volume charts
- Market trends and analytical insights
- Visual data representation for easier interpretation

### ⭐ Watchlist
- Add or remove stocks from a personal watchlist
- Watchlist data persists using MongoDB Atlas

### 💼 Portfolio & Wallet Simulation
- Virtual wallet initialized with a fixed balance
- Buy and sell stocks with real-time price validation
- Portfolio metrics including quantity, average cost, and market value
- Profit and loss tracking

### 🔐 Secure Backend Architecture
- All third-party API calls handled server-side
- API keys are never exposed to the client
- Centralized error handling and validation

---

## 🛠 Tech Stack

### Frontend
- **Next.js** (React, TypeScript)
- CSS Modules / Tailwind CSS
- Client-side routing and UI components

### Backend
- **Next.js API Routes**
- Node.js server-side logic
- REST-style endpoints for data aggregation

### Database
- **MongoDB Atlas**
  - Watchlist persistence
  - Portfolio data
  - Wallet balance tracking

### External APIs
- **Finnhub API**  
  (Stock search, quotes, news, recommendations, sentiment)
- **Polygon.io API**  
  (Historical stock price data)

---

## 🧩 System Architecture

Next.js Frontend (React UI)
|
v
Next.js API Routes (Server-side)
|
├── Finnhub API
├── Polygon.io API
|
v
MongoDB Atlas
(Watchlist, Portfolio, Wallet)

- The frontend communicates only with internal API routes.
- API routes act as a secure proxy for third-party services.
- MongoDB Atlas stores persistent application state.

---

📌 Engineering Highlights

Secure server-side API proxy to protect sensitive keys

Modular API endpoints for scalability

Clear separation between UI, API, and data layers

Real-world trading constraints enforced through validation logic

Designed with future extensibility in mind

🔮 Future Improvements

User authentication and multi-user support

CI/CD pipeline and production deployment

Caching and rate-limit handling

Automated testing (unit + integration)

Performance optimizations for large datasets

🎥 Project Demo Video

🔗 Demo Video Link: https://drive.google.com/drive/folders/1DIYRoUoIQKD9VoX_wL7bzrtULXEwppPe?dmr=1&ec=wgc-drive-hero-goto

> **Note:** The original live deployment link is no longer active because the project relied on a cloud-hosted MongoDB Atlas backend and time-limited cloud resources.  
> The full source code, system design, and functionality are preserved in this repository.
