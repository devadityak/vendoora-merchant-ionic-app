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
  IonText,
} from '@ionic/angular/standalone';

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
    IonText,
    ReactiveFormsModule,
  ],
})
export class Tab3Page {
  myForm = new FormGroup({
    username: new FormControl(['sdfs'], Validators.required),
  });

  constructor(private router: Router) {}

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
    this.router.navigateByUrl('/login');
  }
}
