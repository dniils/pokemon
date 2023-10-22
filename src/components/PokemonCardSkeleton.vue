<script setup lang="ts"></script>

<template>
  <div class="pokemon-card-container">
    <!-- <div class="gloss"></div> -->
    <header class="header">
      <div class="header__buttons">
        <button class="header__button header__button-back">&lt;-</button>
        <button class="header__button header__button-like"></button>
      </div>
      <div class="header__title-and-number">
        <h2 class="header__title"></h2>
        <h2 class="header__number"></h2>
      </div>
      <div class="header__types">
        <span class="header__type"></span>
      </div>
      <div class="header__decore"></div>
    </header>

    <section class="info">
      <div class="info__image-container">
        <div class="info__image-skeleton"></div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.pokemon-card-container {
  animation: pulse-background 1.5s infinite;
  animation-delay: 0.5s;
}

.header {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 3rem 10vw 1rem;

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
    margin-bottom: 2rem;
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
    color: #e4e4e4;
    animation: pulse-color 1.5s infinite;
  }

  &__button-like {
    position: relative;
    height: 1rem;
    width: 1rem;
    background-color: #e4e4e4;
    display: flex;
    justify-content: center;
    border-radius: 0 0 0 0.1rem;
    transform: rotate(-45deg);
    margin-right: 0.4rem;
    animation: pulse-background 1.5s infinite;

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
    margin-bottom: 0.5rem;
  }

  &__title,
  &__number {
    height: 2rem;
    background-color: #e4e4e4;
    border-radius: 1rem;
    animation: pulse-background 1.5s infinite;
  }

  &__title {
    width: 10rem;
  }

  &__number {
    width: 4rem;
  }

  &__types {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  &__type {
    width: 3rem;
    height: 1.3rem;
    background-color: #e4e4e4;
    border-radius: 1rem;
    animation: pulse-background 1.5s infinite;
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

  &__image-skeleton {
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    background-color: #e4e4e4;
    animation: pulse-background 1.5s infinite;
  }
}

@keyframes pulse-background {
  0% {
    background-color: #e4e4e4;
  }
  50% {
    background-color: #f4f4f4;
  }
  100% {
    background-color: #e4e4e4;
  }
}

@keyframes pulse-color {
  0% {
    color: #e4e4e4;
  }
  50% {
    color: #f4f4f4;
  }
  100% {
    color: #e4e4e4;
  }
}
</style>
