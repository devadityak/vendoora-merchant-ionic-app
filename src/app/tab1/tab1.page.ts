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
  IonIcon,
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
    IonIcon,
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

  // Status helper methods
  getStatusClass(product: any): string {
    if (product.reviewedAndPublished === false) {
      return 'status-review';
    } else if (product.blocked === true) {
      return 'status-blocked';
    } else {
      return 'status-published';
    }
  }

  getStatusIcon(product: any): string {
    if (product.reviewedAndPublished === false) {
      return 'time-outline';
    } else if (product.blocked === true) {
      return 'close-circle-outline';
    } else {
      return 'checkmark-circle-outline';
    }
  }

  getStatusText(product: any): string {
    if (product.reviewedAndPublished === false) {
      return 'Under Review';
    } else if (product.blocked === true) {
      return 'Blocked';
    } else {
      return 'Published';
    }
  }

  getDiscountPercentage(product: any): number {
    if (product.productMrp > product.productSp) {
      return Math.round(((product.productMrp - product.productSp) / product.productMrp) * 100);
    }
    return 0;
  }

  // Action methods
  editProduct(product: any) {
    console.log('Edit product:', product);
    // Add implementation for editing product
  }

  deactivateProduct(product: any) {
    console.log('Deactivate product:', product);
    // Add implementation for deactivating product
  }

  markAsSold(product: any) {
    console.log('Mark as sold:', product);
    // Add implementation for marking product as sold
  }

}
