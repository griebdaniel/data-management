import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { TableMetaData, ColumnTypes } from '../smart-table/table-meta-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {
  metaData: TableMetaData;
  data: Observable<Array<Object>>;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.metaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Text, displayName: 'Name' },
        { name: 'qty', type: ColumnTypes.Number, displayName: 'Quantity' }
      ],
      collectionName: 'supplies',
    };
    this.data = this.crudService.find('supplies');
  }

}
