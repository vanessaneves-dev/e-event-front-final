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
  userName: string | null = null;
  userImageUrl: string | null = null;
  userId: string = '';

  constructor(public authService: AuthOrganizerService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.checkLoginStatus();
    // this.userId = localStorage.getItem('userId') || '';
    // console.log('User ID do localStorage:', this.userId);
    
  }


  checkLoginStatus() {    
    const jwtToken = localStorage.getItem('JWT');
    this.isLoggedIn = !!jwtToken;
    if (this.isLoggedIn) {
      
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

  // navigateToProfile(): void {
  //   if (this.userId) {
  //     this.router.navigate(['/perfilOrganizer/', this.userId]);
  //   } else {
  //     console.error('User ID não encontrado!');
  //   }
  // }

  logout() {
    this.authService.logout();
    this.checkLoginStatus(); // Atualiza o status de login após o logout
  }


}
