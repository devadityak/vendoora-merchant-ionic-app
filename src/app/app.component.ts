import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Network } from '@capacitor/network';
import { HttpClientModule } from '@angular/common/http';
// import {  } from '@capacitor/android';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HttpClientModule],
  // providers: []
})
export class AppComponent {
  constructor() {
    Network.addListener('networkStatusChange', (status) => {
      // alert('status :-' + JSON.stringify(status));
    });
  }
}
