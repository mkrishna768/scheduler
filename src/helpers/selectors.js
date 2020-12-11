export function getAppointmentsForDay(state, day) {
  if (!state.days) return [];
  const target = state.days.find(element => element.name === day);
  if (!target) return [];
  const dayAppointments = [];
  target.appointments.forEach((appointment) => {
    dayAppointments.push(state.appointments[appointment]);
  });
  return dayAppointments;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer]
  return {student, interviewer};
}

export function getInterviewersForDay(state, day) {
  if (!state.days) return [];
  const target = state.days.find(element => element.name === day);
  if (!target) return [];
  const dayInterviewers = [];
  target.interviewers.forEach((interviewer) => {
    dayInterviewers.push(state.interviewers[interviewer]);
  });
  return dayInterviewers;
}