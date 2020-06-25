import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  showModal() {
    this.isVisible = true;
  }

  reciveValue($event) {
    this.isVisible = $event;

  }
}
