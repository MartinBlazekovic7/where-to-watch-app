import { SearchResponse } from './../models/search.model';
import { Country } from './../models/country.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { MovieResponse } from '../models/movie.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  API_KEY =
    '?api_key=1bdf07a878e60c35ec4b72268c4a797e&language=en-US&page=1&include_adult=false&query=';
  SEARCH_URL = 'https://api.themoviedb.org/3/search/';

  constructor(private http: HttpClient) {}

  search(
    query: string,
    item: Item,
    country: Country
  ): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(
      this.SEARCH_URL + item.parameter + this.API_KEY + query
    );
  }
}
