import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';



@NgModule({

  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,

  ],
  imports: [
    // CommonModule,
    // FormsModule,
    SharedModule,
    // DataTablesModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
     },
     {
      path: 'admin/products/:id',
      component: ProductFormComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    },
    {
      path: 'admin/products',
      component: AdminProductsComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    },
      {
         path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
     },

    ])
  ],

  providers:[
    AdminAuthGuardService,
  ]

})
export class AdminModule { }
