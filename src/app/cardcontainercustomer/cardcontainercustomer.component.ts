import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cardcontainercustomer',
  templateUrl: './cardcontainercustomer.component.html',
  styleUrls: ['./cardcontainercustomer.component.scss']
})
export class CardcontainercustomerComponent implements OnInit {

  constructor() { }

  @Input()
  title;

  @Input()
  totalPax;

  @Input()
  billCount;

  @Input()
  customers;


  icon = 'fa fa-arrow-up green';

  ngOnInit() {
        this.icon = 'fa fa-arrow-down red';
  }

}
