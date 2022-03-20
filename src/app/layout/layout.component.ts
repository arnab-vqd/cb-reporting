import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  pageTitle: string;

  constructor() { }

  ngOnInit() {
    this.pageTitle = 'Dashboard';
  }

}
