import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module'

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CollectionsBoxComponent } from './components/collections-box/collections-box.component';
import { CollectionCardComponent } from './components/collection-card/collection-card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CollectionsComponent } from './pages/collections/collections.component';

@NgModule({
  declarations: [DashboardComponent, CollectionsComponent,  CollectionsBoxComponent, CollectionCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule
  ]
})
export class DashboardModule { }
