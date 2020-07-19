import "./Resistance.scss";

import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";

import React from "react";
import timelineData from "./timeline-data";

const colors = {
  primary: "#e62020",
};

function RoboticsTimeline() {
  return (
    <div id="roboticstimeline" className="section">
      <Timeline animate={true} lineColor={colors.primary}>
        {timelineData.map((event, id) => (
          <TimelineItem
            key={id}
            dateText={event.date}
            dateStyle={{
              backgroundColor: colors.primary,
            }}
            dateInnerStyle={{
              color: "white",
              backgroundColor: colors.primary,
              textTransform: "uppercase",
            }}
            bodyContainerStyle={{
              backgroundColor: "white",
              padding: "0px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.23)",
            }}
          >
            <h3 className="eventHeader">{event.title}</h3>
            <div className="eventDesc">{event.description}</div>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}

function Resistance() {
  return (
    <div id="Resistance">
      <RoboticsTimeline />
    </div>
  );
}

export default Resistance;
