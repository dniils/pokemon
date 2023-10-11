import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PokemonView from "../views/PokemonView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/pokemons/:id",
    name: "Pokemon",
    component: PokemonView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;