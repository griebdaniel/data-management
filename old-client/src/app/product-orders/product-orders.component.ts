import { Component, OnInit } from '@angular/core';
import { TableMetaData, ColumnTypes } from '../smart-table/table-meta-data';
import { Observable } from 'rxjs';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-product-orders',
  templateUrl: './product-orders.component.html',
  styleUrls: ['./product-orders.component.css']
})
export class ProductOrdersComponent implements OnInit {
  metaData: TableMetaData;
  data: Observable<Array<Object>>;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    const products = this.crudService.find('products');
    const acOptions = [];

    products.subscribe(product => {
      product.forEach(prod => {
        acOptions.push(prod['name']);
      });
    });

    const productsMetaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Autocomplete, displayName: 'Name', acOptions: acOptions },
        { name: 'count', type: ColumnTypes.Number, displayName: 'Count' }
      ],
    };

    this.metaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Text, displayName: 'Name' },
        { name: 'deadline', type: ColumnTypes.Date, displayName: 'Deadline' },
        { name: 'products', type: ColumnTypes.Table, displayName: 'Products', metaData: productsMetaData }
      ],
      collectionName: 'productOrders'
    };

    this.data = this.crudService.find('productOrders');
  }
}
