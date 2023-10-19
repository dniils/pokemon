<script setup lang="ts">
import { ref } from "vue";
import { usePokemonStore } from "../store";
import { useRoute } from "vue-router";
import { PokemonInterface } from "../types/pokemonInterface";
import { PokemonTypeColorsI, pokemonTypeColors } from "../pokemonTypeColors.ts";
import router from "../router";

const route = useRoute();
const store = usePokemonStore();
const isLikeActive = ref(false);

await store.getPokemon(route.params.name as string);

const pokemonToDisplay = ref(
  store.pokemons.find((el) => el.name === route.params.name) as PokemonInterface
);

// console.log(pokemonToDisplay.value.name);

const typeNames: string[] = pokemonToDisplay.value.types.map(
  (type) => type.type.name
); // ['normal', 'poison']

const pokemonColor: string =
  pokemonTypeColors[typeNames[0] as keyof PokemonTypeColorsI];

console.log(pokemonColor);

function toggleLike(): void {
  if (isLikeActive.value) {
    isLikeActive.value = false;
  } else {
    isLikeActive.value = true;
  }
}

function goToHomePage(): void {
  router.push("/");
}

function capitalizeFirstLetter(s: string): string {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}
</script>

<template>
  <div
    class="pokemon-card-container"
    :style="{ backgroundColor: `${pokemonColor}` }"
  >
    <header class="header">
      <div class="header__buttons">
        <button
          class="header__button header__button-back"
          @click="goToHomePage"
        >
          &lt;-
        </button>
        <button
          class="header__button header__button-like"
          :class="{ 'header__button-like_active': isLikeActive }"
          @click="toggleLike"
        ></button>
      </div>
      <div class="header__title-and-number">
        <h2 class="header__title">
          {{ capitalizeFirstLetter(pokemonToDisplay.name) }}
        </h2>
        <h2 class="header__number">#{{ pokemonToDisplay.id }}</h2>
      </div>
      <div class="header__types">
        <span class="header__type" v-for="typeName in typeNames">{{
          capitalizeFirstLetter(typeName)
        }}</span>
      </div>
    </header>

    <section class="info">
      <div class="info__image-container">
        <img
          class="info__image"
          :src="
            pokemonToDisplay?.sprites.other['official-artwork']['front_default']
          "
          :alt="`${pokemonToDisplay.name} pokemon image`"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

.header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 10vw;
  color: #fff;

  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  &__button {
    border: none;
    font-family: "Fira Code", monospace;
    font-size: 1.5rem;
    background-color: transparent;
    cursor: pointer;
    color: #fff;
  }

  &__button-like {
    position: relative;
    height: 1rem;
    width: 1rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    border-radius: 0 0 0 0.1rem;
    transform: rotate(-45deg);

    &_active {
      background-color: #000;
      animation: likeButtonAnimation 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      top: -50%;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: inherit;
      border-radius: 50%;
    }

    &::after {
      position: absolute;
      content: "";
      top: 0;
      right: -50%;
      width: 100%;
      height: 100%;
      background-color: inherit;
      border-radius: 50%;
    }
  }

  &__title-and-number {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
  }

  &__types {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  &__type {
    background-color: #ffffff2f;
    padding: 0 0.5rem;
    border-radius: 1rem;
  }
}

.info {
  height: 500px; //
  background-color: #fff;
  border-radius: 2rem 2rem 0 0;
  margin-top: 10rem;

  &__image-container {
    transform: translateY(-80%);
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__image {
    max-width: 13rem;
  }
}

@keyframes likeButtonAnimation {
  0% {
    scale: 1;
  }
  50% {
    scale: 1.15;
  }
  100% {
    scale: 1;
  }
}
</style>
