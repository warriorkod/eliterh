import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  providers: [DatePipe]

})
export class AdminHomeComponent implements OnInit {


  listUser = false;
  addPost = true;
  listPost = false;
  singlePost = false;
  candidatures = false;
  candidaturesByFactory = false;
  route;


  constructor(private activeRouter: ActivatedRoute, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRouter.url.subscribe(value => {
      this.route = value;
      if (value.length > 0) {
        this.checkRoute();
      }
    });
  }

  checkRoute() {

    switch (this.route[0].path) {
      case 'candidatures' : {
        this.candidatures = true;
        this.listUser = false;
        this.addPost = false;
        this.listPost = false;
        this.singlePost = false;
        this.candidaturesByFactory = false;
        break;
      }
      case 'candidaturesByFactory' : {
        this.candidaturesByFactory = true;
        this.candidatures = false;
        this.listUser = false;
        this.addPost = false;
        this.listPost = false;
        this.singlePost = false;
        break;
      }
      case 'user_list' : {
        this.candidatures = false;
        this.listUser = true;
        this.addPost = false;
        this.listPost = false;
        this.singlePost = false;
        this.candidaturesByFactory = false;
        break;
      }
      case 'post_add' : {
        this.addPost = true;
        this.listPost = false;
        this.candidatures = false;
        this.listUser = false;
        this.singlePost = false;
        this.candidaturesByFactory = false;
        break;
      }
      case 'post_list' : {
        this.addPost = false;
        this.listPost = true;
        this.candidatures = false;
        this.listUser = false;
        this.singlePost = false;
        this.candidaturesByFactory = false;
        break;
      }
      case 'single_post' : {
        this.singlePost = true;
        this.addPost = false;
        this.listPost = false;
        this.candidatures = false;
        this.listUser = false;
        this.candidaturesByFactory = false;
        break;
      }
    }

  }

}
