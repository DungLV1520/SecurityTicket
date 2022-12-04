import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  check = false;
  error = '';
  successmsg = false;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      this.authService
        .register(this.signupForm.value)
        .pipe(first())
        .subscribe(
          () => {
            this.successmsg = true;
            if (this.successmsg) {
              this.router.navigate(['/account/login']);
            }
          },
          (error) => {
            this.error = error ? error : '';
            if (this.error) {
              this.check = true;
            }
            setTimeout(() => {
              this.check = false;
            }, 2000);
          }
        );
    }
  }
}
