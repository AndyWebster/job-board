import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export interface ValueTable {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],

})
export class FilterPanelComponent implements OnInit {

  constructor(private adapter: DateAdapter<any>) { }

  ngOnInit() {
    this.adapter.setLocale('fr');
  }

  distances: ValueTable[] = [
    {value: '5-0', viewValue: '5 miles'},
    {value: '10-1', viewValue: '10 miles'},
    {value: '15-2', viewValue: '15 miles'}
  ];

  salaries: ValueTable[] = [
    {value: '5000-0', viewValue: '5000'},
    {value: '10000-1', viewValue: '10,000'},
    {value: '15000-2', viewValue: '15,000'},
    {value: '20000-2', viewValue: '20,000'},
    {value: '25000-2', viewValue: '25,000'},
    {value: '30000-2', viewValue: '30,000'},
    {value: '40000-2', viewValue: '40,000'},
    {value: '50000-2', viewValue: '50,000'},
    {value: '60000-2', viewValue: '60,000'},
    {value: '70000-2', viewValue: '70,000'}
  ];

}
