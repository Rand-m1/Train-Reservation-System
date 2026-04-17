import React, { createContext, useContext, useState, useRef } from "react"
import { FIFOQueue } from "./queue"
import type { WaitingListEntry } from "./queue"

// train data
const trainsList = [
  { id: "t1", number: "101", from: "Riyadh", to: "Dammam", departure: "09:00 AM", totalSeats: 20, availableSeats: 8, date: "2026-04-25" },
  { id: "t2", number: "205", from: "Riyadh", to: "Jeddah", departure: "12:30 PM", totalSeats: 20, availableSeats: 0, date: "2026-04-25" },
  { id: "t3", number: "307", from: "Riyadh", to: "Hail", departure: "04:15 PM", totalSeats: 20, availableSeats: 5, date: "2026-04-25" },
  { id: "t4", number: "412", from: "Jeddah", to: "Mecca", departure: "08:00 AM", totalSeats: 20, availableSeats: 12, date: "2026-04-25" },
  { id: "t5", number: "520", from: "Dammam", to: "Riyadh", departure: "02:00 PM", totalSeats: 20, availableSeats: 0, date: "2026-04-25" },
  { id: "t6", number: "615", from: "Riyadh", to: "Mecca", departure: "10:00 AM", totalSeats: 20, availableSeats: 15, date: "2026-04-25" },
]

// no sample bookings - start empty
const startBookings: any[] = []


// هنا ايميلاتنا ثابته عشان نسوي تست
const existingUsers = [
  { email: "joud@gmail.com", name: "Joud", role: "passenger" },
  { email: "jouri@gmail.com", name: "Jouri", role: "passenger" },
  { email: "rowaida@gmail.com", name: "Rowaida", role: "passenger" },
  { email: "tareem@gmail.com", name: "Tareem", role: "passenger" },
  { email: "rand@gmail.com", name: "Rand", role: "passenger" },
  { email: "lna@gmail.com", name: "Lna", role: "passenger" },
  { email: "admin@train.com", name: "Admin", role: "admin" },
]


// create the context
const AppContext = createContext<any>(null)


export function AppProvider({ children }: { children: React.ReactNode }) {

  const [page, setPage] = useState("login")
  const [user, setUser] = useState<any>(null)
  const [trains, setTrains] = useState(trainsList)
  const [allBookings, setAllBookings] = useState<any[]>(startBookings)
  const [train, setTrain] = useState<any>(null)
  const [pickedSeats, setPickedSeats] = useState<number[]>([])
  const [waitingList, setWaitingList] = useState<Record<string, WaitingListEntry[]>>({})
  const [autoAssigned, setAutoAssigned] = useState<any>(null)
  const [searchInfo, setSearchInfo] = useState({ from: "Riyadh", to: "Jeddah", date: "2026-04-25", returnDate: "" })

  // queues are stored here (one per train)
  const queues = useRef<Record<string, FIFOQueue>>({})

  // make queues when app starts
  if (Object.keys(queues.current).length === 0) {
    trainsList.forEach(t => {
      queues.current[t.id] = new FIFOQueue()
    })
  }


  //  تسجيل الدخول - نشيك على الايميل والباسورد
  function doLogin(email: string, password: string) {

    const found = existingUsers.find(u => u.email === email)

    if (found && password.length >= 4) {
      setUser({ name: found.name, email: found.email, role: found.role })
      setPage("dashboard")
      return { ok: true, error: "" }
    }

    return { ok: false, error: "Invalid email or password!" }
  }


  // register function - checks if email already exists
  function doRegister(email: string, password: string, name: string) {

    const alreadyExists = existingUsers.find(u => u.email === email)

    if (alreadyExists) {
      return { ok: false, error: "Email already exists" }
    }

    if (!email || password.length < 4 || !name) {
      return { ok: false, error: "Please fill all fields correctly" }
    }

    // add new user to the list
    existingUsers.push({ email, name, role: "passenger" })
    setUser({ name, email, role: "passenger" })
    setPage("dashboard")
    return { ok: true, error: "" }
  }


  // logout
  function doLogout() {
    setUser(null)
    setPage("login")
  }


  // go to a page
  function goTo(p: string) {
    setPage(p)
  }


  // when user clicks a train
  function chooseTrain(t: any) {
    setTrain(t)
    setPickedSeats([])
    setPage("seat-select")
  }


  // when user clicks a seat
  function pickSeat(seat: number) {
    if (!train) return

    const takenSeats = allBookings
      .filter(b => b.trainId === train.id && b.status === "confirmed")
      .flatMap(b => b.seatNumbers)

    if (takenSeats.includes(seat)) return

    if (pickedSeats.includes(seat)) {
      setPickedSeats(pickedSeats.filter(s => s !== seat))
    } else {
      setPickedSeats([...pickedSeats, seat])
    }
  }


  // function for booking or joining waiting list
  function confirmBooking(name: string, email: string) {

    if (!train) return { addedToWait: false }

    const isFull = train.availableSeats === 0

    if (!isFull && pickedSeats.length === 0) return { addedToWait: false }

    if (!isFull) {
      // normal booking
      const newBooking = {
        id: "bk" + Math.random().toString(36).substr(2, 8),
        bookingNumber: String(Math.floor(10000 + Math.random() * 90000)),
        trainId: train.id,
        passengerName: name,
        passengerEmail: email,
        seatNumbers: pickedSeats,
        date: new Date().toLocaleDateString("en-GB"),
        status: "confirmed",
      }

      setAllBookings(prev => [...prev, newBooking])

      setTrains(prev =>
        prev.map(t => t.id === train.id
          ? { ...t, availableSeats: Math.max(0, t.availableSeats - pickedSeats.length) }
          : t
        )
      )

      setPickedSeats([])
      setPage("dashboard")
      return { addedToWait: false }

    } else {
      //القطار ممتلئ,فا بنضيفه لقائمة الانتظار
      const entry: WaitingListEntry = {
        id: "wl" + Math.random().toString(36).substr(2, 8),
        passengerName: name,
        passengerEmail: email,
        trainId: train.id,
        addedAt: new Date(),
      }

      const q = queues.current[train.id]
      q.enqueue(entry)

      setWaitingList(prev => ({ ...prev, [train.id]: q.toArray() }))
      setPickedSeats([])
      setPage("waiting-list")
      return { addedToWait: true }
    }
  }


  // cancel a booking
  function doCancel(bookingId: string) {

    const booking = allBookings.find(b => b.id === bookingId)
    if (!booking) return

    const t = trains.find(t => t.id === booking.trainId)
    if (!t) return

    const updated = allBookings.map(b =>
      b.id === bookingId ? { ...b, status: "cancelled" } : b
    )

    const q = queues.current[booking.trainId]

    if (!q.isEmpty()) {
      // اذا في احد ينتظر , بنعطي له المقعد الي فضى علطول
      const next = q.dequeue()!

      const newBooking = {
        id: "bk" + Math.random().toString(36).substr(2, 8),
        bookingNumber: String(Math.floor(10000 + Math.random() * 90000)),
        trainId: booking.trainId,
        passengerName: next.passengerName,
        passengerEmail: next.passengerEmail,
        seatNumbers: booking.seatNumbers,
        date: new Date().toLocaleDateString("en-GB"),
        status: "confirmed",
      }

      setAllBookings([...updated, newBooking])
      setWaitingList(prev => ({ ...prev, [booking.trainId]: q.toArray() }))
      setAutoAssigned({ passengerName: next.passengerName, trainNumber: t.number, seatNumber: booking.seatNumbers[0] })

    } else {
      // no one waiting, just free the seat
      setAllBookings(updated)
      setTrains(prev =>
        prev.map(t => t.id === booking.trainId
          ? { ...t, availableSeats: t.availableSeats + booking.seatNumbers.length }
          : t
        )
      )
    }
  }


  // clear the auto assign message
  function clearAlert() {
    setAutoAssigned(null)
  }


  // get waiting list for a train
  function getQueue(trainId: string) {
    return waitingList[trainId] ?? []
  }


  return (
    <AppContext.Provider value={{
      page, goTo,
      user, doLogin, doLogout, doRegister,
      trains,
      allBookings,
      train, chooseTrain,
      pickedSeats, pickSeat,
      waitingList, getQueue,
      autoAssigned, clearAlert,
      searchInfo, setSearchInfo,
      confirmBooking,
      doCancel,
    }}>
      {children}
    </AppContext.Provider>
  )
}


// hook to use the context
export function useApp() {
  return useContext(AppContext)
}
