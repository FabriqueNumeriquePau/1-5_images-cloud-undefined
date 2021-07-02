import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { Account, AuthInput, UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly route: Router) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onLogin() {
    const account: Account = {
      id: 1,
      username: this.loginForm.value.username
    };
    this.loginForm.disable();
    this.userService.login$({ username: account.username, password: '' } as AuthInput).pipe()
      .subscribe(() => {
        this.userService.updateAccount(account);
        this.route.navigate(['gallery']);
      });

  }

}
