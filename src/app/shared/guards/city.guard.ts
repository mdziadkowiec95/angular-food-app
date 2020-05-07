import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityGuard implements CanActivate {
  constructor(private foodService: FoodService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isCity = this.foodService.city.getValue();

    if (isCity) {
      return true;
    }

    return this.foodService.getInitialCity().pipe(map(city => {
      if (city) {
        this.foodService.setCity(city);
        return true;
      }
      return false;
    }));
  }
}
