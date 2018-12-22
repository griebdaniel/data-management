import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-table-design',
  styleUrls: ['table-design.component.css'],
  templateUrl: 'table-design.component.html',
})
export class TableDesignComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantity'];
  dataSource = [
    { name: 'foo', quantity: 0 },
    { name: 'bar', quantity: 1 },
  ];

  ngOnInit(): void {

  }

}
