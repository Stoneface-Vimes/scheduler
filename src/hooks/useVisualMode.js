import React, { useState } from "react"

export default function useVisualMode(initMode, replace = false) {
  const [mode, setMode] = useState(initMode)
  const [history, setHistory] = useState([initMode])



  function transition(newMode, replace) {
    setMode(() => newMode)
    if (replace) {
      setHistory((prev) => [...prev])
    } else {
      setHistory((prev) => [...prev, newMode])
    }
  }


  const back = () => {
    if (history) {
      if (history.length > 1) {
        setMode(((prev) => [...prev].slice(-2, -1)).toString())
        setHistory((prev) => [...prev].slice(0, -1))
      } else {
      } setMode(initMode)
    }
  }


  return { mode, transition, back, replace }
}