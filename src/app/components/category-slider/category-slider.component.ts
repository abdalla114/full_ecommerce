import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Categories } from 'src/app/interfaces/categories';
import { EcomDataService } from 'src/services/ecom-data.service';
@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss'],
})
export class CategorySliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin:5,
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  categoris :Categories[]= [];
constructor(private _EcomDataService:EcomDataService){}
ngOnInit(): void {
  this._EcomDataService.getCategories().subscribe({
    next:(resp)=>{
      this.categoris = resp.data
    }
  })
}
}
