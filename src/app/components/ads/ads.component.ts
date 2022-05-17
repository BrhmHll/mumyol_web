import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ads } from 'src/app/models/ads';
import { AdsService } from 'src/app/services/ads.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  apiUrl = environment.staticFilesUrl; //resim server

  ads:Ads[] = [];

  constructor(private adsService:AdsService,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllImages();
  }

  addImage(event:any){
    let file: File = event.target.files[0];
    if (file && file.name != '') {
      this.adsService.addAdsImage(file).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(file.name, 'Başarılı');
            this.getAllImages();
          } else {
            this.toastrService.success(file.name, 'Hata');
          }
        },
        (responseError) => {
          this.toastrService.error(file.name, 'Hata');
        }
      );
    }

  }

  deleteImage(id:number){
    this.adsService.deleteAdsById(id).subscribe(
      (response) => {
        if (response.success) {
          this.toastrService.success(response.message, 'Başarılı');
          this.getAllImages();
        } else {
          this.toastrService.success(response.message, 'Hata');
        }
      },
      (responseError) => {
        this.toastrService.error(responseError.message, 'Hata');
      }
    );
  }

  getAllImages(){
    this.adsService.getAllAds().subscribe(response => {
      if (response.success) {
        this.ads = response.data;
      }
    });
  }

}
