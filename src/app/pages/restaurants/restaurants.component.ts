import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  restaurantsData$: Observable<any[]>;

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.restaurantsData$ = this.foodService.getRestaurants(params);
    });
  }
}
