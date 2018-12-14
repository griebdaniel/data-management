import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule, MatCheckboxModule,
  MatInputModule, MatToolbarModule, MatSidenavModule,
  MatTableModule, MatDialogModule, MatIconModule,
  MatPaginatorModule, MatSortModule, MatCardModule,
  MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule,

} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { CellDialogComponent } from './smart-table/cell-dialog/cell-dialog.component';
import { SupplyOrdersComponent } from './supply-orders/supply-orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductOrdersComponent } from './product-orders/product-orders.component';
import { MachinesComponent } from './machines/machines.component';
import { EmployeesComponent } from './employees/employees.component';
import { NecessaryComponent } from './necessary/necessary.component';
import { RelationalComponent } from './relational/relational.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SmartTableComponent,
    SuppliesComponent,
    CellDialogComponent,
    SupplyOrdersComponent,
    ProductsComponent,
    ProductOrdersComponent,
    MachinesComponent,
    EmployeesComponent,
    NecessaryComponent,
    RelationalComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule,
    FormsModule, MatButtonModule, MatCheckboxModule, MatInputModule,
    MatToolbarModule, MatSidenavModule, MatTableModule, MatDialogModule,
    MatIconModule, MatPaginatorModule, MatSortModule, MatCardModule, MatCheckboxModule,
    MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CellDialogComponent],
})
export class AppModule { }
