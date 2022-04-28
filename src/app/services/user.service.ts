import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { UserProfile } from '../models/userProfile';
import { environment as env } from 'src/environments/environment';
import { environment as env_prod } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = isDevMode() ? env.apiUrl : env_prod.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getUsers() : Observable<ListResponseModel<UserProfile>>{
    let newPath = this.apiUrl + "User/getalluserprofile";
    return this.httpClient.get<ListResponseModel<UserProfile>>(newPath);
  }

  setStatusOfUser(userId:number, status:boolean){
    return this.httpClient.post<ListResponseModel<UserProfile>>( this.apiUrl + "User/updateuserstatus", {
      "userId" : userId,
      "status" : status
    });
  }
}
