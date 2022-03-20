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
  categoryIcon;

  @Input()
  deliveryCount;

  @Input()
  count;

  @Input()
  unitType;

  ngOnInit() {
  }

}
