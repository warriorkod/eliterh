import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Post} from 'src/app/models/post';
import {SessionService} from 'src/app/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  p = 1;
  postsSubscription: Subscription;
  posts: Post[] = [];
  postsFirst: Post[] = [];
  type: string;
  structure: string;

  constructor(private apiservice: SessionService, private router: Router) {
  }

  ngOnInit() {
    this.postsSubscription = this.apiservice.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.postsFirst = posts;
      }
    );
    this.apiservice.emitPosts();
  }


  openPost(post) {
    const postIndexToView = this.apiservice.getPostIndex(post.id);
    this.router.navigate(['/admin_home_elith_rh/single_post', postIndexToView]);
  }

  onDeleteBook(post: Post) {
    this.apiservice.removePosts(post);
  }

  onTypeChange(newType: string) {
    this.type = newType;
    this.p = 1;
  }

  onStructureChange(newStructure) {
    this.structure = newStructure;
    this.p = 1;
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
