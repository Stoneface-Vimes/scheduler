import { useEffect, useReducer } from "react";
import axios from "axios"
import reducer, {
  SET_DAY,
  SET_APPPLICATION_DATA,
  SET_INTERVIEW,
  ADD_SPOT,
  REMOVE_SPOT
} from "../reducers/application.js"

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  //Handles fetching the api data from the server
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

  //If modify spots is truthy the displayed number of spots will be updated
  function bookInterview(id, interview, modifySpots) {
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
        if (modifySpots) {
          //Since each appointment id is unique and only show up in a specific day, this logic finds the array position of said day
          //in state.days of the passed appointment id
          const day = Math.floor((id - 1) / 5)
          dispatch({ type: REMOVE_SPOT, day: day })
        }
      })
  }

  function cancelInterview(id) {
    const day = Math.floor((id - 1) / 5)

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