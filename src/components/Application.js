import React, { useState, useEffect } from "react";
import DayList from "components/DayList.js"
import "components/Appointment"
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios"


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Student Name",
      interviewer: {
        id: 2,
        name: "Interviewer Name",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Student Name 2",
      interviewer: {
        id: 3,
        name: "Interviewer Name 2",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Student Name 3",
      interviewer: {
        id: 4,
        name: "Interviewer Name 3",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];


export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
      .then((response) =>  {
        console.log(response.data)
        setDays(() => response.data)
      })
  }, [])

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
            days={days}
            day={day}
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
        {appointments.map((element, i) => {

          if (i === appointments.length - 1) {
            return (
              <Appointment
                key="last"
                time="5pm"
                interview={props.interview ? props.interview : null}
              />
            )
          } else {

            return (
              <Appointment
                key={i}
                {...element}
              />
            )
          }
        })}
      </section>
    </main>
  );
}

