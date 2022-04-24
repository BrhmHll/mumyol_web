import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { UserProfile } from '../models/userProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://31.223.4.9:5000/api/";
  constructor(private httpClient:HttpClient) { }

  getUsers() : Observable<ListResponseModel<UserProfile>>{
    let newPath = this.apiUrl + "User/getalluserprofile";
    return this.httpClient.get<ListResponseModel<UserProfile>>(newPath);
  }
}
