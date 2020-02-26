import React from "react";
import "components/DayListItem.js"
import DayListItem from "components/DayListItem";
//props = days, day, setDay

export default function DayList(props) {
  
  let newArr = props.days.map( (day) => {
    
    return (
    <DayListItem
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay} />
    )
    
  })

  return (
    <ul>
      {newArr}
    </ul>
  )
};
