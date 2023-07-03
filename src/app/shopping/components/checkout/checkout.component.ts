import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart$!: Observable<ShoppingCart>;
  subscription: Subscription = new Subscription;


  constructor(
     private cartService: ShoppingCartService) {}

   async ngOnInit() {

      this.cart$ = await this.cartService.getCart();
  }

}
