import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Transaction } from '../types/transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errorMessage = '';

    columnDefs = [
        {headerName: 'Name', field: 'name' },
        {headerName: 'Email', field: 'email' },
        {headerName: 'Age', field: 'age' },
        {headerName: 'Phone', field: 'phone' },
        {headerName: 'GeoInfo', field: 'geoinfo'}
    ];

    rowData: Transaction[] = [];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getData().subscribe(
      (result: Transaction[]) => {
        this.rowData = result;
        this.getObject(result)
      },
      (error: any) => this.errorMessage = error);
  }

  getObject(theObject): Transaction[] {
    let result: Transaction[] = []
    if(theObject instanceof Array) {
      for(var i = 0; i < theObject.length; i++) {
        console.log('see too')
          result = this.getObject(theObject[i]);
      }
    }  else  {
      for(var prop in theObject) {
        console.log(theObject)
          if(prop == 'childrens') {
              if(theObject[prop] == 1) {
                  return theObject;
              }
          }
          if(theObject[prop] instanceof Object || theObject[prop] instanceof Array)
              result = this.getObject(theObject[prop]);
      }
    }
    console.log(result)

  }

  
}
