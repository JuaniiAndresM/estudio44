import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  showNotifications: boolean = false;


  openNotifications(){
    if(!this.showNotifications){
      document.body.style.overflowY = 'hidden';
      this.showNotifications = true;
    }
    else console.log('Agendar Turno')
  }

  hideNotifications(){
    document.body.style.overflowY = 'auto';
    this.showNotifications = false;
  }
}
