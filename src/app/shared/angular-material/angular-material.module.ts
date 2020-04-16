import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



const modules: any[] = [
  MatGridListModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class AngularMaterialModule { }
