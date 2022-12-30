import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {
  resetForm!: FormGroup;
  submitted = false;
  check = false;
  error = '';
  loading = false;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    } else {
      this.authService.forgetPass(this.resetForm.value).subscribe(
        () => {
          this.router.navigate(['/account/verify']);
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
