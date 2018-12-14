import { Component, OnInit } from '@angular/core';
import { TableMetaData, ColumnTypes } from '../smart-table/table-meta-data';
import { Observable } from 'rxjs';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: []
})
export class ProductsComponent implements OnInit {

  metaData: TableMetaData;
  data: Observable<Array<Object>>;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    const supplies = this.crudService.find('supplies');
    const machines = this.crudService.find('machines');
    const suppliesAcOptions = [];
    const machinesAcOptions = [];

    supplies.subscribe(supply => {
      supply.forEach(supp => {
        suppliesAcOptions.push(supp['name']);
      });
    });

    machines.subscribe(machine => {
      machine.forEach(mach => {
        machinesAcOptions.push(mach['name']);
      });
    });

    const necessaryMetaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Autocomplete, displayName: 'Name', acOptions: suppliesAcOptions },
        { name: 'qty', type: ColumnTypes.Number, displayName: 'Quantity' }
      ],
    };

    const phasesMetaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Text, displayName: 'Name' },
        { name: 'duration', type: ColumnTypes.Number, displayName: 'Duration' },
        { name: 'machine', type: ColumnTypes.Autocomplete, displayName: 'Machine', acOptions: machinesAcOptions },
      ]
    };

    this.metaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Text, displayName: 'Name' },
        { name: 'phases', type: ColumnTypes.Table, displayName: 'Phases', metaData: phasesMetaData },
        { name: 'necessary', type: ColumnTypes.Table, displayName: 'Necessary', metaData: necessaryMetaData }
      ],
      collectionName: 'products'
    };

    this.data = this.crudService.find('products');
  }

}
