# 📅 Quick Reservation

**Quick Reservation** is a simple and elegant web application built with **React**, **Tailwind CSS**, and **Vite**, allowing users to book a time slot and date. All reservations are stored locally using `localStorage` and can be exported in CSV format.

---

## 🚀 Live Demo

<img src="public/demo.png" alt="Quick Reservation UI" width="600"/>

---

## ✨ Features

- Select a time slot from a dropdown
- Choose a reservation date using a native date picker
- Enter full name and email address
- Save reservations to `localStorage` (persistent between sessions)
- View the full reservation list sorted by date and time
- Export reservations as `.csv` file
- Mobile-friendly, responsive interface built with Tailwind CSS

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- HTML5 / CSS3
- `localStorage` (no backend needed)

---

## 🔧 Getting Started

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/Azzeddine45/quick-reservation.git
cd quick-reservation

# Install dependencies
npm install

# Start development server
npm run dev


quick-reservation/
├── public/
│   └── logo.png
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   ├── BookingForm.jsx
│   │   └── ReservationListe.jsx
│   ├── BookingSlot.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md

# Example structur for csv file

Name,Email,Slot,Date
name,name@mail.com,09:00,2025-07-13
