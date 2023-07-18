<script setup lang="ts">
import { useGrid } from '@/composables/Grid'

const { grid } = useGrid()
</script>

<template>
  <div class="grid">
    <div
      v-for="(row, rowIndex) in grid.cells"
      :key="rowIndex"
      class="row"
    >
      <div
        v-for="(cell, columnIndex) in row"
        :key="columnIndex"
        class="cell"
        @click="grid.increaseRowAndColumn(rowIndex, columnIndex)"
        :class="{ yellow: cell.isChanged, green: cell.isFibonacciSequence }"
      >
        {{ cell.value }}
      </div>
    </div>
  </div>
</template>

<style>
 @import '@/assets/grid.css';
</style>
