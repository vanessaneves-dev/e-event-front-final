import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizerService } from 'src/app/core/organizer/organizer.service';

@Component({
  selector: 'app-form-organizer',
  templateUrl: './form-organizer.component.html',
  styleUrls: ['./form-organizer.component.css']
})
export class FormOrganizerComponent implements OnInit {
formOrganizer!: FormGroup;


constructor(private formBuilder: FormBuilder,
  private organizerService: OrganizerService,
  private router: Router
  
){}
  ngOnInit(): void {
    this.formOrganizer = this.formBuilder.group({
      name: [null, [Validators.required]],        
      username: [null, [Validators.required]],   
      email: [null, [Validators.required, Validators.email]], 
      password: [null, [Validators.required, Validators.minLength(6)]] 
    })
  }
  cadastroOrg(){
    if(this.formOrganizer.invalid){
       // Se o formulário for inválido, não faça o envio
       console.log('Formulário inválido');
       return;
    }
    const formData = this.formOrganizer.value;
    
    this.organizerService.save(formData).subscribe({
      next: (value) => {
        console.log("Cadastro concluido", value),
        this.router.navigateByUrl('/login')
      },
      error: ( err) => {
        console.log('Erro ', err);
      }
    })
}
}
