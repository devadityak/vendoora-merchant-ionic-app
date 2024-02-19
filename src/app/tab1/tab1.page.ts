import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
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
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonCardTitle,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    //
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
  loaded = false;
  products: any;
  url = environment.apiUrl;
  constructor(private service: ApiService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.loaded = false;
    this.service.getProductsByVendor().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.loaded = true;
      },
      error: (err) => {
        this.loaded = false;
      },
    });
  }

  handleRefresh(event: any) {
    this.getProducts();
    setTimeout(() => {
      // Any calls to load data go here
      // this.loaded = true;
      event.target.complete();
    }, 1500);
  }

  loadArrays = [1, 2, 3, 4];
}
