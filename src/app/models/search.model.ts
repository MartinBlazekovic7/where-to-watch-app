export class SearchResults {
  id?: number;
  overview?: String;
  popularity?: number;
  poster_path?: String;
  backdrop_path?: String;
  title?: String;
  name?: String;
}

export class SearchResponse {
  results?: SearchResults[];
}
