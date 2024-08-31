import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { OrganizerInterface } from './organizer.interface';
import { AuthOrganizerService } from './auth-organizer.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthOrganizerService
  ) { }
 
  public save(newOrganizer: OrganizerInterface): Observable<OrganizerInterface> {
    return this.http.post<OrganizerInterface>(this.apiUrl + '/organizer/new', newOrganizer);
  }

  //para futura role ADMIN
  public getAll(): Observable<OrganizerInterface[]> {
    return this.http.get<OrganizerInterface[]>(this.apiUrl + '/organizer/all');
  }


  public getOrganizerById(id: string): Observable<OrganizerInterface> {
     this.authService.createAuthorizationHeader();
     const headers = this.authService.createAuthorizationHeader();
     const url = `${this.apiUrl}/organizer/${id}`;
   
     console.log('Request URL:', url); // Exibe a URL no console
     console.log('Request Headers:', headers); 
    return this.http.get<OrganizerInterface>(`${this.apiUrl}/organizer/`, { headers: this.authService.createAuthorizationHeader() ?? {} });
  }

  public update(id: string, updateOrganizer: OrganizerInterface): Observable<OrganizerInterface> {
    const headers = this.authService.createAuthorizationHeader();
    const url = `${this.apiUrl}/organizer/update/${id}`;
    console.log('Atualizando organizador com URL:', url);
    console.log('Dados do organizador:', updateOrganizer);
    
    return this.http.put<OrganizerInterface>(url, updateOrganizer, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao atualizar organizador:', error);
        return throwError(error);
      })
    );
  }
  
  
  public remove(id: string): Observable<void> {
    const headers = this.authService.createAuthorizationHeader();
    const url = `${this.apiUrl}/organizer/delete/${id}`;
    
    console.log('Removendo organizador com URL:', url);
    
    return this.http.delete<void>(url, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao remover organizador:', error);
        return throwError(error);
      })
    );
  }

}
