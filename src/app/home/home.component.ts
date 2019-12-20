import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AppareilViewComponent implements OnInit {

  isAuth = false;
  lastUpdate = new Date();
  appareils: any[];

  constructor() {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 2000
    );
  }

  ngOnInit() {
  }

}
