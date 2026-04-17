import { useApp } from "@/AppContext"
import { LayoutDashboard, Train, BookOpen, BarChart2, Users, LogOut } from "lucide-react"

// admin sees the full menu
const adminMenu = [
  { label: "Summary", icon: LayoutDashboard, page: "dashboard" },
  { label: "Trains", icon: Train, page: "trains" },
  { label: "Bookings", icon: BookOpen, page: "bookings" },
  { label: "Reports", icon: BarChart2, page: "reports" },
  { label: "Users", icon: Users, page: "users" },
]

// passenger only needs these two
const passengerMenu = [
  { label: "Search", icon: Train, page: "search" },
  { label: "My Bookings", icon: BookOpen, page: "bookings" },
]


// sidebar component
export default function Sidebar() {
  const { page, goTo, doLogout, user } = useApp()

  // pick the menu list based on role
  const menuItems = user?.role === "admin" ? adminMenu : passengerMenu

  return (
    <div style={{
      width: 72,
      minHeight: "100vh",
      background: "linear-gradient(180deg, #8b6ec0 0%, #6b4fc8 60%, #5a3db8 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 20,
      flexShrink: 0,
    }}>

      {/* logo icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 28,
      }}>
        <Train size={22} color="white" />
      </div>

      {/* nav buttons */}
      <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        {menuItems.map((item) => {
          const isActive = page === item.page
          const Icon = item.icon
          return (
            <button
              key={item.page}
              onClick={() => goTo(item.page)}
              title={item.label}
              style={{
                width: 52, height: 52, borderRadius: 14,
                background: isActive ? "rgba(255,255,255,0.22)" : "transparent",
                border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 3,
              }}
            >
              <Icon size={20} color={isActive ? "white" : "rgba(255,255,255,0.65)"} />
              <span style={{ fontSize: 9, color: isActive ? "white" : "rgba(255,255,255,0.6)", fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* user avatar and logout */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, color: "white", fontWeight: 700,
        }}>
          {user?.name?.[0]?.toUpperCase() ?? "U"}
        </div>
        <button onClick={doLogout} title="Logout" style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.7 }}>
          <LogOut size={18} color="white" />
        </button>
      </div>

    </div>
  )
}
