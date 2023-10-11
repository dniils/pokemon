<template>
  <div class="spinner">
    <img
      class="spinner__img"
      src="../assets/poke-ball-icon.png"
      alt="Loading..."
    />
  </div>
</template>

<style lang="scss">
.spinner {
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__img {
    animation: spinAnimation 1.5s infinite ease-in-out;
    opacity: 0.2;
  }
}

@keyframes spinAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
