import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { environment as env_prod } from 'src/environments/environment.prod';
import { Ads } from '../models/ads';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  apiUrl = isDevMode() ? env.apiUrl : env_prod.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getAllAds() : Observable<ListResponseModel<Ads>>{
    return this.httpClient.get<ListResponseModel<Ads>>(this.apiUrl + "ads/getall");
  }

  addAdsImage(image:File) : Observable<ResponseModel>{
    const formData: FormData = new FormData();
    formData.append('Image', image);
    let newPath = this.apiUrl + "Ads/addnewads";
    return this.httpClient.post<ResponseModel>(newPath, formData, {
      reportProgress: true,
      responseType: 'json'
    })
  }

  deleteAdsById(id:number) : Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl + "Ads/deleteads?adsId=" + id);
  }
}
