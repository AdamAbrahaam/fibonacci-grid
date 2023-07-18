import { reactive } from "vue";
import type { UnwrapNestedRefs } from "vue";
import type { Cell } from '@/models/Cell'
import { DEFAULT_CELL } from '@/models/Cell'
import { Fibonacci } from '@/composables/Fibonacci'

const DIMENSIONS: number = 50
const CONSECUTIVE_NUMBERS = 5
const TIMEOUT = 500

export class Grid {
  private grid = reactive<Cell[][]>([])
  private fibonacci: Fibonacci

  constructor(private dimensions: number, consecutiveNumbers: number) { 
    this.fibonacci = new Fibonacci(dimensions, consecutiveNumbers)
    this.initializeGrid()
  }
  
  private initializeGrid() {
    for (let i = 0; i < this.dimensions; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.dimensions; j++) {
        row.push({...DEFAULT_CELL});
      }

      this.grid.push(row);
    }
  }

  public increaseRowAndColumn(row: number, column: number) {
    for (let i = 0; i < this.dimensions; i++) {
      if (i === column) {
        continue
      }
      
      this.increaseCellValue(row, i, () => {
        const sequence: Cell[] = this.fibonacci.sequenceInColumn(this.grid, row, i)
        this.markCellsAsGreen(sequence)
      })
    }

    for (let j = 0; j < this.dimensions; j++) {
      this.increaseCellValue(j, column, () => {
        const sequence: Cell[] = this.fibonacci.sequenceInRow(this.grid, j, column)
        this.markCellsAsGreen(sequence)
      });
    }
  }

  private increaseCellValue(row: number, column: number, callback: () =>  void) {
    const cell: Cell = this.grid[row][column];
    cell.value++;
    cell.isChanged = true;

    setTimeout(() => {
      cell.isChanged = false;
      callback()
    }, TIMEOUT);
  }

  private markCellsAsGreen (fibonacciSequence: Cell[]) {
    fibonacciSequence.forEach(cell => {
      cell.isFibonacciSequence = true
    })

    setTimeout(() => {
      fibonacciSequence.forEach(cell => {
        cell.value = 1
        cell.isFibonacciSequence = false
      })
    }, TIMEOUT);
  }

  public get cells(): UnwrapNestedRefs<Cell[][]> {
    return this.grid
  }
}

export const useGrid = () => {
  const grid = new Grid(DIMENSIONS, CONSECUTIVE_NUMBERS)

  return {
    grid
  }
}
