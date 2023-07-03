import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll()
  {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().
    pipe(map( action => action
      .map(categories => {
        const data = categories.payload.exportVal();
        data['key'] = categories.payload.key;
        return  data;
      })));
  }

}
