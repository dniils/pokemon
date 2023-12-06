<script setup lang="ts">
import { ref } from 'vue';
import { usePokemonStore } from '../store';
import { useRoute } from 'vue-router';
import { PokemonInterface } from '../types/pokemonInterface';
import { pokemonTypeColors } from '../pokemonTypeColors.ts';
import { PokemonTypeColorsI } from '../types/pokemonTypeColors';
import { capitalizeFirstLetterOfWords } from '../utils/capitalizeFirstLetterOfWords';
import { replaceHyphensWithSpaces } from '../utils/replaceHyphensWithSpaces';

const route = useRoute();
const store = usePokemonStore();
const isLikeActive = ref(false);

await store.getPokemon(route.params.name as string);

const pokemonToDisplay = ref(
  store.pokemons.find((el) => el.name === route.params.name) as PokemonInterface
);

const typeNames: string[] = pokemonToDisplay.value.types.map(
  (type) => type.type.name
); // ['normal', 'poison']

const pokemonColor: string =
  pokemonTypeColors[typeNames[0] as keyof PokemonTypeColorsI];

const maxPokemonStat: number = Math.max(
  ...pokemonToDisplay.value.stats.map((stat) => stat.base_stat)
);

// If there is no stat higher than 100, let 100 be the maximum
const maxStatValue = maxPokemonStat >= 100 ? maxPokemonStat : 100;

function toggleLike(): void {
  if (isLikeActive.value) {
    isLikeActive.value = false;
  } else {
    isLikeActive.value = true;
  }
}
</script>

<template>
  <div
    class="pokemon-card-container"
    :style="{ backgroundColor: `${pokemonColor}cc` }"
  >
    <header class="header">
      <div class="header__buttons">
        <router-link to="/">
          <button class="header__button header__button-back">&lt;-</button>
        </router-link>
        <button
          class="header__button header__button-like"
          :class="{ 'header__button-like_active': isLikeActive }"
          @click="toggleLike"
        ></button>
      </div>
      <div class="header__title-and-number">
        <h2 class="header__title">
          {{
            capitalizeFirstLetterOfWords(
              replaceHyphensWithSpaces(pokemonToDisplay.name)
            )
          }}
        </h2>
        <h2 class="header__number">#{{ pokemonToDisplay.id }}</h2>
      </div>
      <div class="header__types">
        <span
          class="header__type"
          v-for="typeName in typeNames"
          :style="{backgroundColor: `${pokemonTypeColors[typeName as keyof PokemonTypeColorsI]}`}"
          >{{ capitalizeFirstLetterOfWords(typeName) }}</span
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

      <h3 class="info__stats-header">Stats</h3>

      <div class="stats">
        <div class="stats__item" v-for="stat in pokemonToDisplay.stats">
          <div class="stats__name-and-base">
            <span class="stats__name">{{ stat.stat.name }}</span>
            <span class="stats__base"> {{ stat.base_stat }}</span>
          </div>

          <span class="stats__bar">
            <span
              class="stats__filler"
              :style="{
                width: `${(stat.base_stat * 100) / maxStatValue}%`,
                backgroundColor: pokemonColor,
              }"
            ></span>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

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
    font-family: 'Fira Code', monospace;
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
      content: '';
      top: -50%;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: inherit;
      border-radius: 50%;
    }

    &::after {
      position: absolute;
      content: '';
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
    background-image: url('../assets/poke-ball-logo.png');
    background-position: bottom -0.5rem right -3rem;
    background-repeat: no-repeat;
    background-size: contain;
  }

  &__image {
    max-width: 13rem;
  }
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;

  &__item {
    display: flex;
    gap: 1rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__name-and-base {
    min-width: 9rem;
    display: flex;
    gap: 0.5rem;
    flex-direction: row;
    justify-content: space-between;
    flex: 0;
  }

  &__name {
    color: gray;
    min-width: 7rem;
  }

  &__bar {
    position: relative;
    min-width: 5rem;
    width: 100%;
    height: 0.3rem;
    border-radius: 1rem;
    background-color: #e6e6e6;
    flex: 1;
  }

  &__filler {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 1rem;
    background-color: #cdcdcd;
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
