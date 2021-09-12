import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from './category';
import { NotificationService } from './../../notification.service';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private URL = 'api/DataCategory';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private notif: NotificationService) { }

  private log(message: string) {
    this.notif.add(`CategoryService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL)
      .pipe(
        tap(_ => this.log('fetched category')),
        catchError(this.handleError<Category[]>('getCategory', []))
      );
  }

  getById(id: number): Observable<Category | undefined> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`Fetched GetCategoryById id=${id}`)),
      catchError(this.handleError<Category>(`GetCategoryById id=${id}`))
    );
  }

  insert(data: Category): Observable<Category> {
    return this.http.post<Category>(this.URL, data, this.httpOptions)
      .pipe(
        tap((newData: Category) => this.log(`Added Category w/ id=${newData.id}`)),
        catchError(this.handleError<Category>('AddCategory'))
      );
  }

  update(data: Category): Observable<any> {
    return this.http.put(this.URL, data, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${data.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  delete(id: number): Observable<Category> {
    const url = `${this.URL}/${id}`;

    return this.http.delete<Category>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

}
