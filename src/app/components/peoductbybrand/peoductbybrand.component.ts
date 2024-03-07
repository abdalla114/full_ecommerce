import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products';
import { BrandService } from 'src/services/brand.service';
import { CartService } from 'src/services/cart.service';
import { WishlistService } from 'src/services/wishlist.service';

@Component({
  selector: 'app-peoductbybrand',
  templateUrl: './peoductbybrand.component.html',
  styleUrls: ['./peoductbybrand.component.scss']
})
export class PeoductbybrandComponent {
constructor(private _ActivatedRoute:ActivatedRoute , private _BrandService:BrandService,private _WishlistService:WishlistService ,private _ToastrService:ToastrService ,private _Renderer2:Renderer2,private _CartService:CartService){}
products:Products[]=[]
wishList:string[]=[]

ngOnInit(): void {
  let id :any =0
  this._ActivatedRoute.paramMap.subscribe({
    next:(valu)=>{
      id= valu.get('id')
      this._BrandService.getProductsofBrand(id).subscribe({
        next:(resp)=>{
          this.products = resp.data
          console.log(this.products);
          
        }
      })
    }
  })
  this._WishlistService.getList().subscribe({
    next:(res)=>{
      console.log(res);
      const data = res.data.map((item:any)=>item._id)
      this.wishList=data
    }
  })
}
handleBtn(e:Event){
  e.stopPropagation()
}
exist:boolean = true

checkExist(id:string):any{
  if(this.wishList.includes(id)==true){
    return this.exist = true
  }
  else if (this.wishList.includes(id)){
    return this.exist=false
  }
}
addtoWishList(id:string){
  this._WishlistService.addToList(id).subscribe({
    next:(res)=>{
      this._WishlistService.count.next(res.data.length)
      this._ToastrService.success(res.message)
      this.wishList=res.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
addtoCart(id:string,ele:HTMLButtonElement){
  this._Renderer2.setAttribute(ele,'disabled','true')
this._CartService.addTocart(id).subscribe({
  next:(res)=>{
    console.log(res);
    this._ToastrService.success(res.message)
    this._CartService.CartNumber.next(res.numOfCartItems)
    this._Renderer2.removeAttribute(ele,'disabled')
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}
delFromList(id:string){
  this._WishlistService.delList(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._WishlistService.count.next(res.data.length)
      this._ToastrService.error(res.message)
      this.wishList=res.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
