export class SearchResults {
  id?: number;
  overview?: String;
  popularity?: number;
  poster_path?: String;
  backdrop_path?: String;
  title?: String;
  name?: String;
  release_date?: string;
  first_air_date?: string;
  vote_average?: string;
}

export class SearchResponse {
  results?: SearchResults[];
}
