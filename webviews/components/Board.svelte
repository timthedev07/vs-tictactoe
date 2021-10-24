<script lang="ts">
  import { initialState, player } from "../lib/gameLogic";
  import { Board, Cell, EMPTY } from "../lib/types";

  let board: Board = initialState();
  let winner: Cell = EMPTY;
  let cellComponents = [];
  $: currPlayer = player(board);
  $: {
    for (const row of board) {
      for (const cell of row) {
        cellComponents.push(cell);
      }
    }
  }
</script>

<div class="board">
  <pre>Current player: {currPlayer}</pre>
  <pre>Winner player: {winner}</pre>
</div>

<style>
</style>
