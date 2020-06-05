import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Candidature} from 'src/app/models/candidature';
import {SessionService} from 'src/app/services';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from 'src/app/models/post';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent implements OnInit, OnDestroy {
  p = 1;
  candidaturesSubscription: Subscription;
  candidatures: any[] = [];
  title: any;
  date: any;
  candidatureId: string;

  constructor(private apiService: SessionService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => (this.candidatureId = params.id));
  }

  ngOnInit() {
    this.candidaturesSubscription = this.apiService.candidaturesSubject.subscribe(
      (candidatures: Candidature[]) => {
        this.candidatures = this.candidatureId ? candidatures.filter((candidature => candidature.id === this.candidatureId)) : candidatures;
        if (this.candidatures.length > 0) {
          let postEL: Post;
          for (let i = 0; i < candidatures.length; i++) {
            this.apiService.getPostById(this.candidatures[i].id).then(
              (post: Post) => {
                if (post) {
                  postEL = post;
                  this.candidatures[i] = {...candidatures[i], ...postEL};
                  this.candidatures[i].isActive = false;
                  this.candidatures[i].label = 'Ouvrir';
                  console.log(this.candidatures[i]);
                }
              }
            );
          }
        }
      }
    );
    this.apiService.emitCandidatures();
  }

  collapseCandidature(item) {
    const candidatureToShow = this.candidatures.findIndex(
      (candidature) => {
        if (candidature === item) {
          return true;
        }
      }
    );
    this.candidatures.filter(elt => elt !== item).map(it => it.isActive = false);
    this.candidatures.filter(elt => elt !== item).map(it => it.label = 'Ouvrir');
    this.candidatures[candidatureToShow].isActive = this.candidatures[candidatureToShow].isActive ? false : true;
    this.candidatures[candidatureToShow].label = this.candidatures[candidatureToShow].isActive ? 'Fermer' : 'Ouvrir';
  }

  ngOnDestroy() {
    this.candidaturesSubscription.unsubscribe();
  }

  onTypeChange(value: any) {
  }

  onStructureChange(value: any) {
  }
}
