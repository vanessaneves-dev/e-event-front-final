import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../../core/events/events.inteface';
import { EventService } from '../../core/events/event.service';


@Component({
  selector: 'app-card-evento',
  templateUrl: './card-evento.component.html',
  styleUrls: ['./card-evento.component.css']
})
export class CardEventoComponent implements OnInit {

  
  events: EventInterface[] = [];

  constructor( private eventService: EventService ){}

  ngOnInit(): void {
      this.eventService.getAllEvents()
      .subscribe((data) =>
      { this.events = data;
        }
      )
  }
  removeEvent(event: EventInterface): void {
    if (confirm(`Tem certeza de que deseja excluir o evento "${event.title}"?`)) {
      this.eventService.remove(event).subscribe(
        () => {
          // Remove o evento da lista local
          this.events = this.events.filter(e => e.id !== event.id);
          console.log(`Evento ${event.title} excluído com sucesso.`);
        },
        (error) => {
          console.error('Erro ao excluir o evento', error);
        }
      );
    }
  }

}
