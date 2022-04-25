import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dataLoaded:boolean = false;
  categories:Category[] = [];
  currentCategory:Category = {id:0, name:"Butun Urunler", imagePath:""}
  apiUrl = "http://31.223.4.9:5001"; //resim server
  categoryNameForAdd = "";
  categoryNameForAddClicked = false;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  constructor(private categoryService:CategoryService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  openFileDiolog(){
    this.fileInput?.nativeElement.click();
  }

  getCategories(){
    this.dataLoaded = false;
    this.categoryService.getCategories().subscribe(response=> {
      if (response.success) {
        this.categories = [{id:0, name:"Butun Urunler", imagePath:""}].concat(response.data);
        this.currentCategory = this.categories[0];
        this.dataLoaded = true;
      }
    });
  }

  addImage(event:any){
    let file: File = event.target.files[0];
    if (file && file.name != '') {
      this.categoryService.addCategoryImage(file, this.currentCategory.id).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(file.name, 'Başarılı');
            this.getCategories();
          } else {
            this.toastrService.success(file.name, 'Hata');
          }
        },
        (responseError) => {
          this.toastrService.success(file.name, 'Hata');
        }
      );
    }
  }

  setCurrentCategory(category:Category){
    this.currentCategory = category;
  }

  getCurrentCategoryClass(category:Category){
    if (category == this.currentCategory) {
      return "list-group-item list-group-item-action active";
    }
    else{
      return "list-group-item list-group-item-action"
    }
  }

  addCategory(){
    if (this.categoryNameForAddClicked) {
      this.categoryService.addCategory(this.categoryNameForAdd).subscribe(response => {
        if (response.success) {
          this.categoryNameForAddClicked = false;
          this.getCategories();
        } else {
          this.toastrService.error(response.message, "Kategori Eklenemedi");
        }
      }, errorResponse => {
        console.log(errorResponse)
        this.toastrService.error(errorResponse.error.message, "Kategori Eklenemedi");
      });
    }else{
      this.categoryNameForAddClicked = true;
    }
  }
}
