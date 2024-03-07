import { Component, Renderer2 } from '@angular/core';
import { cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private _CartService:CartService,private _Renderer2:Renderer2){}
  cartProducts:cart[]=[]
  cartresp!:any
  counter!:number
  loading:boolean=false
  changeCount(n:number,id:string,el1:HTMLButtonElement,el2:HTMLButtonElement)
  {
    if(n>0){
      this._Renderer2.setAttribute(el1,'disabled','true')
      this._Renderer2.setAttribute(el2,'disabled','true')
      this._CartService.updateCount(id,n).subscribe({
        next:(data)=>{
          this.cartProducts = data.data.products 
          this._Renderer2.removeAttribute(el1,'disabled')
          this._Renderer2.removeAttribute(el2,'disabled')
        },
        error:(err)=>{
          console.log(err);
          this._Renderer2.removeAttribute(el1,'disabled')
          this._Renderer2.removeAttribute(el2,'disabled')
        }
      })
    }
    
  }


  ngOnInit(): void {
    this.loading=true
    this._CartService.displayCart().subscribe({
      next:(response)=>{
        this.cartProducts=response.data.products;
        this.cartresp=response.data;
        this.loading=false
        console.log(this.cartresp);
      },
      error:(err)=>{
        console.log(err);
        this.loading=false
      }
    })
  }
  deleteItem(id:any,rem?:HTMLButtonElement){
    this._Renderer2.setAttribute(rem,'disabled','true')
    this._CartService.deleteItem(id).subscribe({
      next:(resp)=>{
      console.log(resp);
      this.cartProducts = resp.data.products
      this._CartService.CartNumber.next(resp.numOfCartItems)
      this._Renderer2.removeAttribute(rem,'disabled')
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  clearAll(clear:HTMLButtonElement){
    this._Renderer2.setAttribute(clear,'disabled','true')
    this._CartService.clearallCart().subscribe({
      next:(resp)=>{
        console.log(resp);
        this._CartService.CartNumber.next(0)
        this._Renderer2.removeAttribute(clear,'disabled')
         this.cartProducts.length=0
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
