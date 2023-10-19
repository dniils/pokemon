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
    :style="{ backgroundColor: `${pokemonColor}cc` }"
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
        <span
          class="header__type"
          v-for="typeName in typeNames"
          :style="{backgroundColor: `${pokemonTypeColors[typeName as keyof PokemonTypeColorsI]}`}"
          >{{ capitalizeFirstLetter(typeName) }}</span
        >
      </div>
      <div class="header__decore"></div>
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
      <h3>About</h3>
      <ul>
        <li>Species: <span>some info</span></li>
        <li>Gender: <span>info</span></li>
        <li>Height: <span>123</span></li>
        <li>Weight: <span>76</span></li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

.header {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 3rem 10vw 1rem;
  color: #fff;

  &__decore {
    position: absolute;
    width: 10rem;
    height: 10rem;
    top: -5rem;
    left: -4rem;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.04) 100%
    );
    border-radius: 1rem;
    transform: rotate(70deg);
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    z-index: 2;
  }

  &__button {
    border: none;
    font-family: "Fira Code", monospace;
    font-size: 2rem;
    background-color: transparent;
    cursor: pointer;
  }

  &__button-back {
    transition: all 0.2s ease-in-out;
    color: #fff;

    &:hover {
      scale: 1.1;
    }
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
    margin-right: 0.4rem;

    &_active {
      background-color: #28282e;
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
    border: 1px outset #ffffff5c;
  }
}

.info {
  min-height: 500px; //
  background-color: #fff;
  border-radius: 2rem 2rem 0 0;
  margin-top: 10rem;
  padding: 2rem 10vw;

  &__image-container {
    position: absolute;
    left: 0;
    transform: translateY(-95%);
    width: 100%;
    display: flex;
    justify-content: center;
    background-image: url("../assets/poke-ball-logo.png");
    background-position: bottom -0.5rem right -3rem;
    background-repeat: no-repeat;
    background-size: contain;
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
