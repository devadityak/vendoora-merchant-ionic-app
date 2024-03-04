import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonAlert,
  IonButton,
  IonList,
  IonItem,
  IonText,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  Platform,
} from '@ionic/angular/standalone';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { Toast } from '@capacitor/toast';
import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { ApiService } from '../service/api.service';
import { Camera } from '@capacitor/camera';
// import { Capacitor } from '@capacitor/core';

// import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonAlert,
    IonButton,
    IonItem,
    IonList,
    IonText,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonInput,

    //
    ReactiveFormsModule,
  ],
})
export class LoginPage {
  myForm: any;
  private lastBackTime = 0;

  constructor(
    private router: Router,
    private service: ApiService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private platform: Platform,
    private alertController: AlertController
  ) {
    this.myForm = this.fb.group({
      username: [
        'kumarelectronics55@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['pass123', [Validators.required]],
    });

    this.getPermission();
    // Permissions.requestPermission('WRITE_EXTERNAL_STORAGE');
    this.checkNetwork();
    this.checkTokenAndLogin();

    // getting Geolocation
    this.getCurrentLocation();

    // back button exit
    this.platform.backButton.subscribeWithPriority(200, () => {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - this.lastBackTime;
      this.lastBackTime = currentTime;

      // Check if back button is pressed within 2 seconds
      if (timeDiff < 2000) {
        // Prompt the user to confirm exit
        this.confirmExit();
      } else {
        // Inform the user to press back again to exit
        this.presentToast('Press back again to exit');
      }
    });
  }

  async getPermission() {
    await Camera.requestPermissions();
    await Geolocation.requestPermissions();
  }

  async getCurrentLocation() {
    // const printCurrentPosition = async () => {
    //   const coordinates = await Geolocation.getCurrentPosition();
    //   await Toast.show({
    //     text: 'GeoLocation! -' + coordinates,
    //     duration: 'long',
    //   });
    // };

    const coordinates = await Geolocation.getCurrentPosition();
    await Toast.show({
      text: 'GeoLocation! -' + coordinates,
      duration: 'long',
    });
  }

  async checkNetwork() {
    // Network.addListener()

    const status = await Network.getStatus();
    alert(JSON.stringify(status));

    if (status.connected) {
      console.log('Connected to the internet');
      await Toast.show({
        text: 'Great! Internet Connected ..',
        duration: 'long',
      });
    } else {
      console.log('Disconnected from the internet');
      // Prompt the user to enable network
      // You can show an alert or a toast here
      await Toast.show({
        text: 'Please enable network connectivity to use this app',
        duration: 'long',
      });
    }
  }

  // admin@admin.com
  // pass123

  // kumarelectronics55@gmail.com
  // pass123

  async presentToast(message: string) {
    await Toast.show({
      text: message,
      duration: 'long',
    });
  }

  async confirmExit() {
    const alert = await this.alertController.create({
      header: 'Confirm Exit',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Exit',
          handler: () => {
            // Exit the app
            App.exitApp();
          },
        },
      ],
    });

    await alert.present();

    // App.exitApp();
  }

  login() {
    // console.log(this.myForm);
    if (this.myForm.valid) {
      this.loadingService.showLoading();
      this.service.login(this.myForm.value).subscribe({
        next: (res: any) => {
          // console.log('hi', res);
          this.loadingService.dismissLoading();

          if (res.message === 'Warning') {
            this.setOpen(true, res.showMsg);
          } else {
            this.storageService.setToken(res.token);
            this.router.navigateByUrl('/tabs');
          }
        },
        error: (err) => {
          this.loadingService.dismissLoading();
          this.setOpen(true, err);
        },
      });
    }
  }

  isAlertOpen = false;
  alertButtons = ['Dismiss'];
  alertMsg = '';

  setOpen(isOpen: boolean, msg: any) {
    this.isAlertOpen = isOpen;
    this.alertMsg = msg;
  }

  checkTokenAndLogin() {
    const verify = this.storageService.getToken();
    if (verify !== null) {
      this.router.navigateByUrl('/tabs');
    }
  }

  testApi() {
    this.loadingService.showLoading();

    this.service.testApi().subscribe({
      next: (res: any) => {
        this.loadingService.dismissLoading();

        this.setOpen(true, res.data);
      },
      error: (err) => {
        this.loadingService.dismissLoading();

        // Toast.show({
        //   text: 'Error',
        // });

        this.setOpen(true, 'res.data');
      },
    });
  }

  // removeTokenTest() {
  //   this.storageService.removeToken();
  // }

  // getTokenTest() {
  //   const t = this.storageService.getToken();
  //   alert(t);
  // }
}
