import { Component, OnInit } from '@angular/core';
import { FoodService } from './services/food.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.city.subscribe(city => this.city = city);
  }
}
