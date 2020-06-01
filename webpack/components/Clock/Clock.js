import "./Clock.scss";

import React, { Component } from "react";

// Extracts relevant components of the date as strings.
function dateToComponents(date) {
  let hour = date.getHours();
  let ampm = "AM";
  if (hour >= 12) {
    hour -= 12;
    ampm = "PM";
  }
  if (hour == 0) hour = 12;
  hour = hour.toString();

  let minute = date.getMinutes().toString();
  if (minute.length === 1) minute = "0" + minute;

  let seconds = date.getSeconds().toString();
  if (seconds.length === 1) seconds = "0" + seconds;

  return { hour: hour, minute: minute, seconds: seconds, ampm: ampm };
}

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: dateToComponents(new Date()) };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({ date: dateToComponents(new Date()) });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div id="Clock">
        <p className="time">{`${this.state.date.hour}:${this.state.date.minute}:${this.state.date.seconds}${this.state.date.ampm}`}</p>
      </div>
    );
  }
}

export default Clock;
