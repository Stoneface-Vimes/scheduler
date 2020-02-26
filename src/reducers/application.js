const SET_DAY = "SET_DAY"
const SET_APPPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW"
const REMOVE_SPOT = "REMOVE_SPOT"
const ADD_SPOT = "ADD_SPOT"

export default function reducer(state, action) {


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
      return {
        ...state,
        //Creates a copy of the value to replace and sets it to our local state
        days: state.days.map((day, i) => i === action.day ? { ...day, spots: day.spots - 1 } : day)
      }
    case ADD_SPOT:
      return {
        ...state,
        //Creates a copy of the value to replace and sets it to our local state

        days: state.days.map((day, i) => i === action.day ? { ...day, spots: day.spots + 1 } : day)
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

export {
  SET_DAY,
  SET_APPPLICATION_DATA,
  SET_INTERVIEW,
  ADD_SPOT,
  REMOVE_SPOT
}