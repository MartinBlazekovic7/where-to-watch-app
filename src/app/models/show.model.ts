import { Genre, Movie, ProductionCountry } from './movie.model';

export class Show {
  backdrop_path?: String;
  genre_ids?: number[];
  id?: number;
  original_language?: String;
  overview?: String;
  popularity?: number;
  poster_path?: String;
  first_air_date?: String;
  name?: String;
  original_name?: String;
  vote_average?: number;
  vote_count?: number;
}

export class ShowResponse {
  results?: Show[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}

export class ShowDetails {
  backdrop_path?: String;
  genres?: Genre[];
  id?: number;
  original_language?: String;
  overview?: String;
  popularity?: number;
  poster_path?: String;
  first_air_date?: String;
  last_air_date?: String;
  number_of_episodes?: number;
  number_of_seasons?: number;
  name?: String;
  original_name?: String;
  vote_average?: number;
  vote_count?: number;
  seasons?: Season[];
  production_countries?: ProductionCountry[];
}

export class Season {
  id?: number;
  air_date?: String;
  episode_count?: number;
  name?: String;
  poster_path?: String;
  season_number?: number;
}

export class ShowTrailer {
  type?: String;
  site?: String;
  key?: string;
}

export class TrailerResponseShow {
  id?: number;
  results?: ShowTrailer[];
}
