import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { FoodService } from 'src/app/services/food.service';
import { of, Observable } from 'rxjs';
import { City } from 'src/app/shared/models/city';

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss']
})
export class CitySelectorComponent implements OnInit {
  isLoadingCity$: Observable<boolean>;
  prevCity: AbstractControl = new FormControl();
  cityCtrl: AbstractControl = new FormControl();
  citySuggestions: any;

  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit(): void {
    this.isLoadingCity$ = this.foodService.isLoadingCity;

    this.setInitialCity();

    this.citySuggestions = this.cityCtrl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((value: string | City) => {
        // if value is a string it means that current value should be treated as search query
        // else the value is bound to City suggestion object so we don't want to show suggestion list
        if (typeof value === 'string') {
          return this.foodService.getCitySuggestions(value);
        } else {
          return of([]);
        }
      })
    );
  }

  setInitialCity(): void {
    this.foodService.city.subscribe((city: City) => {
      this.cityCtrl.setValue(city);
      this.prevCity.setValue(city);
    });
  }

  onCitySelected(event: MatAutocompleteSelectedEvent): void {
    const city: City = event.option.value;

    this.prevCity.setValue(city);
    this.foodService.setCity(city);
    console.log('Selected city ID: ', city.id);
  }

  resetCityValue(): void {
    if (typeof this.cityCtrl.value === 'string') {
      this.cityCtrl.setValue(this.prevCity.value);
    }
  }

  displayFn(option: City): string {
    return option ? option.name : '';
  }
}
