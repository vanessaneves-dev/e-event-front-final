import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { EventUserInterface } from './event-user-interface';
import { environment } from '../../../environments/environment.development';
import { AuthUserService } from './auth-user.service';


@Injectable({
  providedIn: 'root'
})
export class EventUserService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthUserService
  ) {}

 public registerUser(user: EventUserInterface): Observable<string> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.post<string>(`${this.apiUrl}/user/new/`, formData);
  }

  public getAllUsers(): Observable<EventUserInterface[]> {
    return this.http.get<EventUserInterface[]>(this.apiUrl + '/urers/all');
  }

 public getUserById(id: string): Observable<EventUserInterface> {
  this.authService.createAuthorizationHeader();
  const headers = this.authService.createAuthorizationHeader();
     const url = `${this.apiUrl}/user/${id}`;
     console.log('Request URL:', url); // Exibe a URL no console
     console.log('Request Headers:', headers); 
    return this.http.get<EventUserInterface>(`${this.apiUrl}/user/`, { headers: this.authService.createAuthorizationHeader() ?? {} });
  }

 public updateUser(id: string, updateUser: EventUserInterface): Observable<EventUserInterface> {
  const headers = this.authService.createAuthorizationHeader();
  const url = `${this.apiUrl}/user/update/${id}`;
  console.log('Atualizando user com URL:', url);
  console.log('Dados do user:', updateUser); 

    return this.http.put<EventUserInterface>(url, updateUser, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao atualizar organizador:', error);
        return throwError(error);
      })
    );
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/urers/${id}`);
  }
}
