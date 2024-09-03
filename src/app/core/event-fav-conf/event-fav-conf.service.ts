import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUserService } from '../event-user/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class EventFavConfService {

  private apiUrl = `${environment.apiUrl}/user-event`;

  constructor(private http: HttpClient,
    private authService: AuthUserService
  ) {}

  getConfirmedEvents(userId: string): Observable<any[]> {
   
  const headers = this.authService.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.apiUrl}/confirmed/${userId}`, { headers });
  }

  getFavoritedEvents(userId: string): Observable<any[]> {
   
  const headers = this.authService.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.apiUrl}/favorites/${userId}`, { headers });
  }

  confirmEvent(userId: string, eventId: string): Observable<any> {
   
  let headers = this.authService.createAuthorizationHeader();
  console.log('Headers for confirmEvent:', headers.get('Authorization'));
  // Obtenha o token atual
  let token = headers.get('Authorization');

  // Verifique se o token começa com "Bearer " e faça o replace
  if (token && token.startsWith('Bearer ')) {
    token = token.substring(7); // Remove "Bearer "
    headers = headers.set('Authorization', token); // Atualize o cabeçalho com o token sem o prefixo
    console.log('token apos substring', headers.get('Authorization'));
  }
    return this.http.post<any>(`${this.apiUrl}/confirm`, { userId, eventId }, { headers });
  }

  favoriteEvent(userId: string, eventId: string): Observable<any> {
   
  const headers = this.authService.createAuthorizationHeader();
  console.log('Headers for favoriteEvent:', headers.get('Authorization'));
    return this.http.post<any>(`${this.apiUrl}/favorite`, { userId, eventId }, { headers });
  }

    // Novo método para remover confirmação de presença
    removeConfirmedEvent(userId: string, eventId: string): Observable<any> {
      const headers = this.authService.createAuthorizationHeader();
      return this.http.delete<any>(`${this.apiUrl}/confirm/${userId}/${eventId}`, { headers });
    }
    
  
    // Novo método para remover um evento dos favoritos
    removeFavoritedEvent(userId: string, eventId: string): Observable<any> {
      const headers = this.authService.createAuthorizationHeader();
      return this.http.delete<any>(`${this.apiUrl}/favorite/${userId}/${eventId}`, { headers });
    }

  
}
