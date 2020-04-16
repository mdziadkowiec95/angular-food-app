import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';
import { CollectionsBoxComponent } from './components/collections-box/collections-box.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CollectionCardComponent } from './components/collection-card/collection-card.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    CitySelectorComponent,
    CollectionsBoxComponent,
    CollectionsComponent,
    CollectionCardComponent,
    RestaurantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
