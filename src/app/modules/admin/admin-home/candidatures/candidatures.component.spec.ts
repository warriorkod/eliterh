import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CandidaturesComponent} from './candidatures.component';
import {SessionService} from '../../../../services';

describe('CandidaturesComponent', () => {
  let component: CandidaturesComponent;
  let fixture: ComponentFixture<CandidaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidaturesComponent],
      providers: [SessionService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
