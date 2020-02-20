import React, { useState } from "react"

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode)
  const [history, setHistory] = useState(initMode)


  let replace = false;

  function transition(newMode, replace=false) {
    setMode(() => newMode)
    if (Array.isArray(history)) {
      if (replace){
        setHistory(() => [...history.slice(0, -1), newMode])
      } else {
        setHistory(() => [...history, newMode])
      }
    } else {
      setHistory(() => [history, newMode])
    }
  }

  function back() {//Refactor this at some point
    // console.log("Back is called, history is ", history)
    if (history) {
      if (Array.isArray(history)) {
        if (history.length > 1) {
          const tempHistory = [...history]
          tempHistory.pop()
          setHistory(() => tempHistory)
          setMode(() => tempHistory.slice(-1).toString())
        } else {
          setMode(() => history.toString())
          setHistory(() => "")
        } 
      } else {
        // console.log("HIstory is not an array, it's value is ", history)
        setMode(() => history)
        // console.log(mode)
        setHistory(() => "")
        // console.log(history)
      }
    }
  }

  return { mode, transition, back, replace }
}