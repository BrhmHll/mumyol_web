import { Component, OnInit } from '@angular/core';
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
  currentCategory:Category = {id:0, name:"Butun Urunler", topCategoryId: 3}
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.dataLoaded = false;
    this.categoryService.getCategories().subscribe(response=> {
      if (response.success) {
        this.categories = [{id:0, name:"Butun Urunler", topCategoryId: 3}].concat(response.data);
        this.currentCategory = this.categories[0];
        this.dataLoaded = true;
      }
    });
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
}
