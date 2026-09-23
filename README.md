# Support CRM System — Datastraw Hiring Assessment

A production-grade, full-stack Customer Support CRM system built using the MERN stack (**MongoDB, Express.js, React, Node.js**) styled with **Tailwind CSS** and managed statefully via **Redux Toolkit**. 

This application allows support teams to create tickets, search across multi-field customer data in real time, filter by ticket status, update tickets, and track internal activity notes.

---

## 🚀 Key Features

- **Sequential Auto-ID Generation**: Auto-generates clean, human-readable ticket IDs (`TKT-001`, `TKT-002`, etc.) with collision handling.
- **Support Dashboard**: Clean, responsive table view with custom visual status badges (`Open`, `In Progress`, `Closed`).
- **Real-Time Multi-Field Search**: Server-side MongoDB regex search queries across ticket ID, customer name, email, subject, and description.
- **Instant Status Filtering**: Seamless URL & state synchronization filtering tickets by `Open`, `In Progress`, or `Closed`.
- **Detailed Ticket Inspection**: Dedicated detail view showcasing complete customer metadata, resolution status, and creation/update timestamps.
- **[Standout Feature] Immutable Activity Audit Trail**: An integrated `Note` collection schema linked to `ticket_id` that tracks internal support team comments and escalation notes over time without altering the customer's original problem description.

---

## 🛠️ Tech Stack Architecture

- **Frontend**: React 18, Redux Toolkit (AsyncThunk), React Router v6, Vite, Tailwind CSS, Lucide React Icons.
- **Backend**: Node.js, Express.js (REST API modular MVC architecture).
- **Database**: MongoDB (Mongoose ORM).
- **Deployment**:
  - **Frontend**: Vercel
  - **Backend**: Render / Railway

---

## 📂 Project Directory Structure

```text
datastraw-crm/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection logic
│   │   ├── models/          # Mongoose Schemas (Ticket.js, Note.js)
│   │   ├── controllers/     # Controller business logic
│   │   ├── routes/          # Express API route declarations
│   │   └── server.js        # Server entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
└── frontend/
    ├── src/
    │   ├── app/             # Redux Store Configuration
    │   ├── features/        # RTK Slices & Axios Service API calls
    │   ├── components/      # UI Layout components (Navbar, StatusBadge)
    │   ├── pages/           # Pages (TicketList, TicketCreate, TicketDetail)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
