import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart$!: Observable<ShoppingCart | any>;

  constructor( private cartService: ShoppingCartService ) {}


 async  ngOnInit() {

       this.cart$ = await this.cartService.getCart();
   }

   clearCart()
   {
     this.cartService.clearCart();
   }
}