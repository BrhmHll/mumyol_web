import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from 'src/app/models/userProfile';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  searchKey:string = "";
  users:UserProfile[] = [];
  selectedUser:UserProfile = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    balance: 0,
    status: false
  }

  constructor(private userService:UserService, private toastrService:ToastrService, private authService:AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(){
    this.userService.getUsers().subscribe(data => {
      if (data.success) {
        this.users = data.data;
      } else {
        this.toastrService.error("Kullanıcı verilerine erişilemiyor...", "Hata");
      }
    }, errorResponse => this.toastrService.error(errorResponse.error.message, "Hata"));
  }

  resetPassword(){
    this.authService.resetUserPassword(this.selectedUser.id).subscribe(response => {
      if (response.success) {
        this.toastrService.success(response.message , "Başarılı");
        this.getUsers();
      } else {
        this.toastrService.error(response.message, "Hata");
      }
    }, errorResponse => this.toastrService.error(errorResponse.error.message, "Hata"))
  }

  setStatusOfUser(){
    this.userService.setStatusOfUser(this.selectedUser.id, !this.selectedUser.status).subscribe(response => {
      if (response.success) {
        this.toastrService.success(response.message , "Başarılı");
        this.getUsers();
      } else {
        this.toastrService.error(response.message, "Hata");
      }
    }, errorResponse => this.toastrService.error(errorResponse.error.message, "Hata"));
  }
}
