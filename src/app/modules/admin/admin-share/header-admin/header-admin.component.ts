import {Component, OnInit} from '@angular/core';
import {SessionService} from 'src/app/services';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor(private apiServie: SessionService) {

  }

  ngOnInit() {

  }

  deconnexion() {
    this.apiServie.signOutUser();
  }

}
