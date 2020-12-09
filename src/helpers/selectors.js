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
