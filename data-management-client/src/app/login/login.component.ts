import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  ngOnInit() {
  }

  constructor(private authService: AuthService, private router: Router) {

  }

  login() {
    this.authService.login(this.username, this.password).subscribe(res => {
      if (res === true) {
        this.router.navigateByUrl('/home');
      }
    });
  }

}
