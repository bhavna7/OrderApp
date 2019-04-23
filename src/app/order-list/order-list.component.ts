import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @ViewChildren(MatTable) table: QueryList<any>;
  public retrievedOrders: any;
  public displayedColumns: string[] = [
    'orderNumber', 'orderDueDate', 'customerPhone',
    'customerBuyername', 'customerAddress', 'orderTotal', 'action'];
  public dataSource: any;
  public orderToBeRemoved: any;

  addNewOrder = this.fb.group({
    orderDueDate: [''],
    customerPhone: [''],
    customerBuyername: [''],
    customerAddress: [''],
    orderTotal: [''],
  });

  updateExistingOrder = this.fb.group({
    orderDueDate: [''],
    customerPhone: [''],
    customerBuyername: [''],
    customerAddress: [''],
    orderTotal: [''],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.authService.getOrders().subscribe((response: any) => {
      this.retrievedOrders = response.orders;
      this.dataSource = this.retrievedOrders;
    });
  }

  deleteOrder(order) {
    this.orderToBeRemoved = order;
  }

  confirmDelete() {
    const orderNumber = {orderNumber: this.orderToBeRemoved.orderNumber};
    this.authService.deleteOrder(orderNumber).subscribe((response: any) => {
      this.retrievedOrders = response;
      this.dataSource = this.retrievedOrders;
    });
  }

  onSubmit() {
    this.authService.addNewOrder(this.addNewOrder.value).subscribe((response: any) => {
    this.retrievedOrders.push(response);
      this.dataSource = this.retrievedOrders;
      this.table.forEach((table: MatTable<any>) => {
        table.renderRows();
      });
    });
  }

  editOrder(element) {
    this.updateExistingOrder = this.fb.group({
      orderDueDate: [element.orderDueDate],
      customerPhone: [element.customerPhone],
      customerBuyername: [element.customerBuyername],
      customerAddress: [element.customerAddress],
      orderTotal: [element.orderTotal],
      orderNumber: [element.orderNumber]
    });
  }

  updateOrderDetails() {
    console.log(this.updateExistingOrder.value);
    this.authService.updateOrderDetails(this.updateExistingOrder.value).subscribe((response: any) => {
      this.retrievedOrders.forEach((order: any) => {
        if (order.orderNumber === response.orderNumber) {
          order.orderDueDate = response.orderDueDate;
          order.customerBuyername = response.customerBuyername;
          order.customerAddress = response.customerAddress;
          order.customerPhone = response.customerPhone;
          order.orderTotal = response.orderTotal;
        }
      });
      this.table.forEach((table: MatTable<any>) => {
        table.renderRows();
      });
    });
  }
}
