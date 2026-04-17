import { useApp } from "@/AppContext"
import { BarChart2, Train } from "lucide-react"


// trains management page - admin sees a list of all trains
export function TrainsPage() {
  const { trains, allBookings } = useApp()


  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <div style={{ background: "white", borderBottom: "1px solid #ede9f7", padding: "0 28px", display: "flex", alignItems: "center", height: 60 }}>
        <Train size={16} color="#7b5ea7" style={{ marginRight: 8 }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: "#2d1b69" }}>Trains Management</span>
      </div>

      <div style={{ padding: 28 }}>
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(120,80,220,0.07)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f3ff" }}>
                {["Train #", "From", "To", "Departure", "Date", "Total Seats", "Available", "Bookings", "Status"].map((h) => (
                  <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#7b5ea7", borderBottom: "1px solid #ede9f7" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trains.map((t: any) => {
                // count bookings for this train
                const trainBookings = allBookings.filter((b: any) => b.trainId === t.id && b.status === "confirmed").length
                const isFull = t.availableSeats === 0
                return (
                  <tr key={t.id} style={{ borderBottom: "1px solid #f5f3ff" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#7b5ea7", fontWeight: 600 }}>#{t.number}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{t.from}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{t.to}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{t.departure}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{t.date}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{t.totalSeats}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{t.availableSeats}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{trainBookings}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                        background: isFull ? "#fef2f2" : "#ede9f7",
                        color: isFull ? "#ef4444" : "#7b5ea7",
                      }}>
                        {isFull ? "Full" : "Available"}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


// reports page - not done yet
export function ReportsPage() {
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <div style={{ background: "white", borderBottom: "1px solid #ede9f7", padding: "0 28px", display: "flex", alignItems: "center", height: 60 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#2d1b69" }}>Reports</span>
      </div>
      <div style={{ padding: 28, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <div style={{ textAlign: "center", color: "#bbb" }}>
          <BarChart2 size={48} color="#c4b5fd" />
          <p style={{ marginTop: 12, fontSize: 14 }}>Reports coming soon.</p>
        </div>
      </div>
    </div>
  )
}


// users page - shows the logged in user
export function UsersPage() {
  const { user } = useApp()


  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <div style={{ background: "white", borderBottom: "1px solid #ede9f7", padding: "0 28px", display: "flex", alignItems: "center", height: 60 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#2d1b69" }}>Users</span>
      </div>
      <div style={{ padding: 28 }}>
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(120,80,220,0.07)", maxWidth: 400 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#7b5ea7,#9b6fe0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "white", fontWeight: 700 }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: "#2d1b69" }}>{user?.name}</p>
              <p style={{ margin: 0, fontSize: 13, color: "#888" }}>{user?.email}</p>
              <p style={{ margin: 0, fontSize: 11, color: "#a78bfa", marginTop: 2 }}>Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
