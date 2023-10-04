<script setup lang="ts">
const props = defineProps(["imageSource"]);
</script>

<template>
  <div class="pokemon-preview">
    <div class="pokemon-preview__number">
      <slot name="pokemon-number"></slot>
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
  </div>
</template>

<style scoped lang="scss">
.pokemon-preview {
  width: 100%;
  min-height: 200px;
  background-color: rgb(154, 212, 152);
  border-radius: 1rem;
  // background-image: url("../assets/pokemon-symbol-logo.png");
  // background-position: bottom -3.5rem right -3rem;
  // background-repeat: no-repeat;
  // background-size: contain;
  // background-blend-mode: luminosity;
  padding: 0.5rem 0.5rem 0rem;
  position: relative;

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
    color: #404040;
  }

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__img {
    max-height: 150px;
    object-fit: contain;
  }
}
</style>
