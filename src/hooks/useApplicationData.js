import { useEffect, useReducer } from "react";
import axios from "axios"

const SET_DAY = "SET_DAY"
const SET_APPPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW"
const REMOVE_SPOT = "REMOVE_SPOT"
const ADD_SPOT = "ADD_SPOT"

function reducer(state, action) {
  const newDays = state.days
  switch (action.type) {
    case SET_DAY:
      return {
        ...state, day: action.value
      }
    case SET_APPPLICATION_DATA:
      return {
        ...state, days: action.value[0].data, appointments: action.value[1].data, interviewers: action.value[2].data
      }
    case SET_INTERVIEW:
      return {
        ...state, appointments: action.value
      }
    case REMOVE_SPOT:
      newDays[action.day].spots--
      return {
        ...state,
        days: newDays
      }
    case ADD_SPOT:
      newDays[action.day].spots++
      return {
        ...state,
        days: newDays
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

export default function useApplicationData(props) {

  const [state, dispatch] = useReducer(reducer, {
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
      Promise.resolve(
        dispatch({ type: SET_APPPLICATION_DATA, value: all })
      ).then(() => {
      })
    });
  }, [])

  const setDay = day => dispatch({ type: SET_DAY, value: day })

  function bookInterview(id, interview, day) {
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
        dispatch({ type: SET_INTERVIEW, value: appointments })
        dispatch({ type: REMOVE_SPOT, day: day })
      })


  }

  function cancelInterview(id, interview, day) {

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
        Promise.resolve(
          dispatch({ type: SET_INTERVIEW, value: appointments }),
          dispatch({ type: ADD_SPOT, day: day })
        )
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}