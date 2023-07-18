import { useGrid, type Grid } from '@/composables/Grid'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Grid', () => {
  let grid: Grid

  beforeEach(() => {
    const { grid: gridInstance } = useGrid()
    grid = gridInstance
  })

  it('Has correct length', () => {
    expect(grid.cells.length).toEqual(50)
    expect(grid.cells[0].length).toEqual(50)
  })

  it('Cell has default value', () => {
    expect(grid.cells[49][49].value).toEqual(1)
    expect(grid.cells[49][49].isChanged).toEqual(false)
    expect(grid.cells[49][49].isFibonacciSequence).toEqual(false)
  })

  it('Increase row and column', () => {
    grid.increaseRowAndColumn(49, 49)
    expect(grid.cells[49][0].value).toEqual(2)
    expect(grid.cells[40][49].value).toEqual(2)

    expect(grid.cells[48][0].value).toEqual(1)
    expect(grid.cells[40][48].value).toEqual(1)
  })
})
