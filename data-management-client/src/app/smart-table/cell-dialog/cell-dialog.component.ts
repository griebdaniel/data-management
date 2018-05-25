import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColumnTypes } from '../table-meta-data';
import { of, Observable, Subject } from 'rxjs';

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
    console.log(this.data.metaData);
    if (this.data.metaData !== undefined && this.data.data === undefined) {
      this.data.data = [];
    }

    this.dialogRef.backdropClick().subscribe(res => {
      this.dialogRef.close(this.data.data);
    });

    this.dialogRef.keydownEvents().subscribe(res => {
      if (res.key === 'Enter') {
        this.dialogRef.close(this.data.data);
      }
    });
  }

  filterOptions(filter) {
    this.filteredOptions.next(
      this.data.metaData.acOptions.filter(option => option.toLowerCase().includes(filter.toLowerCase()))
    );
  }

  asObservable(data): Observable<Object[]> {
    return of(data);
  }

}
