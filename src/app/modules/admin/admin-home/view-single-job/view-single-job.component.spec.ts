import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleJobComponent } from './view-single-job.component';

describe('ViewSingleJobComponent', () => {
  let component: ViewSingleJobComponent;
  let fixture: ComponentFixture<ViewSingleJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
