import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products';
import { CartService } from 'src/services/cart.service';
import { EcomDataService } from 'src/services/ecom-data.service';
import { WishlistService } from 'src/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor (private _EcomDataService:EcomDataService,private _CartService:CartService ,private _ToastrService:ToastrService , private _Renderer2:Renderer2,private _WishlistService:WishlistService){}
  proData:Products[]=[]
  wishListData:string[]=[]
  storedData:string[]=[]
  pageItems!:number
  currentPage:number = 1
  loading:boolean=false
  total!:number
  search:string = ''
  ngOnInit(): void {
    this._EcomDataService.getProducts().subscribe({
      next:(response)=>{
        this.total = response.results
        this.proData = response.data
        this.currentPage = response.metadata.currentPage
        this.pageItems = response.metadata.limit
        console.log(response);
      }
    })
    this._WishlistService.getList().subscribe({
      next:(resp)=>{
        const currentData = resp.data.map(((item:any)=>item._id))
        this.wishListData = currentData
      }
    })
  }
  addtoCart(id:string,ele:HTMLButtonElement){
    this._Renderer2.setAttribute(ele,'disabled','true')
    this._CartService.addTocart(id).subscribe({
      next:(resp)=>{
        this._Renderer2.removeAttribute(ele,'disabled')
        this._CartService.CartNumber.next(resp.numOfCartItems)
      }
    })
    }
    handleBtn(e:Event){
      e.stopPropagation()
    }
    pageChanged(e:any){
      this._EcomDataService.getProducts(e).subscribe({
        next:(response)=>{
          this.total = response.results
          this.proData = response.data
          this.currentPage = response.metadata.currentPage
          this.pageItems = response.metadata.limit
          console.log(response);
          
        }
      })
      console.log(e);
    }
    exist:boolean = true
    checkExist(id:string):boolean{
      if (this.wishListData.includes(id)){
        return this.exist =true
      }
      else{
        return this.exist = false
      }
    }
    addtoWishList(id:string){
      this._WishlistService.addToList(id).subscribe({
        next:(resp)=>{
          console.log(resp);
          this.wishListData = resp.data
         if (this.exist == false){
          this._ToastrService.success(resp.message)
          this._WishlistService.count.next(resp.data.length)
          
         }
         else if (this.exist == true){
          this._ToastrService.warning('Its Already Exist')
         }
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
  }

