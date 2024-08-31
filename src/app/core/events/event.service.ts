import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventInterface } from './events.inteface';
import { AuthOrganizerService } from '../organizer/auth-organizer.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthOrganizerService
  ) { }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/organizer/event/all`);
  }

  getEventByID(id: String): Observable<any>{
    return this.http.get(`${this.apiUrl}/organizer/event/${id}`)
  }

  public save(newEvent: EventInterface): Observable<EventInterface> {
    
    return this.http.post<EventInterface>(`${this.apiUrl}/organizer/event/new`, newEvent, { headers: this.authService.createAuthorizationHeader() ?? {} })
  }

  getEventsByOrganizer(): Observable<EventInterface[]> {
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get<EventInterface[]>(`${this.apiUrl}/organizer/events`, { headers });
  }

  public update (updateEvent: EventInterface): Observable<EventInterface> {
    const headers = this.authService.createAuthorizationHeader();
    return this.http.put<EventInterface>(`${this.apiUrl}/organizer/event/update/${updateEvent.id}`, updateEvent, {headers})
  }
  
  public remove(removeEvent: EventInterface): Observable<void> {
    // this.apiURL+'/'+id
    console.log('entrou no remove');
    return this.http.delete<void>(this.apiUrl + '/organizer/event/delete/' + removeEvent.id, { headers: this.authService.createAuthorizationHeader() ?? {} });
  }
}
