import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  public login(userCredentials: any) {
    return this.http.post(this.serverUrl + 'login', userCredentials);
  }

  public getOrders() {
    return this.http.get(this.serverUrl + 'getAllOrders');
  }

  public addNewOrder(newOrderObj) {
    return this.http.post(this.serverUrl + 'addOrder', newOrderObj);
  }

  public deleteOrder(orderNumber) {
    return this.http.post(this.serverUrl + 'deleteOrder', orderNumber);
  }

  public updateOrderDetails(updateOrderObj) {
    return this.http.post(this.serverUrl + 'updateOrderDetails', updateOrderObj);
  }
}
