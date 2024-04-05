import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validator,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { IdentityService, EmailAndPasswodr, Token } from '../../services/identity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class RegistrationComponent {
  constructor(
    private identityService: IdentityService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  form = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/),
    ]),
    confirmPasswordFormControl: new FormControl('', [
      Validators.required,
      confirmedPassword()
    ]),
  });
  emailMatcher = new EmailErrorStateMatcher()
  passwordMatcher = new EmailErrorStateMatcher()
  loading = false;

  routeToLogin() {
    this.router.navigate(['identity/login'])
  }
  onSubmit() {
    this.loading = true;

    let request: EmailAndPasswodr = {
      email: this.form.get('emailFormControl')?.getRawValue(),
      password: this.form.get('confirmPasswordFormControl')?.getRawValue(),
      // twoFactorCode: "string",
      // twoFactorRecoveryCode: "string"
    };
    console.dir(request);
    this.identityService.register(request).subscribe({
      next: (response) => {
        this.identityService.login(request).subscribe({
          next: (token : Token) => {
            this.identityService.setSession(token)
            this.router.navigate(['/dashboard/profile'])
          },
          error: (e) =>{
            this.snackBar.open(`Ваш аккаунт создан но что-то пошло не так, попробуйте войти через страничку входа используя вашу почту ${request.email}`, "Войти").onAction().subscribe(()=>{
              this.router.navigate(['identity/login'])
            })
          }
        })
        this.loading = false
      },
      error: (e : HttpErrorResponse) => {
        if (e.error.errors != undefined && e.error.errors['DuplicateUserName'] != undefined)
          this.snackBar.open(`Данная почта уже используется`, "", { duration: 3000 }).afterDismissed().subscribe(()=>{
            this.loading = false
            })
        else
          this.snackBar.open("Ошибка, попробуйте еще раз", "", { duration: 2000 }).afterDismissed().subscribe(()=>{
        this.loading = false
        })
      },
    });
  }
}
export function confirmedPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get("passwordFormControl")?.getRawValue()
    const confirmedPassword = control.value
    return password === confirmedPassword ? null : { notSame: true }
  }
}
export class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}
