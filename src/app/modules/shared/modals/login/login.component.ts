import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef } from '@angular/material';
import { SessionService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private _apiService: SessionService) { }

  ngOnInit() {
    this.buildLoginForm();

  }

  buildLoginForm(): void {
    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  onLogin(formValue) {
    this._apiService.signInUser(formValue);
  }

  close() {
    this.dialogRef.close();
  } 

}
