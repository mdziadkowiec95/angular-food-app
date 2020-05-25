import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { City } from 'src/app/shared/models/city';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  city: Observable<City>;

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.city = this.foodService.city;
  }

}
