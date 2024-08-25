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


}
