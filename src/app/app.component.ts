import { Component, OnInit } from '@angular/core';
import { FoodService } from './services/food.service';
import { City } from './shared/models/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCityLoaded = false;

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getInitialCity().subscribe((city: City) => {
        this.foodService.setCity(city);
        this.isCityLoaded = city && city.id ? true : false;
    });
  }
}
