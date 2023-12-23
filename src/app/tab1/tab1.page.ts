import { Component } from '@angular/core';
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
// import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

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
export class Tab1Page {
  public loaded = true;

  constructor() {
    // this.handleRefresh();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.loaded = true;
      event.target.complete();
    }, 2000);
  }

  arrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  loadArrs = [1, 2, 3, 4];
}
