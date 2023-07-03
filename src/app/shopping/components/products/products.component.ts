import { Component,  OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart$!: Observable<ShoppingCart | null>;


  category!: string;

  constructor(

     private route: ActivatedRoute,
     private productService: ProductService,
     private shoppingCart: ShoppingCartService
     ) {}

  async ngOnInit() {

    this.cart$ = await this.shoppingCart.getCart();
    this.populateProducts()

  }

  private applyFilter()
  {

    this.filteredProducts = (this.category) ?
    this.products.filter( p => p.category.toLowerCase() === this.category.toLowerCase()) :
    this.products;
  }

  private populateProducts()
  {
    this.productService.getAll().pipe(switchMap(product => {

      this.products = product;
      return this.route.queryParamMap;

  })).subscribe (params => {
    this.category = params.get('category')!;
    this.applyFilter();
  });

  }
}
