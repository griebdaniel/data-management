import { Component, OnInit } from '@angular/core';
import { TableMetaData, ColumnTypes, TableColumn } from '../smart-table/table-meta-data';
import { Observable } from 'rxjs';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-relational',
  templateUrl: './relational.component.html',
  styleUrls: []
})
export class RelationalComponent implements OnInit {

  metaData: TableMetaData;
  data: Observable<Array<Object>>;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    const supplies = this.crudService.findTable('supplies');
    const suppliesAcOptions = [];

    supplies.subscribe(supply => {
      supply.forEach(supp => suppliesAcOptions.push(supp));
    });

    const necessaryMetaData = {
      columns: [
        {
          name: 'supply', displayName: 'Supply', type: ColumnTypes.Object, mappedType: ColumnTypes.Autocomplete,
          map: (supply: any) => supply.name, acOptions: suppliesAcOptions
        },
        { name: 'quantity', displayName: 'Quantitiy', type: ColumnTypes.Number, map: (supply: any) => supply.quantity },
      ],
    };

    this.metaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Text, displayName: 'Name' },
        { name: 'necessary', type: ColumnTypes.Table, displayName: 'Necessary', metaData: necessaryMetaData }
      ],
      collectionName: 'products'
    };

    const products = this.crudService.findTable('products');
    this.data = products;
  }

  edit(table: any) {
    this.crudService.updateTable('products', table).subscribe(res => {});
  }

}
