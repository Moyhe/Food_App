import { Component, OnDestroy } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import {  Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements  OnDestroy {

  products!: Product[];
  subscription!: Subscription;
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject<Product>();

   constructor(private productService: ProductService) {
       this.subscription = this.productService.getAll().subscribe( product => {

        this.products = product
        this.dtTrigger.next(product);
        this.dtOptions = {
          pagingType: 'full_numbers',
        };

      });
     }


    //  filter(query: string)
    //  {
    //     this.filteredProducts = (query) ?
    //     this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) :
    //     this.products;
    //  }


     ngOnDestroy(): void {
       {
          this.subscription.unsubscribe();
       }
     }
}
