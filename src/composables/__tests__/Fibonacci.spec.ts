import { Fibonacci } from '@/composables/Fibonacci'
import { describe, it, expect, beforeEach } from 'vitest'
import { useGrid, type Grid } from '@/composables/Grid'
import type { Cell } from '@/models/Cell'

describe('Fibonacci', () => {
  let fibonacci: Fibonacci
  let grid: Grid

  beforeEach(() => {
    fibonacci = new Fibonacci(50, 5)

    const { grid: gridInstance } = useGrid()
    grid = gridInstance
  })

  it('Sequence present in row', () => {
    const mockCells: Cell[][] = grid.cells
    mockCells[5][5].value = 2
    mockCells[5][6].value = 3
    mockCells[5][7].value = 5
    mockCells[5][8].value = 8
    mockCells[5][9].value = 13

    let sequence = fibonacci.sequenceInRow(mockCells, 5, 5)
    expect(sequence.length).toEqual(5)

    sequence = fibonacci.sequenceInRow(mockCells, 5, 6)
    expect(sequence.length).toEqual(5)

    sequence = fibonacci.sequenceInRow(mockCells, 5, 7)
    expect(sequence.length).toEqual(5)

    sequence = fibonacci.sequenceInRow(mockCells, 5, 8)
    expect(sequence.length).toEqual(5)

    sequence = fibonacci.sequenceInRow(mockCells, 5, 9)
    expect(sequence.length).toEqual(5)
  })

  it('Sequence present in column', () => {
    const mockCells: Cell[][] = grid.cells
    mockCells[5][5].value = 2
    mockCells[6][5].value = 3
    mockCells[7][5].value = 5
    mockCells[8][5].value = 8
    mockCells[9][5].value = 13

    let sequence = fibonacci.sequenceInColumn(mockCells, 5, 5)
    expect(sequence.length).toEqual(5)

    sequence = fibonacci.sequenceInColumn(mockCells, 6, 5)
    expect(sequence.length).toEqual(5)

    sequence = fibonacci.sequenceInColumn(mockCells, 7, 5)
    expect(sequence.length).toEqual(5)

    sequence = fibonacci.sequenceInColumn(mockCells, 8, 5)
    expect(sequence.length).toEqual(5)

    sequence = fibonacci.sequenceInColumn(mockCells, 9, 5)
    expect(sequence.length).toEqual(5)
  })

  it('Sequence NOT present in column', () => {
    const sequence = fibonacci.sequenceInColumn(grid.cells, 5, 5)
    expect(sequence.length).toEqual(0)
  })

  it('Sequence NOT present in row', () => {
    const sequence = fibonacci.sequenceInRow(grid.cells, 5, 5)
    expect(sequence.length).toEqual(0)
  })
})
