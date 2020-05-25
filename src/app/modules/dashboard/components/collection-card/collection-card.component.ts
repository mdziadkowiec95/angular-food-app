import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/shared/models/collections';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent implements OnInit {
  @Input() collection: Collection;

  constructor() { }

  ngOnInit() {
  }

}
