import { useState } from "react"
import { useApp } from "@/AppContext"
import { CheckCircle2, Download, ChevronDown, Calendar } from "lucide-react"

const cities = ["Riyadh", "Jeddah", "Dammam", "Mecca", "Hail", "Tabuk"]


// search trains page
export default function SearchTrains() {
  const { trains, searchInfo, setSearchInfo, chooseTrain } = useApp()
  const [searched, setSearched] = useState(false)


  // filter trains based on what user typed
  const results = trains.filter((t: any) =>
    (!searchInfo.from || t.from.toLowerCase().includes(searchInfo.from.toLowerCase())) &&
    (!searchInfo.to || t.to.toLowerCase().includes(searchInfo.to.toLowerCase()))
  )


  function doSearch() {
    setSearched(true)
  }

  return (
    <div style={{ flex: 1, overflow: "auto" }}>

      {/* top bar */}
      <div style={{ background: "white", borderBottom: "1px solid #ede9f7", padding: "0 28px", display: "flex", alignItems: "center", height: 60, gap: 16 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle2 size={16} color="#7b5ea7" />
          <span style={{ fontSize: 15, fontWeight: 600, color: "#2d1b69" }}>Search Trains</span>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#f0ecff", border: "1px solid #d0c4f7", borderRadius: 8, padding: "7px 14px", fontSize: 13, color: "#7b5ea7", cursor: "pointer", fontWeight: 500 }}>
          <Download size={14} />Export Excel
        </button>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#7b5ea7,#9b6fe0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>A</span>
        </div>
      </div>

      <div style={{ padding: 28 }}>
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(120,80,220,0.07)", maxWidth: 560 }}>
          <h2 style={{ margin: "0 0 22px", fontSize: 18, fontWeight: 700, color: "#2d1b69" }}>Search Trains</h2>

          {/* from and to dropdowns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "center", marginBottom: 14 }}>
            <CitySelect value={searchInfo.from} onChange={(v: string) => { setSearchInfo({ ...searchInfo, from: v }); setSearched(false) }} options={cities} />
            <span style={{ color: "#aaa", fontSize: 18, padding: "0 4px" }}>⇄</span>
            <CitySelect value={searchInfo.to} onChange={(v: string) => { setSearchInfo({ ...searchInfo, to: v }); setSearched(false) }} options={cities} />
          </div>

          {/* date inputs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
            <DateBox value={searchInfo.date} onChange={(v: string) => { setSearchInfo({ ...searchInfo, date: v }); setSearched(false) }} />
            <DateBox value={searchInfo.returnDate} onChange={(v: string) => { setSearchInfo({ ...searchInfo, returnDate: v }); setSearched(false) }} placeholder="Return Date" />
          </div>

          <button
            onClick={doSearch}
            style={{ width: "100%", background: "linear-gradient(90deg,#7b5ea7,#9b6fe0)", color: "white", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
          >
            Search
          </button>

          {/* show train list after search */}
          {searched && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 14, color: "#2d1b69", fontWeight: 600 }}>Available Trains</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {results.map((train: any) => (
                  <div key={train.id} style={{
                    border: "1.5px solid #ede9f7", borderRadius: 12, padding: "14px 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "#faf9ff",
                  }}>
                    <div>
                      <p style={{ margin: "0 0 3px", fontWeight: 600, fontSize: 14, color: "#2d1b69" }}>
                        Train {train.number} &nbsp;<span style={{ color: "#888", fontWeight: 400 }}>{train.from} - {train.to}</span>
                      </p>
                      <p style={{ margin: 0, fontSize: 12, color: train.availableSeats > 0 ? "#7b5ea7" : "#ef4444" }}>
                        {train.availableSeats > 0 ? "Seats Available" : "Fully Booked"}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: "#2d1b69" }}>{train.departure}</span>
                      <button
                        onClick={() => chooseTrain(train)}
                        style={{ background: "linear-gradient(90deg,#7b5ea7,#9b6fe0)", color: "white", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}

                {results.length === 0 && (
                  <p style={{ color: "#aaa", fontSize: 13 }}>No trains found for this route.</p>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}


// dropdown for city
function CitySelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: 10, padding: "11px 36px 11px 14px", fontSize: 14, appearance: "none", background: "#fafafa", cursor: "pointer", color: "#333", outline: "none" }}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }} />
    </div>
  )
}


// date input
function DateBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ position: "relative" }}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: 10, padding: "11px 36px 11px 14px", fontSize: 14, background: "#fafafa", color: "#333", outline: "none", boxSizing: "border-box" }}
      />
      <Calendar size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }} />
    </div>
  )
}
