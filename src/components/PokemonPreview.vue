<script setup lang="ts">
const props = defineProps(["imageSource", "id"]);
</script>

<template>
  <router-link :to="`/pokemons/${id}`" class="router-link">
    <div class="pokemon-preview">
      <div class="pokemon-preview__number">
        <slot name="pokemon-number">000</slot>
      </div>
      <h2 class="pokemon-preview__name">
        <slot name="pokemon-name"></slot>
      </h2>
      <div class="pokemon-preview__content">
        <div>Lorem ipsum dolor sit amet.</div>
        <img
          :src="props.imageSource"
          class="pokemon-preview__img"
          alt="pokemon-image"
        />
      </div>

      <div class="pokemon-preview__gloss"></div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.router-link {
  text-decoration: none;
  cursor: default;
}

.pokemon-preview {
  position: relative;
  width: 100%;
  min-height: 200px;
  color: #404040;
  background-color: #9ad498;
  border-radius: 1rem;
  padding: 0.5rem 0.5rem 0rem;
  position: relative;
  overflow: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: all 0.2s ease-in-out;
  // background-image: url("../assets/pokemon-symbol-logo.png");
  // background-position: bottom -3.5rem right -3rem;
  // background-repeat: no-repeat;
  // background-size: contain;
  // background-blend-mode: luminosity;

  @media (pointer: fine) {
    filter: brightness(0.9);
  }

  &:hover {
    // scale: 1.02;
    filter: brightness(1);

    .pokemon-preview__img {
      animation: pokemonImageAnimation 2s infinite linear;
    }

    .pokemon-preview__gloss {
      animation: glossMovement 5s infinite linear;
      animation-delay: 0.2s;
    }
  }

  &__gloss {
    position: absolute;
    top: 0;
    left: -180px;
    width: 5rem;
    height: 20rem;
    background-color: #e8ffe7;
    opacity: 0.2;
    filter: blur(4px);
    transform: skewX(-33deg);
    z-index: 1;
  }

  &__number {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-weight: 800;
    font-size: 1.5rem;
    opacity: 0.2;
  }

  &__name {
    font-size: 1.5rem;
  }

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__img {
    max-height: 150px;
    z-index: 2;
    user-select: none;
  }
}

@keyframes pokemonImageAnimation {
  0% {
    transform: rotate(0);
    scale: 1;
  }
  25% {
    transform: rotate(3deg);
    scale: 1.05;
    filter: brightness(1.05);
  }
  50% {
    transform: rotate(0);
    scale: 1;
    filter: brightness(1);
  }
  75% {
    transform: rotate(-2deg);
    scale: 1.1;
  }
  100% {
    transform: rotate(0);
    scale: 1;
  }
}

@keyframes glossMovement {
  0% {
    left: -150px;
  }
  10% {
    left: 400px;
  }
  100% {
    left: 400px;
  }
}
</style>
