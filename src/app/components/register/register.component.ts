import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router,private _formBuilder:FormBuilder){}
  errorMsg:string='';
  isLoading:boolean=false;
registerForm:FormGroup = new FormGroup(
 {
  name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z]{6,}$/)]),
  rePassword:new FormControl('',Validators.required),
  phone: new FormControl('',[Validators.required,Validators.pattern(/^(002)?01[0125][0-9]{8}$/)])
 },{validators:this.passConfirm})
// registerForm :FormGroup = this._formBuilder.group({
//   name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
//   email:['',[Validators.required,Validators.email]],
//   password:['',[Validators.required,Validators.pattern(/^[A-Z][a-z]{6,}$/)]],
//   rePassword:[''],
//   phone:['',[Validators.required],,Validators.pattern(/^(002)?01[0125][0-9]{8}$/)]
// },{Validators:[this.passConfirm]} as FormControlOptions)
passConfirm(getpass:any){
  const pass = getpass.get('password');
  const rePass = getpass.get('rePassword');
  if(pass?.value === rePass?.value){
    return false
  }
  else{
    return rePass?.setErrors({'misMatch':true})
  }
}
handleForm(){
  const userData=this.registerForm.value;
  console.log(userData);
  
 if(this.registerForm.valid == true && !this.isLoading)
{
  this.isLoading = true;
   this._AuthService.register(userData).subscribe(
{
  next:(data)=>{
    console.log(data);
    if(data.message === 'success'){
      this._Router.navigate(['/login'])
      this.isLoading=false
    }
  },
  error:(err)=>{
    console.log(err);
    this.errorMsg = err.error.message
    this.isLoading=false
    
  }
}
)
}
else{
  this.registerForm.markAllAsTouched()
}
}
}
