export class SearchResults {
  id?: number;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  backdrop_path?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: string;
  media_type?: string;
}

export class SearchResponse {
  results?: SearchResults[];
}
