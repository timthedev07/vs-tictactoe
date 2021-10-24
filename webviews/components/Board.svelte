<script lang="ts">
  import { initialState } from "../lib/gameLogic";
  import type { Board } from "../lib/types";
  import Cell from "./Cell.svelte";

  const board: Board = initialState();
</script>

<div class="board" />

<style>
</style>
