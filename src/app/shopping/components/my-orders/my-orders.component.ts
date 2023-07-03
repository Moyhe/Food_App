import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  orders$: any ;

    constructor(private authService: AuthService, private orderService: OrderService) {

      this.orders$ = this.authService.user$.pipe(switchMap(user => this.orderService.getOrdersByUser(user!.uid)));
    }
}
