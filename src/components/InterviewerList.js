import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from "prop-types"
export default function InterviewerList(props) {

  let newArr = props.interviewers.map((int) => {    
    return (
      <InterviewerListItem
        key={int.id}
        id={int.id}
        name={int.name}
        avatar={int.avatar}
        selected={int.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(int.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul
        className="interviewers__list">
        {newArr}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired
};