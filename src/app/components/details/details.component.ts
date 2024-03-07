import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products';
import { CartService } from 'src/services/cart.service';
import { EcomDataService } from 'src/services/ecom-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  loading:boolean=false
  productDetails:Products = {} as Products
constructor(private _ActivatedRoute:ActivatedRoute, private _EcomDataService:EcomDataService,private _CartService:CartService,private _Renderer2:Renderer2,private _ToastrService:ToastrService){}
  ngOnInit(): void {
    this.loading = true
    setTimeout(() => {
      this.loading=false
    }, 2000);
    this._ActivatedRoute.paramMap.subscribe({
      next:(id)=>{
       let product :any=  id.get('id')
       this.getDetails(product)
      }
    })
  }
  getDetails(id:string){
   this._EcomDataService.getDetails(id).subscribe({
    next:(resp)=>{
      this.productDetails = resp.data }
   })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplaySpeed:1000,
    autoplayTimeout:3000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  addToCart(id:string,ele:HTMLButtonElement){
    this._Renderer2.setAttribute(ele,'disabled','true')
    this._CartService.addTocart(id).subscribe({
      next:(resp)=>{
        this._ToastrService.success(resp.message)
        this._CartService.CartNumber.next(resp.numOfCartItems)
        this._Renderer2.removeAttribute(ele,'disabled')
        console.log(resp);
        
      }
    })
  }
}
