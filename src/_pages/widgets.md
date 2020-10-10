---
layout: article
title: Widgets
show_date: false
show_section_navigator: false
use_webpack: true
katex: true
---

## N-Queens

The [N-Queens](https://en.wikipedia.org/wiki/Eight_queens_puzzle) problem is the
problem of placing $$n$$ queens on an $$n \times n$$ chessboard in such a way
that no queens are attacking each other. It is a prime example of a problem that
is easy to understand, but non-trivial to solve. The following tool provides a
visualization of a common solution to the problem. In this solution, one
advances across the board column by column. In each column, the queen is moved
down until it no longer conflicts with any of the previous queens. Once such a
position is found, the queen in the next column is placed. This continues until
the last queen is placed, solving the problem. If at any time a queen in a
certain column cannot be placed anywhere, we "backtrack" to the previous column
and move that queen down to its next valid position.

This tool shows the current queen in blue. Queens that conflict with the current
queen as it is moved are shown in red. The top row of numbers shows the position
(row number) of each queen in the corresponding column. The controls on the side
allow you to adjust board size and speed of the visualization, and to issue
commands for running the visualization, taking a single step, and stopping.

<div class="react" id="nqueens"></div>

## Clock

<div class="react" id="clock"></div>

## Tic-Tac-Toe

{% include projects/tictactoe/tictactoe.html %}
