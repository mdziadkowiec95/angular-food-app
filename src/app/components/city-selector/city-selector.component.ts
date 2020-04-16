import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { FoodService } from 'src/app/services/food.service';
import { of } from 'rxjs';


export interface CitySuggestion {
  id: number;
  flag: string;
  name: string;
}

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss']
})
export class CitySelectorComponent implements OnInit {
  prevCity: AbstractControl = new FormControl();
  cityCtrl: AbstractControl = new FormControl();
  citySuggestions: any;
  // private searchTerms = new Subject<string>();

  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit(): void {
    this.setInitialCity();

    this.citySuggestions = this.cityCtrl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((value: string | CitySuggestion) => {
        // if value is a string it means that current value should be treated as search query
        // else the value is bound to City suggestion object so we don't want to show suggestion list
        if (typeof value === 'string') {
          return this.foodService.getCitySuggestions(value);
        } else {
          return of([]);
        }
      })
    );

    // this.searchTerms
    //   .pipe(
    //     debounceTime(400),
    //     distinctUntilChanged(),
    //     switchMap((term: string) => this.foodService.getCitySuggestions(term))
    //   )
    //   .subscribe(suggestions => {
    //     this.citySuggestions = suggestions;
    //   });
  }

  // search(term: string): void {
  //   if (typeof term === 'string') {
  //     this.searchTerms.next(term.toLowerCase());
  //   }
  // }

  setInitialCity(): void {
    const initialCity = this.foodService.getInitialCity();

    this.cityCtrl.setValue(initialCity);
    this.prevCity.setValue(initialCity);
  }

  onCitySelected(event: MatAutocompleteSelectedEvent): void {
    const city: CitySuggestion = event.option.value;

    this.prevCity.setValue(city);
    this.foodService.setCity(city);
    console.log('Selected city ID: ', city.id);
  }

  resetCityValue(): void {
    if (typeof this.cityCtrl.value === 'string') {
      this.cityCtrl.setValue(this.prevCity.value);
    }
  }

  displayFn(option: CitySuggestion): string {
    return option ? option.name : '';
  }
}
