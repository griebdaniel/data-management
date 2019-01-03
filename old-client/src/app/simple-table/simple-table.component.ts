import { Component, OnInit, Input } from '@angular/core';
import * as lodash from 'lodash';
@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent implements OnInit {
  @Input() data: object[];
  @Input() types: string[];
  displayedColumns: string[];

  constructor() { }

  ngOnInit() {
    console.log(this.data);
    this.displayedColumns = lodash.keys(this.data[0]);
    console.log(this.displayedColumns);
  }

}
