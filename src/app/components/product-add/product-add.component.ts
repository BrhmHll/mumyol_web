import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup = new FormGroup({});
  categories: Category[] = [];
  uploadedProductId: number = 2;
  image1: File = new File([], '');
  image2: File = new File([], '');
  image3: File = new File([], '');
  image4: File = new File([], '');
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.createProductAddForm();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      if (response.success) {
        this.categories = response.data;
      }
    });
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: [0, Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      unit: ['', Validators.required],
      purchasePrice: [0.0, Validators.required],
      wholesalePrice: [0.0, Validators.required],
      retailPrice: [0.0, Validators.required],
      minQuantityForWholesale: [100, Validators.required],
      payBackRate: [5, Validators.required],
      stockAmount: [0, Validators.required],
      isActive: [true, Validators.required],
    });
  }
  productAdd() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.addProduct(productModel).subscribe(
        (data) => {
          if (data.success) {
            this.toastrService.success('Ürün Eklendi!', 'Başarılı');
            this.uploadedProductId = data.data.id;
            this.addImages();
          } else {
            this.toastrService.error('Hatalı veri girişi!', 'Dikkat');
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Dikkat');
          console.log()
          // if (responseError.error.Errors.lenght > 0) {
          //   console.log(responseError.error.Errors)
          //   this.toastrService.error(responseError.error.Errors, responseError.error.Message);
          // }
        }
      );
    } else {
      this.toastrService.error(
        'Ürün Bilgilerini Eksiksiz Doldurunuz!',
        'Dikkat'
      );
    }
  }

  addImages() {
    this.addImage(this.image1);
    this.addImage(this.image2);
    this.addImage(this.image3);
    this.addImage(this.image4);
  }
  addImage(file: File) {
    console.log(file);
    if (file && file.name != '') {
      this.productService
        .addProductImage(file, this.uploadedProductId)
        .subscribe((response) => {
          if (response.success) {
            this.toastrService.success(file.name, 'Başarılı');
          } else {
            this.toastrService.success(file.name, 'Hata');
          }
        },
        (responseError) => {
          this.toastrService.success(file.name, 'Hata');
        });
    }
  }
  selectImage(event: any, imageNo: number) {
    switch (imageNo) {
      case 1:
        this.image1 = event.target.files[0];
        break;
      case 2:
        this.image2 = event.target.files[0];
        break;
      case 3:
        this.image3 = event.target.files[0];
        break;
      case 4:
        this.image4 = event.target.files[0];
        break;
      default:
        break;
    }
  }
}
