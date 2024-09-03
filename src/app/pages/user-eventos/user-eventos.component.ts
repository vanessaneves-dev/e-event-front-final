import { Component, OnInit } from '@angular/core';
import { EventFavConfInterface } from 'src/app/core/event-fav-conf/event-fav-conf.interface';
import { EventFavConfService } from 'src/app/core/event-fav-conf/event-fav-conf.service';
import { EventUserService } from 'src/app/core/event-user/event-user.service';
import { AuthUserService } from 'src/app/core/event-user/auth-user.service';
import { EventUserInterface } from 'src/app/core/event-user/event-user-interface';

@Component({
  selector: 'app-user-eventos',
  templateUrl: './user-eventos.component.html',
  styles: [
    
  ]
})
export class UserEventosComponent implements OnInit {
  confirmedEvents: EventFavConfInterface[] = [];
  favoritedEvents: EventFavConfInterface[] = [];
  userId: string = ''; 

  constructor(
    private userEventService: EventFavConfService,
    private userService: EventUserService
  ) {}

  ngOnInit(): void {
  // Primeiro carregue os dados do usuário
  this.loadOrganizerData(); 
  }

  loadUserEvents(): void {
    this.userEventService.getConfirmedEvents(this.userId).subscribe(events => {
      console.log('Confirmed events:', events);
      this.confirmedEvents = events;
    }, error => {
      console.error('Erro ao carregar eventos confirmados:', error);
    });

    this.userEventService.getFavoritedEvents(this.userId).subscribe(events => {
      this.favoritedEvents = events;
    }, error => {
      console.error('Erro ao carregar eventos favoritados:', error);
    });
  }

  private loadOrganizerData(): void {
     // Obtenha os dados do usuário primeiro
     this.userService.getUserById(this.userId).subscribe(
      (user: EventUserInterface) => {
        console.log('user Data:', user);
        this.userId = user.id;
        // Após definir o userId, carregue os eventos
        this.loadUserEvents();
      },
      error => {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    );
  }

  removeConfirmation(eventId: string): void {
    console.log('Removing confirmation for eventId:', eventId); // Debugging line
    this.userEventService.removeConfirmedEvent(this.userId, eventId).subscribe(
      () => {
        this.confirmedEvents = this.confirmedEvents.filter(event => event.eventId !== eventId);
      },
      error => {
        console.error('Erro ao remover confirmação:', error);
      }
    );
  }
  

//   removeConfirmation(eventId: string): void {
//     this.userEventService.removeConfirmedEvent(this.userId, eventId).subscribe(() => {
//       this.confirmedEvents = this.confirmedEvents.filter(event => event.eventId !== eventId);
//   }, error => {
//       console.error('Erro ao remover confirmação:', error);
//   });
// }

  removeFavorite(eventId: string): void {
    this.userEventService.removeFavoritedEvent(this.userId, eventId).subscribe(() => {
      this.favoritedEvents = this.favoritedEvents.filter(event => event.eventId !== eventId);
    }, error => {
      console.error('Erro ao remover favorito:', error);
    });
  }
}
