import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  //subscription defined for unsubscribe when components destroy.
  sub!: Subscription;
  //defined a variable that named loginForm for Form
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snakser: SnackbarService,
    private translocoService: TranslocoService
  ) {}
  //when app on destroyed, this func will be start.
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    //the function that named createLoginForm was called when view was started.
    this.createLoginForm();
  }
  //defined a function that named createLogin form for a formbuilder.
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
    });
  }
  //defined a function for login operation.
  login() {
    //http was used to http request
    this.sub = this.authService.login().subscribe(
      //the suscribe method has two output.
      //if reguest ended up succesfully
      (res: any) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          this.snakser.createSnackbar('success', this.translocoService.translate('successfull'));
          localStorage.setItem('access_token', user.token);
          //if login operation ended up successfully then localstorage will save user.firstname.
          localStorage.setItem('user', JSON.stringify(user));


          this.router.navigate(['home']);

        } //if reguest ended up wrongly
        else {
          this.snakser.createSnackbar('success', this.translocoService.translate('empassWrong'));
        }
      },
      (err) => {
        this.snakser.createSnackbar('success', this.translocoService.translate('error'));
      }
    );
  }
}
