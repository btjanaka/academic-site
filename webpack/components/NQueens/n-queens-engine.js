// An "engine" that keeps track of an internal state. After construction or
// calling reset(), step() function is repeatedly called to advance the state
// and find all solutions. Meanwhile, done() is used to check if the engine is
// done.
export default class NQueensEngine {
  // Creates all the members and resets the engine.
  constructor() {
    this.n = undefined;
    this.queens = undefined;
    this.curQueen = undefined;
    this.hasConflict = undefined;
    this.conflicts = undefined;
    this.justBacktracked = undefined;
  }

  // Resets the board with n new queens and returns the starting queens and
  // curQueen. See `step()` for details of the return value.
  reset = n => {
    this.n = n;
    this.curQueen = 0;
    this.queens = [];
    for (let i = 0; i < n; ++i) this.queens.push(0);
    this.hasConflict = false;
    this.conflicts = [];
    for (let i = 0; i < n; ++i) this.conflicts.push(false);
    this.justBacktracked = false;

    return {
      queens: this.queens,
      curQueen: this.curQueen,
      foundSolution: false,
      conflicts: this.conflicts,
      done: false,
    };
  };

  // Returns an object with:
  // - queens: current queen positions
  // - curQueen: current queen being investigated
  // - foundSolution: whether the current arrangement is a solution
  // - conflicts: a list of booleans indicating whether the given queen has a
  //   conflict with the current queen
  // - done: whether we are done searching
  step = () => {
    // curQueen is -1 when we finish backtracking from column 0.
    if (this.curQueen == -1) return { done: true };

    let foundSolution = false;
    let done = false;

    // Determine what move to make.
    if (!this.hasConflict && !this.justBacktracked) {
      // Move to analyze the next queen.
      ++this.curQueen;

      // If curQueen is now at the end, a solution was found. Thus, we should
      // decrement curQueen to continue searching the last column.
      if (this.curQueen == this.n) {
        --this.curQueen;
        this.justBacktracked = true;
        foundSolution = true;
      }
    } else {
      // Move the queen in the current column if we found a conflict or just
      // backtracked.
      ++this.queens[this.curQueen];
      this.justBacktracked = false;

      // Reset this column and move curQueen back if done checking.
      if (this.queens[this.curQueen] == this.n) {
        this.queens[this.curQueen] = 0;
        --this.curQueen;
        this.justBacktracked = true;
      }

      done = this.curQueen == -1;
    }

    // Check if current position has conflicts, but only if we did not just
    // backtrack (no need to check for conflicts if we just backtracked).
    this.hasConflict = false;
    this.conflicts.fill(false);
    if (!this.justBacktracked) {
      for (let i = 0; i < this.curQueen; ++i) {
        const sameRow = this.queens[i] == this.queens[this.curQueen];
        const sameDiag1 =
          this.queens[i] - this.queens[this.curQueen] == i - this.curQueen;
        const sameDiag2 =
          this.queens[i] - this.queens[this.curQueen] == this.curQueen - i;

        if (sameRow || sameDiag1 || sameDiag2) {
          this.hasConflict = true;
          this.conflicts[i] = true;
        }
      }
    }

    return {
      queens: this.queens,
      curQueen: this.curQueen,
      conflicts: this.conflicts,
      foundSolution: foundSolution,
      done: done,
    };
  };
}

// Returns the number of solutions to the n-queens problem on a board of size n.
export function totalNQueens(n) {
  const engine = new NQueensEngine();
  engine.reset(n);
  let tot = 0;
  let done = false;
  while (!done) {
    const info = engine.step();
    if (info.foundSolution) ++tot;
    done = info.done;
  }
  return tot;
}
