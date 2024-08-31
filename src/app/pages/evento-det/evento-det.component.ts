import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../../core/events/events.inteface';
import { EventService } from '../../core/events/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-evento-det',
  templateUrl: './evento-det.component.html',
  styleUrls: ['./evento-det.component.css']
})
export class EventoDetComponent implements OnInit {
  event: EventInterface | undefined;
  

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
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

}
