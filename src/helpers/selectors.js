

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

export function getInterviewersForDay(state, day){
  const interviewerArr = [];
  const dayArr = state.days.filter((element) => element.name === day)
  
  if (dayArr.length > 0) {
    console.log("dayArr :", dayArr)

    dayArr[0].interviewers.forEach((x) => {

      if (state.interviewers[x]) {
        interviewerArr.push(state.interviewers[x])
      }

    });

    return interviewerArr

  } else {
    return []
  }


}
// export default {getAppointmentsForDay, getInterview}