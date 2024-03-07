import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Renderer2,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import {
  RxFormBuilder,
  RxFormGroup,
  RxwebValidators,
  error,
} from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';
import { WishlistService } from 'src/services/wishlist.service';

@Component({
  selector: 'app-navbar-balnk',
  templateUrl: './navbar-balnk.component.html',
  styleUrls: ['./navbar-balnk.component.scss'],
})
export class NavbarBalnkComponent {
  constructor(
    private _AuthService: AuthService,
    private _rout: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService,
    private _FormBuilder: FormBuilder,
    private _RxFormBuilder: RxFormBuilder,
    private _ToastrService: ToastrService
  ) {}
  @ViewChild('navBar') Nav!: ElementRef;
  @HostListener('window:scroll')
  scroll() {
    if (scrollY) {
      this._Renderer2.addClass(this.Nav.nativeElement, 'px-4');
    } else {
      this._Renderer2.removeClass(this.Nav.nativeElement, 'px-4');
    }
  }
  count: any = 0;
  items: any = 0;
  ngOnInit(): void {
    this.userName = localStorage.getItem('inner');
    this._WishlistService.count.subscribe({
      next: (n) => {
        this.count = n;
      },
    });
    this._CartService.CartNumber.subscribe({
      next: (data) => {
        this.items = data;
        console.log('Nav', data);
      },
    });
    this._CartService.displayCart().subscribe({
      next: (resp) => {
        this.items = resp.numOfCartItems;
      },
    });
    this._WishlistService.getList().subscribe({
      next: (resp) => {
        this._WishlistService.count.next(resp.count);
      },
    });
  }
  userName: any;
  logOut() {
    this._AuthService.logOut();
  }
  load: boolean = false;
  updatename: FormGroup = this._FormBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
  });
  name: any;
  updateName() {
    this.load = true;
    this._AuthService.updateUserData(this.updatename.value).subscribe({
      next: (resp) => {
        this.load = false;
        console.log(resp);
        this.userName = localStorage.setItem('inner', resp.user.name);
        this.userName = resp.user.name;
        this.name = '';
      },
      error: (err) => {
        console.log(err);
        this.load = false;
      },
    });
  }
  emailvalue: any;
  newMail: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.email]],
  });
  updateMail() {
    this._AuthService.updateUserData(this.newMail.value).subscribe({
      next: (res) => {
        console.log(res);
        this.emailvalue = '';
        localStorage.removeItem('userToke');
        this._rout.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // updatePassword
  // newpass:FormGroup=this._FormBuilder.group({
  //   currentPassword:[''],
  //   password:[''],
  //   rePassword:['']
  // },{Validators:this.checkPasswordMatch});

  // newpass:FormGroup = new FormGroup({
  //   currentPassword:new FormControl(''),
  //   password:new FormControl(''),
  //   rePassword:new FormControl('')
  // },{validators:this.passConfirm})

  newpass: FormGroup = new FormGroup({
    currentPassword: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(
      '',
      RxwebValidators.compare({ fieldName: 'password' })
    ),
  });

  // newpass:RxFormGroup = <RxFormGroup>this._RxFormBuilder.group({
  //   currentPassword:[''],
  //   password:[''],
  //   rePassword:['',RxwebValidators.compare({fieldName:'password'})]
  // })
  updatepass(ele: HTMLButtonElement) {
    this._AuthService.updatePassword(this.newpass.value).subscribe({
      next: (resp) => {
        console.log(resp);
        localStorage.removeItem('userToke');
        this._rout.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.warning(err.error.errors.msg);
        this.responseError = err.error.errors.msg;
      },
    });
  }
  responseError: any = '';
  passConfirm(getpass: any) {
    const pass = getpass.get('password');
    const rePass = getpass.get('rePassword');
    if (pass?.value === rePass?.value) {
      return false;
    } else {
      return rePass?.setErrors({ misMatch: true });
    }
  }
  eye: boolean = false;
  eye1: boolean = false;
  eye2: boolean = false;
  eyetoggle() {
    this.eye = !this.eye;
  }
  inputtype(e: boolean): any {
    return e == true ? 'text' : 'password';
  }
  eye1toggle() {
    this.eye1 = !this.eye1;
  }
  eye2toggle() {
    this.eye2 = !this.eye2;
  }
  // update-phone
  newPhone: FormGroup = this._FormBuilder.group({
    phone: ['', [Validators.pattern(/^(002)?01[0125][0-9]{8}$/)]],
  });
  updatePhone() {
    this._AuthService.updateUserData(this.newPhone.value).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
