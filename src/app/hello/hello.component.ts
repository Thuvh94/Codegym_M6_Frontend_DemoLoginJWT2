import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  public user: User;
  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
