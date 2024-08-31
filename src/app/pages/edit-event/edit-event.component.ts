import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/events/event.service';
import { EventInterface } from 'src/app/core/events/events.inteface';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styles: [
  ]
})
export class EditEventComponent {
  event: EventInterface = {
    id: '',
    title: '',
    description: '',
    date: '',
    time: '',
    street: '',
    number: '',
    city: '',
    state: '',
    postalCode: '',
    category: '',
    organizer: {
      name: '',
      email: ''
    },
    image: '',
    maps: ''
  };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.eventService.getEventByID(eventId).subscribe((data: EventInterface) => {
        this.event = data;
      });
    }
  }

  onSubmit(): void {
    if (this.event) {
      this.eventService.update(this.event).subscribe(() => {
        console.log("edit concluido" ),
        this.router.navigate(['/event-details', this.event.id]);
      });
    }
  }
}
