import { Component, OnInit } from '@angular/core';
import { FoodService } from './services/food.service';
import { City } from './shared/models/city';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCityLoaded = false;

  constructor(private auth: AuthService, private foodService: FoodService) {}

  ngOnInit(): void {

    this.auth.user$.subscribe(user => {
      console.log(user);
    });

    this.foodService.getInitialCity().subscribe((city: City) => {
        this.foodService.setCity(city);
        this.isCityLoaded = city && city.id ? true : false;
    });
  }
}
