import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { WishlistService } from 'src/services/wishlist.service';
import { Products } from '../interfaces/products';
import { CartService } from 'src/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  listProducts: Products[] = [];
  wishListData: string[] = [];
  storedWish: string[] = [];
  @ViewChild('addBtn') add!: ElementRef;
  count: number = 0;
  appear: boolean = true;
  ngOnInit(): void {
    this.storedWish = this.wishListData;
    this._WishlistService.count.subscribe({
      next: (n) => {
        this.count = n;
      },
    });
    this._WishlistService.getList().subscribe({
      next: (resp) => {
        this.listProducts = resp.data;
        console.log(resp);
        this._WishlistService.count.next(resp.data.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handleBtn(e: Event) {
    e.stopPropagation();
  }
  addtoCart(id: string, ele: HTMLButtonElement) {
    this._Renderer2.setAttribute(ele, 'disabled', 'true');
    this._CartService.addTocart(id).subscribe({
      next: (resp) => {
        this._CartService.CartNumber.next(resp.numOfCartItems);
        this.count = resp.data.length + 1;
        this._ToastrService.success(resp.message);
        this._Renderer2.removeAttribute(ele, 'disabled');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  delFromCart(id: string) {
    this._WishlistService.delList(id).subscribe({
      next: (res) => {
        this._ToastrService.error(res.message);
        console.log(res);
        this._WishlistService.count.next(res.data.length);
        this._WishlistService.getList().subscribe({
          next: (res) => {
            this.listProducts = res.data;
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
