<script lang="ts">
  import { initialState, player } from "../lib/gameLogic";
  import { Board, Cell, EMPTY } from "../lib/types";
  import CellComponent from "./Cell.svelte";

  let board: Board = initialState();
  let winner: Cell = EMPTY;
  $: currPlayer = player(board);
</script>

<pre>Current player: {currPlayer}</pre>
<pre>Winner player: {winner}</pre>
<div class="board">
  {#each board as row}
    {#each row as cell}
      <CellComponent {cell} />
    {/each}
  {/each}
</div>

<style>
  .board {
    --size: 150px;
    height: var(--size);
    width: var(--size);
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
  }
</style>
