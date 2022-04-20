import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://31.223.4.9:5000/api/';
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
}
