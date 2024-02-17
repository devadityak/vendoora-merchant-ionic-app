import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
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
} from '@ionic/angular/standalone';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';

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

  constructor(
    private router: Router,
    private service: ApiService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private storageService: StorageService
  ) {
    this.myForm = this.fb.group({
      username: ['admin@admin.com', [Validators.required, Validators.email]],
      password: ['pass123', [Validators.required]],
    });
  }

  login() {
    console.log(this.myForm);
    if (this.myForm.valid) {
      this.loadingService.showLoading();
      this.service.login(this.myForm.value).subscribe({
        next: (res: any) => {
          console.log('hi', res);
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

  // removeTokenTest() {
  //   this.storageService.removeToken();
  // }

  // getTokenTest() {
  //   const t = this.storageService.getToken();
  //   alert(t);
  // }
}
