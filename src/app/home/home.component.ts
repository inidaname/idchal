import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Transaction } from '../types/transaction';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
          { headerName: 'Confidence', field: 'connectionInfo.confidence'},
          { headerName: 'Type', field: 'connectionInfo.type' }
          ]}
    ];

    returnedResult: Transaction[] = [];
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

    this.api.getData().subscribe(
      (result: Transaction[]) => {
        this.returnedResult = result;
      }, (error: any) => this.errorMessage = error);
    }

    get f() { return this.fraudSearch.controls; }

    searchFraud() {
      if (this.f.confidenceLv.value){
        this.getObject(this.returnedResult, this.f.transactionID.value, this.f.confidenceLv.value);
        this.rowData = this.finalResult;
      } else {
        this.getObject(this.returnedResult, this.f.transactionID.value);
        this.rowData = this.finalResult;
      }
    }

  checkChildren(childrens, confidenceLv): any{
    if(childrens instanceof Array){
      for(let i = 0; i < childrens.length; i++) {
        if (childrens[i].connectionInfo.confidence === confidenceLv){
          this.finalResult.push(childrens[i]);
        }
        this.checkChildren(childrens[i].childrens, confidenceLv);
      }
    }
  }

  getObject(searchData, searchString, confidenceLv = 1): Transaction[] {
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
                this.checkChildren(searchData.childrens, confidenceLv)
              }
            }
            if(searchData[prop] instanceof Object || searchData[prop] instanceof Array) {
              return this.getObject(searchData[prop], searchString);
            }
          }
        }
  }
}
