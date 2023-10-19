<script setup lang="ts">
import { ref, Ref } from "vue";
import { usePokemonStore } from "../store";
import PokemonPreview from "./PokemonPreview.vue";
import { pokemonTypeColors, PokemonTypeColorsI } from "../pokemonTypeColors";

const store = usePokemonStore();
const prevBtnDisabled: Ref<boolean> = ref(true);
const nextBtnDisabled: Ref<boolean> = ref(false);

window.addEventListener("resize", () => console.log(window.innerWidth));

if (store.currentPage === 1) {
  prevBtnDisabled.value = true;
} else {
  prevBtnDisabled.value = false;
}

if (!store.pokemons.length || store.pokemons.length <= 1) {
  store.getPokemons(store.currentPage);
}

function goToPrevPage(): void {
  store.getPokemons(--store.currentPage);

  if (store.currentPage === 1) {
    prevBtnDisabled.value = true;
  }
}

function goToNextPage(): void {
  store.getPokemons(++store.currentPage);

  if (store.currentPage > 1) {
    prevBtnDisabled.value = false;
  }
}

function capitalizeFirstLetter(s: string): string {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}
</script>

<template>
  <div class="search-results">
    <PokemonPreview
      v-for="{ id, name, sprites, types } in store.pokemons"
      :key="id"
      :name="name"
      :pokemonColor="pokemonTypeColors[types.map((type) => type.type.name)[0]  as keyof PokemonTypeColorsI]"
      :imageSource="sprites.other['official-artwork']['front_default']"
    >
      <template #pokemon-number> #{{ id }} </template>
      <template #pokemon-name>
        {{ capitalizeFirstLetter(name) }}
      </template>
    </PokemonPreview>
  </div>

  <div class="buttons">
    <button
      class="buttons__prev"
      @click="goToPrevPage"
      :disabled="prevBtnDisabled"
    >
      &lt;-
    </button>
    <button
      class="buttons__next"
      @click="goToNextPage"
      :disabled="nextBtnDisabled"
    >
      -&gt;
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  user-select: none;

  &__prev,
  &__next {
    font-family: "Fira Code", monospace;
    background-color: #cbcbcb;
    color: #fff;
    font-size: 1.2rem;
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    transition: all 0.2s ease-in-out;

    // @media (pointer: fine) {
    //   filter: brightness(0.9);
    // }

    &:disabled {
      background-color: #eeeeee;
    }

    &:hover:enabled {
      cursor: pointer;
      background-color: #aaaaaa;
    }
  }
}
.search-results {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1vw;
  margin: 1rem 0;
  transition: all 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  @media screen and (min-width: 481px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1650px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media screen and (min-width: 2000px) {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
