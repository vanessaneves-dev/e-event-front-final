import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthOrganizerService } from 'src/app/core/organizer/auth-organizer.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  organizerImageUrl: string | null = null;
  organizerUsername: string = '';
  organizerEmail: string = '';
  userType: 'user' | 'organizer' | null = null;
  

  constructor(public authService: AuthOrganizerService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.checkLoginStatus();  
    this.loadOrganizerData();
    
  }
  
  loadOrganizerData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      console.log('Dados do usuário carregados:', user);
      this.organizerUsername = user.username || this.organizerUsername;
      this.organizerEmail = user.email || this.organizerEmail;
      this.organizerImageUrl = user.imageUrl || this.organizerImageUrl;
    }else {
      console.log('Nenhum dado de usuário encontrado no localStorage.');
    }
  }

  checkLoginStatus() {    
    console.log('checkLoginStatus() chamado');
    const jwtToken = localStorage.getItem('JWT');
    this.isLoggedIn = !!jwtToken;
    console.log('Usuário está logado:', this.isLoggedIn);
    if(this.isLoggedIn)   {
      console.log('Token JWT encontrado:', jwtToken);
      this.setUserType(jwtToken!)
    }else {
      console.log('Nenhum token JWT encontrado.');
    }
  }
   
  setUserType(token: string){
    console.log('setUserType() chamado com token:', token);
    if(token.includes('access_user_token')){
      this.userType = 'user';
      console.log('Tipo de usuário definido como: user');
    } else if (token.includes('access_organizer_token')){
      this.userType = 'organizer';
      console.log('Tipo de usuário definido como: organizer');
    }else {
      this.userType = null;
      console.log('Tipo de usuário não pôde ser determinado.');
    }
  }
 

  logout() {
    console.log('logout() chamado');
    this.authService.logout();
    this.checkLoginStatus(); 
    this.router.navigateByUrl('/')
  }


}
