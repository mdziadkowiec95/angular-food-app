import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'restaurants', component: RestaurantsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
