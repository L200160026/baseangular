import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification: string[] = [];

  add(message: string){
    this.notification.push(message)
  }

  clear() {
    this.notification = [];
  }

  constructor() { }
}
