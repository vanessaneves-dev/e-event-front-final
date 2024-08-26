import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizerInterface } from './organizer.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
 
  public save(newOrganizer: OrganizerInterface): Observable<OrganizerInterface> {
    return this.http.post<OrganizerInterface>(this.apiUrl + '/organizer/new', newOrganizer);
  }

  public getAll(): Observable<OrganizerInterface[]> {
    return this.http.get<OrganizerInterface[]>(this.apiUrl + '/organizer/all');
  }

  
  public update(updateOrganizer: OrganizerInterface): Observable<OrganizerInterface> {
    return this.http.put<OrganizerInterface>(this.apiUrl + '/organizer/' + updateOrganizer.id, updateOrganizer);
  }
  // removeOrganizer: OrganizerInterface -> id:number
  public remove(removeOrganizer: OrganizerInterface) {
    // this.apiURL+'/'+id
    console.log('entrou no remove');
    return this.http.delete(this.apiUrl + '/organizer/' + removeOrganizer.id);}

}
