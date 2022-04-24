import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from 'src/app/models/userProfile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:UserProfile[] = [];

  constructor(private userService:UserService, private toastrService:ToastrService) { }

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
}
