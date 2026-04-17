import { useState } from "react"
import { useApp } from "@/AppContext"

const totalSeats = 20
const cols = 5


// seat selection page
export default function SeatSelect() {
  const { train, pickedSeats, pickSeat, confirmBooking, allBookings, goTo, user } = useApp()

  const [name, setName] = useState("")
  const [showForm, setShowForm] = useState(false)

  // email comes from the logged in user automatically
  const email = user?.email || ""

  if (!train) return null

  // get list of already booked seats for this train
  const takenSeats = allBookings
    .filter((b: any) => b.trainId === train.id && b.status === "confirmed")
    .flatMap((b: any) => b.seatNumbers)

  // build rows for the seat grid
  const rows = []
  for (let r = 0; r < Math.ceil(totalSeats / cols); r++) {
    const row = []
    for (let c = 0; c < cols; c++) {
      const seatNum = r * cols + c + 1
      if (seatNum <= totalSeats) row.push(seatNum)
    }
    rows.push(row)
  }

  const isFull = train.availableSeats === 0


  // when user submits the form
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isFull && pickedSeats.length === 0) return

    confirmBooking(name, email)
  }

  return (
    <div style={{ flex: 1, overflow: "auto", background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100%" }}>
      <div style={{ background: "white", borderRadius: 20, padding: "36px 40px", boxShadow: "0 4px 24px rgba(120,80,220,0.1)", maxWidth: 480, width: "100%", margin: "40px auto" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <button onClick={() => goTo("search")} style={{ background: "none", border: "none", color: "#7b5ea7", cursor: "pointer", fontSize: 13, padding: 0 }}>
            ← Back
          </button>
          <span style={{ fontSize: 12, color: "#aaa" }}>Train {train.number} · {train.from} → {train.to}</span>
        </div>

        <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: "#2d1b69", margin: "0 0 24px" }}>Select Your Seat</h2>

        {/* show message if train is full */}
        {isFull ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <p style={{ color: "#ef4444", fontWeight: 600, marginBottom: 16 }}>This train is fully booked.</p>
            <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>You can join the waiting list and be automatically assigned a seat when one becomes available.</p>
          </div>
        ) : (
          <>
            {/* seat grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {rows.map((row, ri) => (
                <div key={ri} style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  {row.map((seat) => {
                    const isBooked = takenSeats.includes(seat)
                    const isSelected = pickedSeats.includes(seat)

                    let bg = "#e8e4f5"
                    let border = "2px solid #d0c4f7"
                    if (isBooked) { bg = "#c4b5fd"; border = "2px solid #a78bfa" }
                    if (isSelected) { bg = "#6b4fc8"; border = "2px solid #5a3db8" }

                    return (
                      <button
                        key={seat}
                        onClick={() => pickSeat(seat)}
                        disabled={isBooked}
                        style={{
                          width: 44, height: 44, borderRadius: 8, background: bg, border,
                          cursor: isBooked ? "default" : "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: isSelected ? 16 : 12,
                          color: isSelected || isBooked ? "white" : "#7b5ea7",
                          fontWeight: 600, transition: "all 0.12s",
                        }}
                      >
                        {isSelected ? "✓" : isBooked ? "✓" : seat}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* seat legend */}
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 24, fontSize: 12, color: "#666" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, background: "#e8e4f5", display: "inline-block" }} />Available
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, background: "#c4b5fd", display: "inline-block" }} />Booked
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, background: "#6b4fc8", display: "inline-block" }} />Selected
              </span>
            </div>
          </>
        )}

        {/* book button or form */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            disabled={!isFull && pickedSeats.length === 0}
            style={{
              width: "100%", background: "linear-gradient(90deg,#7b5ea7,#9b6fe0)", color: "white",
              border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer",
              opacity: !isFull && pickedSeats.length === 0 ? 0.5 : 1,
            }}
          >
            {isFull ? "Join Waiting List" : `Book Now${pickedSeats.length > 0 ? ` (${pickedSeats.length} seat${pickedSeats.length > 1 ? "s" : ""})` : ""}`}
          </button>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            <div>
              <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 5, fontWeight: 500 }}>Full Name</label>
              <input
                type="text" required value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: 9, padding: "10px 13px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                placeholder="Enter your name"
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" onClick={() => setShowForm(false)}
                style={{ flex: 1, background: "#f0ecff", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#7b5ea7" }}>
                Back
              </button>
              <button type="submit"
                style={{ flex: 2, background: "linear-gradient(90deg,#7b5ea7,#9b6fe0)", color: "white", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                {isFull ? "Join Waiting List" : "Confirm Booking"}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  )
}
