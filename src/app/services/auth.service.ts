import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { environment as env_prod } from 'src/environments/environment.prod';
import { DataResponseModel } from '../models/dataResponseModel';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/ResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiUrl = isDevMode() ? env.apiUrl : env_prod.apiUrl;

  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel): Observable<DataResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/login';
    while (loginModel.phoneNumber.match(' ')) {
      loginModel.phoneNumber = loginModel.phoneNumber.replace(' ', '');
    }
    return this.httpClient.post<DataResponseModel<TokenModel>>(
      newPath,
      loginModel
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  resetUserPassword(userId:number) : Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl + "auth/resetpasswordbyadmin?userId=" + userId.toString());
  }
}
