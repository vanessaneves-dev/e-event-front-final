import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<OrganizerInterface>(`${this.apiUrl}/organizer/${id}`, { headers: this.authService.createAuthorizationHeader() ?? {} });
  }
  
  public update(id: string, updateOrganizer: OrganizerInterface): Observable<OrganizerInterface> {
    this.authService.createAuthorizationHeader();
    return this.http.put<OrganizerInterface>(this.apiUrl + '/organizer/' + updateOrganizer.id, updateOrganizer, { headers: this.authService.createAuthorizationHeader() ?? {} });
  }
  // removeOrganizer: OrganizerInterface -> id:number
  public remove(removeOrganizer: OrganizerInterface) {
    // this.apiURL+'/'+id
    console.log('entrou no remove');
    return this.http.delete(this.apiUrl + '/organizer/' + removeOrganizer.id);}

}
