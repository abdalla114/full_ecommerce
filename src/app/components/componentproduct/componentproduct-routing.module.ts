import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentproductComponent } from './componentproduct.component';

const routes: Routes = [{ path: '', component: ComponentproductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentproductRoutingModule { }
