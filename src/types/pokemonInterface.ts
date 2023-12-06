type Sprite = {
  front_default: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
  };
};

type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export interface PokemonInterface {
  id: number;
  url: string;
  name: string;
  sprites: Sprite;
  types: Type[];
  stats: Stat[];
}

export interface InitPokeInterface {
  name: string;
  url: string;
}
