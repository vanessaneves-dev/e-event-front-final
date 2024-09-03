import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from 'src/app/core/event-user/auth-user.service';
import { EventUserInterface } from 'src/app/core/event-user/event-user-interface';
import { EventUserService } from 'src/app/core/event-user/event-user.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styles: [
  ]
})
export class PerfilUserComponent  implements OnInit{
perfilUserForm!: FormGroup;
userId!: string;
username: string = "";
imageUrl: string = '';
isEditing: boolean = false;

constructor(
  private fb: FormBuilder,
  private userService: EventUserService,
  private router: Router,
    private route: ActivatedRoute,
    private authUserService: AuthUserService
){}
  ngOnInit(): void {
    this.initializeForm();
    this.loadOrganizerData(); 
  }
  private initializeForm(): void {
    this.perfilUserForm = this.fb.group({
      name: [''],
      username: [''],
      email: [''],
      password: [''],
      image: [''],
    });
  }

  private loadOrganizerData(): void {
    // this.userId = localStorage.getItem('userId') || ''
    this.userService.getUserById(this.userId).subscribe((user: EventUserInterface) => {
      console.log('user Data:', user);
      this.perfilUserForm.patchValue(user);
      this.imageUrl = user.image; 
      this.username = user.username; 
      this.userId = user.id;
  
    },
    error => {
      console.error('Error loading user data:', error);
    });
  }

  public toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    
  }

  public updateUser(): void {
    if (this.perfilUserForm.valid) {
      const updatedOrganizer = this.perfilUserForm.value;
      
      this.userService.updateUser(this.userId, updatedOrganizer).subscribe({
        
        next: (response) => {
          console.log('User atualizado com sucesso!', response);
          this.toggleEditMode();
        },
        error: (err) => {
          console.error('Erro ao atualizar o User:', err);
        }
      });
    }
  }
  
  public onFileUploaded(url: string): void {
    this.imageUrl = url;
    this.perfilUserForm.patchValue({ image: url }); // Atualiza o campo de imagem com a URL
  }




}
