import "./NQueens.scss";
import "react-rangeslider/lib/index.css";

import React, { Component } from "react";
import {
  faChessQueen,
  faForward,
  faPlay,
  faRedo,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NQueensEngine from "./n-queens-engine";
import ReactTooltip from "react-tooltip";
import Slider from "react-rangeslider";

const CELL_SIZE = 34;

// Number of queens settings
const DEFAULT_QUEENS = 4;
const MIN_QUEENS = 1;
const MAX_QUEENS = 15;
const QUEEN_LABELS = { 1: "1", 8: "8", 15: "15" };

// Settings for the delay between each simulation step.
const DEFAULT_DELAY = -300;
const MIN_DELAY = -600;
const MAX_DELAY = 0; // The delay is still 12.5ms at 0 (see calcDelay)
const DELAY_LABELS = { [MIN_DELAY]: "Slow", [MAX_DELAY]: "Fast" };

// Calculates the delay with an exponential function. Lower values (more
// negative) correspond to longer delays.
function calcDelay(delaySetting) {
  return 12.5 * Math.exp(-delaySetting / 100);
}

class NQueens extends Component {
  constructor(props) {
    super(props);
    this.engine = new NQueensEngine();
    this.state = {
      // Queen settings.
      n: DEFAULT_QUEENS,
      queens: undefined,
      curQueen: undefined,
      conflicts: undefined,
      foundSolution: undefined,
      done: false,

      // Timer settings.
      runTimerId: undefined, // A timer for running the simulation.
      delay: calcDelay(DEFAULT_DELAY),
      delaySetting: DEFAULT_DELAY,
    };
  }

  //
  // Engine
  //

  engineStop() {
    clearInterval(this.state.runTimerId);
  }

  // Resets the engine with the given size. If n is not given, the current n
  // will be used.
  engineReset(n) {
    this.setState(state => {
      if (n === undefined) n = state.n;
      this.engineStop();
      const info = this.engine.reset(n);
      return { ...info, n: n };
    });
  }

  engineStep() {
    this.setState(this.engine.step());
  }

  engineFindSolution() {
    this.engineStop(); // Avoid setting multiple timers at once.
    this.setState(state => {
      // This timer runs the engine until it finds a solution or completes.
      const runTimerId = setInterval(() => {
        const info = this.engine.step();
        this.setState(info);
        if (info.foundSolution || info.done) clearInterval(runTimerId);
      }, state.delay);
      return { runTimerId: runTimerId };
    });
  }

  engineRunUntilDone() {
    this.engineStop(); // Avoid setting multiple timers at once.
    this.setState(state => {
      // This timer runs the engine until it completes.
      const runTimerId = setInterval(() => {
        const info = this.engine.step();
        this.setState(info);
        if (info.done) clearInterval(runTimerId);
      }, state.delay);
      return { runTimerId: runTimerId };
    });
  }

  //
  // Lifecycle
  //

  componentDidMount() {
    this.engineReset();
  }

  componentWillUnmount() {
    this.engineStop();
  }

  //
  // Rendering
  //

  // Various controls for the simulation.
  renderControls() {
    const commandButtons = [
      {
        class: "reset",
        dataTip: "Reset",
        onClick: () => {
          this.engineReset();
        },
        content: <FontAwesomeIcon icon={faRedo} />,
      },
      {
        class: "step",
        dataTip: "Step",
        onClick: () => {
          this.engineStep();
        },
        content: "+1",
      },
      {
        class: "run",
        dataTip: "Run until a solution is found",
        onClick: () => {
          this.engineFindSolution();
        },
        content: <FontAwesomeIcon icon={faPlay} />,
      },
      {
        class: "fast",
        dataTip: "Run indefinitely",
        onClick: () => {
          this.engineRunUntilDone();
        },
        content: <FontAwesomeIcon icon={faForward} />,
      },
      {
        class: "stop",
        dataTip: "Stop",
        onClick: () => {
          this.engineStop();
        },
        content: <FontAwesomeIcon icon={faStop} />,
      },
    ];

    return (
      <div className="control">
        <ReactTooltip />
        <p className="control-name">Number of Queens: {this.state.n}</p>
        <Slider
          min={MIN_QUEENS}
          max={MAX_QUEENS}
          value={this.state.n}
          labels={QUEEN_LABELS}
          onChange={n => {
            this.engineReset(n);
          }}
        />
        <p className="control-name">Speed</p>
        <Slider
          min={MIN_DELAY}
          max={MAX_DELAY}
          value={this.state.delaySetting}
          labels={DELAY_LABELS}
          tooltip={false}
          onChange={delaySetting => {
            this.setState({
              delaySetting: delaySetting,
              delay: calcDelay(delaySetting),
            });
          }}
        />
        <p className="control-name">Controls</p>
        <div className="buttons">
          {commandButtons.map(info => (
            <button
              key={info.class}
              className={`command ${info.class}`}
              data-tip={info.dataTip}
              onClick={info.onClick}
            >
              {info.content}
            </button>
          ))}
        </div>
        {this.state.done ? <p className="done">No more solutions.</p> : null}
      </div>
    );
  }

  // Renders the board and all the queens on it. Returns a list of board cells.
  // TODO: show algorithm internals
  renderBoard() {
    function Queen(props) {
      return (
        <FontAwesomeIcon
          icon={faChessQueen}
          className={`queen ${props.type}`}
          style={{ fontSize: 0.7 * CELL_SIZE }}
        />
      );
    }

    const board = [];
    for (let r = 0; r < this.state.n; ++r) {
      for (let c = 0; c < this.state.n; ++c) {
        // Display a queen if its column comes before the current queen column,
        // and if its row matches.
        let queen = null;
        if (c <= this.state.curQueen && r == this.state.queens[c]) {
          // Different queen colors based on their state.
          let type = "";
          if (this.state.foundSolution) {
            type = "solved-queen";
          } else if (c == this.state.curQueen) {
            type = "cur-queen";
          } else if (this.state.conflicts[c]) {
            type = "conflict-queen";
          }
          queen = <Queen type={type} />;
        }

        // Add the cell and its associated queen.
        board.push(
          <div
            className={`cell ${(r + c) % 2 == 0 ? "light" : "dark"}`}
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
            key={`${r},${c}`}
          >
            {queen}
          </div>
        );
      }
    }

    return (
      <div className="board-holder">
        <div
          className="board"
          style={{
            width: this.state.n * CELL_SIZE,
            height: this.state.n * CELL_SIZE,
          }}
        >
          {board}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="NQueens">
        <div className="main">
          {this.renderControls()}
          {this.renderBoard()}
        </div>
      </div>
    );
  }
}

export default NQueens;
