import { AppProvider, useApp } from "./AppContext"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import SearchTrains from "@/pages/SearchTrains"
import SeatSelect from "@/pages/SeatSelect"
import WaitingListPage from "@/pages/WaitingListPage"
import BookingsPage from "@/pages/BookingsPage"
import { ReportsPage, UsersPage, TrainsPage } from "@/pages/SimplePage"
import Sidebar from "@/components/Sidebar"


// this shows the right page based on current page state
function MainApp() {
  const { page, user } = useApp()

  // show login if not logged in
  if (page === "login" || !user) return <Login />

  // show the right page
  function showPage() {
    if (page === "dashboard") return <Dashboard />
    if (page === "search") return <SearchTrains />
    if (page === "trains") return <TrainsPage />
    if (page === "seat-select") return <SeatSelect />
    if (page === "waiting-list") return <WaitingListPage />
    if (page === "bookings") return <BookingsPage />
    if (page === "reports") return <ReportsPage />
    if (page === "users") return <UsersPage />
    return <Dashboard />
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f3ff", fontFamily: "Inter, sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {showPage()}
      </div>
    </div>
  )
}


// wrap everything with the context provider
function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  )
}

export default App
