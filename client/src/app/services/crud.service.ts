import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from './config';
import { TableChange } from 'data-table';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  baseUrl = getUrl();

  constructor(private http: HttpClient) {

  }

  find(collection: string): Observable<Array<Object>> {
    return this.http.post<Array<Object>>(
      this.baseUrl + 'find',
      { collection: collection },
      { withCredentials: true }
    );
  }

  update(collection: string, filter: Object, update: Object): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + 'update',
      { collection: collection, filter: filter, update: update },
      { withCredentials: true },
    );
  }

  delete(collection: string, filter: Object): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + 'delete',
      { collection: collection, filter: filter },
      { withCredentials: true },
    );
  }

  insert(collection: string, doc: Object): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + 'insert',
      { collection: collection, doc: doc },
      { withCredentials: true },
    );
  }

  getNecessary(): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + 'necessary',
      { },
      { withCredentials: true },
    );
  }

  findTable(table: string): Observable<any> {
    return this.http.post<Array<Object>>(
      this.baseUrl + 'findTable',
      { table: table },
      { withCredentials: true }
    );
  }

  updateTable(table: string, modifications: TableChange): Observable<any> {

    return this.http.post<string>(
      this.baseUrl + 'updateTable',
      { table: table, modifications: modifications },
      { withCredentials: true, responseType: 'text' as 'json' }
    );
  }

  notifyOnChange() {
    return this.http.post<any>(
      this.baseUrl + 'notifyOnChange',
      { withCredentials: true },
    );
  }

}
