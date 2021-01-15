import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-convert',
  templateUrl: './index-convert.component.html',
  styleUrls: ['./index-convert.component.scss']
})
export class IndexConvertComponent implements OnInit {
  links = [
    { name: 'Currency convertor', path: '/convert/currency' },
    { name: 'Length convertor', path: '/convert/length' },
  ];
  activeLink = this.links[0];

  constructor() {
    this.activeLink = this.links[0];
  }

  ngOnInit(): void {
  }

}
