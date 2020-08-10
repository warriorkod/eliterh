import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from 'src/app/services';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  login: FormGroup;
  errorMessage: any;

  constructor(private router: Router, private apiService: SessionService) {
    this.createForm();
  }

  createForm() {
    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin(formValue) {
    this.apiService.signInUser(formValue).then(
      () => {
        this.router.navigate(['/admin_home_elith_rh']).then();
      },
      (error) => {
        this.errorMessage = error;
      }
    );

  }

  ngOnInit() {
  }


}
