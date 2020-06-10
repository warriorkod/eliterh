import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {
  links = document.getElementsByClassName('btn-link');


  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationEnd) {
      this.links[1].classList.remove('active');
      if (event.url.includes('/single_post/')) {
        this.links[1].classList.toggle('active');
      }
    }
  }


}
