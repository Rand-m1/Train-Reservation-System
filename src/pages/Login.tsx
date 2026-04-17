import { useState } from "react"
import { useApp } from "@/AppContext"
import { EyeOff, Mail } from "lucide-react"


// this is the login page
export default function Login() {
  const { doLogin, doRegister } = useApp()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")

  // toggle between login and register
  const [isRegister, setIsRegister] = useState(false)


  // when user clicks login
  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const result = doLogin(email, password)

    if (!result.ok) {
      setError(result.error)
    }
  }


  // when user clicks register
  function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    const result = doRegister(email, password, name)

    if (!result.ok) {
      setError(result.error)
    }
  }


  function switchMode() {
    setIsRegister(!isRegister)
    setError("")
    setEmail("")
    setPassword("")
    setName("")
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0ecff 0%, #e8e0ff 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ background: "white", borderRadius: 20, padding: "40px 36px", width: 380, boxShadow: "0 8px 40px rgba(120,80,220,0.13)" }}>

        <h2 style={{ textAlign: "center", color: "#6b4fc8", fontWeight: 700, fontSize: 22, marginBottom: 6, marginTop: 0 }}>
          Train Reservation System
        </h2>

        <p style={{ textAlign: "center", color: "#aaa", fontSize: 13, marginBottom: 28 }}>
          {isRegister ? "Create a new account" : "Sign in to your account"}
        </p>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>

          {/* name field only for register */}
          {isRegister && (
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, color: "#444", marginBottom: 6, fontWeight: 500 }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError("") }}
                style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fafafa" }}
                placeholder="Enter your name"
              />
            </div>
          )}

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 13, color: "#444", marginBottom: 6, fontWeight: 500 }}>Email</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError("") }}
                style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: 10, padding: "11px 40px 11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fafafa" }}
                placeholder=""
              />
              <Mail size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
            </div>
          </div>

          <div style={{ marginBottom: error ? 10 : 18 }}>
            <label style={{ display: "block", fontSize: 13, color: "#444", marginBottom: 6, fontWeight: 500 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError("") }}
                style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fafafa" }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888", padding: 0, fontSize: 13, fontWeight: 500 }}
              >
                {showPw ? <EyeOff size={16} /> : "Show"}
              </button>
            </div>
          </div>

          {/* error message */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, fontWeight: 500 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{ width: "100%", background: "linear-gradient(90deg, #7b5ea7, #9b6fe0)", color: "white", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 16 }}
          >
            {isRegister ? "Register" : "Login"}
          </button>

        </form>

        {/* switch between login and register */}
        <p style={{ textAlign: "center", fontSize: 13, color: "#888", margin: 0 }}>
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <span
            onClick={switchMode}
            style={{ color: "#7b5ea7", cursor: "pointer", fontWeight: 600 }}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>

      </div>
    </div>
  )
}
