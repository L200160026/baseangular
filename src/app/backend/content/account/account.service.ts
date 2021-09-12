import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Account } from './account';
import { NotificationService } from '../../notification.service';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private URL = 'api/DataAccount';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private notif: NotificationService) { }

  private log(message: string) {
    this.notif.add(`AccountService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.URL)
      .pipe(
        tap(_ => this.log('Fetched Account')),
        catchError(this.handleError<Account[]>('GetAccount', []))
      );
  }

  getById(id: number): Observable<Account | undefined> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Account>(url).pipe(
      tap(_ => this.log(`Fetched GetAccountById id=${id}`)),
      catchError(this.handleError<Account>(`GetAccountById id=${id}`))
    );
  }

  insert(data: Account): Observable<Account> {
    return this.http.post<Account>(this.URL, data, this.httpOptions)
      .pipe(
        tap((newData: Account) => this.log(`Added Account w/ id=${newData.id}`)),
        catchError(this.handleError<Account>('AddAccount'))
      );
  }

  update(data: Account): Observable<any> {
    return this.http.put(this.URL, data, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${data.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  delete(id: number): Observable<Account> {
    const url = `${this.URL}/${id}`;

    return this.http.delete<Account>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Account id=${id}`)),
      catchError(this.handleError<Account>('DeleteAccount'))
    );
  }

}
