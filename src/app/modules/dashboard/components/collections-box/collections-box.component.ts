import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/shared/models/collections';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { City } from 'src/app/shared/models/city';

@Component({
  selector: 'app-collections-box',
  templateUrl: './collections-box.component.html',
  styleUrls: ['./collections-box.component.scss']
})
export class CollectionsBoxComponent implements OnInit {
  @Input() showAll = false;

  city: Observable<City>;
  collections: Collection[] = [];

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.foodService.collections.subscribe(collections => {
      this.collections = this.showAll ? collections : collections.slice(0, 5);
    });

    this.city = this.foodService.city;
  }

}
