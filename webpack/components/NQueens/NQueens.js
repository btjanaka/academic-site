import "./NQueens.scss";
import "react-rangeslider/lib/index.css";

import React, { Component } from "react";
import {
  faChessQueen,
  faExternalLinkAlt,
  faForward,
  faPlay,
  faRedo,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NQueensEngine from "./n-queens-engine";
import ReactTooltip from "react-tooltip";
import Slider from "react-rangeslider";

const CELL_SIZE = 33;

// Number of queens settings
const DEFAULT_QUEENS = 8;
const MIN_QUEENS = 1;
const MAX_QUEENS = 15;
const QUEEN_LABELS = { 1: "1", 8: "8", 15: "15" };

// Settings for the delay between each simulation step.
const DEFAULT_DELAY = -350; // ~330 ms
const MIN_DELAY = -700; // ~11 seconds
const MAX_DELAY = 0; // 10 ms -- hardly any difference with 1 ms b/c of rendering
const DELAY_LABELS = { [MIN_DELAY]: "Slow", [MAX_DELAY]: "Fast" };

// Calculates the delay with an exponential function. Lower values (more
// negative) correspond to longer delays.
function calcDelay(delaySetting) {
  return 10 * Math.exp(-delaySetting / 100);
}

class NQueens extends Component {
  constructor(props) {
    super(props);
    this.engine = new NQueensEngine();
    this.state = {
      // Queen settings.
      n: DEFAULT_QUEENS,
      // Fields: queens, curQueen, foundSolution, conflicts, done
      ...this.engine.reset(DEFAULT_QUEENS),

      // Info.
      message: "Welcome to n-queens!",
      total_steps: 0,

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
    if (this.state.runTimerId) {
      clearTimeout(this.state.runTimerId);
      this.setState({ runTimerId: null });
    }
  }

  // Resets the engine with the given size. If n is not given, the current n
  // will be used.
  engineReset(n) {
    this.setState(state => {
      if (n === undefined) n = state.n;
      this.engineStop();
      const info = this.engine.reset(n);
      return {
        ...info,
        n: n,
        total_steps: 0,
        message: `Board reset to size ${n}`,
      };
    });
  }

  engineStep() {
    const info = this.engine.step();
    this.setState(state => ({ ...info, total_steps: state.total_steps + 1 }));
    return info;
  }

  // Sets a timer that runs the engine until it is done. If `checkSolution` is
  // true, it will also stop when a solution is found.
  engineRun(checkSolution) {
    this.engineStop(); // Avoid setting multiple timers at once.

    if (this.state.done) return;

    this.setState({
      message: checkSolution
        ? "Running until solution..."
        : "Running until done...",
    });

    // After running one step, this callback sets a timeout to run itself again
    // if it is not done. Using a timeout (instead of interval) allows the speed
    // to change while the simulation is running.
    const step = () => {
      const info = this.engineStep();

      // Check for completion -- done completely or found a solution.
      if (info.done) {
        this.setState({
          message: "No more solutions. Please reset to continue.",
        });
        return;
      } else if (checkSolution && info.foundSolution) {
        this.setState({ message: "Solution found." });
        return;
      }

      this.setState(state => {
        return { runTimerId: setTimeout(step, state.delay) };
      });
    };

    // The timeout here is set to 0 so that we run one step without delay, so
    // the user knows it is working.
    this.setState({ runTimerId: setTimeout(step, 0) });
  }

  //
  // Lifecycle
  //

  componentWillUnmount() {
    this.engineStop();
  }

  //
  // Button handlers
  //

  handleReset = () => {
    this.engineReset();
  };

  handleSingleStep = () => {
    if (this.state.done) return;
    this.engineStep();
    this.setState({ message: "Single step." });
  };

  handleFindSolution = () => {
    this.engineRun(true);
  };

  handleRunUntilDone = () => {
    this.engineRun(false);
  };

  handleStop = () => {
    if (this.state.done || !this.state.runTimerId) return;
    this.engineStop();
    this.setState({ message: "Stopped." });
  };

  //
  // Rendering
  //

  // Various controls for the simulation.
  renderControls() {
    const commandButtons = [
      {
        class: "reset",
        dataTip: "Reset",
        onClick: this.handleReset,
        content: <FontAwesomeIcon icon={faRedo} />,
      },
      {
        class: "step",
        dataTip: "Step",
        onClick: this.handleSingleStep,
        content: "+1",
      },
      {
        class: "run",
        dataTip: "Run until a solution is found",
        onClick: this.handleFindSolution,
        content: <FontAwesomeIcon icon={faPlay} />,
      },
      {
        class: "fast",
        dataTip: "Run indefinitely",
        onClick: this.handleRunUntilDone,
        content: <FontAwesomeIcon icon={faForward} />,
      },
      {
        class: "stop",
        dataTip: "Stop",
        onClick: this.handleStop,
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
        <p className="message">{this.state.message}</p>
        <p className="steps">{`Steps: ${this.state.total_steps}`}</p>
      </div>
    );
  }

  // Renders the board and all the queens on it.
  renderBoard() {
    const board = [];
    for (let r = -1; r < this.state.n; ++r) {
      for (let c = -1; c < this.state.n; ++c) {
        // Default cell is empty and only has types for light and dark squares.
        let cellContent = null;
        let cellTypes = [(r + c) % 2 == 0 ? "light" : "dark"];

        // Content is either a number, a queen, or nothing.
        if (c == -1) {
          // Display a row number along the left side of the board.
          cellTypes = ["number"];
          if (r > -1) cellContent = r;
        } else if (r == -1) {
          // Show the internal workings of the algorithm along the top row --
          // this consists of the row number of the queen in each column.
          cellTypes = [
            "internal " + (c % 2 == 0 ? "internal-dark" : "internal-light"),
          ];
          if (c <= this.state.curQueen) {
            cellContent = this.state.queens[c];
            if (this.state.foundSolution) {
              cellTypes.push("solved");
            } else if (c == this.state.curQueen) {
              cellTypes.push("current");
            } else if (this.state.conflicts[c]) {
              cellTypes.push("conflict");
            }
          } else {
            cellContent = "-";
          }
        } else if (c <= this.state.curQueen && r == this.state.queens[c]) {
          // Display a queen if its column comes before the current queen column,
          // and if its row matches.
          cellContent = (
            <FontAwesomeIcon
              icon={faChessQueen}
              style={{ fontSize: 0.7 * CELL_SIZE }}
            />
          );
          cellTypes.push("queen"); // Unlike other cases, we keep the cell color.
          if (this.state.foundSolution) {
            cellTypes.push("solved");
          } else if (c == this.state.curQueen) {
            cellTypes.push("current");
          } else if (this.state.conflicts[c]) {
            cellTypes.push("conflict");
          }
        }

        // Add the cell and its associated content.
        board.push(
          <div
            className={`cell ${cellTypes.join(" ")}`}
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
            key={`${r},${c}`}
          >
            {cellContent}
          </div>
        );
      }
    }

    return (
      <div className="board-holder">
        <div
          className="board"
          style={{
            width: (this.state.n + 1) * CELL_SIZE,
            height: (this.state.n + 1) * CELL_SIZE,
          }}
        >
          {board}
        </div>
      </div>
    );
  }

  // A panel with various commands and info.
  renderPanel() {
    return (
      <div className="panel">
        Built with <a href="https://reactjs.org">React.js</a>. |{" "}
        <a href="https://github.com/btjanaka/academic-site/tree/master/webpack/components/NQueens">
          Source Code <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      </div>
    );
  }

  render() {
    return (
      <div id="NQueens">
        <div className="main">
          {this.renderControls()}
          {this.renderBoard()}
          {this.renderPanel()}
        </div>
      </div>
    );
  }
}

export default NQueens;
