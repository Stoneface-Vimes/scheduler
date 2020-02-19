

export function getAppointmentsForDay(state, day) {
  const appointmentArr = [];
  const dayArr = state.days.filter((element) => element.name === day)

  if (dayArr.length > 0) {

    dayArr[0].appointments.forEach((x) => {

      if (state.appointments[x]) {
        appointmentArr.push(state.appointments[x])
      }

    });

    return appointmentArr

  } else {
    return []
  }

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

// export default {getAppointmentsForDay, getInterview}