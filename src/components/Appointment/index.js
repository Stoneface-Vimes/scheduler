import React from "react"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"
import useVisualMode from "../../hooks/useVisualMode"
import "components/Appointment/styles.scss"
import Confirm from "./Confirm"

export default function Appointment(props) {

  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    //If no interview is set for an appointment, defaults that appointment to SHOW
    props.interview ? SHOW : EMPTY
    
  );

  function save(name, interviewer) {
    //Only modify the number of spots displayed if the client is creating an appointment
    const modifySpots = mode === CREATE ? true : false
    if (name.length > 0 && interviewer !== null) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)

      props.bookInterview(props.id, interview, modifySpots)
        .then(() => {
          transition(SHOW)
        })
        .catch(() => {
          transition(ERROR_SAVE, true)
        })
    } else {
      // alert("Please enter a valid name and select an interviewer")
    }
  }

  function cancel(name, interviewer) {
    transition(CONFIRM)
  }

  function confirmCancel() {
    transition(DELETING)

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })
  }

  function edit() {
    transition(EDIT)
  }


  return (

    <article className="appointment" data-testid="appointment"
    >
      <Header time={props.time} />
      {mode === EMPTY && (<Empty
        onAdd={() => transition(CREATE)}

      />
      )}
      {mode === SHOW && props.interview !== null && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onDelete={cancel}
          onEdit={edit}
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
      {mode === EDIT && (
        //Passes in the name and interviewer that were passed in show
        <Form
          name={props.interview.student}
          bookInterview={props.bookInterview}
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back()}
          interviewer={props.interview.interviewer}
        />
      )}


      {mode === SAVING && (
        <Status
          message={"Saving..."}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting..."}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete this appointment?"}
          onCancel={() => back()}
          onConfirm={() => confirmCancel()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"An error occurred while saving"}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"An error occurred while deleting"}
          onClose={() => back()}
        />
      )}

    </article>

  )


}