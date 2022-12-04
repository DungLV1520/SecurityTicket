import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  year: number = new Date().getFullYear();
  formPassword!: FormGroup;
  submitted!: boolean;
  check = false;
  error = '';
  resetToken!: string;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.resetToken = paramsId['token'];
    });

    this.formPassword = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.authService
      .resetPassword(this.resetToken, this.formPassword.value)
      .subscribe(
        () => {
          this.router.navigateByUrl('/account/login');
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
