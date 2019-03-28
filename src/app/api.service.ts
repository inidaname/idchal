import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Transaction } from './types/transaction';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) {}

	getData(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('http://localhost:5000/api/search').pipe(
		tap(),
		catchError(this.handleError)
		)
	}



	private handleError(err: HttpErrorResponse) {
		// in a real world app, we may send the server to some remote logging infrastructure
		// instead of just logging it to the console
		let errorMessage = '';
		if (err.error instanceof ErrorEvent) {
		  // A client-side or network error occurred.
		  errorMessage = `An error occurred: ${err.error.message}`;
		} else {
		  // The backend returned an unsuccessful response code.
		  errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		console.error(errorMessage);
		return throwError(errorMessage);
	}
}
