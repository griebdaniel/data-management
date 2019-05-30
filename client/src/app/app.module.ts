import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';

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
import { CellComponent } from './smart-table/cell/cell.component';
import { TableDesignComponent } from './table-design/table-design.component';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { DataTableModule } from 'data-table';

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
    RelationalComponent,
    CellComponent,
    TableDesignComponent,
    SimpleTableComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule,
    FormsModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatRippleModule,
    MatToolbarModule, MatSidenavModule, MatTableModule, MatDialogModule,
    MatIconModule, MatPaginatorModule, MatSortModule, MatCardModule, MatCheckboxModule,
    MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, DataTableModule, MatTreeModule,
    MatExpansionModule, MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CellDialogComponent],
})
export class AppModule { }
