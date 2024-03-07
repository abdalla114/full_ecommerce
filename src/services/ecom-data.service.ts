import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomDataService {
  constructor(private _HttpClient:HttpClient) {}
   getProducts(page:number=1,limit:number=20):Observable<any>{
   return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`)
   }
   getDetails(id:string):Observable<any>{
   return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   }
   getCategories():Observable<any>{
   return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   }
   getProductbyComp(id:string|null):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
   }

}
