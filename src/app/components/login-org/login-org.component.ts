import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthOrganizerService } from 'src/app/core/organizer/auth-organizer.service';

@Component({
  selector: 'app-login-org',
  templateUrl: './login-org.component.html',
  styleUrls: ['./login-org.component.css']
})
export class LoginOrgComponent implements OnInit{
authOrganizer!: FormGroup;

constructor(private formBuider: FormBuilder,
  private authOrganizerService: AuthOrganizerService,
  private router: Router
){}
  ngOnInit(): void {
    this.authOrganizer = this.formBuider.group({
      name: [null, Validators.required],
      username: [null,  Validators.required],
      email: [null,  [Validators.required, Validators.email]],
      password: [null,  Validators.required]
    })
  }
  
  
  loginOrg(){
      const email = this.authOrganizer.value.email;
      const password = this.authOrganizer.value.password;
      this.authOrganizerService.autenticarOrganizer(email, password).subscribe({
        next: (value) => {
          console.log("Login concluido", value),
          this.router.navigateByUrl('/')
        },
        error: ( err) => {
          console.log('Erro no login', err);
        }
      })
  }

}
