import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Transaction } from '../types/transaction';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errorMessage = '';

    columnDefs = [
        {headerName: 'Transaction ID', field: 'id' },
        {headerName: 'Name', field: 'name' },
        {headerName: 'Email', field: 'email' },
        {headerName: 'Age', field: 'age' },
        {headerName: 'Phone', field: 'phone' },
        {headerName: 'Geo Info', field: 'geoInfo', 
        children:[
          { headerName: 'Latitude', field: 'geoInfo.latitude' },
          { headerName: 'Longitude', field: 'geoInfo.longitude' }
          ]},
        {headerName: 'connectionInfo', field: 'connectionInfo', 
        children:[
          { headerName: 'Confidence', field: 'connectionInfo.confidence',
           },
          { headerName: 'Type', field: 'connectionInfo.type' }
          ]}
    ];

    rowData: Transaction[] = [];
    fraudSearch: FormGroup;
    finalResult: Transaction[] = [];

  constructor(
    public api: ApiService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.fraudSearch = this.fb.group({
      transactionID: ['', [Validators.required]],
      confidenceLv: ['']
    })

    console.log(this.columnDefs)
    this.api.getData().subscribe(
      (result: Transaction[]) => {
        this.rowData = result;
        console.log(result)
      }, (error: any) => this.errorMessage = error);
    }

    get f() { return this.fraudSearch.controls; }

    searchFraud() {
      this.getObject(this.rowData, this.f.transactionID.value);
       this.rowData = this.finalResult;
        console.log(this.finalResult);
    }

  checkChildren(childrens): any{
    if(childrens instanceof Array){
      for(let i = 0; i < childrens.length; i++) {
    console.log('See:', childrens[i])
        this.finalResult.push(childrens[i]);
        this.checkChildren(childrens[i].childrens);
      }
    }
  }

  getObject(searchData, searchString): Transaction[] {
    let result: Transaction[] = [];
    if(searchData instanceof Array) {
      for(let i = 0; i < searchData.length; i++) {
        result = this.getObject(searchData[i], searchString);
      }
    }  else  {
      for(const prop in searchData) {
        if(prop == 'id') {
              if(searchData[prop] == searchString) {
                this.finalResult.push(searchData);
                this.checkChildren(searchData.childrens)
              }
            }
            if(searchData[prop] instanceof Object || searchData[prop] instanceof Array) {
              return this.getObject(searchData[prop], searchString);
            }
          }
        }
  }
}
