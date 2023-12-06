<script setup lang="ts">
import router from '../router';
import { goToEnteredPokemon } from '../utils/goToEnteredPokemon';
import { replaceSpacesWithHyphens } from '../utils/replaceSpacesWithHyphens';

const { inputValue, searchResults } = defineProps([
  'inputValue',
  'searchResults',
]);

function goToSelectedPokemon(
  event: MouseEvent,
  manuallyEntered: boolean
): void {
  if (!manuallyEntered) {
    router.push(
      `/pokemon/${replaceSpacesWithHyphens(
        (event.target as HTMLElement).innerText
      )}`
    );
  }
}
</script>

<template>
  <ul class="search-list" v-if="inputValue.trim()">
    <li class="search-list__item" @click="goToEnteredPokemon(inputValue)">
      {{ inputValue }}
      <span class="search-list__label">- Search</span>
    </li>
    <!-- check prop types? -->
    <li
      class="search-list__item"
      v-for="name in searchResults"
      :key="name"
      @click="goToSelectedPokemon($event, false)"
    >
      {{ name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.search-list {
  list-style-type: none;
  width: 100%;
  background-color: #fff;
  border-radius: 0 0 1rem 1rem;
  padding-bottom: 0.5rem;
  max-height: 22rem;
  overflow-y: auto;

  &__item {
    padding: 0.2rem 1rem;
    cursor: default;

    &:hover {
      background-color: #f8f9fa;
    }

    &:last-child {
      border-radius: 0 0 0.5rem 0.5rem;
    }
  }

  &__label {
    color: #d0d0d0;
  }
}
</style>
