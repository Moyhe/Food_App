import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from '../models/product';
import {  map, take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
       dateCreated: new Date().getTime()
     })
   }

  async getCart() : Promise<Observable<ShoppingCart>>
  {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(map( (x: any) => new ShoppingCart(x.items) ))
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId + '/');
  }

  private async getOrCreateCartId(): Promise<string>
  {
    const cartId = localStorage.getItem('cartId');
    if (cartId)  return cartId;
    let result = await this.create() as any;

    localStorage.setItem('cartId', result.key!);
    return result.key!;

  }

  async addToCart(product: Product)
  {
    this.updateItem(product, 1)
  }


   async removeFromCart(product: Product)
    {
      this.updateItem(product, -1);
    }

    async clearCart()
    {
      let cartId = await this.getOrCreateCartId();
      this.db.object('/shopping-carts/'+ cartId + '/items').remove();
    }

  private async updateItem(product: Product, change: number)
  {
    let cartId = await this.getOrCreateCartId();

    let item$ =  this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item:any) => {



      let quantity = (item != null ? item.quantity  : 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: quantity
      });

        //  (item != null) ? item$.update({ quantity: item.quantity + change })  :

        //  item$.set(
        //   {
        //     title: product.title,
        //     image: product.image,
        //     price: product.price,

        //     quantity: change
        //   })

      });
  }
}
