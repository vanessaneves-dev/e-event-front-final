import { Component, OnInit } from '@angular/core';
import { OrganizerInterface } from 'src/app/core/organizer/organizer.interface';
import { OrganizerService } from 'src/app/core/organizer/organizer.service';

@Component({
  selector: 'app-list-organizer',
  templateUrl: './list-organizer.component.html',
  styleUrls: ['./list-organizer.component.css']
})
export class ListOrganizerComponent implements OnInit{

organizers: OrganizerInterface [] = [];

constructor(private organizerService: OrganizerService) { }

ngOnInit(): void {
  this.organizerService.getAll().subscribe((data) => {
    this.organizers = data;
  });
}

}
