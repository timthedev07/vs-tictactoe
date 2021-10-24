<script lang="ts">
  import {
    initialState,
    minimax,
    player,
    result,
    scrubMove,
    terminal,
    winner,
  } from "../lib/gameLogic";
  import { Board, Cell, EMPTY } from "../lib/types";
  import CellComponent from "./Cell.svelte";

  type Opponent = "scrub" | "god";

  let board: Board = initialState();
  let chosenPlayer: Cell = EMPTY;
  let opponent: Opponent | undefined;
  $: winner_ = winner(board);
  $: terminal_ = terminal(board);
  $: currPlayer = player(board);
  $: disableAll = winner_ !== EMPTY || currPlayer !== chosenPlayer;

  const handleCellClick = (action: [number, number]) => {
    board = result(board, action);
    // make ai move
    setTimeout(() => {
      if (!terminal_ && !winner_) {
        const aiResult = opponent === "god" ? minimax(board) : scrubMove(board);
        console.log(aiResult);
        if (aiResult) {
          board = result(board, aiResult);
        }
      }
    }, 500);
  };

  const handleSelectPlayer = (player: Cell) => {
    chosenPlayer = player;
    if (player === "O") {
      setTimeout(() => {
        const aiResult = minimax(board);
        if (aiResult) {
          board = result(board, aiResult);
        }
      }, 1000);
    }
  };

  const handleNewGame = () => {
    chosenPlayer = EMPTY;
    board = initialState();
    winner_ = EMPTY;
    opponent = undefined;
  };
</script>

{#if opponent}
  {#if chosenPlayer}
    <div id="game-control">
      {#if terminal_}
        <button
          on:click={() => {
            handleNewGame();
          }}>Play Again</button
        >
      {/if}
      <div id="game-message">
        {#if terminal_}
          {#if winner_}
            Winner: {winner_}
          {:else}
            Tie
          {/if}
        {:else}
          Current player: {currPlayer}
        {/if}
      </div>
    </div>
    <div class="board">
      {#each board as row, i}
        {#each row as cell, j}
          <CellComponent {disableAll} {cell} {i} {j} {handleCellClick} />
        {/each}
      {/each}
    </div>
  {:else}
    <br />
    <br />
    <div style="text-align: center; width: 100%;">Play as</div>
    <br />
    <div
      style="display: flex; align-items: center; justify-content: space-around;"
    >
      <button on:click={() => handleSelectPlayer("O")} class="player-button"
        >O</button
      >
      <button on:click={() => handleSelectPlayer("X")} class="player-button"
        >X</button
      >
    </div>
  {/if}
{:else}
  <br />
  <br />
  <div style="text-align: center; width: 100%;">
    Your opponent should be a...
  </div>
  <br />
  <div
    style="display: flex; align-items: center; justify-content: space-around;"
  >
    <button on:click={() => (opponent = "scrub")} class="opponent-button"
      >Scrub</button
    >
    <button on:click={() => (opponent = "god")} class="opponent-button"
      >God</button
    >
  </div>
{/if}

<style>
  .player-button {
    width: 40px;
    font-family: "Courier New", Courier, monospace;
  }
  .opponent-button {
    width: 70px;
    font-family: "Courier New", Courier, monospace;
  }

  #game-message {
    text-align: center;
    text-decoration: underline;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #game-control {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .board {
    --size: 50px;
    height: calc(var(--size) * 3);
    width: calc(var(--size) * 3);
    display: grid;
    grid-template-columns: var(--size) var(--size) var(--size);
    grid-template-rows: var(--size) var(--size) var(--size);
  }
</style>
