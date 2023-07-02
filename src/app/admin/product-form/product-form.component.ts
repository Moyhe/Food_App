import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  categories$: Observable<any[]>;
  product: any = {};
  id: string;

  constructor(
    private route: ActivatedRoute,
     private categoryService: CategoryService,
     private productService: ProductService,
     private _router: Router) {

     this.categories$ = this.categoryService.getAll();
     this.id   =    this.route.snapshot.paramMap.get('id')!;
     if(this.id)    this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe( p => this.product = p);

  }

  save(product: Product)
  {
    if(this.id) this.productService.update(this.id, product);
    else  this.productService.create(product);

    this._router.navigate(['/admin/products']);

  }

  delete()
  {
    if(!confirm("are you shure you want to delete this product?")) return;

       this.productService.delete(this.id);
       this._router.navigate(['/admin/products']);
  }
}
