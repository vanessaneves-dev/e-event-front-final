import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../../core/events/events.inteface';
import { EventService } from '../../core/events/event.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit  {

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
