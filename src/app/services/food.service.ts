import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { config } from 'src/environments/environment';
import { citiesResponse } from 'src/api-mocks/cities';
import { cuisinesResponse } from 'src/api-mocks/cuisines';
import { City } from '../shared/models/city';
import { CollectionsResponse, Collection } from '../shared/models/collections';
import { CuisinesResponse } from '../shared/models/cuisine';
import { collectionsResponse } from 'src/api-mocks/collections';
import { mergeParams } from '../shared/utils/queryParams';

const mockCity = {
  id: 61,
  name: 'London',
  country_id: 215,
  country_name: 'United Kingdom',
  country_flag_url: 'https://b.zmtcdn.com/images/countries/flags/country_215.png',
  should_experiment_with: 0,
  has_go_out_tab: 0,
  discovery_enabled: 0,
  has_new_ad_format: 0,
  is_state: 0,
  state_id: 142,
  state_name: 'England and Wales',
  state_code: 'England and Wales',
}

const defaultCity: City = {
  id: 61,
  name: 'London',
  flag: 'https://b.zmtcdn.com/images/countries/flags/country_215.png',
};

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private headers: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json',
    'user-key': config.apiKey
  });
  private baseUrl = 'https://developers.zomato.com/api/v2.1';
  city: BehaviorSubject<City> = new BehaviorSubject(null);
  cuisines: BehaviorSubject<any> = new BehaviorSubject([]);
  cuisinesError: any = null;
  collections: BehaviorSubject<any> = new BehaviorSubject([]);
  collectionsError: any = null;

  constructor(private http: HttpClient) {
    const city = this.getInitialCity();
    this.setCity(city);

  }

  getInitialCity(): City {
    return defaultCity;
  }

  getCitySuggestions(query: string): Observable<any> {
    console.log('query in getCitySuggestions', query);
    const cityQuery = query.trim().toLowerCase();

    if (!cityQuery) {
      return of([]);
    }

    return this.http.get<any>(`https://developers.zomato.com/api/v2.1/cities?q=${cityQuery}`, { headers: this.headers })
      .pipe(
        map(res => res.location_suggestions.map(({ id, name, country_flag_url }) => ({ id, name, flag: country_flag_url }))),
        catchError(this.handleRequestError)
      );
  }

  setCity(newCity: City): void {
    const prevCity = this.city.getValue();

    if (!prevCity || prevCity.id !== newCity.id) {
      this.city.next(newCity);
      this.getCurrentCityData();
    }
  }

  private handleRequestError(err: HttpErrorResponse): any {
    console.error(err);

    return of({
      isError: true,
      statusCode: err.status,
      errorMessage: err.message,
    });
  }

  private getCurrentCityData(): void {
    console.log('isLoading: TRUE');

    forkJoin([this.getCityCuisines(), this.getCityCollections()])
      .subscribe(
        res => {
          const [cuisinesRes, collectionsRes]: [CuisinesResponse, any[]] = res;

          // console.log(JSON.stringify(collectionsRes, null, 2));
          this.updateCuisinesData(cuisinesRes);
          this.updateCollectionsData(collectionsRes);

          console.log('isLoading: FALSE', res);
          // this.logTestData();
        },
        err => {
          console.log('forkJoin err: ', err);
        }
      );
  }

  private updateCuisinesData(cuisinesRes): void {
    if (cuisinesRes.isError) {
      this.cuisinesError = cuisinesRes;
    } else {
      this.cuisines.next(cuisinesRes.data);
    }
  }

  private updateCollectionsData(data): void {
    if (data.isError) {
      this.collectionsError = data;
    } else {
      this.collections.next(data);
    }
  }

  getCityCuisines(): Observable<any> {
    const city = this.city.getValue();
    const url = `${this.baseUrl}/cuisines?city_id=${city.id}`;

    const obs = of(cuisinesResponse);

    // const obs = this.http.get<any>(url, { headers: this.headers})
    //   .pipe(catchError(this.handleRequestError));

    return obs;
  }

  getCityCollections(): Observable<any> {
    const city = this.city.getValue();
    const url = `${this.baseUrl}/collections?city_id=${city.id}`;

    // const obs = of(collectionsResponse)
    // .pipe(
    //   map((data: CollectionsResponse) => data.collections.map((item: { collection: Collection }) => item.collection))
    // );

    const obs = this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map((data: CollectionsResponse) => data.collections.map((item: { collection: Collection }) => item.collection)),
        catchError(this.handleRequestError)
      );

    return obs;
  }

  getRestaurants(params: { [k: string]: string }): Observable<any> {
    const city = this.city.getValue();
    const paramStr: string = mergeParams(params);

    console.log('paramsStr', paramStr);

    const url = `${this.baseUrl}/search?city_id=${city.id}&${paramStr}`;

    return this.http.get<any>(url, { headers: this.headers })
      .pipe(map(data => ({ ...data, restaurants: data.restaurants.map(r => r.restaurant)})));
  }
}
