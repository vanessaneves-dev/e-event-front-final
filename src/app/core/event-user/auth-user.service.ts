import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
   private router: Router
  ) { }

  private loginSuccessSubject = new Subject<void>();
  loginSuccess$ = this.loginSuccessSubject.asObservable();

  autenticarUser(email: String, password: String): Observable<any>{
    return this.http.post(`${this.apiUrl}/user/auth`, {email, password}).pipe(
      tap((response: any) => {
        const jwtToken = response.token;
        const userId = response.userId;
  
        // Salva o token JWT no localStorage
        localStorage.setItem('JWT', jwtToken);
  
        // Salva o userId no localStorage
        localStorage.setItem('userId', userId);
  
        // Emite um evento de sucesso de login
        this.loginSuccessSubject.next();
      })
    );
  }

    public createAuthorizationHeader(): HttpHeaders {
      let jwtToken = localStorage.getItem('JWT');
      if (jwtToken) {
        if (jwtToken.startsWith('Bearer ')) {
          jwtToken = jwtToken.substring(7);
        }
        
        return new HttpHeaders({
          'Authorization': `Bearer ${jwtToken}`
        });
      } else {
        console.log("JWT token not found in the Local Storage");
        return new HttpHeaders(); // Retorne um cabeçalho vazio se não houver token
      }
    }

    getUserName(): Observable<string | null> {
      const headers = this.createAuthorizationHeader();
      return this.http.get<string>(`${this.apiUrl}/user`, { headers });
    }

    getUserId(): string | null {
      
      console.log('chamando id', this.getUserId)
      return localStorage.getItem('userId');
    }

    getUserImageUrl(id: string): Observable<string | null> {
      return this.http.get<string | null>(`${this.apiUrl}/user/${id}`);
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
