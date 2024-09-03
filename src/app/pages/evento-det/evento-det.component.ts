import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../../core/events/events.inteface';
import { EventService } from '../../core/events/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventFavConfService } from 'src/app/core/event-fav-conf/event-fav-conf.service';
import { AuthUserService } from 'src/app/core/event-user/auth-user.service';
import { EventUserService } from 'src/app/core/event-user/event-user.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-evento-det',
  templateUrl: './evento-det.component.html',
  styleUrls: ['./evento-det.component.css']
})
export class EventoDetComponent implements OnInit {
  event: EventInterface | undefined;
  userId: string = '';
  userData: any; 
  isConfirmed: boolean = false;
  isFavorited: boolean = false;
  isLoggedIn: boolean = false;
  userType: 'user' | 'organizer' | null = null;
  

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private userEventService: EventFavConfService,
    private authUserService: AuthUserService,
    private userService: EventUserService
  ){}

  ngOnInit(): void {
    // Supondo que você tem o ID do usuário salvo em algum lugar, como no localStorage
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      // Usa o EventUserService para buscar os dados do usuário pelo ID
      this.userService.getUserById(storedUserId).subscribe(user => {
        this.userData = user;
        this.userId = user.id; // Aqui você pega o ID do usuário
        console.log('User Data:', this.userData);
        console.log('User ID:', this.userId);
        this.checkEventStatus();
      }, error => {
        console.error('Erro ao buscar os dados do usuário:', error);
      });
    } else {
      console.error('ID do usuário não encontrado no localStorage.');
      this.router.navigate(['/login']);
    }

    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.eventService.getEventByID(eventId).subscribe((data: EventInterface) => {
        this.event = data;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.event?.maps || '');
      });
    }
    this.checkLoginStatus(); 
  }
    
    public safeUrl!: SafeResourceUrl;

    editEvent(): void {
      if (this.event) {
        this.router.navigate(['/edit-event', this.event.id]); // Redireciona para o formulário de edição
      }
    }

    confirmPresence(eventId: string): void {
      if (this.userId) { // Verifica se o usuário está logado
        console.log('User ID:', this.userId);
        console.log('Event ID:', eventId);
        this.userEventService.confirmEvent(this.userId, eventId).subscribe(() => {
          console.log('Presença confirmada!');
          this.isConfirmed = true;
        }, error => {
          console.error('Erro ao confirmar presença:', error);
        });
      } else {
        console.error('Usuário não está logado.');
        this.router.navigate(['/login']); // Redireciona para login se não estiver autenticado
      }
    }
  
    favoriteEvent(eventId: string): void {
       if  (this.userId) { // Verifica se o usuário está logado
    this.userEventService.favoriteEvent(this.userId, eventId).subscribe(() => {
      console.log('Evento favoritado!');
      alert('Evento adicionado aos favoritos!');
      this.isFavorited = true;
    }, error => {
      console.error('Erro ao favoritar evento:', error);
    });
  } else {
    console.error('Usuário não está logado.');
    this.router.navigate(['/login']); // Redireciona para login se não estiver autenticado
  }
    }

    private checkEventStatus(): void {
      if (this.event && this.userId) {
        this.userEventService.getConfirmedEvents(this.userId).subscribe((confirmedEvents: EventInterface[]) => {
          this.isConfirmed = confirmedEvents.some(event => event.id === this.event?.id);
        });
  
        this.userEventService.getFavoritedEvents(this.userId).subscribe((favoritedEvents: EventInterface[]) => {
          this.isFavorited = favoritedEvents.some(event => event.id === this.event?.id);
        });
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
      try{
        const decodedToken: any = jwtDecode(token);
        console.log('Token decodificado:', decodedToken);
  
        const roles = decodedToken.roles || [];
      if(roles.includes('USER')){
        this.userType = 'user';
        console.log('Tipo de usuário definido como: user');
      } else if (roles.includes('ORGANIZER')){
        this.userType = 'organizer';
        console.log('Tipo de usuário definido como: organizer');
      }else {
        this.userType = null;
        console.log('Tipo de usuário não pôde ser determinado.');
      }
    }catch{
      console.error('Erro ao decodificar o token:');
      this.userType = null;
    }
    }

}
