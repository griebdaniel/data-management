import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Observable } from 'rxjs/internal/Observable';
import { TableMetaData, ColumnTypes } from '../smart-table/table-meta-data';

@Component({
  selector: 'app-necessary',
  templateUrl: './necessary.component.html',
  styleUrls: ['./necessary.component.css']
})
export class NecessaryComponent implements OnInit {
  data: Observable<Array<Object>>;
  metaData: TableMetaData;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    const suppliesMetaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Text, displayName: 'Name' },
        { name: 'qty', type: ColumnTypes.Number, displayName: 'Quantity' }
      ],
    }

    this.metaData = {
      columns: [
        { name: 'ordername', type: ColumnTypes.Text, displayName: 'Order Name' },
        { name: 'required', type: ColumnTypes.Table, displayName: 'Required', metaData: suppliesMetaData }
      ],
    };

    this.data = this.crudService.getNecessary();
  }

}
