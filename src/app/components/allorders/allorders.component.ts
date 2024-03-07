import { Component, OnInit } from '@angular/core';
import { Allorders } from 'src/app/interfaces/allorders';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
})
export class AllordersComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _AuthService: AuthService
  ) {}
  data: Allorders[] = [];
  ngOnInit(): void {
    console.log();

    let cartowner: string = '';
    this._AuthService.userDecode();
    this._CartService.getAllorders(this._AuthService.userData.id).subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
