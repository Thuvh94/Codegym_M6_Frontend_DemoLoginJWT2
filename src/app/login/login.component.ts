import {Component, OnInit} from '@angular/core';
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
  returnUrl = '';
  message: string;

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

  // tslint:disable-next-line:typedef
  login() {
    // tslint:disable-next-line:prefer-const
    let loginUser: User;
    loginUser = this.newFormLogin.value;
    this.authService.login(loginUser)
      .pipe(first())
      .subscribe(data => {
          console.log('thành công');
          this.router.navigate([this.returnUrl]); // navigate sau khi login
      }, error => {
        this.message = 'Incorrect username or password';
        console.log('unauthorized');
        }
      );
  }


// tslint:disable-next-line:typedef
createNewUser() {
  let newUserName: User;
  console.log(this.newFormUser);
  console.log(this.newFormUser.value);
  newUserName = this.newFormUser.value;
  console.log(this.newFormUser);
  console.log(newUserName.username);
  this.authService.signup(newUserName).subscribe(() => {
    alert('Thêm thành công');
  }, error => {
    alert(console.log(this.authService.signup(newUserName).subscribe()));
  });
}

}
