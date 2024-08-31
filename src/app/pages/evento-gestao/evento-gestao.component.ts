import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/core/events/event.service';
import { EventInterface } from 'src/app/core/events/events.inteface';

@Component({
  selector: 'app-evento-gestao',
  templateUrl: './evento-gestao.component.html',
  styles: [
  ]
})
export class EventoGestaoComponent implements OnInit{
  events: EventInterface[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getEventsByOrganizer().subscribe((data) => {
      this.events = data;
    });
  }

  editEvent(event: EventInterface): void {
    this.router.navigate(['/edit-event', event.id]);
  }

  deleteEvent(event: EventInterface): void {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      this.eventService.remove(event).subscribe(() => {
        this.events = this.events.filter(e => e.id !== event.id);
      });
    }
  }
}
