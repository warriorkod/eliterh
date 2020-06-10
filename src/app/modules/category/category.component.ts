import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  show = true;
  loading = true;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent) {
    if (event instanceof NavigationEnd) {
      if (event.url.includes('/list-job')) {
        this.show = true;
      } else if (event.url.includes('/single-job')) {
        this.show = false;
      }
    }
  }

  ngOnInit() {
  }

  setListLoader(event) {
    setInterval(() => {
      this.loading = event;
    }, 1000);
  }

  setSingleLoader(event) {
    setInterval(() => {
      this.loading = event;
    }, 1000);
  }

}
