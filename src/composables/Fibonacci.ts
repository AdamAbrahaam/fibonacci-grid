import type { Cell, CellSequence } from '@/models/Cell'

export class Fibonacci {
  constructor(private dimensions: number, private consecutiveNumbers: number){}

  public sequenceInRow(grid: Cell[][], row: number, column: number): Cell[] {
    return this.findSeqence(column, (index: number) => {
      return {
        cell: grid[row][index],
        cell1: grid[row][index - 1],
        cell2: grid[row][index - 2]
      }
    })
  }

  public sequenceInColumn(grid: Cell[][], row: number, column: number): Cell[] {
    return this.findSeqence(row, (index: number) => {
      return {
        cell: grid[index][column],
        cell1: grid[index - 1][column],
        cell2: grid[index - 2][column]
      }
    })
  }

  private findSeqence(cell: number, getConsecutiveCells: (index: number) => CellSequence) {
    for (let j = 0; j < this.consecutiveNumbers; j++) {

      // left/upper overflow
      if ((cell + j) - this.consecutiveNumbers - 1 < 0) {
        continue
      }

      // right/lower overflow
      if (cell + j >= this.dimensions) {
        break
      }

      const fibonacciSequence: Cell[] = []
      for (let i = cell - (this.consecutiveNumbers - 1) + j; i <= cell + j; i++) {        
        const { cell, cell1, cell2 } = getConsecutiveCells(i)

        if (cell.value === cell1.value + cell2.value) {
          fibonacciSequence.push(cell)
        } else {
          break;
        }
        
        if (fibonacciSequence.length === this.consecutiveNumbers) {
          return fibonacciSequence
        }
      } 
    }
    
    return []
  }
}
