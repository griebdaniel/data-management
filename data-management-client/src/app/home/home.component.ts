import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  show(route) {
    this.router.navigate([route]);
  }
  showSupplies() {
    this.router.navigate(['/home/supplies']);
  }

  showSupplyOrders() {
    this.router.navigate(['home/supplyOrders']);
  }
}
