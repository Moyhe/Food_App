import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {

  orders$: any;

    constructor(private orderService: OrderService) {

        this.orders$ = this.orderService.getOrders();
    }
}
