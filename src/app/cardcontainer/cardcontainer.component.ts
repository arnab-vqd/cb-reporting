import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cardcontainer',
  templateUrl: './cardcontainer.component.html',
  styleUrls: ['./cardcontainer.component.scss']
})
export class CardcontainerComponent implements OnInit {

  constructor() { }

  @Input()
  title;

  @Input()
  totalValue;

  @Input()
  categoryValue;

  @Input()
  compareValue;

  difference = 0;
  icon = 'fa fa-arrow-up green';

  ngOnInit() {
    if (this.compareValue && this.categoryValue) {
      this.difference = this.categoryValue - this.compareValue;
      if (this.difference < 0) {
        this.icon = 'fa fa-arrow-down red';
      }
    }

  }

}
