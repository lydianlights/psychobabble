import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService, LoginCredentials } from './../../auth.service';

@Component({
  selector: 'login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html'
})

export class LogInComponent {
  constructor(
    public auth: AuthService,
    public router: Router
  ){ }

  public onSubmit(loginForm: NgForm) {
    let credentials = loginForm.value as LoginCredentials;
    this.auth.login(credentials).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}