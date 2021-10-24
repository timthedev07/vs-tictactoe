<script lang="ts">
  import type { Cell } from "../lib/types";

  export let cell: Cell;

  let disabled: boolean;
  $: disabled = cell === "O" || cell === "X";
</script>

<button {disabled} class="cell">{cell}</button>

<style>
  .cell {
    border: white solid 1px;
    background-color: goldenrod;
  }
</style>
