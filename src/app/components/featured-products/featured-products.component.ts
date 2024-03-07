import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products';
import { CartService } from 'src/services/cart.service';
import { EcomDataService } from 'src/services/ecom-data.service';
import { WishlistService } from 'src/services/wishlist.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {
  loading!:boolean
  count:number = 0 
  products:Products[]=[]
  wishlistData:string[]=[]
  exist:boolean=false
  disabled:boolean = false
  constructor (private _EcomDataService:EcomDataService,private _CartService:CartService ,private _ToastrService:ToastrService , private _Renderer2:Renderer2,private _wishList:WishlistService){}
  ngOnInit(): void {
    this._wishList.getList().subscribe({
      next:(resp)=>{
        console.log(resp); 
        const newData = resp.data.map((item:any)=>item._id)
        console.log(newData);
        this.wishlistData = newData
      }
    })
    this.loading=true
    this._EcomDataService.getProducts().subscribe({
      next:(response)=>{
        this.loading=false
        this.products = response.data
      },
      error:()=>{
        this.loading=false
      }
    })
  }
  handleBtn(e:Event){
    e.stopPropagation()
  }
  items:any = ''
  stop(e:Event){
    e.stopPropagation()
  }
  addtoCart(id:string,element:HTMLButtonElement):void{
    this.disabled = true
    this._Renderer2.setAttribute(element,'disabled','true')
    this._CartService.addTocart(id).subscribe({
      next:(response)=>{
        this.items=response.numOfCartItems
        this._CartService.CartNumber.next(this.items)
        if(this.disabled){
          console.log(this.items);
          this._ToastrService.success(response.message)
          this.disabled=false
          this._Renderer2.removeAttribute(element,'disabled')
        }
               
      },
      error:(err)=>{
        console.log(err);
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }
 checkInculded(id:string):any{
  if (this.wishlistData.includes(id)){
   return this.exist = true
  }
  else if(this.wishlistData.includes(id)==false){
   return this.exist = false
  }
  return this.exist
 }
  addtoList(id:string){
    this.exist=true
    this._wishList.addToList(id).subscribe({
      next:(resp)=>{
        console.log(resp);
        this.wishlistData = resp.data
        console.log(this.wishlistData);
        this._wishList.count.next(resp.data.length)
        if(this.exist==true)
        {
          this._ToastrService.warning('This Product is already added to your favourites')
          
        }
       else if(this.exist==false){
        this.exist=false
        this._ToastrService.success(resp.message)
       }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
