import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  edit = true;
  order = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  isLoggedIn() {
    this.authService.isLoggedIn().subscribe(res => console.log(res));
  }

  logOut() {
    this.authService.logOut().subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

  show(route: any) {
    this.router.navigate([route]);
  }
}
