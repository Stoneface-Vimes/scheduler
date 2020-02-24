import { useState } from "react"

export default function useVisualMode(initMode, replace = false) {
  const [mode, setMode] = useState(initMode)
  const [history, setHistory] = useState([initMode])



  function transition(newMode, replace) {
    setMode(() => newMode)
    if (replace === true) {
      setHistory((prev) => [...prev])
    } else {
      setHistory((prev) => [...prev, newMode])
    }
  }


  function back() {
    if (history) {
      if (history.length > 1) {
        setHistory((prev) => [...prev].slice(0, -1))
        let temp = ([...history].slice(-2, -1)).toString()
        setMode(() => temp)
      } else {
        setMode(() => initMode)
      }
    }
  }


  return { mode, transition, back, replace }
}