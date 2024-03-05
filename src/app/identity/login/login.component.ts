import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmailAndPasswodr, IdentityService } from '../identity.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule]

})
export class LoginComponent {
  
  constructor(private identityService: IdentityService,
              private router: Router,
              private snackBar: MatSnackBar
              ){}
  form = new FormGroup({
  emailFormControl: new FormControl('', [Validators.required, Validators.email]),
  passwordFormControl: new FormControl('', [Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/)])
  });
  emailMatcher = new EmailErrorStateMatcher()
  passwordMatcher = new EmailErrorStateMatcher()
  loading = false;
  
  routeToRegistration(){
    this.router.navigate(['/registration'])
  }
  onSubmit(){
    this.loading = true;

    let request : EmailAndPasswodr = {
      email: this.form.get("emailFormControl")?.getRawValue(),
      password: this.form.get("passwordFormControl")?.getRawValue(),
      // twoFactorCode: "string",
      // twoFactorRecoveryCode: "string"
    }
console.dir(request)
    this.identityService.login(request).subscribe({
      next: (response) =>{
      this.loading = false
      this.identityService.setSession(response)
    },
    error: (e) => {
      this.snackBar.open("Ошибка, попробуйте еще раз", "", { duration: 2000 }).afterDismissed().subscribe(()=>{
        this.loading = false
        })
    }
  });
  }
}

export class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}
  