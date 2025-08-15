import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAlert,
  IonInput,
  IonItem,
  IonSelectOption,
  IonSelect,
  // IonText,
  IonButton,
  // IonCol,
  // IonRow,
  // IonGrid,
  IonImg,
  IonTextarea,
  IonIcon,
  // IonLabel,
  IonRefresher,
  IonLoading,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { PhotoService } from '../service/photo.service';
import { ApiService } from '../service/api.service';
import { LoadingService } from '../service/loading.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    // IonLabel,
    IonLoading,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAlert,
    IonInput,
    IonItem,
    IonSelectOption,
    IonSelect,
    // IonText,
    IonButton,
    // IonCol,
    // IonRow,
    // IonGrid,
    IonImg,
    IonIcon,
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
    private fb: FormBuilder,
    private loadingCtrl: LoadingController
  ) {

    this.myForm = this.fb.group({
      category: ['1', [Validators.required]],
      subCategory: ['1', [Validators.required]],
      brand: ['', [Validators.required]],
      productName: ['1', [Validators.required]],
      productDescription: ['1', [Validators.required]],
      productKeyPoints: ['1', [Validators.required]],
      mrp: ['1', [Validators.required]],
      sp: ['1', [Validators.required]],
      currency: ['INR', [Validators.required]],
    });

    // this.callCategoryApi();
    this.callSubCategoryApi(1);
  }

  ngOnInit() {
    // this.callCategoryApi();
    // this.callSubCategoryApi(1);
  }

  // productImg1: any;
  // img1Add(event: any) {
  //   console.log('e-', event);
  //   this.productImg1 = event.target.files[0];
  //   console.log('path - ', this.myForm.value.productImg1);

  //   console.log('productImg1 - ', this.productImg1);
  //   // alert('as-' + JSON.stringify(this.myForm.value.productImg1));
  // }

  submit() {
    
    if (this.myForm.status === 'INVALID') {
      this.setOpen(true, 'Invalid Data');
    }
    else {
      this.loadingService.showLoading();
      // this.loadingCtrl.create({ message: 'Loading...' });
      this.photoService
        .createProduct(this.myForm.value)
        .subscribe({
          next: (res) => {
            // this.loadingCtrl.dismiss();
            this.loadingService.dismissLoading();
            this.myForm.reset();
            this.photoService.resetImgData();

            Dialog.alert({
              title: 'Success',
              message: 'New Product is Added and Sent for Review',
            });
          },
          error: (err) => {
            // this.loadingCtrl.dismiss();
            this.loadingService.dismissLoading();
            alert('Error - ' + JSON.stringify(err));
            Dialog.alert({
              title: 'Alert',
              message: 'Error - ' + JSON.stringify(err),
            });
          },
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
      this.photoService.resetImgData();
    }, 1500);
  }


  
}
