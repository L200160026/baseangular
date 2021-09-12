import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './product';
import { NotificationService } from '../../notification.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private URL = 'api/DataProduct';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private notif: NotificationService) { }

  private log(message: string) {
    this.notif.add(`ProuctService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL)
      .pipe(
        tap(_ => this.log('Fetched Product')),
        catchError(this.handleError<Product[]>('GetProduct', []))
      );
  }

  getById(id: number): Observable<Product | undefined> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`Fetched GetProductById id=${id}`)),
      catchError(this.handleError<Product>(`GetProductById id=${id}`))
    );
  }

  insert(data: Product): Observable<Product> {
    return this.http.post<Product>(this.URL, data, this.httpOptions)
      .pipe(
        tap((newData: Product) => this.log(`Added Product w/ id=${newData.id}`)),
        catchError(this.handleError<Product>('AddProduct'))
      );
  }

  update(data: Product): Observable<any> {
    return this.http.put(this.URL, data, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${data.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.URL}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Product id=${id}`)),
      catchError(this.handleError<Product>('DeleteProduct'))
    );
  }

}
