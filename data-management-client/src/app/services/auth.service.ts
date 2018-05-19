import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl = 'http://localhost:3000/';
  baseUrl = 'http://35.202.228.102/api/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };

    return this.http.post<boolean>(
      this.baseUrl + 'login',
      { username: username, password: password },
      httpOptions
    );
  }

  isLoggedIn(): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true
    };

    return this.http.get<boolean>(
      this.baseUrl + 'isLoggedIn',
      httpOptions
    );
  }

  logOut(): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseUrl + 'logOut',
      { withCredentials: true },
    );
  }

}
