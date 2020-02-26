

export function getAppointmentsForDay(state, day) {
  const appointmentArr = [];
  const dayArr = state.days.filter((element) => element.name === day)

  //If a day in the passed state.day is the same as the passed day, dayArr.length > 0
  if (dayArr.length > 0) {
    dayArr[0].appointments.forEach((x) => {
      if (state.appointments[x]) {
        appointmentArr.push(state.appointments[x])
      }
    });
  }
  return appointmentArr
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  } else {
    return {
      interviewer: state.interviewers[interview.interviewer],
      student: interview.student
    }
  }
}

export function getInterviewersForDay(state, day) {
  const interviewerArr = [];
  const dayArr = state.days.filter((element) => element.name === day)

  //If a day in the passed state.day is the same as the passed day, dayArr.length > 0
  if (dayArr.length > 0) {
    dayArr[0].interviewers.forEach((x) => {
      if (state.interviewers[x]) {
        interviewerArr.push(state.interviewers[x])
      }
    });
  }
  return interviewerArr
}
