import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAlert,
  IonContent,
  IonImg,
  IonCard,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonLabel,
  IonItem,
  IonThumbnail,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonCardTitle,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { environment } from 'src/environments/environment';
import type { OverlayEventDetail } from '@ionic/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonImg,
    IonContent,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonAlert,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonThumbnail,
    IonSearchbar,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonCardTitle,
    IonButton,
    // IonicModule,
    CommonModule,
  ],
})
export class Tab1Page implements OnInit {
  shimmerEffect = true;
  products: any;
  url = environment.imgUrl + environment.bucketName + '/';
  constructor(private service: ApiService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    // console.log("test...");
          
    this.shimmerEffect = true;
    this.service.getProductsByVendor().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.shimmerEffect = false;
      },
      error: (err) => {
        this.shimmerEffect = false;  
        console.log("test1",  err.error);
        if(err.error.error === "jwt expired") {
          console.log("test2",  err.error);
          this.setOpen(true, "Session expired. Please login again.");
          }
        
    }});
  }

  handleRefresh(event: any) {
    this.getProducts();
    setTimeout(() => {
      // Any calls to load data go here
      // this.shimmerEffect = false;
      event.target.complete();
    }, 1500);
  }

  loadArrays = [1, 2, 3, 4];

  isAlertOpen = false;
  alertButtons = [{
    text: 'Logout',
    role: 'logout',
    handler: () => {
      this.service.logout();
    },
  }];
  alertMsg = '';
  backdropDismissOption = false;

  setOpen(isOpen: boolean, msg: any) {
    this.isAlertOpen = isOpen;
    this.alertMsg = msg;
  }

  setResult(event: CustomEvent<OverlayEventDetail>) {
    console.log(`Dismissed with role: ${event.detail.role}`);
    // this.setOpen(true, "Session expired. Please login again.");
  }

}
