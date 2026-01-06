import { Component, inject, Inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { INotificationData } from '../data/notification-data.model';

@Component({
  selector: 'tm-notification-snackbar',
  imports: [MatIcon],
  templateUrl: './notification-snackbar.component.html',
  styleUrl: './notification-snackbar.component.css',
})
export class NotificationSnackbarComponent {
  data = inject<INotificationData>(MAT_SNACK_BAR_DATA)
 
}
