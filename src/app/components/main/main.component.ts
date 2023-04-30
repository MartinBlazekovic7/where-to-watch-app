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
import { Provider } from 'src/app/models/provider.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 92, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
    trigger('inOutAnimationBigger', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 500, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
    trigger('inAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 300, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class MainComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  countries: Country[] = [];
  chosenCountry: Country = {};
  searchTerm: string = '';

  toggleItemDialog = false;
  toggleCountryDialog = false;

  userInput = '';

  searchResults: SearchResults[] = [];
  searching = false;

  movieProviders: Provider = {};
  ngOnInit(): void {
    this.dataService.getCountries().subscribe((response) => {
      this.countries = response.results!!;
      console.log(this.countries);
    });
    if (localStorage.getItem('chosenCountry'))
      this.chosenCountry = JSON.parse(
        localStorage.getItem('chosenCountry') || '{}'
      );
    this.route.queryParams.subscribe((params) => {
      const searchParam = params['search'];
      if (searchParam) {
        this.userInput = searchParam;
        this.searchMovies();
      }
    });
  }

  changeCountry(country: Country) {
    /* this.chosenCountry = country;
    this.toggleCountryDialog = false;
    localStorage.setItem('chosenCountry', JSON.stringify(this.chosenCountry)); */
  }

  searchMovies() {
    if (!this.userInput) return;
    this.searching = true;
    this.dataService
      .search(this.userInput, this.chosenCountry)
      .subscribe((response) => {
        this.searchResults = response.results!!.filter(
          (result) =>
            result.media_type === 'movie' || result.media_type === 'tv'
        );
        const queryParams = { search: this.userInput };
        this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
      });
  }
  clearSearch() {
    this.searching = false;
    this.userInput = '';
    this.searchResults = [];
    this.router.navigate([], { queryParams: {} });
  }

  findProviders(item: SearchResults) {
    this.dataService
      .getProviders(item, item.media_type, this.chosenCountry.iso_3166_1)
      .subscribe((response) => {
        console.log(response);
      });
  }

  formatDate(date: string) {
    let arr = date.split('-');
    return arr[2] + '.' + arr[1] + '.' + arr[0];
  }

  changeChosenCountry(country: Country) {
    this.chosenCountry = country;
    this.searchTerm = '';
    localStorage.setItem('chosenCountry', JSON.stringify(this.chosenCountry));
  }
}
