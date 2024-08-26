import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthOrganizerService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
   private router: Router
  ) { }

  autenticarOrganizer(email: String, password: String): Observable<any>{
    return this.http.post(`${this.apiUrl}/organizer/auth`, {email, password})

  }

 
  public createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      });
    } else {
      console.log("JWT token not found in the Local Storage");
      return new HttpHeaders(); // Retorne um cabeçalho vazio se não houver token
    }
  }

   // Obtém o nome do usuário do servidor
   getUserName(): Observable<string | null> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<string>(`${this.apiUrl}/user`, { headers });
  }

  getUserImageUrl(id: string): Observable<string | null> {
    return this.http.get<string | null>(`${this.apiUrl}/organizer/${id}`);
  }
  

 logout() {
    localStorage.removeItem('JWT');
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  // Verifica se o usuário está autenticado
  
  get isLogged() {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return true;
    }
    return false;
  }
 


}
