import { Component, OnInit } from '@angular/core';
import { AuthOrganizerService } from 'src/app/core/organizer/auth-organizer.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  userName: string | null = null;

  constructor(public authService: AuthOrganizerService) { }
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Verifica se o token JWT está presente no localStorage
    const jwtToken = localStorage.getItem('JWT');
    this.isLoggedIn = !!jwtToken; // Define isLoggedIn como verdadeiro se o token existir
    if (this.isLoggedIn) {
      // Se estiver autenticado, obtém o nome do usuário do servidor
      this.authService.getUserName().subscribe(
        (name: string | null) => this.userName = name,
        (error) => {
          console.error('Error fetching user name:', error);
          this.userName = null;
        }
      );
    } else {
      this.userName = null;
    }
  }

  logout() {
    this.authService.logout();
    this.checkLoginStatus(); // Atualiza o status de login após o logout
  }


}
