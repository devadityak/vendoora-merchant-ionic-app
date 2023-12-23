import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { LoadingController } from '@ionic/angular';
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
export class LoginPage implements OnInit {
  myForm: any;

  constructor(
    private router: Router,
    private service: ApiService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController
  ) {
    this.myForm = this.fb.group({
      username: ['admin@admin.com', [Validators.required, Validators.email]],
      password: ['pass123', [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    console.log(this.myForm);
    if (this.myForm.valid) {
      this.showLoading();
      this.service.login(this.myForm.value).subscribe({
        next: (res: any) => {
          console.log('hi', res);
          this.loadingCtrl.dismiss();

          if (res.message === 'Warning') {
            this.setOpen(true, res.showMsg);
          } else {
            this.router.navigateByUrl('/tabs');
          }
        },
        error: (err) => {
          this.loadingCtrl.dismiss();
          this.setOpen(true, err);
        },
      });
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      // duration: 3000,
    });

    loading.present();
  }

  isAlertOpen = false;
  alertButtons = ['Dismiss'];
  alertMsg = '';

  setOpen(isOpen: boolean, msg: any) {
    this.isAlertOpen = isOpen;
    this.alertMsg = msg;
  }
}
