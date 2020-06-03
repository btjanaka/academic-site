import "./NQueens.scss";
import "react-rangeslider/lib/index.css";

import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NQueensEngine from "./n-queens-engine";
import Slider from "react-rangeslider";
import { faChessQueen } from "@fortawesome/free-solid-svg-icons";

const CELL_SIZE = 40;
const DEFAULT_QUEENS = 4;
const MIN_QUEENS = 1;
const MAX_QUEENS = 15;
const QUEEN_LABELS = { 1: "1", 8: "8", 15: "15" };

// Milliseconds between updates when running the engine.
// TODO: make this adjustable
const DEFAULT_DELAY = 250;

function Queen(props) {
  return (
    <FontAwesomeIcon
      icon={faChessQueen}
      className={`queen ${props.type}`}
      style={{ fontSize: 0.7 * CELL_SIZE }}
    />
  );
}

class NQueens extends Component {
  constructor(props) {
    super(props);
    this.engine = new NQueensEngine();
    this.state = {
      n: DEFAULT_QUEENS,
      queens: undefined,
      curQueen: undefined,
      conflicts: undefined,
      foundSolution: undefined,
      done: false,
      runTimerId: undefined, // A timer for running the simulation.
      delay: DEFAULT_DELAY,
    };
  }

  //
  // Lifecycle
  //

  componentDidMount() {
    this.setState(this.engine.reset(this.state.n));
  }

  componentWillUnmount() {}

  //
  // Engine
  //

  engineStop() {
    clearInterval(this.state.runTimerId);
  }

  engineReset(n) {
    this.setState(state => {
      this.engineStop();
      const info = this.engine.reset(n);
      return { ...info, n: n };
    });
  }

  engineStep() {
    this.setState(this.engine.step());
  }

  // TODO: display message if no solution found -- make this part of the
  // state or something
  engineFindSolution() {
    this.setState(state => {
      // This timer runs the engine until it finds a solution or
      // completes.
      const runTimerId = setInterval(() => {
        const info = this.engine.step();
        this.setState(info);
        if (info.foundSolution || info.done) clearInterval(runTimerId);
      }, state.delay);
      return { runTimerId: runTimerId };
    });
  }

  // TODO: stop button
  render() {
    const board = [];
    for (let r = 0; r < this.state.n; ++r) {
      for (let c = 0; c < this.state.n; ++c) {
        // Display a queen if its column comes before the current queen column,
        // and if its row matches.
        let queen = null;
        if (c <= this.state.curQueen && r == this.state.queens[c]) {
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

    // TODO: refactor the buttons into a list
    return (
      <div id="NQueens">
        <div className="main">
          <div className="control">
            <p className="slider-name">Number of Queens</p>
            <Slider
              min={MIN_QUEENS}
              max={MAX_QUEENS}
              value={this.state.n}
              labels={QUEEN_LABELS}
              onChange={n => {
                this.engineReset(n);
              }}
            />
            <p className="slider-name">Speed</p>
            <Slider
              min={-1000}
              max={-10}
              value={-this.state.delay}
              labels={{ "-1000": "Slow", "-10": "Fast" }}
              tooltip={false}
              onChange={delay => {
                this.setState({ delay: -delay });
              }}
            />
            <div className="buttons">
              <button
                className="command reset"
                onClick={() => {
                  this.engineReset();
                }}
              >
                Reset
              </button>
              <button
                className="command step"
                onClick={() => {
                  this.engineStep();
                }}
              >
                Step
              </button>
              <button
                className="command run"
                onClick={() => {
                  this.engineFindSolution();
                }}
              >
                Run Until Solution
              </button>
              <button
                className="command stop"
                onClick={() => {
                  this.engineStop();
                }}
              >
                Stop
              </button>
            </div>
          </div>

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
      </div>
    );
  }
}

export default NQueens;
