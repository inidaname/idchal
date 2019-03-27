import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './types/transaction';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) {}

	getData(): Observable<Transaction[]> {
    const obs = this.http.get<Transaction[]>('./api/search')
    return obs;
	}
}
