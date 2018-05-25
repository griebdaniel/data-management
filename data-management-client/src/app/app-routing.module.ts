import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SuppliesComponent } from './supplies/supplies.component';
import { SupplyOrdersComponent } from './supply-orders/supply-orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductOrdersComponent } from './product-orders/product-orders.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'supplies', component: SuppliesComponent },
          { path: 'supplyOrders', component: SupplyOrdersComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'productOrders', component: ProductOrdersComponent },
        ]
      }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }
