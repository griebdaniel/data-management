import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { TableMetaData, TableColumn, ColumnTypes } from './table-meta-data';
import { Observable, Subject, of, ObjectUnsubscribedError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CellDialogComponent } from './cell-dialog/cell-dialog.component';
import * as lodash from 'lodash';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit {
  @Input() metaData: TableMetaData;
  @Input() data: Observable<Array<Object>>;
  @Output() change = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ColumnTypes = ColumnTypes;
  dataColumns: string[] = [];
  displayedColumns: string[] = ['first'];
  dataSource = new MatTableDataSource();
  unchangedData = [];

  currentSort = { active: '', direction: '' };
  currentFilter = '';
  headerSelect: boolean;
  select: Boolean[] = [];

  constructor(private dialog: MatDialog, private crudService: CrudService) {

  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter) => {
      let dataToFilter = '';
      this.dataColumns.forEach(columnName => {
        const meta = lodash.find(this.metaData.columns, { name: columnName });
        if (meta.type !== ColumnTypes.Table && meta.type !== ColumnTypes.CheckBox) {
          dataToFilter += data[columnName];
        }
      });

      return dataToFilter.indexOf(filter) !== -1;
    };
    this.dataSource.paginator = this.paginator;

    this.metaData.columns.forEach(column => {
      this.dataColumns.push(column.name);
      this.displayedColumns.push(column.name);
    });

    this.data.subscribe(res => {
      res.forEach(element => {
        this.unchangedData.push(element);
        this.select.push(false);
      });
      this.dataSource.data = res;
    });
  }

  edit(i: number, columnName: string) {
    i = this.paginator.pageIndex * this.paginator.pageSize + i;
    const meta = lodash.find(this.metaData.columns, { name: columnName });
    const dialogRef = this.dialog.open(CellDialogComponent, {
      data: {
        data: this.dataSource.data[i][columnName],
        metaData: meta,
        tableRef: this,
      },
      autoFocus: !(meta.type === ColumnTypes.Table)
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {
        this.dataSource.data[i][columnName] = res;
        if (this.metaData.collectionName) {
          const update = { $set: {} };
          update.$set[columnName] = res;
          this.crudService.update(
            this.metaData.collectionName, { _id: this.dataSource.data[i]['_id'] }, update
          ).subscribe(result => { return; });
        }
        this.change.emit(this.dataSource.data);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.currentFilter = filterValue;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

    this.dataSource.data = [];
    this.unchangedData.forEach(element => {
      this.dataSource.data.push(element);
    });

    this.dataSource.data = this.dataSource.data.filter(data => {
      let dataToFilter = '';
      this.dataColumns.forEach(columnName => {
        const meta = lodash.find(this.metaData.columns, { name: columnName });
        if (meta.type !== ColumnTypes.Table) {
          dataToFilter += data[columnName];
        }
      });
      dataToFilter = dataToFilter.trim();
      dataToFilter = dataToFilter.toLowerCase();
      return dataToFilter.indexOf(filterValue) !== -1;
    });

    if (this.currentSort['direction'] !== '') {
      this.sortChange(this.currentSort);
    }

  }

  addRow() {
    const insertedRow = {};

    this.unchangedData.unshift(insertedRow);
    this.dataSource.data.unshift(insertedRow);
    this.select.unshift(false);

    if (this.metaData.collectionName) {
      this.crudService.insert(this.metaData.collectionName, {}).subscribe(id => this.dataSource.data[0]['_id'] = id);
    }

    this.dataSource.data = this.dataSource.data;

    this.change.emit(this.dataSource.data);
  }

  deleteRow() {
    for (let i = 0; i < this.select.length; i++) {
      if (this.select[i] === true) {
        if (this.metaData.collectionName) {
          this.crudService.delete(this.metaData.collectionName, { _id: this.dataSource.data[i]['_id'] }).subscribe(res => { return; });
        }
        this.unchangedData = this.unchangedData.filter(value => value !== this.dataSource.data[i]);
        this.dataSource.data.splice(i, 1);
        this.select.splice(i, 1);
        i--;
      }
    }

    this.dataSource.data = this.dataSource.data;

    this.change.emit(this.dataSource.data);
  }

  headedCheckboxChange(value) {
    for (let index = 0; index < this.select.length; index++) {
      this.select[index] = value.checked;
    }
  }

  sortChange(event) {
    this.currentSort = event;

    if (event['direction'] === '') {
      this.applyFilter(this.currentFilter);
      return;
    }

    this.dataSource.data = lodash.orderBy(this.dataSource.data, [event['active']], [event['direction']]);
  }

  changed() {
    this.change.emit(this.dataSource.data);
  }

}
