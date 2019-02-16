import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthlyplandetail',
  templateUrl: './monthlyplandetail.component.html',
  styleUrls: ['./monthlyplandetail.component.css']
})
export class MonthlyPlanDetailComponent implements OnInit {
  public opened = false;

  public close() {
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

  constructor() { }

  ngOnInit() {
  }

}
