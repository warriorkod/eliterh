import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  login : FormGroup;
  errorMessage: any;

  constructor( private router: Router, private _apiService: SessionService) {
    this.createForm();
  }

  createForm(){
    this.login = new FormGroup({
      email: new FormControl ('', Validators.required),
      password: new FormControl ('', Validators.required)
    })
  }

  onLogin(formValue) {
    this._apiService.signInUser(formValue).then(
      () => {
        this.router.navigate(['/admin_home_elith_rh']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );

  }

  ngOnInit() {
  }


}
