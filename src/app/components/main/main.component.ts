import { SearchResults } from './../../models/search.model';
import { DataService } from './../../services/data.service';
import { Country } from './../../models/country.model';
import { Component, OnInit } from '@angular/core';
import { ProviderList } from 'src/app/models/provider.model';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeIn, inAnimation } from 'src/app/animations/animations';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [inAnimation, fadeIn],
})
export class MainComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) {}

  countries: Country[] | undefined = [];
  chosenCountry: Country = {};
  searchTerm = '';

  toggleItemDialog = false;
  toggleCountryDialog = false;

  userInput = '';

  searchResults: SearchResults[] | undefined = [];
  searching = false;

  chosenItem: SearchResults = {};
  chosenItemProviders: ProviderList = {};
  ngOnInit(): void {
    this.dataService.getCountries().subscribe((response) => {
      this.countries = response.results;
    });
    if (localStorage.getItem('chosenCountry'))
      this.chosenCountry = JSON.parse(
        localStorage.getItem('chosenCountry') || '{}'
      );
    else {
      this.chosenCountry = { iso_3166_1: 'HR', english_name: 'CROATIA' };
      localStorage.setItem('chosenCountry', JSON.stringify(this.chosenCountry));
      this.showToast(
        'Your region has been set to Croatia, change it by clicking on the settings icon!'
      );
    }
    this.route.queryParams.subscribe((params) => {
      const searchParam = params['search'];
      if (searchParam) {
        this.userInput = searchParam;
        this.searchMovies();
      }
    });
  }

  searchMovies() {
    if (!this.userInput) return;
    this.loaderService.show();
    this.searching = true;
    this.dataService.search(this.userInput).subscribe((response) => {
      this.searchResults = response.results!.filter(
        (result) => result.media_type === 'movie' || result.media_type === 'tv'
      );
      const queryParams = { search: this.userInput };
      this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
      this.loaderService.hide();
    });
  }
  clearSearch() {
    this.loaderService.show();
    this.searching = false;
    this.userInput = '';
    this.searchResults = [];
    this.router.navigate([], { queryParams: {} });
    this.loaderService.hide();
  }

  findProviders(item: SearchResults) {
    this.loaderService.show();
    this.dataService
      .getProviders(item, item.media_type, this.chosenCountry.iso_3166_1)
      .subscribe((response) => {
        this.chosenItem = item;
        this.chosenItemProviders = response;
        this.loaderService.hide();
        this.toggleItemDialog = true;
      });
  }

  formatDate(date: string) {
    if (!date) return 'Date of release not found';
    const arr = date.split('-');
    return arr[2] + '.' + arr[1] + '.' + arr[0];
  }

  changeChosenCountry(country: Country) {
    this.chosenCountry = country;
    this.searchTerm = '';
    localStorage.setItem('chosenCountry', JSON.stringify(this.chosenCountry));
    this.showToast(
      'Successfully changed region to ' + this.chosenCountry.english_name
    );
  }

  showToast(message: string) {
    this.toastr.info(message);
  }
}
