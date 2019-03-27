import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Transaction } from '../types/transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    columnDefs = [
        {headerName: 'Name', field: 'name' },
        {headerName: 'Emai', field: 'email' },
        {headerName: 'Age', field: 'age' },
        {headerName: 'Phone', field: 'phone' },
        {headerName: 'GeoInfo', field: 'geoinfo'}
    ];

    rowData: Array<Transaction> = [];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getData().subscribe((result: Transaction[]) => {
      this.rowData = result;
      console.log(result);
    });
  }
}
