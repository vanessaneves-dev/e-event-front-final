import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../../core/events/events.inteface';
import { EventService } from '../../core/events/event.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-evento-det',
  templateUrl: './evento-det.component.html',
  styleUrls: ['./evento-det.component.css']
})
export class EventoDetComponent implements OnInit {
  event: EventInterface | undefined;
  constructor(private route: ActivatedRoute,private eventService: EventService){}

  ngOnInit(): void {
      const eventId = this.route.snapshot.paramMap.get('id');

      if(eventId){
        this.eventService.getEventByID(eventId).subscribe((data: EventInterface) => {
          this.event = data;
        });
      }
      
    }
}
