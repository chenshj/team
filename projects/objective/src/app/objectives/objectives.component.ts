import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'obj-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent implements OnInit {
  public listItems: Array<{ text: string, short: string, value: number }> = [
    { text: 'All', short: 'all', value: 0 },
    { text: 'Sagi Chen', short: 'sagi', value: 1 },
    { text: 'Lucas Huang', short: 'lucas', value: 2 },
    { text: 'Ximena Fan', short: 'ximena', value: 3 },
    { text: 'Witt Ji', short: 'witt', value: 4 },
    { text: 'Weipeng Ji', short: 'weipeng', value: 5 },
    { text: 'Cherly Zeng', short: 'cherly', value: 6 },
    { text: 'Nancy Wang', short: 'nancy', value: 7 },
    { text: 'Justin Li', short: 'justin', value: 8 },
    { text: 'John Wang', short: 'john', value: 9 },
    { text: 'Yanxue Guo', short: 'yanxue', value: 10 },
    { text: 'Hao Wang', short: 'hao', value: 11 },
    { text: 'Yuyang Hu', short: 'yuyang', value: 12 }
  ];
  constructor() { }

  ngOnInit() {
  }

}
