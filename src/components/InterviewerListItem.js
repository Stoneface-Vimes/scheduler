import React from "react"
import classNames from "classnames";
import "components/InterviewerListItem.scss"


export default function InterviewerListItem(props) {

    const selectedClass = classNames("interviewers__item", {
      "interviewers__item--selected": props.selected
    });

    console.log(props)

    const showName = () => {
      if (props.selected) {
        return props.name
      }
    }
    
  return (
    <li
      onClick={props.setInterviewer}
      className={selectedClass}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName()}
    </li>

  )

};