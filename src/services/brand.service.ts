import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private _HttpClient:HttpClient) { }
  dispalyBrands(limit:number,page:number=1):Observable<any>{
  return  this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands?limit=${limit}&page=${page}`)
  }
  getProductsofBrand(brandid:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandid}`)
  }
}
