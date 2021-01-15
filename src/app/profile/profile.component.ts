import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  username: string;
  constructor(private userService: UserService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.currentUserValue.username;
    this.userService.findUserByUsername(this.username).subscribe((data) => {
      this.user = data;
    });
  }



}
