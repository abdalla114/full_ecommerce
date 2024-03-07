import { Products, Subcategory } from './../../interfaces/products';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { brand } from 'src/app/interfaces/brand';
import { Brand, Product } from 'src/app/interfaces/cart';
import { BrandService } from 'src/services/brand.service';
declare let $:any
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  constructor(private _BrandService:BrandService){}
 brands:brand[]=[];  
 pageSize:any = 0
 p:any=0
 total:any=0
 pageChanged(e:any){
  this._BrandService.dispalyBrands(25,e).subscribe({
    next:(resp)=>{
      this.pageSize = resp.metadata.limit
      this.p = resp.metadata.currentPage
      this.total = resp.results
      console.log(resp);
      this.brands = resp.data
    }
  })
 }
ngOnInit(): void {
  this._BrandService.dispalyBrands(25).subscribe({
    next:(resp)=>{
      this.pageSize = resp.metadata.limit
      this.p = resp.metadata.currentPage
      this.total = resp.results
      console.log(resp);
      this.brands = resp.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
show:boolean=false
source:any=''
getImageSrc(e:any){
     this.source = e
    console.log(this.source);
}
stop(e:Event){
  e.stopPropagation()
}
}
