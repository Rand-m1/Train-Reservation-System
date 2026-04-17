import { useApp } from "@/AppContext"
import { Bell, Search, CheckCircle2, XCircle } from "lucide-react"

// some fake chart data for the revenue bars
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const barValues = [8000, 11000, 9500, 14000, 10000, 16000, 18000]
const maxVal = 25000


// the main dashboard page
export default function Dashboard() {
  const { allBookings, trains, user } = useApp()

  // check if admin or normal passenger
  const isAdmin = user?.role === "admin"

  // passenger only sees their own bookings, admin sees everything
  const myBookings = isAdmin
    ? allBookings
    : allBookings.filter((b: any) => b.passengerEmail === user?.email)

  const totalBookings = allBookings.length

  // calculate how many seats are taken
  const totalSeats = trains.reduce((sum: number, t: any) => sum + t.totalSeats, 0)
  const takenSeats = trains.reduce((sum: number, t: any) => sum + (t.totalSeats - t.availableSeats), 0)
  const seatsPercentage = Math.round((takenSeats / totalSeats) * 100)

  // on time means train has seats, delayed means full (just for display)
  const onTime = trains.filter((t: any) => t.availableSeats > 0).length
  const full = trains.length - onTime


  return (
    <div style={{ flex: 1, overflow: "auto" }}>

      {/* top bar */}
      <div style={{ background: "white", borderBottom: "1px solid #ede9f7", padding: "0 28px", display: "flex", alignItems: "center", height: 60, gap: 16 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle2 size={16} color="#7b5ea7" />
          <span style={{ fontSize: 15, fontWeight: 600, color: "#2d1b69" }}>Dashboard</span>
        </div>
        <Bell size={18} color="#999" style={{ cursor: "pointer" }} />
        <Search size={18} color="#999" style={{ cursor: "pointer" }} />
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#7b5ea7,#9b6fe0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>A</span>
        </div>
      </div>

      <div style={{ padding: "28px 28px 0" }}>

        {/* admin sees everything, passenger only sees a welcome + their bookings */}
        {isAdmin ? (
          <>
            {/* stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 28 }}>

              <StatCard label="Total Bookings" value={String(totalBookings)} />

              <StatCard label="Seats Taken %" value={`${seatsPercentage}%`} />

              <div style={{ background: "white", borderRadius: 14, padding: "20px 22px", boxShadow: "0 2px 12px rgba(120,80,220,0.07)" }}>
                <p style={{ margin: "0 0 14px", fontSize: 13, color: "#888", fontWeight: 500 }}>Train Status</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="#22c55e" />
                    <span style={{ fontSize: 14, color: "#22c55e", fontWeight: 600 }}>{onTime} On Time</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <XCircle size={16} color="#ef4444" />
                    <span style={{ fontSize: 14, color: "#ef4444", fontWeight: 600 }}>{full} Delayed</span>
                  </div>
                </div>
              </div>

            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

              {/* revenue chart */}
              <div style={{ background: "white", borderRadius: 14, padding: "22px", boxShadow: "0 2px 12px rgba(120,80,220,0.07)" }}>
                <h3 style={{ margin: "0 0 18px", fontSize: 14, color: "#2d1b69", fontWeight: 600 }}>Revenue Overview</h3>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
                  {days.map((day, i) => (
                    <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: 100, gap: 2 }}>
                        <div style={{ width: "45%", height: `${(barValues[i] * 0.6 / maxVal) * 100}%`, background: "#c4b5fd", borderRadius: 4 }} />
                        <div style={{ width: "45%", height: `${(barValues[i] / maxVal) * 100}%`, background: "#7b5ea7", borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 10, color: "#aaa" }}>{day}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
                  <span style={{ fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: "#7b5ea7", display: "inline-block" }} />Revenue
                  </span>
                  <span style={{ fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: "#c4b5fd", display: "inline-block" }} />Tickets
                  </span>
                </div>
              </div>

              {/* recent bookings table - admin sees ALL */}
              <div style={{ background: "white", borderRadius: 14, padding: "22px", boxShadow: "0 2px 12px rgba(120,80,220,0.07)" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 14, color: "#2d1b69", fontWeight: 600 }}>Recent Bookings</h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {allBookings.slice(0, 6).map((b: any) => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #f3f0fb" }}>
                        <td style={{ padding: "9px 0", fontSize: 13, color: "#444" }}>{b.passengerName}</td>
                        <td style={{ padding: "9px 0", fontSize: 12, fontWeight: 600, textAlign: "right", color: b.status === "confirmed" ? "#7b5ea7" : "#ef4444" }}>
                          {b.status === "confirmed" ? "Confirmed" : "Cancelled"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </>
        ) : (
          <>
            {/* passenger view - welcome message + only their bookings */}
            <div style={{ background: "white", borderRadius: 14, padding: "26px 28px", boxShadow: "0 2px 12px rgba(120,80,220,0.07)", marginBottom: 22 }}>
              <h2 style={{ margin: "0 0 6px", fontSize: 24, color: "#2d1b69", fontWeight: 700 }}>
                Welcome {user?.name} 
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: "#888" }}>Here are your bookings</p>
            </div>

            <div style={{ background: "white", borderRadius: 14, padding: "22px", boxShadow: "0 2px 12px rgba(120,80,220,0.07)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, color: "#2d1b69", fontWeight: 600 }}>My Bookings</h3>
              {myBookings.length === 0 ? (
                <p style={{ fontSize: 13, color: "#888", margin: 0 }}>You have no bookings yet.</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #ede9f7" }}>
                      <th style={{ padding: "8px 0", fontSize: 12, color: "#888", textAlign: "left", fontWeight: 500 }}>Booking #</th>
                      <th style={{ padding: "8px 0", fontSize: 12, color: "#888", textAlign: "left", fontWeight: 500 }}>Date</th>
                      <th style={{ padding: "8px 0", fontSize: 12, color: "#888", textAlign: "left", fontWeight: 500 }}>Seats</th>
                      <th style={{ padding: "8px 0", fontSize: 12, color: "#888", textAlign: "right", fontWeight: 500 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myBookings.map((b: any) => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #f3f0fb" }}>
                        <td style={{ padding: "10px 0", fontSize: 13, color: "#444" }}>{b.bookingNumber}</td>
                        <td style={{ padding: "10px 0", fontSize: 13, color: "#444" }}>{b.date}</td>
                        <td style={{ padding: "10px 0", fontSize: 13, color: "#444" }}>{b.seatNumbers.join(", ")}</td>
                        <td style={{ padding: "10px 0", fontSize: 12, fontWeight: 600, textAlign: "right", color: b.status === "confirmed" ? "#7b5ea7" : "#ef4444" }}>
                          {b.status === "confirmed" ? "Confirmed" : "Cancelled"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}


// small card component for stats
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "white", borderRadius: 14, padding: "20px 22px", boxShadow: "0 2px 12px rgba(120,80,220,0.07)", textAlign: "center" }}>
      <p style={{ margin: "0 0 8px", fontSize: 13, color: "#888", fontWeight: 500 }}>{label}</p>
      <p style={{ margin: 0, fontSize: 34, fontWeight: 700, color: "#2d1b69" }}>{value}</p>
    </div>
  )
}
