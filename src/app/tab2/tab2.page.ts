import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAlert,
  IonIcon,
  IonInput,
  IonItem,
  IonSelectOption,
  IonSelect,
  IonText,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
  IonImg,
  IonButtons,
  IonTextarea,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { PhotoService } from '../service/photo.service';
import { ApiService } from '../service/api.service';
import { LoadingService } from '../service/loading.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAlert,
    IonIcon,
    IonInput,
    IonItem,
    IonSelectOption,
    IonSelect,
    IonText,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonImg,
    IonButtons,
    IonRefresher,
    IonRefresherContent,
    IonTextarea,
    ReactiveFormsModule,
  ],
})
export class Tab2Page {
  myForm: any;
  categories: any = [];
  subCategories: any = [];
  brands: any = [];

  constructor(
    public photoService: PhotoService,
    private apiService: ApiService,
    private loadingService: LoadingService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      productName: ['hello', [Validators.required]],
      productDescription: ['hello', [Validators.required]],
      productKeyPoints: ['hello', [Validators.required]],
      mrp: ['345', [Validators.required]],
      sp: ['34', [Validators.required]],
      currency: ['34', [Validators.required]],
    });

    this.callCategoryApi();
  }

  productImg1: any;
  img1Add(event: any) {
    console.log('e-', event);
    this.productImg1 = event.target.files[0];
    console.log('path - ', this.myForm.value.productImg1);

    console.log('productImg1 - ', this.productImg1);
    // alert('as-' + JSON.stringify(this.myForm.value.productImg1));
  }

  submit() {
    console.log('myForm', this.myForm);
    if (this.myForm.status === 'INVALID') {
      this.setOpen(true, 'Invalid Data');
    }
    //  else if (
    //   this.photoService.img1.dataUrl === 'assets/img/demo.png' ||
    //   null ||
    //   undefined ||
    //   ''
    // ) {
    //   this.setOpen(true, 'Need to select at lest one Product picture');
    // }
    else {
      this.photoService
        .createProduct(this.myForm.value, this.productImg1)
        .subscribe({
          next: (res) => {
            console.log('res', res);
          },
          error: (err) => {},
        });
    }
  }

  callCategoryApi() {
    this.loadingService.showLoading();
    this.apiService.getCategory().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.loadingService.dismissLoading();
      },
      error: (err) => {
        this.loadingService.dismissLoading();
        this.setOpen(true, err);
      },
    });
  }

  callSubCategoryApi(e: any) {
    this.brands = [];
    this.subCategories = [];
    this.loadingService.showLoading();
    this.apiService.getSubCatNBrandsByCatId(e).subscribe({
      next: (res: any) => {
        this.brands = res.brands;
        this.subCategories = res.subCategory;
        this.loadingService.dismissLoading();
      },
      error: (err) => {
        this.loadingService.dismissLoading();
        this.setOpen(true, err);
      },
    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  isAlertOpen = false;
  alertButtons = ['Dismiss'];
  alertMsg = '';

  setOpen(isOpen: boolean, msg: any) {
    this.isAlertOpen = isOpen;
    this.alertMsg = msg;
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.myForm.reset();
    }, 1500);
  }
}
