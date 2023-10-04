<script setup lang="ts"></script>

<template>
  <div class="search-pokemon">
    <form class="search-pokemon__form">
      <input type="text" class="search-pokemon__input" />
      <button class="btn search-pokemon__btn">
        <img
          class="poke-ball-icon"
          src="../assets/poke-ball-icon.png"
          alt="go"
        />
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.search-pokemon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;

  margin-bottom: 1rem;

  &__form {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    height: 100%;
    border: 1px solid gray;
    border-radius: 1rem;
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
}
</style>
