import { Component, OnInit } from '@angular/core';
import { TableMetaData, ColumnTypes, TableColumn } from '../smart-table/table-meta-data';
import { Observable } from 'rxjs';
import { CrudService } from '../services/crud.service';

import { AutocompleteWithMapperMeta, TableMeta, TableChange } from 'data-table';
import { SocketService } from '../services/socket-service';

@Component({
  selector: 'app-relational',
  templateUrl: './relational.component.html',
  styleUrls: ['./relational.component.scss']
})
export class RelationalComponent implements OnInit {

  metaData: TableMeta;
  data: Observable<Array<Object>>;

  constructor(private crudService: CrudService, private socketService: SocketService) { }

  ngOnInit() {
    // this.socketService.init();
    const supplies = this.crudService.findTable('supplies');
    const suppliesAcOptions = [];

    supplies.subscribe(supply => {
      supply.forEach(supp => suppliesAcOptions.push(supp));
    });

    const autocompleteMapperMeta = new AutocompleteWithMapperMeta();
    autocompleteMapperMeta.options = suppliesAcOptions;
    autocompleteMapperMeta.map = (element: any) => {
      if (element) {
        return element.name;
      }
    };
    const necessaryMeta: TableMeta = {
      columnsMeta: [
        { name: 'supply', type: 'AutocompleteWithMapper', typeMeta: autocompleteMapperMeta },
        { name: 'quantity', type: 'Number' },
      ]
    };


    const suppliesMeta: TableMeta = {
      columnsMeta: [
        { name: 'name', type: 'Text' },
        { name: 'necessary', type: 'Table', typeMeta: necessaryMeta },
      ]
    };

    const products = this.crudService.findTable('products');
    this.metaData = suppliesMeta;
    this.data = products;

  }

  change(modifications: TableChange) {
    this.crudService.updateTable('products', modifications).subscribe(res => { });
  }

}
