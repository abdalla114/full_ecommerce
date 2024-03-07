import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentproductRoutingModule } from './componentproduct-routing.module';
import { ComponentproductComponent } from './componentproduct.component';


@NgModule({
  declarations: [
    ComponentproductComponent
  ],
  imports: [
    CommonModule,
    ComponentproductRoutingModule
  ]
})
export class ComponentproductModule { }
