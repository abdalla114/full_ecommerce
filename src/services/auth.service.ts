import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  token: BehaviorSubject<string> = new BehaviorSubject('');
  userData: any;
  userDecode() {
    if (localStorage.getItem('userToke') != null) {
      let encoded: any = localStorage.getItem('userToke');
      let decoded = jwtDecode(encoded);
      this.userData = decoded;
    }
  }
  setUserToken() {
    let taken = JSON.stringify(localStorage.getItem('userToke'));
    this.token.next(taken);
  }
  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      userData
    );
  }
  login(loginData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      loginData
    );
  }
  logOut() {
    localStorage.removeItem('userToke');
    this.token.next('');
    localStorage.removeItem('inner');
    this._Router.navigate(['/login']);
  }
  forgetPassword(data: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      data
    );
  }
  verifyPassword(data: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      data
    );
  }
  resetPass(data: object): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      data
    );
  }
  updateUserData(body: object): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/users/updateMe/',
      body
    );
  }
  updatePassword(pass: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      pass
    );
  }
}
