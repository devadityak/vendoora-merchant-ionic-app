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

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.loaded = false;
    this.service.getCategory().subscribe({
      next: (res: any) => {
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

  arrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  loadArrs = [1, 2, 3, 4];
}
