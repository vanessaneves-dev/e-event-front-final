import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventUserInterface } from 'src/app/core/event-user/event-user-interface';
import { EventUserService } from 'src/app/core/event-user/event-user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit{
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: EventUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: EventUserInterface = this.userForm.value;
      this.userService.registerUser(user).subscribe(
        response => {
          console.log('User registered successfully:', response);
          this.router.navigateByUrl('/')
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}
