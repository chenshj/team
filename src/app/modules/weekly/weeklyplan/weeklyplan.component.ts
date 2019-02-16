import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weeklyplan',
  templateUrl: './weeklyplan.component.html',
  styleUrls: ['./weeklyplan.component.css']
})
export class WeeklyPlanComponent implements OnInit {

  showFilter = true;

  toggleFilter() {
    this.showFilter = !this.showFilter;
    console.log(this.showFilter);
  }

  constructor() { }

  ngOnInit() {
  }

}
