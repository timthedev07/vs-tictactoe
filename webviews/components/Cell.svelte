<script lang="ts">
  import type { Cell } from "../lib/types";

  export let cell: Cell;
  export let i: number;
  export let j: number;
  export let disableAll: boolean;
  export let handleCellClick: (action: [number, number]) => any;

  let disabled: boolean;
  $: disabled = cell === "O" || cell === "X" || disableAll;

  const cellPositionToClassName: Record<string, string> = {
    "0,0": "border-bottom",
    "0,1": "border-x border-bottom",
    "0,2": "border-bottom",
    "1,0": "",
    "1,1": "border-x",
    "1,2": "",
    "2,0": "border-top",
    "2,1": "border-x border-top",
    "2,2": "border-top",
  };
</script>

<button
  on:click={() => handleCellClick([i, j])}
  {disabled}
  class={`cell ${cellPositionToClassName[`${i},${j}`]}`}>{cell || ""}</button
>

<style>
  .cell {
    background-color: goldenrod;
  }

  .cell:active {
    outline: none;
    border: none;
  }

  .cell:disabled {
    cursor: default;
  }

  .border-x {
    border-left: var(--board-gap-size) black solid;
    border-right: var(--board-gap-size) black solid;
  }
  .border-top {
    border-top: var(--board-gap-size) black solid;
  }
  .border-bottom {
    border-bottom: var(--board-gap-size) black solid;
  }
</style>
