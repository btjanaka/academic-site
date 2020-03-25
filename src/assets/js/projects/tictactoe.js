// Implementation of a tictactoe game

"use strict";

const tictactoe = (function() {
  //
  // Constants
  //

  const NUM_CELLS = 9;
  const CELL_EMPTY = "";
  const CELL_X = "x";
  const CELL_O = "o";
  const WINNER_NONE = "none";
  const WINNER_TIE = "tie";
  const NEXT_TURN = {};
  NEXT_TURN[CELL_X] = CELL_O;
  NEXT_TURN[CELL_O] = CELL_X;

  // Combos of cells that have to be the same to result in a win
  const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  //
  // Utility
  //

  // Returns a string saying it is the given player's turn
  function moveString(player) {
    return `${player}'s turn`;
  }

  // Checks for a winner in the given array of cells, where each cell is an HTML
  // button. Returns the player that won if there was any, and CELL_EMPTY
  // otherwise.
  function checkWinner(cells) {
    for (const combo of WIN_COMBOS) {
      if (
        cells[combo[2]].innerHTML == cells[combo[0]].innerHTML &&
        cells[combo[1]].innerHTML == cells[combo[0]].innerHTML &&
        cells[combo[0]].innerHTML != CELL_EMPTY
      ) {
        return cells[combo[0]].innerHTML;
      }
    }
    return CELL_EMPTY;
  }

  // Returns a bool telling whether the given cells indicate a game that is
  // a tie
  function checkTie(cells) {
    return (
      checkWinner(cells) == CELL_EMPTY &&
      cells.every(c => c.innerHTML != CELL_EMPTY)
    );
  }

  // Finds all the tictactoe cells
  function findCells() {
    const cells = [];
    for (let i = 0; i < NUM_CELLS; ++i) {
      cells.push(document.getElementById(`tictactoe-cell${i}`));
    }
    return cells;
  }

  //
  // Event handling
  //

  // Returns a function which can reset the game to a new state
  function newGame(game) {
    return function() {
      game["turn"] = CELL_X;
      game["winner"] = WINNER_NONE;
      for (const cell of game["cells"]) {
        cell.innerHTML = CELL_EMPTY;
      }
      game["infobox"].innerHTML = moveString(game["turn"]);
    };
  }

  // Returns a function which can handle a click for the given game and cell
  function handleClick(game, cell) {
    return function() {
      if (cell.innerHTML != CELL_EMPTY) return;
      if (game["winner"] != WINNER_NONE) return;

      cell.innerHTML = game["turn"];
      game["turn"] = NEXT_TURN[game["turn"]];
      game["infobox"].innerHTML = moveString(game["turn"]);

      const winner = checkWinner(game["cells"]);
      if (winner != CELL_EMPTY) {
        game["winner"] = winner;
        game["infobox"].innerHTML = winner + " wins!";
        return;
      }

      if (checkTie(game["cells"])) {
        game["winner"] = WINNER_TIE;
        game["infobox"].innerHTML = "cat scratch!";
        return;
      }
    };
  }

  return {
    // Builds the entire game, with event listeners for appropriate buttons.
    // The page should have the following items:
    // - #tictactoe - a div with all the game elements
    // - #tictactoe-cell[0-8] - 9 buttons for the game cells, arranged as:
    //     0 1 2
    //     3 4 5
    //     6 7 8
    // - #tictactoe-info - a box for the game to write information
    // - #tictactoe-reset - a reset button for the game
    buildGame: function() {
      const game = {
        div: document.getElementById("tictactoe"),
        cells: findCells(),
        infobox: document.getElementById("tictactoe-info"),
        reset: document.getElementById("tictactoe-reset"),
        turn: "",
        winner: ""
      };
      game["reset"].onclick = newGame(game);
      for (let i = 0; i < game["cells"].length; ++i) {
        game["cells"][i].onclick = handleClick(game, game["cells"][i]);
      }
      newGame(game)();
    }
  };
})();
