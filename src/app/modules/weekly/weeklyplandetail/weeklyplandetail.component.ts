import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weeklyplandetail',
  templateUrl: './weeklyplandetail.component.html',
  styleUrls: ['./weeklyplandetail.component.css']
})
export class WeeklyPlanDetailComponent implements OnInit {
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
