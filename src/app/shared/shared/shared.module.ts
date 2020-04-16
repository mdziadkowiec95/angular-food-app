import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    // ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
