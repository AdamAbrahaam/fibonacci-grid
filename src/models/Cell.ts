export interface Cell {
  value: number
  isChanged: boolean
  isFibonacciSequence: boolean
}

export interface CellSequence {
  cell: Cell
  cell1: Cell
  cell2: Cell
}

export const DEFAULT_CELL = {
  value: 1,
  isChanged: false,
  isFibonacciSequence: false 
}
