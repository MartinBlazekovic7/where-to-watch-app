import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/country.model';

@Pipe({
  name: 'search',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(
    countries: Country[],
    english_name: string,
    query: string
  ): Country[] {
    if (!countries) return countries;

    query = query.toLowerCase();

    if (query) {
      return countries.filter(function (item) {
        return JSON.stringify(item).toLowerCase().includes(query);
      });
    } else {
      return countries;
    }
  }
}
