import { Component, OnInit } from '@angular/core';
import { TableMetaData, ColumnTypes } from '../smart-table/table-meta-data';
import { Observable } from 'rxjs';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-supply-orders',
  templateUrl: './supply-orders.component.html',
  styleUrls: ['./supply-orders.component.css']
})
export class SupplyOrdersComponent implements OnInit {
  metaData: TableMetaData;
  data: Observable<Array<Object>>;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    const supplies = this.crudService.find('supplies');
    const acOptions = [];

    supplies.subscribe(supply => {
      supply.forEach(supp => {
        acOptions.push(supp['name']);
      });
    });

    const suppliesMetaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Autocomplete, displayName: 'Name', acOptions: acOptions },
        { name: 'qty', type: ColumnTypes.Number, displayName: 'Quantity' }
      ],
    };

    this.metaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Text, displayName: 'Name' },
        { name: 'supplies', type: ColumnTypes.Table, displayName: 'Supplies', metaData: suppliesMetaData }
      ],
      collectionName: 'supplyOrders'
    };

    this.data = this.crudService.find('supplyOrders');
  }

}
