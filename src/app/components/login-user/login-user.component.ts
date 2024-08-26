import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/core/event-user/auth-user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  authUser!: FormGroup;

  constructor(private formBuider: FormBuilder,
    private authUseService: AuthUserService,
    private router: Router
  ){}
    ngOnInit(): void {
      this.authUser = this.formBuider.group({
        email: [null,  [Validators.required, Validators.email]],
        password: [null,  Validators.required]
      })
    }
    loginUser(){
      const email = this.authUser.value.email;
      const password = this.authUser.value.password;
      this.authUseService.autenticarUser(email, password).subscribe({
        next: (response) => {
          console.log("Login concluido", response);
          const jwtToken = response.access_user_token;
          console.log("Token JWT:", jwtToken);
          localStorage.setItem('JWT', jwtToken);
          console.log("armazenou", jwtToken);
          this.router.navigateByUrl('/')
        },
        error: ( err) => {
          console.log('Erro no login', err);
        }
      })
  }




}
