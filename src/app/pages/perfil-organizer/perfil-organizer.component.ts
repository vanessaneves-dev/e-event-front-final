import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthUserService } from 'src/app/core/event-user/auth-user.service';
import { OrganizerInterface } from 'src/app/core/organizer/organizer.interface';
import { OrganizerService } from 'src/app/core/organizer/organizer.service';

@Component({
  selector: 'app-perfil-organizer',
  templateUrl: './perfil-organizer.component.html',
  styleUrls: ['./perfil-organizer.component.css']
})
export class PerfilOrganizerComponent implements OnInit{
perfilOrganizerForm!: FormGroup;
organizerId!: string;
username: string = "";
imageUrl: string = '';
userId: string = '';


constructor(
  private fb: FormBuilder,
  private organizerService: OrganizerService,
    private route: ActivatedRoute,
    private authService: AuthUserService
){}



ngOnInit(): void {
  this.organizerId = this.route.snapshot.paramMap.get('id') || '';
  this.initializeForm();
  this.loadOrganizerData();  
}

private initializeForm(): void {
  this.perfilOrganizerForm = this.fb.group({
    name: [''],
    username: [''],
    email: [''],
    password: [''],
    image: [''],
  });
}
private loadOrganizerData(): void {
  this.userId = localStorage.getItem('userId') || ''
  this.organizerService.getOrganizerById(this.organizerId).subscribe((organizer: OrganizerInterface) => {
    console.log('Organizer Data:', organizer);
    this.perfilOrganizerForm.patchValue(organizer);
    this.imageUrl = organizer.image; 
    this.username = organizer.username; 

  },
  error => {
    console.error('Error loading organizer data:', error);
  });
}
public updateOrganizer(): void {
  if (this.perfilOrganizerForm.valid) {
    const updatedOrganizer = this.perfilOrganizerForm.value;
    
    this.organizerService.update(this.organizerId, updatedOrganizer).subscribe({
      
      next: (response) => {
        console.log('Organizador atualizado com sucesso!', response);
      },
      error: (err) => {
        console.error('Erro ao atualizar o organizador:', err);
      }
    });
  }
}


}
