import React from "react"



export default function idDay(id) {

  console.log("Inside setDay function")

  if (id <= 5) {
    return { day: "Monday", id: 0 }
  } else if (id > 5 && id <= 10) {
    return { day: "Tuesday", id: 1 }
  } else if (id > 10 && id <= 15) {
    return { day: "Wednesday", id: 2 }
  } else if (id > 15 && id <= 20) {
    return { day: "Thursday", id: 3 }
  } else if (id > 20 && id <= 25) {
    return { day: "Friday", id: 4}
  }


}