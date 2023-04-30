import { ProviderResponse } from './../models/provider.model';
import { SearchResponse, SearchResults } from './../models/search.model';
import { CountryResponse } from './../models/country.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  API_KEY = '?api_key=1bdf07a878e60c35ec4b72268c4a797e&language=en-US';
  API_URL = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountryResponse> {
    return this.http.get<CountryResponse>(
      this.API_URL + 'watch/providers/regions' + this.API_KEY
    );
  }

  search(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(
      this.API_URL +
        'search/multi' +
        this.API_KEY +
        '&page=1&include_adult=false&query=' +
        query
    );
  }

  getProviders(
    item: SearchResults,
    media_type: string | undefined,
    locale: string | undefined
  ) {
    return this.http
      .get<ProviderResponse>(
        this.API_URL +
          media_type +
          '/' +
          item.id +
          '/watch/providers' +
          this.API_KEY
      )
      .pipe(
        map((res) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const provider = { ...res.results[`${locale.toUpperCase()}`] };
          return provider;
        })
      );
  }
}
