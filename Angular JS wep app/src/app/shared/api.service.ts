import { Injectable } from "@angular/core";
import { Player } from "./player";
import { Admin } from "./admin";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  endpoint: string = "http://localhost:4000/api";
  endpointgames: string = "http://localhost:4000/games";
  endpointAdmin: string = "http://localhost:4000/api-admin";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  // Add Player
  AddPlayer(data: any): Observable<any> {
    let API_URL = `${this.endpoint}/add-player`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  // Get all players
  GetPlayers() {
    return this.http.get(`${this.endpoint}`);
  }

  // Used for retrieving Player info in edits, join games
  GetPlayer(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-player/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update player
  UpdatePlayer(id, data: Player): Observable<any> {
    let API_URL = `${this.endpoint}/update-player/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete player
  DeletePlayer(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-player/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }

  // Add Game
  AddGame(data: any): Observable<any> {
    let API_URL = `${this.endpoint}/add-game`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  // Gets games
  GetGames() {
    return this.http.get(`${this.endpointgames}`);
  }

  // Used for retrieving Game info in edits
  GetGame(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-game/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Admin login
  AdminLogin(data: Admin): Observable<any> {
    const API_URL = `${this.endpointAdmin}/admin-login`;
    return this.http.post(API_URL, data).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Admin logout
  AdminLogout(){
    window.sessionStorage.removeItem("isLoggedIn");
  }

  // Set session storage for admin login
  SetAdminLoginSession(){
    window.sessionStorage.setItem("isLoggedIn", "true");
  }

  // Set session storage for admin login
  IsAdminLoggedIn(): boolean {
    const loginSession = window.sessionStorage.getItem("isLoggedIn");
    if(loginSession !== null){
      return true;
    }
    return false;
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
