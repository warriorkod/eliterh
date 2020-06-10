import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {SessionService} from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private apiService: SessionService) {
  }

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
    this.apiService.signInUser(formValue).then();
  }

  close() {
    this.dialogRef.close();
  }

}
