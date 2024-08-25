import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventInterface } from './events.inteface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/organizer/event/all`);
  }

  getEventByID(id: String): Observable<any>{
    return this.http.get(`${this.apiUrl}/organizer/event/${id}`)
  }

  public save(newEvent: EventInterface): Observable<EventInterface> {
    return this.http.post<EventInterface>(`${this.apiUrl}/organizer/event/new`, newEvent)
  }

  public update (updateEvent: EventInterface): Observable<EventInterface> {
    return this.http.put<EventInterface>(this.apiUrl + /event/ + updateEvent.id, updateEvent)
  }
  
  public remove(removeEvent: EventInterface) {
    // this.apiURL+'/'+id
    console.log('entrou no remove');
    return this.http.delete(this.apiUrl + '/organizer/event/' + removeEvent.id);
  }
}
