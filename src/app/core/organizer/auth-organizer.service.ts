import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthOrganizerService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  autenticarOrganizer(email: String, password: String): Observable<any>{
    return this.http.post(`${this.apiUrl}/organizer/auth`, {email, password})

  }

}
