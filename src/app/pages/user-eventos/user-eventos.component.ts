import { Component, OnInit } from '@angular/core';
import { EventFavConfInterface } from 'src/app/core/event-fav-conf/event-fav-conf.interface';

import { EventFavConfService } from 'src/app/core/event-fav-conf/event-fav-conf.service';
import { EventUserInterface } from 'src/app/core/event-user/event-user-interface';
import { EventUserService } from 'src/app/core/event-user/event-user.service';

@Component({
  selector: 'app-user-eventos',
  templateUrl: './user-eventos.component.html',
  styles: [
  ]
})
export class UserEventosComponent {
  confirmedEvents: EventFavConfInterface[] = [];
  favoritedEvents: EventFavConfInterface[] = [];
  userId: string = ''; // Defina a lógica para obter o ID do usuário

  constructor(private userEventService: EventFavConfService,
    private userService: EventUserService
  ) {}

  ngOnInit(): void {
    this.loadUserEvents();
    this.loadOrganizerData(); 
  }

  loadUserEvents(): void {
    this.userEventService.getConfirmedEvents(this.userId).subscribe(events => {
      this.confirmedEvents = events;
    });

    this.userEventService.getFavoritedEvents(this.userId).subscribe(events => {
      this.favoritedEvents = events;
    });
  }

  private loadOrganizerData(): void {
    
    this.userService.getUserById(this.userId).subscribe((user: EventUserInterface) => {
      console.log('user Data:', user);     
      this.userId = user.id;
  
    },
    error => {
      console.error('Error loading user data:', error);
    });
  }

  removeConfirmation(eventId: string): void {
    this.userEventService.removeConfirmedEvent(this.userId, eventId).subscribe(
      () => {
        this.confirmedEvents = this.confirmedEvents.filter(event => event.id !== eventId);
      },
      error => {
        console.error('Error removing confirmation:', error);
      }
    );
  }

  removeFavorite(eventId: string): void {
    this.userEventService.removeFavoritedEvent(this.userId, eventId).subscribe(
      () => {
        this.favoritedEvents = this.favoritedEvents.filter(event => event.id !== eventId);
      },
      error => {
        console.error('Error removing favorite:', error);
  })
}
}