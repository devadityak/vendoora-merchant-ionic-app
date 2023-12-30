import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
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
  // IonFab,
  IonImg,
  IonButtons,
  IonTextarea,
} from '@ionic/angular/standalone';
import { PhotoService } from '../service/photo.service';
import { ApiService } from '../service/api.service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
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
    // IonFab,
    IonImg,
    IonButtons,
    IonTextarea,
  ],
})
export class Tab2Page {
  categories: any;
  constructor(
    public photoService: PhotoService,
    private apiService: ApiService,
    private loadingService: LoadingService
  ) {
    this.callCategoryApi();
  }

  ionViewDidEnter() {}

  callCategoryApi() {
    this.loadingService.showLoading();
    this.apiService.getCategory().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.loadingService.dismissLoading();
      },
      error: (err) => {
        this.loadingService.dismissLoading();
      },
    });
  }

  categorySelected(e: any) {
    console.log(e);
    this.loadingService.showLoading();
    this.apiService.getCategory().subscribe({
      next: (res: any) => {
        // this.categories = res.data;
        this.loadingService.dismissLoading();
      },
      error: (err) => {
        this.loadingService.dismissLoading();
      },
    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  addPhotoToGallery() {
    this.photoService.takePicture2();
  }

  selectImg_2() {
    this.photoService.selectImg_2();
  }
}
