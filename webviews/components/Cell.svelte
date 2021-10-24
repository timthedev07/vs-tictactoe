<script lang="ts">
  import type { Cell } from "../lib/types";

  export let cell: Cell;
  export let i: number;
  export let j: number;
  export let disableAll: boolean;
  export let handleCellClick: (action: [number, number]) => any;

  let disabled: boolean;
  $: disabled = cell === "O" || cell === "X" || disableAll;
</script>

<button on:click={() => handleCellClick([i, j])} {disabled} class="cell"
  >{cell || ""}</button
>

<style>
  .cell {
    /* border: white solid 1px; */
    background-color: goldenrod;
  }

  .cell:active {
    outline: none;
    border: none;
  }

  .cell:disabled {
    cursor: default;
  }
</style>
