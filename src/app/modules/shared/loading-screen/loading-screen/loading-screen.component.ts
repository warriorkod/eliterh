import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingScreenService } from '../../../../services/loading-screen/loading-screen.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
