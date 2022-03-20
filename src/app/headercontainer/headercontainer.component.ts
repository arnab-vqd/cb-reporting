import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-headercontainer',
  templateUrl: './headercontainer.component.html',
  styleUrls: ['./headercontainer.component.scss']
})
export class HeadercontainerComponent implements OnInit {

  @Input()
  pageTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
