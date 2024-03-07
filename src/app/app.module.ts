import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { NavbarBalnkComponent } from './components/navbar-balnk/navbar-balnk.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { DetailsComponent } from './components/details/details.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { SpinnerInterceptor } from './spinner.interceptor';
import { TrimPipe } from './trim.pipe';
import { SearchPipePipe } from './search-pipe.pipe';
import { CategoryproductComponent } from './components/categoryproduct/categoryproduct.component';
import { PeoductbybrandComponent } from './components/peoductbybrand/peoductbybrand.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NavbarAuthComponent,
    NavbarBalnkComponent,
    FooterComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    MainSliderComponent,
    CategorySliderComponent,
    FeaturedProductsComponent,
    DetailsComponent,
    ResetpassComponent,
    PaymentComponent,
    AllordersComponent,
    TrimPipe,
    SearchPipePipe,
    CategoryproductComponent,
    PeoductbybrandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    FormsModule,
    RxReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:MyhttpInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:SpinnerInterceptor,multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
