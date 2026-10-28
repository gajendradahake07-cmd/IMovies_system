# IMovies — Cinema Booking & Real-Time Seat Reservation Platform

A seamless online platform that enhances the cinema experience by allowing users to browse movies, select showtimes, and reserve seats with real-time availability tracking. Built with Express.js and MongoDB paradigms, it leverages a robust client-server architecture to ensure efficient data management, JWT authentication, and smooth performance.

---

## 🌐 Live Demo URLs

- **Production / Shared Preview App:** [https://ais-pre-nse7eimpny4wzzhhvrfnli-987841231933.asia-east1.run.app](https://ais-pre-nse7eimpny4wzzhhvrfnli-987841231933.asia-east1.run.app)
- **Development App:** [https://ais-dev-nse7eimpny4wzzhhvrfnli-987841231933.asia-east1.run.app](https://ais-dev-nse7eimpny4wzzhhvrfnli-987841231933.asia-east1.run.app)

---

## 🔑 Demo Accounts (1-Click Login in UI)

| Account Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Moviegoer** | `alex.rivera@example.com` | `demo1234` | Browse movies, reserve seats, order snacks, view boarding passes, manage cancellations |
| **Cinema Admin** | `admin@imovies-cinema.com` | `admin1234` | All user features + **Admin Console**, box office gross revenue stats, hall occupancy % |

---

## 🚀 Key Features

1. **Movie Catalog & Showtime Discovery**
   - Filter by Now Showing, Coming Soon, screen format (**IMAX 3D**, **Dolby Atmos**, **4DX**, **Standard 2D**), and genres.
   - 4K Trailer player embed, full cast & crew, director, and age ratings.
   - 5-day horizon schedule across multi-hall complexes.

2. **Real-Time Interactive Seat Reservation**
   - Curved laser screen visualizer with ambient blue/amber cinema glow.
   - Dynamic seat tiers: **VIP Recliners**, **Premium Prime**, **Standard**, and **Wheelchair Accessible**.
   - 5-minute seat hold countdown timer preventing race conditions.

3. **Artisanal Concessions Upsell**
   - Fresh gourmet popcorn (Truffle Butter, Caramel & Cheddar), Combos, Loaded Queso Nachos, and Craft Drinks with live quantity steppers.

4. **Digital Cinema Boarding Passes & Barcodes**
   - Instant ticket generation with perforated ticket stubs, admission barcode / QR code, hall numbers, and print/PDF download.

5. **Self-Service Ticket Wallet & Cancellations**
   - View active and past reservations; automated refund computation and instant seat release.

6. **Cinema Operator / Manager Console**
   - Live revenue tracking, total tickets sold, hall occupancy percentages, and audited order logs.

7. **Project Documentation Portal**
   - Built-in `Architecture & Specs` viewer containing the complete 6 Epics, 19 Tasks breakdown, client-server diagram, and Mongoose schemas.

---

## 📊 Project Epics (6) & Tasks (19)

- **Epic 1: User Authentication & Profile Security** (Tasks 1–3)
- **Epic 2: Movie Catalog & Exploration Engine** (Tasks 4–6)
- **Epic 3: Showtime & Hall Scheduling** (Tasks 7–9)
- **Epic 4: Real-Time Interactive Seat Reservation** (Tasks 10–12)
- **Epic 5: Concessions, Checkout & Digital Ticketing** (Tasks 13–16)
- **Epic 6: Booking Management, Refunds & Admin Analytics** (Tasks 17–19)

---

## 💻 Tech Stack & System Requirements

- **Frontend:** React.js 19, Tailwind CSS, Lucide Icons, Outfit & Plus Jakarta Sans typography
- **Backend / Routing:** Node.js (v16+), Express.js REST API
- **Persistence:** MongoDB / Mongoose document schema design
- **Security:** JSON Web Token (JWT) Bearer authorization
- **Hardware Specs:** Intel Core i5 / AMD Ryzen 5, 8GB+ RAM, 1GB Storage, 1366x768+ Display

---

## 🛠️ Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/imovies-cinema-platform.git
cd imovies-cinema-platform

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:3000
```
