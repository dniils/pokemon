<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePokemonStore } from '../store';
import SearchList from './SearchList.vue';
import { goToEnteredPokemon } from '../utils/goToEnteredPokemon';
import { replaceHyphensWithSpaces } from '../utils/replaceHyphensWithSpaces';

const store = usePokemonStore();
const searchInputValue = ref<string>('');
const searchResults = ref<string[]>([]);
const allPokemonNamesWithoutHyphens = ref<string[]>([]);
const inputInFocus = ref<boolean>(false);

onMounted(async () => {
  await store.getAllPokemonsNames();
  allPokemonNamesWithoutHyphens.value = store.allPokemonsNames.map((name) =>
    replaceHyphensWithSpaces(name)
  );
});

console.log(allPokemonNamesWithoutHyphens);

function filterPokemonNames(): void {
  inputInFocus.value = true;

  const processedInputValue = searchInputValue.value.trim().toLocaleLowerCase();

  if (processedInputValue) {
    searchResults.value = allPokemonNamesWithoutHyphens.value.filter((name) =>
      name.includes(processedInputValue)
    );
  } else {
    searchResults.value = [];
  }
}

function hideSearchList(ms: number): void {
  setTimeout(() => (inputInFocus.value = false), ms);
}

function submitEventHandler(e: Event): void {
  e.preventDefault();
  goToEnteredPokemon(searchInputValue.value);
}

function searchComponentStyleHandler() {
  return inputInFocus.value
    ? { 'box-shadow': '0 1px 6px 0 rgba(0, 0, 0, 0.25)' }
    : {};
}
</script>

<template>
  <div class="search-pokemon" :style="searchComponentStyleHandler()">
    <form class="search-pokemon__form" @submit="submitEventHandler">
      <input
        type="text"
        class="search-pokemon__input"
        placeholder="start typing..."
        v-model="searchInputValue"
        @input="filterPokemonNames"
        @focus="inputInFocus = true"
        @blur="hideSearchList(150)"
        @keyup.esc="hideSearchList(0)"
      />
      <button class="btn search-pokemon__btn">
        <img
          class="poke-ball-icon"
          src="../assets/poke-ball-icon.png"
          alt="go"
        />
      </button>
    </form>
    <SearchList
      :inputValue="searchInputValue"
      :searchResults="searchResults"
      :inputInFocus="inputInFocus"
    />
  </div>
</template>

<style scoped lang="scss">
.search-pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: calc(320px - 6vw);
  margin: 0 auto;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 14%);
  border-radius: 1rem;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  overflow: hidden;
  z-index: 1;

  @media screen and (min-width: 769px) {
    min-width: unset;
    width: 25rem;
  }

  &:hover {
    box-shadow: 0 1px 6px 0 rgb(0 0 0 / 25%);
  }

  &__form {
    display: flex;
    width: 100%;
    height: 2rem;
    min-height: 2rem;
    background-color: #fff;
  }

  &__input {
    background: transparent;
    border: none;
    outline: none;
    color: #000;
    padding-left: 1rem;
    width: 100%;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    border-radius: 1rem;
    background-color: #fff;
    padding: 0 0.2rem;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover,
    &:focus,
    &:active {
      background-color: #f3f3f3;
    }
  }

  &__input,
  &__btn {
    height: 100%;
  }
}

.poke-ball-icon {
  height: 1.5rem;
  user-select: none;
}
</style>
