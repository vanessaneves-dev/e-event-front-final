import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventUserInterface } from './event-user-interface';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class EventUserService {
   apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(user: EventUserInterface): Observable<string> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.post<string>(`${this.apiUrl}/user/new/`, formData);
  }

  getAllUsers(): Observable<EventUserInterface[]> {
    return this.http.get<EventUserInterface[]>(this.apiUrl + '/urers/all');
  }

  getUserById(id: string): Observable<EventUserInterface> {
    return this.http.get<EventUserInterface>(`${this.apiUrl}/urers/${id}`);
  }

  updateUser(id: string, user: EventUserInterface): Observable<EventUserInterface> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);    

    return this.http.put<EventUserInterface>(`${this.apiUrl}/urers/${id}`, formData);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/urers/${id}`);
  }
}
