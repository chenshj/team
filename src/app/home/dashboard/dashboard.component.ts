import { Component, OnInit, Compiler } from '@angular/core';
import { Router } from '@angular/router';
import { AppContextService } from '../app-context.service';

declare var lazyRequire: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private index = 1;
  constructor(private context: AppContextService) { }

  ngOnInit() {
  }

  openWeeklyReport() {
    this.context.open('Sagi' + this.index, 'Sagi');
    this.index++;
  }
}
