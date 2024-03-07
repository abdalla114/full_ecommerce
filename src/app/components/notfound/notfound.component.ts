import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {
  constructor(private _router:Router){}
  islogged:boolean = false;

noFound(){
  if(localStorage.getItem("userToke")!=null){
    this._router.navigate(['/home'])
  }
  else{
    this.islogged=true
  }
}
login(){

  this._router.navigate(['/login'])
}
}
