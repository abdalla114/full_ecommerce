import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private _CartService:CartService ,private _FormBuilder:FormBuilder,private _ActivatedRoute:ActivatedRoute){}
  loading:boolean = false
   alink :string|any= ''
   spin:boolean = false
  ngOnInit(): void {
    this.loading = true
    // setInterval(()=>{
    //   this.loading = false
    // },1000)
    setTimeout(() => {
      this.loading = false
    }, 2000);
    this._ActivatedRoute.paramMap.subscribe({
      next:(link)=>{
        this.alink = link.get('id')
      }
    })
  }
  checkForm:FormGroup = this._FormBuilder.group({
    details:[''],
    phone:[''],
    city:['']
  })

  checkOut(){
   if(!this.spin){
    this.spin=true
    this._CartService.checkOut(this.alink,this.checkForm.value).subscribe({
      next:(resp)=>{
        this.spin =false
        console.log(resp);
        if(resp.status == 'success'){
          window.open(resp.session.url)
        }
        
      },
      error:(err)=>{
        console.log(err);
        this.spin =false
      }
     })
   }
  }


}
