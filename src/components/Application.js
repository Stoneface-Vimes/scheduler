import React, { useState, useEffect } from "react";
import DayList from "components/DayList.js"
import "components/Appointment"
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({ ...state, day })
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)
  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios.get("http://localhost:8001/api/days")
      ),
      Promise.resolve(
        axios.get("http://localhost:8001/api/appointments")
      ),
      Promise.resolve(
        axios.get("http://localhost:8001/api/interviewers")
      )
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))

    });
  }, [])

  const schedule = appointments.map((appointment, i) => {

    const interview = getInterview(state, appointment.interview);

    if (i === appointments.length - 1) {
      return (
        <Appointment
          key="last"
          time="5pm"
          interviewers={interviewers}
          interview={interview ? interview : null}
          bookInterview={bookInterview}

          {...appointment}
        />
      )
    } else {
      return (
        <Appointment

          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          {...appointment}
        />
      )
    }

  })

  function bookInterview(id, interview) {
    return new Promise((res, err) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };


      axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then((response) => {
        res(response)
      })
      .catch((response) => {
        err(response)
      })
      setState({ ...state, appointments })

      console.log("End of bookInterview")
    })
  }




  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}

