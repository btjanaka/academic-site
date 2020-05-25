// Make sure to import Bootstrap in `index.js` in order for this to work
// ( import 'bootstrap/dist/css/bootstrap.min.css'; )
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import React from "react";
import imgFounding from "./img/founding.jpg";
import imgGoogleSkills from "./img/google-skills.png";
import imgRascal from "./img/rascal.jpg";
import imgRevolt from "./img/revolt.jpg";
import imgSantaClaraStarstruck from "./img/santa-clara-starstruck.jpg";
import imgStateChampion from "./img/state-champion.jpg";
import imgUsfChampion from "./img/usf-champion.jpg";
import imgWorldChampion from "./img/world-champion.jpg";
import imgWorlds2018 from "./img/worlds-2018.jpg";

function TimelineCol(props) {
  return (
    <Col sm className="timelineCol">
      {props.children}
    </Col>
  );
}

TimelineCol.propTypes = {
  children: PropTypes.element,
};

function TimelineDesc(props) {
  return (
    <TimelineCol>
      <p className="timelineDesc">{props.children}</p>
    </TimelineCol>
  );
}

TimelineDesc.propTypes = {
  children: PropTypes.element,
};

function TimelineImg(props) {
  return (
    <TimelineCol>
      <img className="timelineDesc" src={props.src} alt={props.alt} />
    </TimelineCol>
  );
}

TimelineImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

const timelineData = [
  {
    date: "Apr 24, 2016",
    title: "The Resistance is founded",
    description: (
      <Row>
        <TimelineDesc>
          Bryon and Dylon start The Resistance in their garage in Santa Clara,
          California. For its first season, the team plays the game VEX
          Starstruck.
        </TimelineDesc>

        <TimelineImg src={imgFounding} alt="first team pic" />
      </Row>
    ),
  },
  {
    date: "Aug 7, 2016",
    title: "First Tournament and Victory",
    description: (
      <Row>
        <TimelineDesc>
          At its first tournament,{" "}
          <a href="https://www.robotevents.com/robot-competitions/vex-robotics-competition/RE-VRC-16-5345.html">
            Santa Clara Fair Starstruck
          </a>
          , The Resistance takes home the Tournament Champion and Robot Skills
          Champion titles.
        </TimelineDesc>

        <TimelineImg src={imgSantaClaraStarstruck} alt="first team pic" />
      </Row>
    ),
  },
  {
    date: "Sep 2016 - Mar 2017",
    title: "The Resistance Plays Starstruck",
    description: (
      <Row>
        <TimelineDesc>
          With its robot <i>Rebel</i>, The Resistance competes in 12 VEX
          Starstruck tournaments and the 2017 California State Championship,
          receiving 32 more awards.
        </TimelineDesc>

        <TimelineImg
          className="timelineDesc"
          src={imgGoogleSkills}
          alt="programming skills at a Google tournament"
        />
      </Row>
    ),
  },
  {
    date: "Apr 8, 2017",
    title: "2017 Reveal Video",
    description: (
      <Row>
        <TimelineCol>
          <iframe
            title="2017 Reveal Video"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/WykDRSjNVOs"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </TimelineCol>
      </Row>
    ),
  },
  {
    date: "Apr 22, 2017",
    title: "World Champions!",
    description: (
      <Container style={{ margin: "0px", padding: "0px" }}>
        <Row>
          <TimelineDesc>
            After three days of intense competition, The Resistance allies with
            teams 7258A and 8192D to win the{" "}
            <a href="https://www.robotevents.com/robot-competitions/vex-robotics-competition/RE-VRC-17-4887.html">
              2017 World Championship
            </a>{" "}
            in Louisville, Kentucky!
          </TimelineDesc>

          <TimelineImg
            src={imgWorldChampion}
            alt="shortly after receiving the world champion trophy"
          />
        </Row>

        <Row>
          <Col lg style={{ marginTop: "10px" }}>
            <p className="timelineDesc">
              Media:{" "}
              <a href="https://www.svvoice.com/tjanaka-brothers-win-high-school-division-2017-vex-robotics-world-championship/">
                Silicon Valley Voice
              </a>
              {" | "}
              <a href="https://www.prnewswire.com/news-releases/vex-robotics-world-championship-crowns-2017-winners-300446176.html">
                PR Newswire
              </a>
              {" | "}
              <a href="https://youtu.be/9shA1fdX18w">CBS Sports</a>
            </p>
          </Col>
        </Row>
      </Container>
    ),
  },
  {
    date: "Jul 13, 2017",
    title: "2016-2017 Season Recap",
    description: (
      <Row>
        <TimelineCol>
          <iframe
            title="2016-2017 Season Recap"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/hUtrqf6Oids"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </TimelineCol>
      </Row>
    ),
  },
  {
    date: "Sep 2017 - Feb 2018",
    title: "The Resistance Plays In the Zone",
    description: (
      <Row>
        <TimelineDesc>
          The Resistance competes in 12 VEX In the Zone tournaments with its
          robot <i>Revolt</i>, winning 28 awards.
        </TimelineDesc>

        <TimelineImg src={imgRevolt} alt="revolt" />
      </Row>
    ),
  },
  {
    date: "Mar 10, 2018",
    title: "State Champions!",
    description: (
      <Row>
        <TimelineDesc>
          The Resistance wins the{" "}
          <a href="https://www.robotevents.com/robot-competitions/vex-robotics-competition/RE-VRC-17-4583.html">
            2018 California State Championship
          </a>{" "}
          with teams 920C and 21246X!
        </TimelineDesc>

        <TimelineImg
          src={imgStateChampion}
          alt="after winning the state championship"
        />
      </Row>
    ),
  },
  {
    date: "Apr 28, 2018",
    title: "Arts Division Semifinalist",
    description: (
      <Row>
        <TimelineDesc>
          The Resistance finishes as a semifinalist in the Arts division at the{" "}
          <a href="https://www.robotevents.com/robot-competitions/vex-robotics-competition/RE-VRC-17-3805.html">
            2018 World Championship
          </a>
          .
          <br />
          <br />
          <i>
            Right: posing with team &quot;Hope of Syria&quot; after winning a
            qualification match.
          </i>
        </TimelineDesc>

        <TimelineImg
          src={imgWorlds2018}
          alt="After a match with Hope of Syria"
        />
      </Row>
    ),
  },
  {
    date: "Sep 7, 2018",
    title: "2017-2018 Season Recap",
    description: (
      <Row>
        <TimelineDesc>
          <iframe
            title="2017-2018 Season Recap"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/eGpasQFLgAY"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </TimelineDesc>
      </Row>
    ),
  },
  {
    date: "Sep 2018 - Feb 2019",
    title: "The Resistance Plays Turning Point",
    description: (
      <Row>
        <TimelineDesc>
          The Resistance competes in 10 VEX Turning Point tournaments with its
          robot <i>Rascal</i>, winning 27 awards.
        </TimelineDesc>

        <TimelineImg src={imgRascal} alt="rascal" />
      </Row>
    ),
  },
  {
    date: "Feb 4, 2019",
    title: "Signature Event Champion",
    description: (
      <Row>
        <TimelineDesc>
          The Resistance allies with team &quot;Z-Squared&quot; to win the{" "}
          <a href="https://www.robotevents.com/robot-competitions/vex-robotics-competition/RE-VRC-18-7272.html">
            University of South Florida Signature Event
          </a>
          . The victory qualifies them for the 2019 World Championship.
        </TimelineDesc>

        <TimelineImg
          src={imgUsfChampion}
          alt="shortly after winning the event"
        />
      </Row>
    ),
  },
  {
    date: "Apr 24, 2019",
    title: "2019 Early Season Reveal",
    description: (
      <Row>
        <TimelineCol>
          <iframe
            title="2019 Early Season Reveal"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/MwTPCQwXQTk"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </TimelineCol>
      </Row>
    ),
  },
  {
    date: "Apr 24-27, 2019",
    title: "2019 World Championship",
    description: (
      <Row>
        <TimelineDesc>
          The Resistance competes in the{" "}
          <a href="https://www.robotevents.com/robot-competitions/vex-robotics-competition/RE-VRC-18-6082.html">
            2019 World Championship
          </a>
          .
        </TimelineDesc>
      </Row>
    ),
  },
  {
    date: "May 2019",
    title: "Retirement",
    description: (
      <Row>
        <TimelineDesc>
          After 3 seasons competing in the VEX Robotics Competition, The
          Resistance retires when Dylon graduates from high school.
        </TimelineDesc>
      </Row>
    ),
  },
];

export default timelineData;
