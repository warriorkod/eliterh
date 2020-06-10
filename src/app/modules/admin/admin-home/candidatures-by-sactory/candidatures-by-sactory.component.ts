import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Post} from 'src/app/models/post';
import {SessionService} from 'src/app/services';
import {Candidature} from '../../../../models/candidature';
import {User} from '../../../../models/user';
import {DataTableDirective} from 'angular-datatables';
import {Router} from '@angular/router';

@Component({
  selector: 'app-candidatures-by-sactory',
  templateUrl: './candidatures-by-sactory.component.html',
  styleUrls: ['./candidatures-by-sactory.component.css']
})
export class CandidaturesBySactoryComponent implements OnInit, OnDestroy, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtElement: DataTableDirective;
  isDtInitialized = false;

  candidaruresByFactorySubject: Subscription;
  candidaturesSubscription: Subscription;
  candidatures: Candidature[];
  candidaruresByFactory: any;
  users: User[];
  posts: Post[];
  postsSubscription: Subscription;

  constructor(private apiService: SessionService, private router: Router) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: false,
      paging: true,
      info: true
    };
    this.postsSubscription = this.apiService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      });
    this.apiService.emitPosts();
    /*this.candidaturesSubscription = this.apiService.candidaturesSubject.subscribe(
      (candidatures: Candidature[]) => {
        candidatures.forEach((value) => {
          let exists: number;
          let index: number;
          index = this.posts.findIndex((post) => {
            if (post.id === value.id) {
              return true;
            }
          });
          if (index === -1) {
            return;
          }
          exists = this.candidaruresByFactory.findIndex(el => {
            if (el.id === index) {
              return true;
            }
          });
          if (exists === -1) {
            const item = {
              id: this.posts[index].id,
              nom_structure: this.posts[index].structureName,
              title: this.posts[index].titre,
              secteur: this.posts[index].secteur,
            };
            console.log(item);
            this.candidaruresByFactory.push(item);
          }
        });
      });
      (candidatures: Candidature[]) => {
        candidatures.forEach((value) => {
          let exists: number;
          let index: number;
          index = this.posts.findIndex((post) => {
            if (post.id === value.id) {
              return true;
            }
          });
          if (index === -1) {
            return;
          }
          exists = this.candidaruresByFactory.findIndex(el => {
            if (el.id === index) {
              return true;
            }
          });
          if (exists === -1) {
            const item = {
              id: this.posts[index].id,
              nom_structure: this.posts[index].structureName,
              title: this.posts[index].titre,
              secteur: this.posts[index].secteur,
            };
            console.log(item);
            this.candidaruresByFactory.push(item);
          }
        });
      });
    this.apiService.emitCandidatures();*/
  }

  /*ngAfterViewInit(): void {
    this.dtTrigger.next();
  }*/

  open(item) {
    this.router.navigate(['/admin_home_elith_rh/candidatures', item.id]);
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    this.dtTrigger.unsubscribe();
  }

}
