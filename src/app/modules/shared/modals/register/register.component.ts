import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {SessionService} from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;

  constructor(private dialogRef: MatDialogRef<RegisterComponent>, private apiService: SessionService) {
  }


  ngOnInit() {
    this.buildRegisterForm();

  }

  buildRegisterForm(): void {
    this.register = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required),
      date_naissance: new FormControl('', Validators.required)
    });
  }

  createUser(formValue) {
    this.apiService.createNewUser(formValue).then();

  }

  close() {
    this.dialogRef.close();
  }


}

