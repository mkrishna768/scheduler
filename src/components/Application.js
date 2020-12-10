import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import Axios from "axios";
import "helpers/selectors";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  let dailyAppointments = [];
  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
    Axios.get("/api/days"),
    Axios.get("/api/appointments"),
    Axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    })
  }, []);
  dailyAppointments = getAppointmentsForDay(state, state.day);

  
    

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
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);

          return <Appointment key={appointment.id} {...appointment} interview={interview} />
        })}
      </section>
    </main>
  );
}
