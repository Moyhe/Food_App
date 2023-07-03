import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {


  shipping : any = {};
  userId!: any;
  userSubscription: Subscription = new Subscription;
  @Input('cart') cart!: ShoppingCart

  constructor(

    private orderService: OrderService,
    private authService: AuthService,
    private route: Router

  )  { }

  async  placeOrder() {

    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);

    this.route.navigate(['/order-success', result.key ]);

 }

    ngOnInit(): void {
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user!.uid);

    }

    ngOnDestroy(): void {

      this.userSubscription.unsubscribe();

    }
}
