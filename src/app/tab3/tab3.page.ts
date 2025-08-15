import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  // IonText,
  IonIcon,
} from '@ionic/angular/standalone';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAccordionGroup,
    IonAccordion,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    // IonText,
    IonIcon,
    ReactiveFormsModule,
  ],
})
export class Tab3Page {
  myForm = new FormGroup({
    oldPassword: new FormControl([''], Validators.required),
    newPassword: new FormControl([''], Validators.required),
    retypeNewPassword: new FormControl([''], Validators.required),
  });

  constructor(private router: Router, private storageService: StorageService) {}

  submit() {}

  private values: string[] = ['first', 'second', 'third'];

  accordionGroupChange = (ev: any) => {
    const collapsedItems = this.values.filter(
      (value) => value !== ev.detail.value
    );
    const selectedValue = ev.detail.value;

    console.log(
      `Expanded: ${
        selectedValue === undefined ? 'None' : ev.detail.value
      } | Collapsed: ${collapsedItems.join(', ')}`
    );
  };

  logout() {
    console.log('hi');
    this.storageService.removeToken();
    this.router.navigateByUrl('/login');
  }

  clearData() {
    console.log('Clearing app data...');
    // Add implementation for clearing app data
    this.storageService.removeToken();
    // You can add additional logic here like showing a confirmation dialog
  }
}
