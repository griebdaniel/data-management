import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() data: any;
  @Input() type: string;
  @Input() width: string;
  @Input() height: string;

  style: object;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    console.log(this.elRef.nativeElement.parentElement);
    console.log('data = ' + this.data + '\ntype = ' + this.type);

    this.style = { 'width': this.width, 'height': this.height };

    console.log(this.style);

  }

}
