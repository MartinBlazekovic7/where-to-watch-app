import { SearchResults } from './../../models/search.model';
import { DataService } from './../../services/data.service';
import { Country } from './../../models/country.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faTv } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/models/item.model';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 300, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
    trigger('inOutAnimationBigger', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 600, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class MainComponent implements OnInit {
  constructor(private dataService: DataService) {}

  items: Item[] = [
    { name: 'Filmovi', parameter: 'movie' },
    { name: 'Serije', parameter: 'tv' },
  ];
  chosenItem: Item = this.items[0];
  countries: Country[] = [
    { name: 'Hrvatska', locale: 'hr' },
    { name: 'BiH', locale: 'ba' },
    { name: 'Srbija', locale: 'rs' },
    { name: 'Slovenija', locale: 'si' },
    { name: 'Crna Gora', locale: 'me' },
    { name: 'Makedonija', locale: 'mk' },
    { name: 'Albanija', locale: 'al' },
  ];
  chosenCountry: Country = this.countries[0];

  toggleItemDialog = false;
  toggleCountryDialog = false;

  userInput = '';

  searchResults: SearchResults[] = [];
  searching = false;
  ngOnInit(): void {}

  changeItem(item: Item) {
    this.chosenItem = item;
    this.toggleItemDialog = false;
  }
  changeCountry(country: Country) {
    this.chosenCountry = country;
    this.toggleCountryDialog = false;
  }

  searchMovies() {
    if (!this.userInput) return;
    this.searching = true;
    this.dataService
      .search(this.userInput, this.chosenItem, this.chosenCountry)
      .subscribe((response) => {
        this.searchResults = response.results!!;
      });
  }
  clearSearch() {
    this.searching = false;
    this.userInput = '';
    this.searchResults = [];
  }
  formatDate(date: string) {
    let arr = date.split('-');
    return arr[2] + '.' + arr[1] + '.' + arr[0];
  }
}
