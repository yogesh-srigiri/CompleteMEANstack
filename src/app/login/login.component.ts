import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onLogin(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.loginUser(formData.value.email, formData.value.password);
  }

  ngOnInit() {}
}
