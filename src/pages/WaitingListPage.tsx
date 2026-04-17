import { useState } from "react"
import { useApp } from "@/AppContext"
import { CheckCircle2 } from "lucide-react"


// waiting list success page
export default function WaitingListPage() {
  const { goTo } = useApp()
  const [showPopup, setShowPopup] = useState(true)


  return (
    <div style={{
      flex: 1, background: "linear-gradient(135deg,#ede8ff 0%,#d8ccff 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100%",
    }}>

      {/* success popup */}
      {showPopup && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(100,70,200,0.18)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 40px", maxWidth: 460, width: "90%", boxShadow: "0 8px 40px rgba(100,70,200,0.18)", position: "relative" }}>

            <button
              onClick={() => setShowPopup(false)}
              style={{ position: "absolute", top: 18, right: 20, background: "none", border: "none", fontSize: 20, color: "#aaa", cursor: "pointer", lineHeight: 1 }}
            >×</button>

            <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: "#2d1b69", margin: "0 0 24px" }}>Waiting List</h2>

            {/* green checkmark and message */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle2 size={20} color="white" />
              </div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#2d1b69" }}>You have been added to the waiting list.</p>
            </div>

            <p style={{ margin: "0 0 18px", fontSize: 13, color: "#666", lineHeight: 1.6 }}>
              You will be automatically notified when a seat becomes available.
            </p>

            <div style={{ borderTop: "1px solid #f0ecff", borderBottom: "1px solid #f0ecff", padding: "16px 0", margin: "0 0 24px" }}>
              <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.7, textAlign: "center" }}>
                Passengers are assigned seats automatically based on availability using a FIFO (First-In, First-Out) system. You will be notified when a seat becomes available.
              </p>
            </div>

            <button
              onClick={() => { setShowPopup(false); goTo("dashboard") }}
              style={{ width: "100%", background: "linear-gradient(90deg,#7b5ea7,#9b6fe0)", color: "white", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            >
              OK
            </button>

          </div>
        </div>
      )}

      {/* background card */}
      <div style={{ background: "white", borderRadius: 20, padding: "36px 40px", maxWidth: 380, width: "90%", boxShadow: "0 4px 24px rgba(120,80,220,0.1)", textAlign: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#2d1b69", margin: "0 0 18px" }}>Waiting List</h2>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 18 }}>No seats available.</p>

        <div style={{ border: "1.5px solid #e8e4f5", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, marginBottom: 24, background: "#faf9ff" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckCircle2 size={14} color="white" />
          </div>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#2d1b69" }}>Added to the waiting list.</span>
        </div>

        <button
          onClick={() => goTo("dashboard")}
          style={{ width: "100%", background: "linear-gradient(90deg,#7b5ea7,#9b6fe0)", color: "white", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
        >
          Back to Home
        </button>
      </div>

    </div>
  )
}
