import { useState } from "react"
import { useApp } from "@/AppContext"
import { CheckCircle2 } from "lucide-react"


// bookings page - shows all bookings
export default function BookingsPage() {
  const { allBookings, trains, doCancel, autoAssigned, clearAlert, user } = useApp()
  const [cancelId, setCancelId] = useState<string | null>(null)

  // admin sees everything, passenger only sees their own bookings
  const isAdmin = user?.role === "admin"
  const visibleBookings = isAdmin
    ? allBookings
    : allBookings.filter((b: any) => b.passengerEmail === user?.email)


  // find train name by id
  function getTrainInfo(id: string) {
    return trains.find((t: any) => t.id === id)
  }


  // when user confirms cancel
  function confirmCancel() {
    if (!cancelId) return
    doCancel(cancelId)
    setCancelId(null)
  }

  const selectedBooking = allBookings.find((b: any) => b.id === cancelId)
  const selectedTrain = selectedBooking ? getTrainInfo(selectedBooking.trainId) : null

  return (
    <div style={{ flex: 1, overflow: "auto" }}>

      {/* top bar */}
      <div style={{ background: "white", borderBottom: "1px solid #ede9f7", padding: "0 28px", display: "flex", alignItems: "center", height: 60 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#2d1b69" }}>Bookings</span>
      </div>

      <div style={{ padding: 28 }}>

        {/* auto assign message */}
        {autoAssigned && (
          <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CheckCircle2 size={18} color="#22c55e" />
              <span style={{ fontSize: 13, color: "#166534", fontWeight: 500 }}>
                Seat auto-assigned to <strong>{autoAssigned.passengerName}</strong> on Train {autoAssigned.trainNumber} — Seat #{autoAssigned.seatNumber}
              </span>
            </div>
            <button onClick={clearAlert} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 18 }}>×</button>
          </div>
        )}

        {/* bookings table */}
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(120,80,220,0.07)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f3ff" }}>
                {["Booking #", "Passenger", "Route", "Seats", "Date", "Status", "Action"].map((h) => (
                  <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#7b5ea7", borderBottom: "1px solid #ede9f7" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleBookings.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: "20px 16px", fontSize: 13, color: "#888", textAlign: "center" }}>
                    You have no bookings yet.
                  </td>
                </tr>
              )}
              {visibleBookings.map((b: any) => {
                const t = getTrainInfo(b.trainId)
                return (
                  <tr key={b.id} style={{ borderBottom: "1px solid #f5f3ff" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#7b5ea7", fontWeight: 600 }}>#{b.bookingNumber}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13 }}>
                      <div style={{ fontWeight: 500 }}>{b.passengerName}</div>
                      <div style={{ color: "#aaa", fontSize: 11 }}>{b.passengerEmail}</div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{t ? `${t.from} → ${t.to}` : "—"}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{b.seatNumbers.join(", ")}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{b.date}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                        background: b.status === "confirmed" ? "#ede9f7" : "#fef2f2",
                        color: b.status === "confirmed" ? "#7b5ea7" : "#ef4444",
                      }}>
                        {b.status === "confirmed" ? "Confirmed" : "Cancelled"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {b.status === "confirmed" && (
                        <button
                          onClick={() => setCancelId(b.id)}
                          style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "#ef4444", cursor: "pointer", fontWeight: 500 }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* cancel confirmation modal */}
      {cancelId && selectedBooking && selectedTrain && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 40px", maxWidth: 420, width: "90%", boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>

            <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: "#2d1b69" }}>Cancel Booking</h3>
            <div style={{ borderBottom: "1px solid #f0ecff", margin: "16px 0" }} />

            <p style={{ margin: "0 0 6px", fontWeight: 600, fontSize: 14, color: "#2d1b69" }}>Booking #{selectedBooking.bookingNumber}</p>
            <p style={{ margin: "0 0 4px", fontSize: 14, color: "#555" }}>{selectedTrain.from} to {selectedTrain.to}</p>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: "#aaa" }}>Date: {selectedBooking.date}</p>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "#555" }}>Are you sure you want to <strong>cancel</strong> this booking?</p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setCancelId(null)}
                style={{ flex: 1, background: "#f0ecff", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#7b5ea7" }}
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                style={{ flex: 1, background: "linear-gradient(90deg,#f87171,#ef4444)", color: "white", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                Yes, Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
