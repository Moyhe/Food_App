import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {

  categories$: Observable<any[]>;
  @Input('category') category!: string;


  constructor(private categoryService: CategoryService)
  {
     this.categories$ = this.categoryService.getAll();
  }
}
