import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColumnTypes } from '../table-meta-data';
import { of, Observable, Subject } from 'rxjs';
import * as lodash from 'lodash';

@Component({
  selector: 'app-cell-dialog',
  templateUrl: './cell-dialog.component.html',
  styleUrls: ['./cell-dialog.component.css']
})
export class CellDialogComponent implements OnInit {
  ColumnTypes = ColumnTypes;
  filteredOptions = new Subject<string[]>();

  constructor(
    public dialogRef: MatDialogRef<CellDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.metaData !== undefined && this.data.data === undefined) {
      this.data.data = [];
    }

    this.dialogRef.backdropClick().subscribe(res => {
      this.dialogRef.close(this.data.data);
    });

    this.dialogRef.keydownEvents().subscribe(res => {
      if (res.key === 'Enter') {
        setTimeout(() => this.dialogRef.close(this.data.data), 0);
      }
    });
  }

  filterOptions(filter) {
    let acOptions: Array<any> = this.data.metaData.acOptions;
    if (this.data.metaData.type === ColumnTypes.Object) {
      acOptions = lodash.map(this.data.metaData.acOptions, (option) => this.data.metaData.map(option));
    }

    this.filteredOptions.next(acOptions.filter(option => option.toLowerCase().includes(filter.toLowerCase())));
  }

  onChange(event) {
    if (this.data.metaData.type === ColumnTypes.Object) {
      const changed = lodash.find(this.data.metaData.acOptions, (acOption) => event === this.data.metaData.map(acOption));
      if (changed !== undefined) {
        this.data.data = changed;
      }
    }
  }

  changed(event: any) {
    this.data.tableRef.changed(this.data.data);
  }

  asObservable(data): Observable<Object[]> {
    return of(data);
  }


}
