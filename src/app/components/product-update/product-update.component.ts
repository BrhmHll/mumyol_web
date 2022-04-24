import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/productImage';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { InsufficientStockSummaryComponent } from '../insufficient-stock-summary/insufficient-stock-summary.component';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  apiUrl = 'http://31.223.4.9:5001'; //resim server
  productUpdateForm: FormGroup = new FormGroup({});
  categories: Category[] = [];
  productImages: ProductImage[] = [];
  addCount: number[] = [];
  product: Product = {
    id: 0,
    brand: '',
    categoryId: 0,
    categoryName: '',
    description: '',
    imagePaths: [],
    isActive: true,
    minQuantityForWholesale: 0,
    name: '',
    payBackRate: 0,
    purchasePrice: 0,
    retailPrice: 0,
    stockAmount: 0,
    unit: '',
    wholesalePrice: 0,
  };
  image1: File = new File([], '');
  image2: File = new File([], '');
  image3: File = new File([], '');
  image4: File = new File([], '');
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkToastShow();
    this.getCategories();
    this.activatedRoute.params.subscribe((params) => {
      this.getProduct(params['productId']);
    });
    this.createProductAddForm();
  }

  getProduct(productId: number) {
    this.productService.getProduct(productId).subscribe(
      (data) => {
        if (data.success) {
          this.product = data.data;
          this.getImages(productId);
        } else {
          this.toastrService.error('Ürün bulunamadı!');
        }
      },
      (error) => {
        this.toastrService.error(error.error.message);
      }
    );
  }

  getImages(productId: number) {
    this.productService.getProductImages(productId).subscribe((data) => {
      if (data.success) {
        this.productImages = data.data;
        this.addCount = [];
        for (let i = data.data.length + 1; i < 5; i++) {
          this.addCount.push(i);
        }
      } else {
        this.toastrService.error('Ürün resimleri bulunamadı!');
      }
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      if (response.success) {
        this.categories = response.data;
      }
    });
  }

  createProductAddForm() {
    this.productUpdateForm = this.formBuilder.group({
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
  productUpdate() {
    if (this.productUpdateForm.valid) {
      // let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.updateProduct(this.product).subscribe(
        (data) => {
          if (data.success) {
            window.location.href =
              window.location.pathname + '?updateSuccess=1';
          } else {
            this.toastrService.error('Hatalı veri girişi!', 'Dikkat');
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Dikkat');
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

  checkToastShow() {
    const { search } = window.location;
    const deleteSuccess = new URLSearchParams(search).get('updateSuccess');
    if (deleteSuccess === '1') {
      this.toastrService.success('Ürün Güncellendi!', 'Başarılı');
    }
  }

  addImage(event: any) {
    let file: File = event.target.files[0];
    if (file && file.name != '') {
      this.productService.addProductImage(file, this.product.id).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(file.name, 'Başarılı');
            this.getImages(this.product.id);
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

  deleteImage(imageId: number) {
    this.productService.deleteProductImageByImageId(imageId).subscribe(
      (data) => {
        if (data.success) {
          this.toastrService.success('Resim Silindi!', 'Başarılı');
          this.getImages(this.product.id);
        } else {
          this.toastrService.error('Resim Silinemedi!', 'Dikkat');
        }
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'Dikkat');
      }
    );
  }

  selectUpdateImage(event: any, imageNo: number) {
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
