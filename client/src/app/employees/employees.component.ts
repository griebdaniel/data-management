import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableMetaData, ColumnTypes } from '../smart-table/table-meta-data';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  data: Observable<Array<Object>>;
  metaData: TableMetaData;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    const machines = this.crudService.find('machines');
    const machinesAcOptions = [];

    machines.subscribe(machine => {
      machine.forEach(mach => {
        machinesAcOptions.push(mach['name']);
      });
    });

    const skillsMetaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Autocomplete, displayName: 'Name', acOptions: machinesAcOptions },
      ],
    };

    this.metaData = {
      columns: [
        { name: 'name', type: ColumnTypes.Text, displayName: 'Name' },
        { name: 'skills', type: ColumnTypes.Table, displayName: 'Skills', metaData: skillsMetaData }
      ],
      collectionName: 'employees'
    };

    this.data = this.crudService.find('employees');
  }
}
