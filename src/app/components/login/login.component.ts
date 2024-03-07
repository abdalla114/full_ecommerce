import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router,private _FormBuilder:FormBuilder,private _Renderer2:Renderer2){}
  // loginForm:FormGroup = new FormGroup({
  //   email:new FormControl ('',[Validators.required,Validators.email]),
  //   password:new FormControl('',)
  // })
  loginForm:FormGroup = this._FormBuilder.group({
    email:new FormControl ('',[Validators.required,Validators.email]),
    password:new FormControl('',)
  })
  updated:boolean = false
  errorMsg:string='';
   errormsgg:string = '';
   emailExist:boolean=false;
  isLoading:boolean=false;
  loading:boolean=false;
  validcodemsg :string = '';
  invalidcodemsg:string = ''
  validCode:boolean=false
  invalidCode:boolean = false;
  verifyLoad:boolean = false;
  resetLoad:boolean = false;
  validmail:string = '';
  validrestmail:boolean = false;
  showform1:boolean = false;
  showform2:boolean = false;
  eye:boolean = false;
  eyetoggle(){
    this.eye =! this.eye
  }
  inputtype(){
    return this.eye == false ? 'password' : 'text'
  }
  handleLogin(){
    const info = this.loginForm.value
if(this.loginForm.valid && !this.isLoading){
  this.isLoading = true
  this._AuthService.login(info).subscribe({
    next:(resp)=>{
      if(resp.message == 'success')
      console.log(resp);
    localStorage.setItem("userToke",resp.token)
    this._AuthService.userDecode()
    localStorage.setItem("inner",this._AuthService.userData.name)
      this._Router.navigate(['/home'])
      this.isLoading=false
    },
    error:(err)=>{
      console.log(err);
      this.errorMsg=err.error.message
      this.isLoading=false
    }
  })
}
else{
  this.loginForm.markAllAsTouched()
}
  }

  forgetPassword:FormGroup = this._FormBuilder.group({
    email:['',[Validators.email]]
  })

  verify:FormGroup = this._FormBuilder.group({
    resetCode:['',[Validators.required]]
  })

  reset:FormGroup = this._FormBuilder.group({
    email:['',[Validators.email]],
    newPassword:['',[Validators.required,Validators.pattern(/^[A-Z][a-z]{6,}$/)]]
  })

  handleForgetPassword(){
    this.loading=true
  if(this.forgetPassword.valid){
    this._AuthService.forgetPassword(this.forgetPassword.value).subscribe({
      next:(resp)=>{
        console.log(resp);
        if(resp.statusMsg == 'success'){
        this.validmail = resp.message
          this.emailExist = false
          this.loading=false
          this.showform1 = true
        }
      },
      error:(err)=>{
        this. errormsgg = err.error.message
        if(err.error.statusMsg == 'fail'){
          this.emailExist = true
          this.loading =false
        }
        console.log(err.error.message);
      }
    })
  }
  }
  handleVerifaction(){
    this.verifyLoad = true
    this._AuthService.verifyPassword(this.verify.value).subscribe({
      next:(resp)=>{
        if(resp.status == 'Success')
     {   
      this.validCode = true
      this.invalidCode=false
      this.verifyLoad =false
      this.validcodemsg = resp.status
      this.showform2 = true
        console.log(resp);
        this._Router.navigate(['/login'])
      }
      },
      error:(err)=>{
        this.invalidcodemsg = err.error.message
        this.validCode = false
        this.invalidCode =true
        this.verifyLoad =false;
        console.log(err);
        
      }
    })
  }
  resetPassword(){
    this.resetLoad = true
    this._AuthService.resetPass(this.reset.value).subscribe({
      next:(data)=>{
        console.log(data);
        this.resetLoad = false
        this.updated = true
      },
      error:(err)=>{
        this.resetLoad = false
        console.log(err);
        
      }
    })
  }
}
