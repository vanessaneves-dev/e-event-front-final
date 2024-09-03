import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {
  private userType: string | null = null;

  setUserType(token: string) {
    try {
      const decodedToken: any = jwtDecode(token);
      const roles = decodedToken.roles || [];

      if (roles.includes('USER')) {
        this.userType = 'user';
      } else if (roles.includes('ORGANIZER')) {
        this.userType = 'organizer';
      } else {
        this.userType = null;
      }
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      this.userType = null;
    }
  }

  getUserType(): string | null {
    return this.userType;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('JWT');
  }
}
