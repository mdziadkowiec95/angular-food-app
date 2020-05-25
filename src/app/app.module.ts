import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { AuthBoxComponent } from './components/auth-box/auth-box.component';

import { HomeModule } from './modules/home/home.module';

const fbConfig = {
 
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CitySelectorComponent,
    RestaurantsComponent,
    LoaderComponent,
    AuthBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(fbConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
