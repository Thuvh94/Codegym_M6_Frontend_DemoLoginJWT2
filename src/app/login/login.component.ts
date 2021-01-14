import { Component, OnInit } from '@angular/core';
import {UserToken} from '../model/user-token';
import {User} from '../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newFormUser: FormGroup;
  newFormLogin: FormGroup;

  currentUser: UserToken;
  user: User = {
    username: '',
    password: ''
  };
  returnUrl = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.authService.currentUser.subscribe(value => this.currentUser = value);
  }

  ngOnInit() {
    this.newFormUser = this.formBuilder.group({
      username: [''],
      password: [''],
      // confirmPassword: [''],
      phone: ['']
    });
    this.newFormLogin = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    this.authService.login(this.user.username, this.user.password)
      .pipe(first())
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      });
  }

}
