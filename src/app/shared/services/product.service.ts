import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product)
  {
    return this.db.list('/products').push(product);
  }

  getAll()
  {
    return this.db.list('/products').snapshotChanges().
    pipe(map( action => action
      .map(products => {
        const data = products.payload.exportVal();
        data['key'] = products.payload.key;
        return  data;
      })));
  }

  get(productId: string)
  {
    return this.db.object('/products/' + productId);
  }

  update(productId: string, product: Product)
  {
    return  this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string)
  {
    this.db.object('/products/' + productId).remove();
  }
}
