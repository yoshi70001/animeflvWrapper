export interface Anime {
  id: string;
  slug: string;
  title: string;
  image: string;
  banner?: string;
}

export interface Episode {
  nro: string;
}

export interface Provider {
  title: string;
  code: string;
}