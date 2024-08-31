import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../../core/events/events.inteface';
import { EventService } from '../../core/events/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventFavConfService } from 'src/app/core/event-fav-conf/event-fav-conf.service';
import { AuthUserService } from 'src/app/core/event-user/auth-user.service';


@Component({
  selector: 'app-evento-det',
  templateUrl: './evento-det.component.html',
  styleUrls: ['./evento-det.component.css']
})
export class EventoDetComponent implements OnInit {
  event: EventInterface | undefined;
  userId: string = '';
  

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private userEventService: EventFavConfService,
    private authUserService: AuthUserService
  ){}

  ngOnInit(): void {
    this.userId = this.authUserService.getUserId() || '';
      const eventId = this.route.snapshot.paramMap.get('id');

      if(eventId){
        this.eventService.getEventByID(eventId).subscribe((data: EventInterface) => {
         
          this.event = data;
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.event.maps);
        });
      }
    }
    public safeUrl!: SafeResourceUrl;

    editEvent(): void {
      if (this.event) {
        this.router.navigate(['/edit-event', this.event.id]); // Redireciona para o formulário de edição
      }
    }

    confirmPresence(eventId: string): void {
      if (this.authUserService.isLogged) { // Verifica se o usuário está logado
        this.userEventService.confirmEvent(this.userId, eventId).subscribe(() => {
          console.log('Presença confirmada!');
        }, error => {
          console.error('Erro ao confirmar presença:', error);
        });
      } else {
        console.error('Usuário não está logado.');
        this.router.navigate(['/login']); // Redireciona para login se não estiver autenticado
      }
    }
  
    favoriteEvent(eventId: string): void {
       if (this.authUserService.isLogged) { // Verifica se o usuário está logado
    this.userEventService.favoriteEvent(this.userId, eventId).subscribe(() => {
      console.log('Evento favoritado!');
    }, error => {
      console.error('Erro ao favoritar evento:', error);
    });
  } else {
    console.error('Usuário não está logado.');
    this.router.navigate(['/login']); // Redireciona para login se não estiver autenticado
  }
    }

}
