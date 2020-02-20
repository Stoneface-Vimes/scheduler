import React from "react"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import useVisualMode from "../../hooks/useVisualMode"
import "components/Appointment/styles.scss"

export default function Appointment(props) {

  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"

  const { mode, transition, back } = useVisualMode(

    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(() => {
      console.log("Then triggering")
      transition(SHOW)
    })
  }

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty
       onAdd={() => transition(CREATE)} 

       />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
        />
      )}
      {mode === CREATE && (
        <Form
        bookInterview={props.bookInterview}
        onSave={save}
        interviewers={props.interviewers}
        onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status
        message={"Saving..."}
        />
      )}

    </article>

  )


}