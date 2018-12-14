import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Observable } from 'rxjs/internal/Observable';
import { TableMetaData, ColumnTypes } from '../smart-table/table-meta-data';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  data: Observable<Array<Object>>;
  metaData: TableMetaData;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.metaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Text, displayName: 'Name' },
        { name: 'skill', type: ColumnTypes.Text, displayName: 'Skill' },
        { name: 'count', type: ColumnTypes.Number, displayName: 'Count' }
      ],
      collectionName: 'machines'
    };

    this.data = this.crudService.find('machines');
  }

}
