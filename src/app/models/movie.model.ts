export class Movie {
  adult?: boolean;
  backdrop_path?: String;
  genre_ids?: number[];
  id?: number;
  original_language?: String;
  overview?: String;
  popularity?: number;
  poster_path?: String;
  release_date?: String;
  title?: String;
  original_title?: String;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
export class MovieResponse {
  dates?: String[];
  results?: Movie[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}

export class MovieDetails {
  adult?: boolean;
  backdrop_path?: String;
  genres?: Genre[];
  homepage?: String;
  id?: number;
  original_language?: String;
  original_title?: String;
  overview?: String;
  popularity?: String;
  poster_path?: String;
  release_date?: String;
  revenue?: number;
  runtime?: number;
  status?: String;
  tagline?: String;
  title?: String;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  production_countries?: ProductionCountry[];
}

export class MovieTrailer {
  type?: String;
  site?: String;
  key?: string;
}
export class TrailerResponse {
  id?: number;
  results?: MovieTrailer[];
}

export class ProductionCountry {
  name?: String;
}

export class CreditsResponse {
  id?: number;
  cast?: CastPerson[];
}

export class CastPerson {
  gender?: number;
  id?: number;
  profile_path?: String;
  character?: String;
  order?: number;
  name?: String;
}

export class WatchProviderResponse {
  id?: number;
  results?: Locale;
}

export class Locale {
  HR?: ProviderOptions;
}
export class ProviderOptions {
  buy?: Provider[];
  rent?: Provider[];
  flatrate?: Provider[];
}

export class Provider {
  logo_path?: String;
  provider_id?: number;
  provider_name?: String;
  display_priority?: String;
}

export class GenreResponse {
  genres?: Genre[];
}

export class Genre {
  id?: number;
  name?: String;
}
