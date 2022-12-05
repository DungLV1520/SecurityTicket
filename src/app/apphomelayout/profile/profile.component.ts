import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/account/auth/auth.service';
import { MustMatch } from 'src/app/shared/util/validation.mustmatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  nameForm!: FormGroup;
  passForm!: FormGroup;
  nameSubmit = false;
  passSubmit = false;
  errorName = '';
  errorPass = '';
  returnUrl!: string;
  loading: boolean = false;
  checkName = false;
  checkPass = false;
  checkPassSuccess = false;
  checkNameSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.passForm = this.formBuilder.group(
      {
        oldPass: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        cfPass: ['', [Validators.required]],
      },
      {
        validator: MustMatch('oldPass', 'newPassword'),
      }
    );
  }

  updateProfile() {
    this.nameSubmit = true;
    if (this.nameForm.invalid) {
      return;
    }
    this.authService.updateProfile(this.nameForm.value).subscribe(
      () => {
        this.checkNameSuccess = true;
        setTimeout(() => {
          this.checkNameSuccess = false;
        }, 2000);
      },
      (err) => {
        this.errorName = err;
        if (this.errorName) {
          this.checkName = true;
        }
        setTimeout(() => {
          this.checkName = false;
        }, 2000);
      }
    );
  }

  updatePass() {
    this.passSubmit = true;
    const password = {
      oldPassword: this.passForm.get('oldPass')!.value,
      newPassword: this.passForm.get('newPassword')!.value,
    };
    if (this.passForm.invalid) {
      return;
    }
    this.authService.updatePassword(password).subscribe(
      () => {
        this.checkPassSuccess = true;
        setTimeout(() => {
          this.checkPassSuccess = false;
        }, 2000);
      },
      (err) => {
        this.errorPass = err;
        if (this.errorPass) {
          this.checkPass = true;
        }
        setTimeout(() => {
          this.checkPass = false;
        }, 2000);
      }
    );
  }
}
