import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/core/events/event.service';


@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.css']
})
export class FormEventComponent implements OnInit{
formEvent!: FormGroup;
image: string = '';

constructor(private formBuilder: FormBuilder,
  private eventService: EventService,
  private router: Router
  
){}
  ngOnInit(): void {
    this.formEvent = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      category: ['', [Validators.required]],      
      street: [''],
      number: [''],
      city: [''],
      state: [''],
      postalCode: [''],       
     image: [null],
    })
  }

  onFileUpload(url: string){
    this.formEvent.patchValue({ image: url});
  }

  cadastroEvent(){
    if(this.formEvent.invalid){
      console.log("formulario invalido");
      return;
    }
    const formData = this.formEvent.value;
    this.eventService.save(formData).subscribe({
      next: (value) => {
        console.log("Cadastro concluido", value),
        this.router.navigateByUrl('/eventos')
      },
      error: ( err) => {
        console.log('Erro ', err);
      }
    })
  }

  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
