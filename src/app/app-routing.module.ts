import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CategoryproductComponent } from './components/categoryproduct/categoryproduct.component';
import { PeoductbybrandComponent } from './components/peoductbybrand/peoductbybrand.component';

const routes: Routes = [
  {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'Home'},
    {path:'cart',component:CartComponent,title:'Cart'},
    {path:'products',component:ProductsComponent,title:'Products'},
    {path:'category',component:CategoriesComponent,title:'Categoties'},
    {path:'brands',component:BrandsComponent,title:'Brands'},
    {path:'details/:id',component:DetailsComponent,title:'Details'},
    {path:'payment/:id',component:PaymentComponent,title:'payment'},
    {path:'allorders',component:AllordersComponent,title:'Orders'},
    {path: 'wishlist', loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule),title:'WishList' },
    {path:'setting',loadChildren:()=>import('./setting/setting.module').then((x)=>x.SettingModule)},
    {path:'categorypro/:id',component:CategoryproductComponent},
    {path:'probrand/:id',component:PeoductbybrandComponent}
  ]},
  {path:'',component:AuthLayoutComponent,children:[   
  {path:'login',component:LoginComponent,title:'Login Page'},
  {path:'register',component:RegisterComponent,title:'Register Page'},
  {path:'reset',component:ResetpassComponent,title:'Reset Password Page'}
  ]},
 
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
