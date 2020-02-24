import React, { useState, useEffect, useReducer } from "react";
import axios from "axios"
export default function useApplicationData() {

  const SET_DAY = "SET_DAY"
  const SET_APPPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW"


  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

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


  const setDay = day => setState({ ...state, day })


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments })
      })

  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    delete appointments.id

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}