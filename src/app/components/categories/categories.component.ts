import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/interfaces/categories';
import { EcomDataService } from 'src/services/ecom-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcomDataService:EcomDataService){}
  categoriesList:Categories[]=[]
  ngOnInit(): void {
    this._EcomDataService.getCategories().subscribe({
      next:(response)=>{
        this.categoriesList = response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
