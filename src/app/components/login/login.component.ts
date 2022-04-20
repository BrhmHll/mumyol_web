import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService) { }

  loginForm:FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(data => {
        console.log(data)
        if (data.success) {
          this.toastrService.success("Giriş başarılı!");
          localStorage.setItem("token", data.data.token);
        }
      }, errorResponse=>{
        console.log(errorResponse.error)
        this.toastrService.error("Giriş başarısız!");
      });
    }
  }



}
