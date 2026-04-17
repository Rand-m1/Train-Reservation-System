# Train Reservation System

A simple train reservation web application built with **React**, **Vite**, and **TypeScript**.
Passengers can search trains, pick seats visually, book tickets, or join a FIFO waiting list when a train is full. Admins can manage trains, view all bookings, and see system statistics.

## Team

- جوري (Jouri)
- رند (Rand)
- جود (Joud)
- لنا (Lna)
- رويدا (Rowaida)
- تريم (Tareem)

## Features

- Login & Register (with static test users)
- Role-based interface (Admin vs Passenger)
- Admin dashboard with booking statistics, train status, and revenue overview
- Train search by route and date
- Visual seat selection grid
- FIFO waiting list implemented as a linked-list queue
- Automatic seat assignment when a booking is cancelled
- Booking cancellation with confirmation modal

## Tech Stack

- React 18
- Vite 5
- TypeScript
- lucide-react (icons)

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The app will start on [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Test Accounts

| Role      | Email              | Password         |
|-----------|--------------------|------------------|
| Admin     | admin@train.com    | any 4+ chars     |
| Passenger | joud@gmail.com     | any 4+ chars     |
| Passenger | jouri@gmail.com    | any 4+ chars     |
| Passenger | rowaida@gmail.com  | any 4+ chars     |
| Passenger | tareem@gmail.com   | any 4+ chars     |
| Passenger | rand@gmail.com     | any 4+ chars     |
| Passenger | lna@gmail.com      | any 4+ chars     |

You can also register a new passenger account from the login screen.

## Project Structure

```
src/
  pages/
    Login.tsx
    Dashboard.tsx
    SearchTrains.tsx
    SeatSelect.tsx
    BookingsPage.tsx
    WaitingListPage.tsx
    SimplePage.tsx
  components/
    Sidebar.tsx
  AppContext.tsx     # global state (React Context)
  queue.ts           # FIFO linked-list queue for waiting list
  App.tsx            # routing
  main.tsx           # entry point
  index.css
index.html
package.json
vite.config.ts
tsconfig.json
```
