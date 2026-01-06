import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationType } from "./data/notification-type";
import { NotificationSnackbarComponent } from "./notification-snackbar/notification-snackbar.component";

@Injectable({
    providedIn: "root"
})
export class SnackBarService {
    snackbar = inject(MatSnackBar);

    info(message: string, type: NotificationType ='info') {
        this.open( message, type);
    }

    error(message: string, type: NotificationType='error') {
        this.open( message, type);
    }

    private open(message: string, type: NotificationType) {
        this.snackbar.openFromComponent(NotificationSnackbarComponent, {
            data:               { message, type},
            duration:           3000,
            horizontalPosition: 'end',
            verticalPosition:   'top',
            panelClass: type === 'error' ? ['tm-snackbar', 'tm-snackbar-error'] : ['tm-snackbar']
        });
    }

    // showSnackbar(notification: string, timeout=2000) {
    //     this.snackbar.open( notification , "cancel", {
    //         horizontalPosition: 'end',
    //         verticalPosition:   'top',
    //         duration: timeout
    //     });
    // }
}