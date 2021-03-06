export const X = "X";
export const O = "O";
export const EMPTY = null;
export type Cell = typeof X | typeof O | typeof EMPTY;
export type Row = Cell[];
export type Action = [number, number];
export type Board = Row[];

export interface MinimaxPacket {
  value: number;
  action?: Action;
}
