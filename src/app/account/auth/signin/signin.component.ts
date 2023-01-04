import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../auth.service';
import { CryptoService } from '../../../shared/service/crypto.service';
import { StorageService } from '../../../shared/service/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  loading: boolean = false;
  check = false;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cryptoService: CryptoService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService
        .login(
          this.loginForm.get('email')!.value,
          this.loginForm.get('password')!.value
        )
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.router.navigate(['/menu/home']);
            this.loading = false;
            this.cryptoService.hashSHA256(data.token);
            this.storageService.storePublicKey(data.publicKey);
            this.storageService.storeClientId(data.id);
          },
          (error) => {
            this.error = error ? error : '';
            this.loading = false;
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

  en(): void {
    this.cryptoService.encrypt('SuperSecret', 'madukkarai');
  }

  de(): void {
    this.cryptoService.decript(
      this.cryptoService.encrypt('SuperSecret', 'madukkarai'),
      'madukkarai'
    );
  }
}
