# 🚀 DataStraw CRM — Enterprise Support Ticketing Platform

> **Full-Stack MERN Assessment Submission**  
> An enterprise-grade, high-performance customer support CRM and ticket management system built with **React 19, Redux Toolkit, Tailwind CSS v4, Node.js, Express 5, and MongoDB Atlas**.

---

## 🌟 Executive Overview & Key Highlights

This project is built from the ground up to demonstrate production-level MERN architecture, responsive UI design, and rigorous state management.

- **🎨 Modern SaaS CRM Aesthetics**: Designed with glassmorphism, Google Fonts (`Plus Jakarta Sans` & `Inter`), custom gradient badges, and tactile micro-interactions.
- **📱 100% Fully Responsive**: Native-like touch experience on smartphones (<640px) with dedicated mobile ticket cards and collapsible live preview drawers, fluid 2-column layouts on tablets/laptops, and wide-canvas ergonomics on ultra-wide screens (up to 2560px+).
- **🔔 Toast Notification Engine**: Glassmorphic toast system with animated countdown progress timers and colored icons for every user interaction (dispatches, updates, copy actions, filters, syncs, and telemetry).
- **⚡ Real-Time Live Preview**: Ticket creation form includes a real-time reactive card preview updating customer initials, contact badge, subject, and description snippet as the user types.
- **🛡️ 100% Preserved Business Logic & API Integrity**: Redux slices, async thunks, schema validations, route parameters, and backend controllers are maintained with strict compliance to requirements.

---

## 🛠️ Technology Stack & Architecture

### Frontend Architecture
- **Framework**: React 19 (Vite 8 Build Tool)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), Custom CSS tokens, Glassmorphism
- **Icons**: Lucide React (`lucide-react`)
- **HTTP Client**: Axios with centralized async service layer

### Backend Architecture
- **Runtime & Server**: Node.js & Express 5
- **Database & ODM**: MongoDB Atlas & Mongoose 9
- **CORS & Environment**: CORS Middleware, Dotenv
- **ID Generation**: Automated sequence generator (`TKT-001`, `TKT-002`, ...) with race condition collision handling

---

## 📁 Repository Directory Structure

```text
DataStraw Assessment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection handler
│   │   ├── controllers/
│   │   │   └── ticketController.js   # Ticket & Note business logic
│   │   ├── models/
│   │   │   ├── Note.js               # Activity notes schema
│   │   │   └── Ticket.js             # Support ticket schema
│   │   ├── routes/
│   │   │   └── ticketRoutes.js       # Express REST API endpoints
│   │   └── server.js                 # Server entry point & CORS configuration
│   ├── .env                          # Backend environment variables
│   ├── package.json                  # Backend dependencies & scripts
│   └── package-lock.json
│
├── frontend/
│   ├── public/                       # Static public assets
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js              # Redux store configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Responsive header with mobile drawer & telemetry
│   │   │   ├── StatusBadge.jsx       # Pulsing status indicators (Open, In Progress, Closed)
│   │   │   └── TicketSkeleton.jsx    # Shimmer table & detail skeleton loaders
│   │   ├── context/
│   │   │   └── ToastContext.jsx      # Glassmorphic Toast notification provider & hook
│   │   ├── features/
│   │   │   └── tickets/
│   │   │       ├── ticketService.js  # Axios API communication layer
│   │   │       └── ticketSlice.js    # Redux Toolkit slice with async thunks
│   │   ├── pages/
│   │   │   ├── TicketCreate.jsx      # Ticket creation studio with live preview
│   │   │   ├── TicketDetail.jsx      # Case management, timeline notes & Customer 360
│   │   │   └── TicketList.jsx        # Support dashboard with KPI cards & dual views
│   │   ├── App.css                   # Ambient background mesh & elevation patterns
│   │   ├── App.jsx                   # Layout wrapper with ToastProvider & footer
│   │   ├── index.css                 # Tailwind base styles, typography & keyframes
│   │   └── main.jsx                  # React DOM root entry point
│   ├── .env                          # Frontend environment variables
│   ├── index.html                    # HTML entry with Google Fonts
│   ├── package.json                  # Frontend dependencies & scripts
│   ├── vite.config.js                # Vite build configuration
│   └── README.md
│
└── README.md                         # Main repository documentation
```

---

## 💻 Local Installation & Setup Guide

### 📋 Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (Recommended: `v20.x LTS` or `v22.x`)
- **npm**: `v9.0.0` or higher
- **Git**: Latest version
- **MongoDB**: Active MongoDB Atlas cluster URI or Local MongoDB instance running on `localhost:27017`.

---

### 🪟 Windows Setup (PowerShell / Command Prompt)

#### 1. Clone the Repository
```powershell
git clone https://github.com/SatyamDevGenie/DataStraw_Assessment2026.git
cd "DataStraw Assessment"
```

#### 2. Backend Setup
```powershell
cd backend
npm install
```

Create/verify your `backend/.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xlrvvsd.mongodb.net/Database_Name?retryWrites=true&w=majority&appName=Cluster0
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```powershell
npm run dev
# Server will run on: http://localhost:5000
```

#### 3. Frontend Setup (In a New Terminal)
```powershell
cd "DataStraw Assessment/frontend"
npm install
```

Create/verify your `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api/tickets
```

Start the Vite frontend development server:
```powershell
npm run dev
# App will launch on: http://localhost:5173
```

---

### 🍏 macOS & 🐧 Linux Setup (Terminal / zsh / bash)

#### 1. Clone the Repository
```bash
git clone <YOUR_REPOSITORY_URL>
cd "DataStraw Assessment"
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Ensure `backend/.env` is configured:
```bash
cat << 'EOF' > .env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xlrvvsd.mongodb.net/Database_Name?retryWrites=true&w=majority&appName=Cluster0
CLIENT_URL=http://localhost:5173
EOF
```

Start the backend server:
```bash
npm run dev
```

#### 3. Frontend Setup (In a New Terminal Tab)
```bash
cd frontend
npm install
```

Ensure `frontend/.env` is configured:
```bash
cat << 'EOF' > .env
VITE_API_URL=http://localhost:5000/api/tickets
EOF
```

Start the frontend server:
```bash
npm run dev
```

Open your browser and navigate to: **`http://localhost:5173`**

---

## 📡 Complete Backend API Documentation & Collection

Base URL: `http://localhost:5000`

### 1. Health Check Endpoint
Tests server availability and health status.

- **Method**: `GET`
- **Route**: `/health`
- **Access**: Public
- **Response `200 OK`**:
```json
{
  "status": "OK",
  "timestamp": "2026-09-24T04:00:00.000Z"
}
```

**cURL Command:**
```bash
curl -X GET http://localhost:5000/health
```

---

### 2. Create Support Ticket
Creates a new customer support case. Automatically generates a sequential unique ID (e.g. `TKT-001`) with collision prevention.

- **Method**: `POST`
- **Route**: `/api/tickets`
- **Headers**: `Content-Type: application/json`
- **Request Body Parameters**:

| Field | Type | Required | Description |
|---|---|---|---|
| `customer_name` | String | **Yes** | Full name of the customer |
| `customer_email` | String | **Yes** | Valid customer contact email |
| `subject` | String | **Yes** | Short summary of the inquiry |
| `description` | String | **Yes** | Detailed description of the issue |

- **Sample Request Body**:
```json
{
  "customer_name": "Sophia Bennett",
  "customer_email": "sophia.bennett@acme.com",
  "subject": "Payment Gateway 504 Gateway Timeout during checkout",
  "description": "Customers in the EU region report experiencing 504 gateway timeout errors when submitting payments through Stripe webhooks."
}
```

- **Response `201 Created`**:
```json
{
  "ticket_id": "TKT-001",
  "created_at": "2026-09-24T04:15:30.123Z"
}
```

- **Error Responses**:
  - `400 Bad Request`: `{"message": "All fields are required"}`
  - `500 Server Error`: `{"message": "Server Error", "error": "..."}`

**cURL Command:**
```bash
curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Sophia Bennett",
    "customer_email": "sophia.bennett@acme.com",
    "subject": "Payment Gateway 504 Gateway Timeout during checkout",
    "description": "Customers in the EU region report experiencing 504 gateway timeout errors when submitting payments through Stripe webhooks."
  }'
```

---

### 3. Get All Tickets (with Search & Filtering)
Retrieves a list of all tickets sorted by most recent (`created_at` descending), with support for multi-field search and status filtering.

- **Method**: `GET`
- **Route**: `/api/tickets`
- **Query Parameters**:

| Parameter | Type | Default | Description |
|---|---|---|---|
| `status` | String | `All` | Filter by `Open`, `In Progress`, or `Closed` |
| `search` | String | `""` | Search keyword matching ID, customer name, email, subject, or description (case-insensitive regex) |

- **Example Query URLs**:
  - All tickets: `http://localhost:5000/api/tickets`
  - Filter Open: `http://localhost:5000/api/tickets?status=Open`
  - Search by keyword: `http://localhost:5000/api/tickets?search=Payment`
  - Filter and Search: `http://localhost:5000/api/tickets?status=In%20Progress&search=Sophia`

- **Response `200 OK`**:
```json
[
  {
    "ticket_id": "TKT-001",
    "customer_name": "Sophia Bennett",
    "customer_email": "sophia.bennett@acme.com",
    "subject": "Payment Gateway 504 Gateway Timeout during checkout",
    "status": "Open",
    "created_at": "2026-09-24T04:15:30.123Z"
  }
]
```

**cURL Command:**
```bash
# Get all tickets
curl -X GET "http://localhost:5000/api/tickets"

# Filter by status and keyword
curl -X GET "http://localhost:5000/api/tickets?status=Open&search=Sophia"
```

---

### 4. Get Ticket Details by ID (with Activity Notes)
Fetches complete ticket metadata along with the timeline array of internal activity notes sorted from newest to oldest.

- **Method**: `GET`
- **Route**: `/api/tickets/:ticket_id`
- **URL Parameters**:
  - `ticket_id` (e.g. `TKT-001`)

- **Response `200 OK`**:
```json
{
  "ticket_id": "TKT-001",
  "customer_name": "Sophia Bennett",
  "customer_email": "sophia.bennett@acme.com",
  "subject": "Payment Gateway 504 Gateway Timeout during checkout",
  "description": "Customers in the EU region report experiencing 504 gateway timeout errors when submitting payments through Stripe webhooks.",
  "status": "Open",
  "created_at": "2026-09-24T04:15:30.123Z",
  "updated_at": "2026-09-24T04:20:15.456Z",
  "notes": [
    {
      "id": "66f24a1b0213d29a43a0e192",
      "note_text": "Investigated Stripe API logs; escalated to DevOps for webhook route scaling.",
      "created_at": "2026-09-24T04:20:15.456Z"
    }
  ]
}
```

- **Error Responses**:
  - `404 Not Found`: `{"message": "Ticket not found"}`
  - `500 Server Error`: `{"message": "Server Error", "error": "..."}`

**cURL Command:**
```bash
curl -X GET http://localhost:5000/api/tickets/TKT-001
```

---

### 5. Update Ticket Status & Append Internal Note
Updates the ticket's workflow status and optionally appends a timestamped internal note to the activity timeline.

- **Method**: `PUT`
- **Route**: `/api/tickets/:ticket_id`
- **Headers**: `Content-Type: application/json`
- **Request Body Parameters**:

| Field | Type | Required | Description |
|---|---|---|---|
| `status` | String | Optional | Must be one of `Open`, `In Progress`, `Closed` |
| `notes` | String | Optional | Non-empty string to append as a new note |

- **Sample Request Body**:
```json
{
  "status": "In Progress",
  "notes": "Spoke with customer over phone; patch deployed to staging for testing."
}
```

- **Response `200 OK`**:
```json
{
  "success": true,
  "updated_at": "2026-09-24T04:25:00.000Z"
}
```

- **Error Responses**:
  - `404 Not Found`: `{"message": "Ticket not found"}`
  - `500 Server Error`: `{"message": "Server Error", "error": "..."}`

**cURL Command:**
```bash
curl -X PUT http://localhost:5000/api/tickets/TKT-001 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress",
    "notes": "Spoke with customer over phone; patch deployed to staging for testing."
  }'
```

---

## 📦 Importable Postman Collection (JSON)

Copy and save the snippet below as `DataStraw_CRM_API.postman_collection.json` and import it into Postman:

```json
{
  "info": {
    "_postman_id": "datastraw-crm-api-collection-2026",
    "name": "DataStraw CRM Assessment API",
    "description": "Comprehensive API collection for DataStraw Support Ticketing CRM",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["health"]
        }
      }
    },
    {
      "name": "Get All Tickets",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/tickets",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tickets"]
        }
      }
    },
    {
      "name": "Get Tickets (Filter by Status)",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/tickets?status=Open",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tickets"],
          "query": [
            {
              "key": "status",
              "value": "Open"
            }
          ]
        }
      }
    },
    {
      "name": "Get Tickets (Search Query)",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/tickets?search=Payment",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tickets"],
          "query": [
            {
              "key": "search",
              "value": "Payment"
            }
          ]
        }
      }
    },
    {
      "name": "Create Support Ticket",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"customer_name\": \"Alex Rivera\",\n  \"customer_email\": \"alex.rivera@enterprise.com\",\n  \"subject\": \"SSO SAML authentication assertion expired\",\n  \"description\": \"Single Sign-On login attempts fail with code 401. Key certificate renew required.\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/tickets",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tickets"]
        }
      }
    },
    {
      "name": "Get Ticket by ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/tickets/TKT-001",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tickets", "TKT-001"]
        }
      }
    },
    {
      "name": "Update Ticket Status and Add Note",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"status\": \"In Progress\",\n  \"notes\": \"Investigated certificate expiration. Updated metadata on IdP provider.\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/tickets/TKT-001",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tickets", "TKT-001"]
        }
      }
    }
  ]
}
```

---

## 🎨 Detailed Feature-by-Feature UI Breakdown

### 1. Operations Dashboard (`TicketList.jsx`)
- **4 Interactive KPI Metric Cards**:
  - `All Tickets`, `Open Tickets` (emerald), `In Progress` (amber), and `Resolved / Closed` (slate).
  - Clicking any card dynamically filters the queue and shows instant toast feedback.
- **Search & Filter Bar**:
  - Debounced input searching across Ticket ID, Customer Name, Email, Subject, and Description.
  - Quick-clear `(X)` button with feedback toast.
  - Manual queue sync trigger with rotating spinner state and count alert.
- **Dual Display System**:
  - **Desktop / Tablet View (`>= 768px`)**: Data table with customer initials avatars, copyable Ticket ID chips with confirmation checkmarks, pulsing status dots, and relative timestamps (`Just now`, `5m ago`, formatted date).
  - **Mobile Card View (`< 768px`)**: Touch-optimized card list with easy-to-tap actions and clean typography.
- **Shimmer Skeletons**: Zero layout shifts with dedicated skeleton loaders while fetching data.

### 2. Ticket Creation Studio (`TicketCreate.jsx`)
- **2-Column Responsive Form**:
  - Form inputs equipped with icons (`User`, `Mail`, `FileText`), real-time character counters, and clear validation highlights.
  - **Real-Time Live Queue Preview Card**: Instantly mirrors customer name, email, subject, and description snippet as the user types.
  - **Mobile Collapsible Drawer**: On smartphones, users can expand/collapse the live preview without cluttering the screen.
  - **SLA Best Practices Card**: Guidance checklist on resolution standards and ticket triaging.

### 3. Case Management & Customer 360 (`TicketDetail.jsx`)
- **Executive Header Bar**: Full breadcrumb path (`Dashboard / Tickets / TKT-001`), Ticket ID copy button, and large status badge.
- **High-Contrast Callout**: Customer inquiry description rendered with clean line spacing and metadata timestamps.
- **Activity & Internal Notes Feed**:
  - Chronological timeline stream with agent avatar badges and formatted timestamps.
  - Inline note composer with auto-focused inputs and status selector.
- **Customer 360 Sidebar**:
  - Profile card with customer avatar, verified contact badge, and email copy & `mailto:` links.
  - Quick 1-click status transition buttons (`Open`, `In Progress`, `Closed`).
  - Database audit metadata card.

### 4. Glassmorphic Toast Notifications (`ToastContext.jsx`)
- Zero external libraries needed; custom lightweight React Context implementation.
- Types: `success`, `error`, `info`, `warning`, and `custom`.
- Features: Progress countdown timers, glowing colored borders, auto-dismiss, and top-right (desktop) / top-center (mobile) positioning.

---

## 🧪 Verification & Testing Checklist

- [x] **Backend REST API**: All routes (`GET`, `POST`, `PUT`) tested and validated against MongoDB schema.
- [x] **Redux Async Thunks**: `fetchTickets`, `fetchTicketById`, `createNewTicket`, and `updateTicketDetails` operating with error rejection handling.
- [x] **Responsive Viewports**: Tested and confirmed on Mobile (375px, 414px), Tablet (768px, 1024px), Desktop (1440px), and Ultra-wide (1920px+).
- [x] **Zero Business Logic Regressions**: Strict preservation of existing models, controllers, and redux state payloads.

---

## 👤 Author & Assessment Credits

- **Candidate**: Satyam Sawant
- **Role Applied**: Full-Stack MERN Developer
- **Assessment**: DataStraw Home Assessment
- **Status**: Production Ready & Fully Documented
