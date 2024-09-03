import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
isEditing: boolean = false; 


constructor(
  private fb: FormBuilder,
  private organizerService: OrganizerService,
  private router: Router,
    private route: ActivatedRoute,
    private authService: AuthUserService
){}



ngOnInit(): void {  
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
  // this.userId = localStorage.getItem('userId') || ''
  this.organizerService.getOrganizerById(this.organizerId).subscribe((organizer: OrganizerInterface) => {
    console.log('Organizer Data:', organizer);
    this.perfilOrganizerForm.patchValue(organizer);
    this.imageUrl = organizer.image; 
    this.username = organizer.username; 
    this.organizerId = organizer.id;

  },
  error => {
    console.error('Error loading organizer data:', error);
  });
}

public toggleEditMode(): void {
  this.isEditing = !this.isEditing;
  
}


public updateOrganizer(): void {
  if (this.perfilOrganizerForm.valid) {
    const updatedOrganizer = this.perfilOrganizerForm.value;
    
    this.organizerService.update(this.organizerId, updatedOrganizer).subscribe({
      
      next: (response) => {
        console.log('Organizador atualizado com sucesso!', response);
        this.toggleEditMode();
      },
      error: (err) => {
        console.error('Erro ao atualizar o organizador:', err);
      }
    });
  }
}

public onFileUploaded(url: string): void {
  this.imageUrl = url;
  this.perfilOrganizerForm.patchValue({ image: url }); // Atualiza o campo de imagem com a URL
}

public deleteOrganizer(): void {
  if (confirm('Tem certeza que deseja deletar a conta? Esta ação não pode ser desfeita.')) {
    this.organizerService.remove(this.organizerId).subscribe({
      next: () => {
        console.log('Organizador removido com sucesso!');
        // Aqui você pode redirecionar o usuário ou exibir uma mensagem de confirmação
      },
      error: (err) => {
        console.error('Erro ao remover o organizador:', err);
      }
    });
  }
}

}
